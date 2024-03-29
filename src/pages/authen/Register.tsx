import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { 
	Paper, 
	TextInput, 
	Box, 
	PasswordInput, 
	Group, 
	Title, 
	Center, 
	Button, 
	Container, 
	Text,
	rem,
	LoadingOverlay,
	Anchor
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { 
	IconArrowLeft,
	IconUserPlus
} from '@tabler/icons-react';
import { registerUser } from '../../services/user';
import { getCurrentUser } from '../../services/user';
import { signin } from '../../services/authen';
import { useNavigate } from 'react-router-dom';
import { userState, registerState } from '../../store/user';
import { useTranslation } from 'react-i18next';

export function Register(){
	const [currentUser, setCurrentUser] = useRecoilState(userState);
	const [_, setRegisterState] = useRecoilState(registerState);
	const [formError, setFormError] = useState<boolean>(false);
	const [loaderVisible, loaderHandler ] = useDisclosure(false);
	const navigate = useNavigate();
	const { t } = useTranslation();
  const form = useForm({
    initialValues: {
      // username: '',
      email: '',
      password: ''
    },
    validate: {
      // username: (value) => value.trim().length < 2 ? 'Username should more than 2 characters' : null,
      email: (value) => !/^\S+@\S+$/.test(value) ? 'Email should contain @' : null,
      password: (value) => (
				!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) ? 
					'Password must contain minimum eight characters, at least one letter and one number': null
			),
    },
  });

	const getTokenAfterRegister = (username: string, password: string) => {
		return new Promise( async resolve => {
			try {
				const signin_result = await signin({username: username, password: password});
				// localStorage.setItem('access_token', signin_result.access_token);
				// localStorage.setItem('refresh_token', signin_result.refresh_token);
				// const user_result = await getCurrentUser();

				// if (user_result !== null) {
				// 	console.log('>> ', user_result)
				// 	setCurrentUser(user_result);
				// 	resolve(true);
				// } else resolve(false);
				resolve({access_token: signin_result.access_token, refresh_token: signin_result.refresh_token});
			} catch (err) {
				resolve(false);
			}
		});
	}

	const registerUserHandler = async () => {
		// console.log(form.values);
		try {
		
			loaderHandler.toggle();
			let result = await registerUser(form.values);
			if (result.error === 'Duplicated username or email'){
				setFormError(true);
				loaderHandler.close();
			} else {
				const token_result: any = await getTokenAfterRegister(form.values.email, form.values.password);
				loaderHandler.close();
				if (token_result !== false) {
					setRegisterState({
						uid: result.id,
						email: form.values.email,
						access_token: token_result.access_token,
						refresh_token: token_result.refresh_token,
					})
					navigate("/register/profile");
				} 
			}

		} catch (error) {
			loaderHandler.close();
			console.log(error);
		}
	}

	return (
		<Container size={460} my={30}>	
			<Center pb={12}><Title order={1}>{t('Sign up')}</Title></Center>
			<Text c="dimmed" fz="sm" ta="center">
        {t('Register to create your account')}
      </Text>
			
			
			<Paper withBorder shadow="md" p={30} radius="md" mt="xl">
				<LoadingOverlay
          visible={loaderVisible}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'violet', type: 'bars' }}
        />
				<form onSubmit={form.onSubmit(() => registerUserHandler())}>
					<Box maw={340} mx="auto">
						<TextInput 
							name="email" 
							mt="md" 
							label={t("Email")} 
							placeholder="Email" 
							{...form.getInputProps('email')} 
							required  
							error={formError}
						/>
						<PasswordInput 
							name="password" 
							mt="md" 
							label={t("Password" )}
							placeholder="Password" 
							{...form.getInputProps('password')} 
							required  
							error={formError ? "Duplicated username or email": formError}
						/>
						
						<Group justify="space-around" mt="lg" grow>
							<Button type="submit" leftSection={<IconUserPlus size={20}/>}>
								{t("Sign up")}
							</Button>
						</Group>
						<Group justify="center" p={12} gap={"xs"}>
							<Text c="dimmed" fz="sm" ta="center">
								{t('Already have an account then ')}{' '}
							</Text>
							<Anchor href="/signin" c="blue" size="sm">
								<Center inline>
									<IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
									<Box ml={5}>{t('Login')}</Box>
								</Center>
							</Anchor>
						</Group>
						
						
					</Box>
				</form>

			</Paper>
		</Container>	
	)
}