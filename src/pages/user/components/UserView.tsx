import React, {useEffect, useState} from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { anchorState } from '../../../store/user';
import { getUser } from '../../../services/user';
import { IUser } from '../../../types/user.type'

const UserView: React.FC = () => {
	const [anchor, setAnchor] = useRecoilState(anchorState);
	const navigate = useNavigate();
	let { user_id } = useParams();
	const [data, setData] = useState<IUser | null>(null);

	useEffect(() => {
		console.log('user_id: ', user_id);
		if (user_id){
			getUser(user_id).then((res: IUser) => {
				setData(res);
			}).catch(err => console.log(err))
		}
	}, [])

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

			<Center pb={12}><Title order={3}>User Info</Title></Center>
			<Box maw={340} mx="auto">
			<Table withRowBorders={false}>
				<Table.Tbody>
					<Table.Tr key={'username'}>
						<Table.Td ta="end" fw="bold" c="dimmed">Username : </Table.Td>
						<Table.Td>{data?.username}</Table.Td>
					</Table.Tr>
					<Table.Tr key={'Email'}>
						<Table.Td ta="end" fw="bold" c="dimmed">Email : </Table.Td>
						<Table.Td>{data?.email}</Table.Td>
					</Table.Tr>
					<Table.Tr key={'password'}>
						<Table.Td ta="end" fw="bold" c="dimmed">Password : </Table.Td>
						<Table.Td>**** ****</Table.Td>
					</Table.Tr>
					<Table.Tr key={'role'}>
						<Table.Td ta="end" fw="bold" c="dimmed">Role : </Table.Td>
						<Table.Td>User (Mock role)</Table.Td>
					</Table.Tr>
					<Table.Tr key={'status'}>
						<Table.Td ta="end" fw="bold" c="dimmed">Status : </Table.Td>
						<Table.Td>{data?.status}</Table.Td>
					</Table.Tr>
					</Table.Tbody>
				</Table>
				<Group justify="center" mt="xl">
						<Button variant="outline" onClick={() => {
							setAnchor([{title: 'User', href: '/users'}])
							navigate("/users")
						}}>
						Back
					</Button>
				</Group>
			</Box>

		</Paper>
		</>
	)
}

export default UserView;