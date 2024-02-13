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
import { getProfile } from '../../../services/profile';
import { getUser } from '../../../services/user';
import { IProfile } from '../../../types/profile.type';
import { IUser } from '../../../types/user.type';

const ProfileView: React.FC = () => {
	const [anchor, setAnchor] = useRecoilState(anchorState);
	const navigate = useNavigate();
	let { profile_id } = useParams();
	const [data, setData] = useState<IProfile | null>(null);
	const [userData, setUserData] = useState<IUser | null>(null);

	useEffect(() => {
		if (profile_id){
			getProfile(profile_id).then((res: any) => {
				setData(res);
				return getUser(res.user_id)
			}).then((res: any) => {
				setUserData(res)
			}).catch(err => console.log(err));
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
					<Table.Tr key={'full_name_EN'}>
						<Table.Td ta="end" fw="bold" c="dimmed">Name : </Table.Td>
						<Table.Td>{data?.first_name_EN}{'  '}{data?.last_name_EN}</Table.Td>
					</Table.Tr>
					<Table.Tr key={'full_name_TH'}>
						<Table.Td ta="end" fw="bold" c="dimmed">Name in thai : </Table.Td>
						<Table.Td>{data?.first_name_TH}{'  '}{data?.last_name_TH}</Table.Td>
					</Table.Tr>
					<Table.Tr key={'user_id'}>
						<Table.Td ta="end" fw="bold" c="dimmed">User : </Table.Td>
						<Table.Td>{userData?.username}</Table.Td>
					</Table.Tr>
					<Table.Tr key={'date_of_birth'}>
						<Table.Td ta="end" fw="bold" c="dimmed">Date of birth : </Table.Td>
						<Table.Td>{data?.date_of_birth}</Table.Td>
					</Table.Tr>
					<Table.Tr key={'gender'}>
						<Table.Td ta="end" fw="bold" c="dimmed">Gender : </Table.Td>
						<Table.Td>{data?.gender}</Table.Td>
					</Table.Tr>
					<Table.Tr key={'address_EN'}>
						<Table.Td ta="end" fw="bold" c="dimmed">Address : </Table.Td>
						<Table.Td>{data?.address_EN}</Table.Td>
					</Table.Tr>
					<Table.Tr key={'address_TH'}>
						<Table.Td ta="end" fw="bold" c="dimmed">Address in thai: </Table.Td>
						<Table.Td>{data?.address_TH}</Table.Td>
					</Table.Tr>
					<Table.Tr key={'zip_code'}>
						<Table.Td ta="end" fw="bold" c="dimmed">Zip code: </Table.Td>
						<Table.Td>{data?.zip_code}</Table.Td>
					</Table.Tr>
					<Table.Tr key={'phone'}>
						<Table.Td ta="end" fw="bold" c="dimmed">Phone: </Table.Td>
						<Table.Td>{data?.phone}</Table.Td>
					</Table.Tr>
					</Table.Tbody>
				</Table>
				<Group justify="center" mt="xl">
						<Button variant="outline" onClick={() => {
							setAnchor([{title: 'Profile', href: '/profiles'}])
							navigate("/profiles")
						}}>
						Back
					</Button>
				</Group>
			</Box>

		</Paper>
		</>
	)
}

export default ProfileView;