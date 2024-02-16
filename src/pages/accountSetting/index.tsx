import React, {useEffect, useState} from 'react';
import { 
	Paper, 
	Box, 
	Group, 
	Title, 
	Center, 
	Button, 
	Switch,
	Table,
	ThemeIcon
} from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
// import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState, verifyState } from '../../store/user';
import { IVerification } from '../../types/verification.type';
import { IUserInfo } from '../../types/user.type';
import { requestVerifyEmail } from '../../services/authen';
import { notifyProcessSuccess, notifyProcessFailed } from '../../utils/notification';

const AccountSetting: React.FC = () => {
	// const navigate = useNavigate();
	const [checked, setChecked] = useState(false);
	const currentUser = useRecoilValue(userState);
	const currentVerify = useRecoilValue(verifyState);
	const [data, setData] = useState<IVerification | null>(null);
	const [userData, setUserData] = useState<IUserInfo | null>(null);
	const [resendLoading, setResendLoading] = useState<boolean>(false);

	const handleResendVerifyEmail = async () => {
		console.log(userData);
		setResendLoading(true);
		try {
			if (userData){
				await requestVerifyEmail(userData?.email);
				setResendLoading(false);
				notifyProcessSuccess();
			} else {
				throw 'userData is not ready'
			}
		} catch (err) {
			setResendLoading(false);
			notifyProcessFailed();
			console.log(err);
		}
	}

	useEffect(() => {
		if (currentUser && currentVerify) {
			setData(currentVerify);
			setUserData(currentUser);
		}
	}, [])

	return (
		<>
		
		<Paper p={36} mt={16} shadow="md" radius="md" withBorder>

			<Center pb={12}><Title order={3}>Account setting</Title></Center>
			<Box maw={540} mx="auto">
			<Table withRowBorders={false}>
				<Table.Tbody>
					<Table.Tr key={'username'}>
						<Table.Td ta="end" fw="bold" c="dimmed">User : </Table.Td>
						<Table.Td>{userData?.username}</Table.Td>
					</Table.Tr>
					<Table.Tr key={'email_verified'}>
						<Table.Td ta="end" fw="bold" c="dimmed">Email verified : </Table.Td>
						<Table.Td w={300}>
							<Group>
								{data?.email_verified ? 
								<ThemeIcon variant="light" radius="xl" color="teal">
									<IconCheck style={{ width: '70%', height: '70%' }} />
								</ThemeIcon>
								:
								<ThemeIcon variant="light" radius="xl" color="red">
									<IconX style={{ width: '70%', height: '70%' }} />
								</ThemeIcon>}
								<Button 
									loading={resendLoading} 
									onClick={() => handleResendVerifyEmail()}
									loaderProps={{ type: 'dots' }}
								>Resend verify email</Button>
							</Group>
						</Table.Td>
					</Table.Tr>
					<Table.Tr key={'enable_opt'}>
						<Table.Td ta="end" fw="bold" c="dimmed">Enable OTP : </Table.Td>
						<Table.Td>
							<Group>
								{data?.enable_opt ? 
								<ThemeIcon variant="light" radius="xl" color="teal">
									<IconCheck style={{ width: '70%', height: '70%' }} />
								</ThemeIcon>
								:
								<ThemeIcon variant="light" radius="xl" color="red">
									<IconX style={{ width: '70%', height: '70%' }} />
								</ThemeIcon>}
								<Button>Setup 2FA</Button>
								{/* otpauth://totp/MyAuthenBoss:phongyanon@gmail.com?secret=xxx&issuer=MyAuthenBoss&digits=6&period=60 */}
								<Button disabled>Disable 2FA</Button>
							</Group>
						</Table.Td>
					</Table.Tr>
					<Table.Tr key={'otp_verified'}>
						<Table.Td ta="end" fw="bold" c="dimmed">OTP verified : </Table.Td>
						<Table.Td>
							<Group>
								{data?.otp_verified ? 
								<ThemeIcon variant="light" radius="xl" color="teal">
									<IconCheck style={{ width: '70%', height: '70%' }} />
								</ThemeIcon>
								:
								<ThemeIcon variant="light" radius="xl" color="red">
									<IconX style={{ width: '70%', height: '70%' }} />
								</ThemeIcon>}
								<Button>Verify OTP</Button>
							</Group>
						</Table.Td>
					</Table.Tr>
					</Table.Tbody>
				</Table>
			</Box>

		</Paper>
		</>
	)
}

export default AccountSetting;