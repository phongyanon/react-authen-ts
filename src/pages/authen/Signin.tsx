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
	Divider
} from '@mantine/core';
import {
	IconBrandGoogle,
	IconBrandFacebook
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import classes from './Signin.module.css';
import PolicyModal from '../../components/policy/Policy';
import TermsOfUseModal from '../../components/policy/TermsOfUse';

export function Signin() {
  const [policyOpened, policyOpenHandler] = useDisclosure(false);
	const [termsOfUseOpened, termsOfUseOpenHandler] = useDisclosure(false);
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back, Sign in with
        </Title>

				<Group grow mb="md" mt="md">
					<Button variant="light" radius="xl" leftSection={<IconBrandGoogle size={20}/>}>Google</Button>
					<Button variant="light" radius="xl" leftSection={<IconBrandFacebook size={20}/>}>Facebook</Button>
      	</Group>

      	<Divider label="Or continue with email" labelPosition="center" my="lg" />

        <TextInput label="Email address" placeholder="hello@gmail.com" size="md" />
        <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" />
        <Checkbox label="Keep me sign in" mt="xl" size="md" />
        <Button fullWidth mt="xl" size="md">
          Sign in
        </Button>

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