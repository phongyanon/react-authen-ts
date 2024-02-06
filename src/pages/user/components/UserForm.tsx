import { useState, useEffect } from 'react';
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
	Anchor,
	Select
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { anchorState } from '../../../store/user';
import { getRoles, getRolesByUserId } from '../../../services/role';
import { addUser } from '../../../services/user';
import { IAddUser, ISignUpResp } from '../../../types/user.type';

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
	const [roleOption, setRoleOption] = useState([]);

	const handleSubmit = async (formValues: IAddUser) => {
		console.log(formValues); // ISignUpResp
		try {
			// let user_result = await addUser({
			// 	username: formValues.username,
			// 	password: formValues.password,
			// 	email: formValues.email
			// });
			// if (user_result === false) throw 'Unsuccessfully addUser';
			
			// let userRole_result = await getUserRoleByUserId(user_result.id);
			// if (userRole_result === null) throw 'Unsuccessfully getUserRoleByUserId';
			// if (formValues.role && (userRole_result.length > 0)) {
				// let userRole =  userRole_result[0];
				// let userRole_updated = await updateUserRole({
					// id: userRole.id,
					// user_id: user_result.id
					// role_id: formValues.role
				// }); 
				// if (userRole_updated === false) throw 'Unsuccessfully updateUserRole';
			// }

		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		getRoles().then((res: any) => {
			let options = res.map((obj: any) => ({value: obj.id.toString(), label: obj.name}));
			setRoleOption(options);
		}).catch(err => console.log(err));
	}, []);

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
			<form onSubmit={form.onSubmit(() => {handleSubmit(form.values)})}>
				<Box maw={340} mx="auto">
					<TextInput name="username" label="Username" placeholder="Username" {...form.getInputProps('username')} />
					<TextInput name="email" mt="md" label="Email" placeholder="Email" {...form.getInputProps('email')} />
					<PasswordInput name="password" mt="md" label="Password" placeholder="Password" {...form.getInputProps('password')} />
					<Select
						label="Role"
						name="role"
						placeholder="Pick role"
						data={roleOption}
						mt="md"
						{...form.getInputProps('role')}
					/>
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