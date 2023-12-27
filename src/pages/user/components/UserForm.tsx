import { 
	Paper, 
	TextInput, 
	Box, 
	PasswordInput, 
	Group, 
	Title, 
	Center, 
	Button, 
	Breadcrumbs, 
	Anchor 
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { anchorState } from '../../../store/user';

const UserForm: React.FC = () => {
	const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      username: '',
      email: '',
      password: ''
    },
    validate: {
      username: (value) => value.trim().length < 2 ? 'Username should more than 2 characters' : null,
      email: (value) => !/^\S+@\S+$/.test(value) ? 'Email should contain @' : null,
      password: (value) => (
				!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) ? 
					'Password must contain minimum eight characters, at least one letter and one number': null
			),
    },
  });
	const [anchor, setAnchor] = useRecoilState(anchorState);

	return (
		<>
		<Group justify="space-between" pl={6} pt={16} pb={12}>
			<Breadcrumbs>
				{
					anchor.map((item, index) => (
						<Anchor key={index} onClick={() => {
							setAnchor(anchor.slice(0, index+1))
							navigate(item.href)
						}}>
							{item.title}
						</Anchor>
						))
				}
			</Breadcrumbs>
		</Group>
		
		<Paper p={36} mt={16} shadow="md" radius="md" withBorder>

			<Center pb={12}><Title order={3}>New User</Title></Center>
			<form onSubmit={form.onSubmit(() => {console.log(form.values)})}>
				<Box maw={340} mx="auto">
					<TextInput name="username" label="Username" placeholder="Username" {...form.getInputProps('username')} />
					<TextInput name="email" mt="md" label="Email" placeholder="Email" {...form.getInputProps('email')} />
					<PasswordInput name="password" mt="md" label="Password" placeholder="Password" {...form.getInputProps('password')} />
					<Group justify="center" mt="xl">
						<Button type="submit">
							Add user
						</Button>
						<Button variant="outline" onClick={() => {
							setAnchor([{title: 'User', href: '/users'}])
							navigate("/users")
						}}>
							Cancel
						</Button>
					</Group>
				</Box>
			</form>

		</Paper>
		</>
	)
}

export default UserForm;