import React, {useEffect, useState} from 'react';
import { 
	Paper, 
	Group, 
	Title, 
	Center, 
	Button, 
	ThemeIcon, 
	Container,
	LoadingOverlay,
	Text
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { verifyState } from '../../store/user';
import { verifyEmail } from '../../services/authen';

const VerifyEmail: React.FC = () => {
	const navigate = useNavigate();
	const { user_id } = useParams();
	const { token } = useParams();
	const [loading, loadingHandler] = useDisclosure(true);
	const [currentVerify, setCurrentVerify] = useRecoilState(verifyState);
	const [success, setSuccess] = useState<boolean>(false);

	useEffect(() => {
		if (user_id && token) {
			verifyEmail(user_id, token).then(() => {
				setSuccess(true);
				if (currentVerify) setCurrentVerify({...currentVerify, email_verified: true})
				loadingHandler.close()
			}).catch(err => {
				loadingHandler.close();
				console.log(err)
			});
		}
	}, [])

	return (
		<>
		<Container size={460} my={30}>
			<Center pb={12}><Title order={3}>Verify email</Title></Center>
			<Paper p={36} mt={16} shadow="md" radius="md" withBorder>
				<LoadingOverlay 
					visible={loading}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'violet', type: 'dots' }}
					pos={"fixed"}
				/>
				<Group justify='center' style={{"flexDirection": "column"}}>
					{success ? 
					<>
					<ThemeIcon radius={'50%'} color="teal" size={80}>
						<IconCheck style={{ width: '70%', height: '70%' }} />
					</ThemeIcon>
					<Text mt={'md'}>
						Successfully verify email.
					</Text>
					</>
					:
					<>
					<ThemeIcon radius={'50%'} color="red" size={80}>
						<IconX style={{ width: '70%', height: '70%' }} />
					</ThemeIcon>
					<Text mt={'md'}>
						Unsuccessfully verify email.
					</Text>
					</>
					}
					
					<Button color="gray" variant="outline" onClick={() => navigate('/')}>Back to home page</Button>
				</Group>

			</Paper>
		</Container>
		</>
	)
}

export default VerifyEmail;