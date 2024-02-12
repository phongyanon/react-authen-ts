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

const ProfileForm: React.FC = () => {
	const navigate = useNavigate();
	let { profile_id } = useParams();
	const [userStatus, setUserStatus] = useState(true);
	const currentUser = useRecoilValue(userState);
	const [anchor, setAnchor] = useRecoilState(anchorState);
	const [roleOption, setRoleOption] = useState([]);
	const [loaderVisible, loaderHandler] = useDisclosure(false);
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

	const handleSubmit = async (formValues: any) => {
		if (profile_id) {
			// handleSubmitUpdate();
		} else {
			// handleSubmitAdd();
		} 
	}

	const handleSubmitAdd = async () => {
		
	}

	const handleSubmitUpdate = async () => {
		
	}

	useEffect(() => {

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
          visible={loaderVisible}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'violet', type: 'bars' }}
        />
			<Center pb={12}><Title order={3}>{profile_id === undefined ? 'New Profile': 'Edit Profile'}</Title></Center>
			<form onSubmit={form.onSubmit(() => {handleSubmit(form.values)})}>
				<Box maw={340} mx="auto">
					<Group justify="space-between">
						<Select
							w={'100%'}
							label="User"
							placeholder="User"
							name="user_id"
							data={[
								{ value: '1', label: 'John Test' },
								{ value: '2', label: 'Lida Blickpack' },
								{ value: '3', label: 'Other Oconer' }
							]}
							{...form.getInputProps('gender')}
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
							{profile_id === undefined ? 'Add user': 'Update user'}
						</Button>
						<Button variant="outline" onClick={() => {
							setAnchor([{title: 'User', href: '/users'}])
							navigate("/users")
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