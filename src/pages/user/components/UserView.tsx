import React from 'react';
import { 
	Paper, 
	Box, 
	Group, 
	Title, 
	Center, 
	Button, 
	Breadcrumbs, 
	Anchor,
	Table
} from '@mantine/core';

const UserView: React.FC = () => {
	const anchor = [
		{ title: 'Users', href: '/users' },
		{ title: 'user_123', href: '/users/user_id' },
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

			<Center pb={12}><Title order={3}>User Info</Title></Center>
			<Box maw={340} mx="auto">
			<Table withRowBorders={false}>
				<Table.Tbody>
					<Table.Tr key={'username'}>
						<Table.Td ta="end" fw="bold" c="dimmed">Username : </Table.Td>
						<Table.Td>Test</Table.Td>
					</Table.Tr>
					<Table.Tr key={'Email'}>
						<Table.Td ta="end" fw="bold" c="dimmed">Email : </Table.Td>
						<Table.Td>Test@email.com</Table.Td>
					</Table.Tr>
					<Table.Tr key={'password'}>
						<Table.Td ta="end" fw="bold" c="dimmed">Password : </Table.Td>
						<Table.Td>**** ****</Table.Td>
					</Table.Tr>
					<Table.Tr key={'role'}>
						<Table.Td ta="end" fw="bold" c="dimmed">Role : </Table.Td>
						<Table.Td>User</Table.Td>
					</Table.Tr>
					<Table.Tr key={'status'}>
						<Table.Td ta="end" fw="bold" c="dimmed">Status : </Table.Td>
						<Table.Td>Active</Table.Td>
					</Table.Tr>
					</Table.Tbody>
				</Table>
				<Group justify="center" mt="xl">
					<Button variant="outline" component="a" href="/users">
						Back
					</Button>
				</Group>
			</Box>

		</Paper>
		</>
	)
}

export default UserView;