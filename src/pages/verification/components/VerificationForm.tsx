import { useState, useEffect } from 'react';
import { 
	Paper, 
	Box, 
	Group, 
	Title, 
	Center, 
	Button, 
	Breadcrumbs, 
	Anchor,
	Select,
	LoadingOverlay,
	Switch,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { notifyAddSuccess, notifyAddFailed, notifyEditSuccess, notifyEditFailed } from '../../../utils/notification';
import { anchorState } from '../../../store/user';
import { getUsers } from '../../../services/user';
import { IAddVerification, IUpdateVerification } from '../../../types/verification.type';
import { getVerification, addVerification, updateVerification } from '../../../services/verification';

const VerificationForm: React.FC = () => {
	const navigate = useNavigate();
	const { record_id } = useParams();
	// const currentUser = useRecoilValue(userState);
	const [anchor, setAnchor] = useRecoilState(anchorState);
	const [userOption, setUserOption] = useState([]);
	const [loading, loadingHandler] = useDisclosure(false);
	const form = useForm({
    initialValues: {
			user_id: '',
			email_verified: false,
			enable_opt: false,
			otp_verified: false
    },
    validate: {},
  });

	const handleSubmit = async () => {
		const form_data = {...form.values};
		if (record_id) {
			handleSubmitUpdate(form_data as IUpdateVerification);
		} else {
			handleSubmitAdd(form_data as IAddVerification);
		} 
	}

	const handleSubmitAdd = async (data: IAddVerification) => {
		loadingHandler.toggle();
		try {
			let result = await addVerification({
				...data,
				reset_password_token: null,
				reset_password_token_expires_at: null,
				verify_email_token: null,
				verify_email_token_expires_at: null,
				otp_secret: null,
				token_salt: ''
			});
			if (result === false) throw 'Unsuccessfully addVerification';

			notifyAddSuccess();
			loadingHandler.close();
			setAnchor([{title: 'Verification', href: '/verifications'}]);
			navigate("/verifications");

		} catch (err) {
			loadingHandler.close();
			notifyAddFailed();
			console.log(err);
		}
		
	}

	const handleSubmitUpdate = async (data: IUpdateVerification) => {
		loadingHandler.toggle();
		try {
			let result = await updateVerification({...data, id: record_id});
			if (result === false) throw 'Unsuccessfully updateVerification';

			notifyEditSuccess();
			loadingHandler.close();
			setAnchor([{title: 'Verification', href: '/verifications'}]);
			navigate("/verifications");

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

		if (record_id) {
			getVerification(record_id).then((res: any) => {
				form.setValues({
					user_id: res.user_id,
					email_verified: res.email_verified,
					enable_opt: res.enable_opt,
					otp_verified: res.otp_verified
				})
			}).catch(err => console.log(err));
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
			<Center pb={12}><Title order={3}>{record_id === undefined ? 'New Verification': 'Edit Verification'}</Title></Center>
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
					<Switch
						mt="md"
						name="email_verified"
						labelPosition="right"
						label="Email verified"
						{...form.getInputProps('email_verified')}
						checked={form.values.email_verified}
					/>
					<Switch
						mt="md"
						name="enable_opt"
						labelPosition="right"
						label="Enable opt"
						{...form.getInputProps('enable_opt')}
						checked={form.values.enable_opt}
					/>
					<Switch
						mt="md"
						name="otp_verified"
						labelPosition="right"
						label="OTP verified"
						{...form.getInputProps('otp_verified')}
						checked={form.values.otp_verified}
					/>
					<Group justify="center" mt="xl">
						<Button type="submit">
							{record_id === undefined ? 'Add': 'Update'}
						</Button>
						<Button variant="outline" onClick={() => {
							setAnchor([{title: 'Verification', href: '/verifications'}])
							navigate("/verifications")
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

export default VerificationForm;