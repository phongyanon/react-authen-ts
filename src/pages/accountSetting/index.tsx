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
import { useDisclosure } from '@mantine/hooks';
import { IconCheck, IconX } from '@tabler/icons-react';
// import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState, verifyState } from '../../store/user';
import { IVerification } from '../../types/verification.type';
import { IUserInfo } from '../../types/user.type';
import { requestVerifyEmail } from '../../services/authen';
import { notifyProcessSuccess, notifyProcessFailed } from '../../utils/notification';
import Setup2faModal from './components/Setup2faModal';
import Disable2faModal from './components/Disable2faModal';
import { generateTOTP } from '../../services/totp';

const AccountSetting: React.FC = () => {
	// const navigate = useNavigate();
	const currentUser = useRecoilValue(userState);
	const currentVerify = useRecoilValue(verifyState);
	const [data, setData] = useState<IVerification | null>(null);
	const [userData, setUserData] = useState<IUserInfo | null>(null);
	const [resendLoading, setResendLoading] = useState<boolean>(false);
	const [setup2faLoading, setSetup2faLoading] = useState<boolean>(false);
	const [setup2faOpened, setup2faHandlers] = useDisclosure(false);
	const [disable2faOpened, disable2faHandlers] = useDisclosure(false);
	const [userId, setUserId] = useState<string>('');
	const [otpAuthUrl, setOtpAuthUrl] = useState<string>('');
	const [base32, setBase32] = useState<string>('');
	const [is2faEnable, setIs2faEnable] = useState<boolean>(false);
	

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

	const setUp2fa = async () => {
		setSetup2faLoading(true);
		try {
			let res = await generateTOTP(userId);
			// otpauth://totp/MyAuthenBoss:phongyanon@gmail.com?secret=xxx&issuer=MyAuthenBoss&digits=6&period=60
			setOtpAuthUrl(`otpauth://totp/StartUp:phongyanon@gmail.com?secret=${res.base32}&issuer=StartUp&digits=6&period=60`);
			setBase32(res.base32);
			setup2faHandlers.open();
			setSetup2faLoading(false);
		} catch (err) {
			setSetup2faLoading(false);
			console.log(err);
		}
	}

	useEffect(() => {
		if (currentUser && currentVerify) {
			setData(currentVerify);
			setUserData(currentUser);
			setUserId(currentUser.uid);
			if (currentVerify.enable_opt) {
				setIs2faEnable(true);
			}
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
								{is2faEnable ? 
								<ThemeIcon variant="light" radius="xl" color="teal">
									<IconCheck style={{ width: '70%', height: '70%' }} />
								</ThemeIcon>
								:
								<ThemeIcon variant="light" radius="xl" color="red">
									<IconX style={{ width: '70%', height: '70%' }} />
								</ThemeIcon>}
								<Button loading={setup2faLoading} onClick={() => setUp2fa()} disabled={is2faEnable}>Setup 2FA</Button>
								<Button onClick={() => disable2faHandlers.open()} disabled={!is2faEnable}>Disable 2FA</Button>
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
							</Group>
						</Table.Td>
					</Table.Tr>
					</Table.Tbody>
				</Table>
			</Box>

		</Paper>
		<Setup2faModal 
			opened={setup2faOpened} 
			close={setup2faHandlers.close} 
			record_id={userId} 
			otp_auth_url={otpAuthUrl} 
			base32={base32}
			setIs2faEnable={setIs2faEnable}
		/>
		<Disable2faModal 
			opened={disable2faOpened} 
			close={disable2faHandlers.close} 
			record_id={userId}
			setIs2faEnable={setIs2faEnable}
		/>
		</>
	)
}

export default AccountSetting;