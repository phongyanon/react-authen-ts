import { useState } from 'react';
import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
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
import classes from './Signin.module.css';
import PolicyModal from '../../components/policy/Policy';
import TermsOfUseModal from '../../components/policy/TermsOfUse';
import { signin } from '../../services/authen';
import { ISigninForm } from '../../types/authen.type';

export function Signin() {
  const [policyOpened, policyOpenHandler] = useDisclosure(false);
	const [termsOfUseOpened, termsOfUseOpenHandler] = useDisclosure(false);
  const [loaderVisible, loaderHandler ] = useDisclosure(false);
  const [formError, setFormError] = useState<boolean>(false);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      keepSignin: false,
    }}
  )
  
  const signinSubmit = (values: ISigninForm) => {
    // console.log(values);
    // loaderHandler.toggle();
    // setTimeout(() => loaderHandler.close(), 1000);
    let result = signin({username: values.username, password: values.password});
    console.log(result);
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
            placeholder="hello@gmail.com" 
            {...form.getInputProps('username')} 
            size="md"
            error={formError}
          />
          <PasswordInput 
            label="Password" 
            placeholder="Your password" 
            {...form.getInputProps('password')} 
            mt="md" 
            size="md" 
            error={formError ? "Invalid username or password": formError}
          />
          <Checkbox label="Keep me sign in" mt="xl" size="md" {...form.getInputProps('keepSignin', { type: 'checkbox' })} />
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