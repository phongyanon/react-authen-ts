import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { 
	Paper, 
	TextInput, 
	Box, 
	Group, 
	Title, 
	Center, 
	Button,
  Text,
	Container, 
	Anchor,
	rem,
	Select,
	Textarea,
	Divider,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { 
	IconArrowLeft,
	IconUserPlus
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import '@mantine/dates/styles.css';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { userState, registerState } from '../../../store/user';
import { dateParser } from '../../../utils/date';
import PolicyModal from '../../../components/policy/Policy';
import TermsOfUseModal from '../../../components/policy/TermsOfUse';
import { registerProfile } from '../../../services/user';

export function ProfileForm() {
	const navigate = useNavigate();
	const user = useRecoilValue(userState);
	const getRegisterState = useRecoilValue(registerState);
	const [otherGenderVisible, setOtherGenderVisible] = useState<boolean>(false);
	const [policyOpened, policyOpenHandler] = useDisclosure(false);
	const [loading, loadingHandler] = useDisclosure(false);
	const [termsOfUseOpened, termsOfUseOpenHandler] = useDisclosure(false);
	const [errorText, setErrorText] = useState<string | null>(null);
  const form = useForm({
    initialValues: {
			first_name_EN: '',
			last_name_EN: '',
			first_name_TH: '',
			last_name_TH: '',
			date_of_birth: '',
			gender: '',
			// other_gender: '',
			address_EN: '',
			address_TH: '',
			zip_code: '',
			phone: ''
    },
    validate: {
			zip_code: (value: any) => (
				value !== '' ? (/^([0-9])/.test(value)? null : 'Enter in type number') : null
			),
		},
  });

	const profileFormHandler = async () => {
		const storage_token: string | null = localStorage.getItem('access_token');
		let access_token: string = '';
		let uid: string = '';

		console.log('getRegisterState: ', getRegisterState);
		console.log('storage_token: ', storage_token);

		if (storage_token !== null) access_token = storage_token;
		else if (getRegisterState?.access_token) access_token = getRegisterState?.access_token;
		if (user) uid = user.uid;
		else if (getRegisterState?.uid) uid = getRegisterState?.uid;

		const profile_data = {
			...form.values, 
			date_of_birth: parseInt(form.values.date_of_birth.valueOf()) / 1000,
			zip_code: parseInt(form.values.zip_code),
			image_profile: '',
			user_id: uid
		}

		loadingHandler.toggle();
		console.log(profile_data);
		
		let result = await registerProfile(profile_data, access_token);
		loadingHandler.close()

		if (result.error){
			setErrorText(result.error);
		} else {
			navigate("/register/image/profile");
		}
	}

	return (
		<Container size={860} my={30}>
			<Center pb={12}><Title order={1}>Profile</Title></Center>
			<Text c="dimmed" fz="sm" ta="center">
        Account profile
      </Text>

			<Paper p={36} mt={16} shadow="md" radius="md" withBorder>

				<form onSubmit={form.onSubmit(() => profileFormHandler())}>
					<Box maw={340} mx="auto">
						<TextInput name="first_name_EN" label="First name" placeholder="Firstname" {...form.getInputProps('first_name_EN')} required/>
						<TextInput name="last_name_EN" mt="md" label="Last name" placeholder="Lastname" {...form.getInputProps('last_name_EN')} required/>
						<DateInput
							name="date_of_birth"
							dateParser={dateParser}
							mt="md"
							valueFormat="DD/MM/YYYY"
							label="Date of birth"
							placeholder="DD/MM/YYYY"
							{...form.getInputProps('date_of_birth')}
							required
							clearable 
						/>
						<Group justify="space-between" mt="lg">
							<Select
								w={120}
								label="Gender"
								placeholder="Gender"
								name="gender"
								data={[
									{ value: 'male', label: 'Male' },
									{ value: 'female', label: 'Female' },
									{ value: 'other', label: 'Other' }
								]}
								{...form.getInputProps('gender')}
								defaultValue=''
								// onOptionSubmit={(value: any) => {value !== 'other' ? setOtherGenderVisible(false): setOtherGenderVisible(true)}}
								clearable
							/>
							{otherGenderVisible === true ?
								<></>
								// <TextInput name="other_gender" label="Other" placeholder="Gender" {...form.getInputProps('other_gender')}/>							
							: <></>}
						</Group>
						<Textarea
							name="address_EN"
							placeholder="Address"
							label="Address"
							autosize
							minRows={2}
							mt="md"
							{...form.getInputProps('address_EN')}
						/>
						<TextInput w={120} mt="md" name="zip_code" label="Zip code" placeholder="Zip code" {...form.getInputProps('zip_code')}/>							
						<TextInput mt="md" name="phone" label="Phone number" placeholder="Phone number" {...form.getInputProps('phone')}/>							
						
						<Divider mt="md" my="xs" label="Infomation in thai" labelPosition="center" />

						<TextInput name="first_name_TH" label="First name in thai" placeholder="Firstname in thai" {...form.getInputProps('first_name_TH')}/>
						<TextInput name="last_name_TH" mt="md" label="Last name in thai" placeholder="Lastname in thai" {...form.getInputProps('last_name_TH')}/>
						<Textarea
							name="address_TH"
							placeholder="Address in thai"
							label="Address in thai"
							autosize
							minRows={2}
							mt="md"
							{...form.getInputProps('address_TH')}
						/>
						<Text ta="center" mt="xl" c="dimmed" size="xs">
							By clicking Continue. you agree to {' '}
							<Text td="underline" span style={{"cursor": "pointer"}} onClick={() => termsOfUseOpenHandler.open()}>Term of Use</Text> {' '}and{' '}
							<Text td="underline" span style={{"cursor": "pointer"}} onClick={() => policyOpenHandler.open()}>Privacy Policy</Text>.
							We may send you communications. you may change your preference in your account setting.
							We'll never post without your permission.
						</Text>
						<Group justify="space-around" mt="lg" grow>
							<Button type="submit" leftSection={<IconUserPlus size={20}/>} loading={loading}>
								Continue
							</Button>
						</Group>
						{errorText !== null ? 
							<Group justify="center" p={12} gap={"xs"}>
								<Text c="red" fz="sm" ta="center">{errorText}</Text>
							</Group>
							: <></>}
						<Group justify="center" p={12} gap={"xs"}>
							<Text c="dimmed" fz="sm" ta="center">
								Already have an account then {' '}
							</Text>
							<Anchor c="blue" size="sm" onClick={() => navigate(-1)}>
								<Center inline>
									<IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
									<Box ml={5}>Back</Box>
								</Center>
							</Anchor>
						</Group>
					</Box>
				</form>

			</Paper>
			<PolicyModal opened={policyOpened} close={policyOpenHandler.close}/>
			<TermsOfUseModal opened={termsOfUseOpened} close={termsOfUseOpenHandler.close}/>
		</Container>
	)
}