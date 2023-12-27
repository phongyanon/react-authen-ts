import React, { useState } from 'react';
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
	Select, 
	Switch,
	Text
} from '@mantine/core';
import { useForm } from '@mantine/form';

const EditUserForm: React.FC = () => {
	const [userStatus, setUserStatus] = useState(true);
  const form = useForm({
    initialValues: {
      username: 'test',
      email: 'test@test.com',
      password: 'test1234',
			role: 'User',
			status: userStatus
    },
    validate: {
      username: (value) => value.trim().length < 2 ? 'Username should more than 2 characters' : null,
      email: (value) => !/^\S+@\S+$/.test(value) ? 'Email should contain @' : null,
      password: (value) => (
				!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) ? 
					'Password must contain minimum eight characters, at least one letter and one number': null
			)
    },
  });
	const anchor = [
		{ title: 'Users', href: '/users' },
		{ title: 'Edit', href: '/users/edit' },
	]

	return (
		<>
		<Group justify="space-between" pl={6} pt={16} pb={12}>
			<Breadcrumbs>
				{
					anchor.map((item, index) => (
						<Anchor href={item.href} key={index}>
							{item.title}
						</Anchor>
						))
				}
			</Breadcrumbs>
		</Group>
		
		<Paper p={36} mt={16} shadow="md" radius="md" withBorder>

			<Center pb={12}><Title order={3}>Edit User</Title></Center>
			<form onSubmit={form.onSubmit(() => {console.log(form.values)})}>
				<Box maw={340} mx="auto">
					<TextInput name="username" label="Username" placeholder="Username" {...form.getInputProps('username')} />
					<TextInput name="email" mt="md" label="Email" placeholder="Email" {...form.getInputProps('email')} />
					<PasswordInput name="password" mt="md" label="Password" placeholder="Password" {...form.getInputProps('password')} />
					<Select
						label="Role"
						name="role"
						placeholder="Pick role"
						data={['User', 'Admin', 'SuperAdmin']}
						defaultValue="User"
						mt="md"
						{...form.getInputProps('role')}
					/>
					<Switch
						mt="md"
						name="status"
						labelPosition="right"
						label="Status"
						size="md"
      			radius="xs"
						checked={userStatus}
						onChange={(e) => {
							setUserStatus(e.currentTarget.checked)
							form.setFieldValue('status', e.currentTarget.checked);
						}}
						description={userStatus === true ? <Text size="sm" c="green">Active</Text> : <Text size="sm" c="red">Inactive</Text>}
					/>
					<Group justify="center" mt="xl">
						<Button type="submit">
							Update user
						</Button>
						<Button variant="outline" component="a" href="/users">
							Cancel
						</Button>
					</Group>
				</Box>
			</form>

		</Paper>
		</>
	)
}

export default EditUserForm;