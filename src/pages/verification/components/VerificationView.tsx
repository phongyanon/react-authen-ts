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
	Table,
	ThemeIcon
} from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { anchorState } from '../../../store/user';
import { getVerification } from '../../../services/verification';
import { getUser } from '../../../services/user';
import { IVerification } from '../../../types/verification.type';
import { IUser } from '../../../types/user.type';

const VerificationView: React.FC = () => {
	const [anchor, setAnchor] = useRecoilState(anchorState);
	const navigate = useNavigate();
	let { record_id } = useParams();
	const [data, setData] = useState<IVerification | null>(null);
	const [userData, setUserData] = useState<IUser | null>(null);

	useEffect(() => {
		if (record_id){
			getVerification(record_id).then((res: any) => {
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

			<Center pb={12}><Title order={3}>Verification Info</Title></Center>
			<Box maw={240} mx="auto">
			<Table withRowBorders={false}>
				<Table.Tbody>
					<Table.Tr key={'username'}>
						<Table.Td ta="end" fw="bold" c="dimmed">User : </Table.Td>
						<Table.Td>{userData?.username}</Table.Td>
					</Table.Tr>
					<Table.Tr key={'email_verified'}>
						<Table.Td ta="end" fw="bold" c="dimmed">Email verified : </Table.Td>
						<Table.Td w={120}>
							{data?.email_verified ? 
							<ThemeIcon variant="light" radius="xl" color="teal">
								<IconCheck style={{ width: '70%', height: '70%' }} />
							</ThemeIcon>
							:
							<ThemeIcon variant="light" radius="xl" color="red">
								<IconX style={{ width: '70%', height: '70%' }} />
							</ThemeIcon>}
						</Table.Td>
					</Table.Tr>
					<Table.Tr key={'enable_opt'}>
						<Table.Td ta="end" fw="bold" c="dimmed">Enable OTP : </Table.Td>
						<Table.Td>{data?.enable_opt ? 
							<ThemeIcon variant="light" radius="xl" color="teal">
								<IconCheck style={{ width: '70%', height: '70%' }} />
							</ThemeIcon>
							:
							<ThemeIcon variant="light" radius="xl" color="red">
								<IconX style={{ width: '70%', height: '70%' }} />
							</ThemeIcon>}
						</Table.Td>
					</Table.Tr>
					<Table.Tr key={'otp_verified'}>
						<Table.Td ta="end" fw="bold" c="dimmed">OTP verified : </Table.Td>
						<Table.Td>{data?.otp_verified ? 
							<ThemeIcon variant="light" radius="xl" color="teal">
								<IconCheck style={{ width: '70%', height: '70%' }} />
							</ThemeIcon>
							:
							<ThemeIcon variant="light" radius="xl" color="red">
								<IconX style={{ width: '70%', height: '70%' }} />
							</ThemeIcon>}
						</Table.Td>
					</Table.Tr>
					</Table.Tbody>
				</Table>
				<Group justify="center" mt="xl">
						<Button variant="outline" onClick={() => {
							setAnchor([{title: 'Verification', href: '/verifications'}])
							navigate("/verifications")
						}}>
						Back
					</Button>
				</Group>
			</Box>

		</Paper>
		</>
	)
}

export default VerificationView;