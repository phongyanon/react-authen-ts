import { useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  Paper,
  TextInput,
  PasswordInput,
  // Checkbox,
  Button,
  Title,
  Text,
  Anchor,
	Group,
	Divider,
  LoadingOverlay
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
	IconBrandGoogle,
	IconBrandFacebook
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import classes from './Signin.module.css';
import PolicyModal from '../../components/policy/Policy';
import TermsOfUseModal from '../../components/policy/TermsOfUse';
import { signin } from '../../services/authen';
import { ISignin } from '../../types/authen.type';
import { getCurrentUser, getCurrentProfile } from '../../services/user';
import { IUserInfo } from '../../types/user.type';
import { userState } from '../../store/user';

export function Signin() {
  const [_, setCurrentUser] = useRecoilState(userState);
  const [policyOpened, policyOpenHandler] = useDisclosure(false);
	const [termsOfUseOpened, termsOfUseOpenHandler] = useDisclosure(false);
  const [loaderVisible, loaderHandler ] = useDisclosure(false);
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      username: '',
      password: ''
    }}
  )
  
  const signinSubmit = async (values: ISignin) => {
    // console.log(values);
    loaderHandler.toggle();
    try {
      let result = await signin({username: values.username, password: values.password});
      if (result === false) {
        setFormError("Invalid username or password");
      } else {
        localStorage.setItem('access_token', result.access_token);
        localStorage.setItem('refresh_token', result.refresh_token);

        Promise.all([getCurrentUser(), getCurrentProfile()]).then((values) => {
          if ((values[0] !== null) && (values[1].image_profile)) {
            let user_info: IUserInfo = values[0];
            user_info.image_profile = values[1].image_profile;
            setCurrentUser(user_info);
          }
          else if (values[0] !== null) {
            setCurrentUser(values[0]);
          }
        });
        loaderHandler.close();
        navigate("/overview");
      }
    } catch (err: any) {
      if (err.error === 'Invalid username or password') {
        setFormError("Invalid username or password");
      } else {
        setFormError("Server is under matainance, Please contact admin");
      }
      loaderHandler.close();
      console.log(err);
    }
  }

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <LoadingOverlay
          visible={loaderVisible}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'violet', type: 'bars' }}
        />
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back, Sign in with
        </Title>

				<Group grow mb="md" mt="md">
					<Button variant="light" radius="xl" leftSection={<IconBrandGoogle size={20}/>}>Google</Button>
					<Button variant="light" radius="xl" leftSection={<IconBrandFacebook size={20}/>}>Facebook</Button>
      	</Group>

      	<Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit((values) => signinSubmit(values))}>
          <TextInput 
            label="Email address" 
            placeholder="hello@email.com" 
            {...form.getInputProps('username')} 
            size="md"
            error={formError !== null}
          />
          <PasswordInput 
            label="Password" 
            placeholder="Your password" 
            {...form.getInputProps('password')} 
            mt="md" 
            size="md" 
            error={formError}
          />
          <Button fullWidth mt="xl" size="md" type='submit'>
            Sign in
          </Button>
        </form>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{' '}
          <Anchor<'a'> href="/register" fw={700} onClick={(event) => {}}>
            Register
          </Anchor>
					 {' '}or{' '}
					<Anchor<'a'> href="/password/forgot" fw={700} c="dimmed" onClick={(event) => {}}>
            Forgot password
          </Anchor>
        </Text>

        <Text ta="center" mt="xl" c="dimmed" size="xs">
          By clicking sign in with Google or Facebook. you agree to {' '}
          <Text td="underline" span style={{"cursor": "pointer"}} onClick={() => termsOfUseOpenHandler.open()}>Term of Use</Text> {' '}and{' '}
          <Text td="underline" span style={{"cursor": "pointer"}} onClick={() => policyOpenHandler.open()}>Privacy Policy</Text>.
          We may send you communications. you may change your preference in your account setting.
          We'll never post without your permission.
        </Text>
      </Paper>
      <PolicyModal opened={policyOpened} close={policyOpenHandler.close}/>
			<TermsOfUseModal opened={termsOfUseOpened} close={termsOfUseOpenHandler.close}/>
    </div>
  );
}