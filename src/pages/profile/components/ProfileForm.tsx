import { useState, useEffect } from 'react';
import { 
	Paper, 
	TextInput, 
	Box, 
	Group, 
	Title, 
	Center, 
	Button, 
	Breadcrumbs, 
	Anchor,
	Select,
	Text,
	LoadingOverlay,
	Textarea,
	Divider
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { notifyAddSuccess, notifyAddFailed, notifyEditSuccess, notifyEditFailed } from '../../../utils/notification';
import { anchorState, userState } from '../../../store/user';
import { dateParser } from '../../../utils/date';
import { getUsers } from '../../../services/user';
import { getProfile, addProfile, updateProfile } from '../../../services/profile';
import { IAddProfile, IUpdateProfile } from '../../../types/profile.type';

const ProfileForm: React.FC = () => {
	const navigate = useNavigate();
	let { profile_id } = useParams();
	const currentUser = useRecoilValue(userState);
	const [anchor, setAnchor] = useRecoilState(anchorState);
	const [userOption, setUserOption] = useState([]);
	const [loading, loadingHandler] = useDisclosure(false);
	const form = useForm({
    initialValues: {
			user_id: '',
			first_name_EN: '',
			last_name_EN: '',
			first_name_TH: '',
			last_name_TH: '',
			date_of_birth: '',
			gender: '',
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

	const handleSubmit = async () => {
		const profile_data = {
			...form.values, 
			date_of_birth: parseInt(form.values.date_of_birth.valueOf()) / 1000,
			zip_code: parseInt(form.values.zip_code),
			image_profile: ''
		}
		if (profile_id) {
			handleSubmitUpdate(profile_data as IUpdateProfile);
		} else {
			handleSubmitAdd(profile_data as IAddProfile);
		} 
	}

	const handleSubmitAdd = async (data: IAddProfile) => {
		loadingHandler.toggle();
		try {
			let result = await addProfile(data);
			if (result === false) throw 'Unsuccessfully addProfile';

			notifyAddSuccess();
			loadingHandler.close();
			setAnchor([{title: 'Profile', href: '/profiles'}]);
			navigate("/profiles");

		} catch (err) {
			loadingHandler.close();
			notifyAddFailed();
			console.log(err);
		}
		
	}

	const handleSubmitUpdate = async (data: IUpdateProfile) => {
		console.log('update:', data)
		loadingHandler.toggle();
		try {
			let result = await updateProfile(data);
			if (result === false) throw 'Unsuccessfully updateProfile';

			notifyEditSuccess();
			loadingHandler.close();
			setAnchor([{title: 'Profile', href: '/profiles'}]);
			navigate("/profiles");

		} catch (err) {
			loadingHandler.close();
			notifyEditFailed();
			console.log(err);
		}
	}

	useEffect(() => {
		getUsers().then((res: any) => {
			let options = res.map((obj: any) => ({value: obj.id.toString(), label: obj.username}));
			setUserOption(options);
		}).catch(err => console.log(err));

		if (profile_id) {
			getProfile(profile_id).then((res: any) => {
				console.log('res: ', res);
			})
		}
	}, []);

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
				<LoadingOverlay
          visible={loading}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'violet', type: 'bars' }}
					pos={"fixed"}
        />
			<Center pb={12}><Title order={3}>{profile_id === undefined ? 'New Profile': 'Edit Profile'}</Title></Center>
			<form onSubmit={form.onSubmit(() => {handleSubmit()})}>
				<Box maw={340} mx="auto">
					<Group justify="space-between">
						<Select
							w={'100%'}
							label="User"
							placeholder="User"
							name="user_id"
							data={userOption}
							{...form.getInputProps('user_id')}
							defaultValue=''
							required
						/>
					</Group>
					<TextInput name="first_name_EN" mt="md" label="First name" placeholder="Firstname" {...form.getInputProps('first_name_EN')} required/>
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
							clearable
						/>
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
					<Group justify="center" mt="xl">
						<Button type="submit">
							{profile_id === undefined ? 'Add profile': 'Update profile'}
						</Button>
						<Button variant="outline" onClick={() => {
							setAnchor([{title: 'Profile', href: '/profiles'}])
							navigate("/profiles")
						}}>
							Cancel
						</Button>
					</Group>
				</Box>
			</form>

		</Paper>
		</>
	)
}

export default ProfileForm;