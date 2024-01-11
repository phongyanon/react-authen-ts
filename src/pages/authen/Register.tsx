import { useRecoilState } from 'recoil';
import { 
	Paper, 
	TextInput, 
	Box, 
	PasswordInput, 
	Group, 
	Title, 
	Center, 
	Button, 
	Container, 
	Text,
	rem,
	Anchor
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { 
	IconArrowLeft,
	IconUserPlus
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { userFormState } from '../../store/user';

export function Register(){
	const [_, setUserForm] = useRecoilState(userFormState);
	const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      // username: '',
      email: '',
      password: ''
    },
    validate: {
      // username: (value) => value.trim().length < 2 ? 'Username should more than 2 characters' : null,
      email: (value) => !/^\S+@\S+$/.test(value) ? 'Email should contain @' : null,
      password: (value) => (
				!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) ? 
					'Password must contain minimum eight characters, at least one letter and one number': null
			),
    },
  });

	const registerUserHandler = () => {
		console.log(form.values);
		setUserForm(form.values);
		navigate("/register/profile");
	}

	return (
		<Container size={460} my={30}>	
			<Center pb={12}><Title order={1}>Sign up</Title></Center>
			<Text c="dimmed" fz="sm" ta="center">
        Register to create your account
      </Text>
			
			
			<Paper withBorder shadow="md" p={30} radius="md" mt="xl">

				<form onSubmit={form.onSubmit(() => registerUserHandler())}>
					<Box maw={340} mx="auto">
						<TextInput name="email" mt="md" label="Email" placeholder="Email" {...form.getInputProps('email')} required  />
						<PasswordInput name="password" mt="md" label="Password" placeholder="Password" {...form.getInputProps('password')} required  />
						
						<Group justify="space-around" mt="lg" grow>
							<Button type="submit" leftSection={<IconUserPlus size={20}/>}>
								Sign up
							</Button>
						</Group>
						<Group justify="center" p={12} gap={"xs"}>
							<Text c="dimmed" fz="sm" ta="center">
								Already have an account then {' '}
							</Text>
							<Anchor href="/signin" c="blue" size="sm">
								<Center inline>
									<IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
									<Box ml={5}>Login</Box>
								</Center>
							</Anchor>
						</Group>
						
						
					</Box>
				</form>

			</Paper>
		</Container>	
	)
}