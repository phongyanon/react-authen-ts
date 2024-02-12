import { useState, useEffect } from 'react';
import { 
	Paper, 
	TextInput, 
	Box, 
	PasswordInput, 
	Group, 
	Title, 
	Center, 
	Button, 
	Breadcrumbs, 
	Anchor,
	Select,
	Text,
	LoadingOverlay,
	Switch
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { notifyAddSuccess, notifyAddFailed, notifyEditSuccess, notifyEditFailed } from '../../../utils/notification';
import { anchorState, userState } from '../../../store/user';
import { getUser } from '../../../services/user';
import { getRoles, getRolesByUserId } from '../../../services/role';
import { getUserRoleByUserId, updateUserRole } from '../../../services/userRole';
import { addUser, updateUser } from '../../../services/user';
import { IAddUser, IUserWithRoles, IUpdateUser } from '../../../types/user.type';

const UserForm: React.FC = () => {
	const navigate = useNavigate();
	let { user_id } = useParams();
	const [userStatus, setUserStatus] = useState(true);
	const validatePassword = (value: string) => {
		if (user_id && value.length === 0) {
			return null
		} else {
			return !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) ? 
			'Password must contain minimum eight characters, at least one letter and one number': null
		}
	}
  const form = useForm({
    initialValues: {
      username: '',
      email: '',
      password: '',
			status: userStatus
    },
    validate: {
      username: (value) => value.trim().length < 2 ? 'Username should more than 2 characters' : null,
      email: (value) => !/^\S+@\S+$/.test(value) ? 'Email should contain @' : null,
      password: (value) => (validatePassword(value)
				// !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) && user_id === undefined ? 
				// 	'Password must contain minimum eight characters, at least one letter and one number': null
			),
    },
  });
	const currentUser = useRecoilValue(userState);
	const [anchor, setAnchor] = useRecoilState(anchorState);
	const [roleOption, setRoleOption] = useState([]);
	const [loaderVisible, loaderHandler] = useDisclosure(false);

	const handleSubmit = async (formValues: IAddUser | IUpdateUser) => {
		if (user_id) {
			handleSubmitUpdate(formValues as IUpdateUser);
		} else {
			handleSubmitAdd(formValues as IAddUser);
		} 
	}

	const handleSubmitAdd = async (formValues: IAddUser) => {
		// console.log(formValues);
		loaderHandler.toggle();
		try {
			let user_result = await addUser({
				username: formValues.username,
				password: formValues.password,
				email: formValues.email
			});
			if (user_result === false) throw 'Unsuccessfully addUser';
				
			let userRole_result = await getUserRoleByUserId(user_result.id);
			if (userRole_result === null) throw 'Unsuccessfully getUserRoleByUserId';
	
			if (formValues.role && (userRole_result.length > 0)) {
				let userRole =  userRole_result[0];
				let userRole_updated = await updateUserRole({
					id: userRole.id,
					user_id: user_result.id,
					role_id: formValues.role
				}); 
				if (userRole_updated === false) throw 'Unsuccessfully updateUserRole';
			}
	
			notifyAddSuccess();
			loaderHandler.close();
			setAnchor([{title: 'User', href: '/users'}]);
			navigate("/users");

		} catch (err) {
			loaderHandler.close();
			notifyAddFailed();
			console.log(err);
		}
	}

	const handleSubmitUpdate = async (formValues: IUpdateUser) => {
		// console.log('update: ', formValues);
		try {
			let body: IUpdateUser = {
				id: user_id as string,
				status: formValues.status === true ? 'active': 'inactive'
			}

			if (formValues.password !== '') body.password = formValues.password;
			let user_result = await updateUser(body);
			if (user_result === false) throw 'Unsuccessfully updateUser';
			
			let userRole_result = await getUserRoleByUserId(user_result.id);
			if (userRole_result === null) throw 'Unsuccessfully getUserRoleByUserId';
	
			if (formValues.role && (userRole_result.length > 0)) {
				let userRole =  userRole_result[0];
				let userRole_updated = await updateUserRole({
					id: userRole.id,
					user_id: user_result.id,
					role_id: formValues.role
				}); 
				if (userRole_updated === false) throw 'Unsuccessfully updateUserRole';
			}

			notifyEditSuccess();
			loaderHandler.close();
			setAnchor([{title: 'User', href: '/users'}]);
			navigate("/users");

		} catch (err) {
			loaderHandler.close();
			notifyEditFailed();
			console.log(err);
		}
	}

	const checkIsRoleSuperAdmin = () => {
		if (currentUser !== undefined) {
			if (currentUser.roles) {
				if (currentUser.roles.includes('SuperAdmin')) return true;
			}
		}
		return false;
	}

	useEffect(() => {
		getRoles().then((res: any) => {
			let options = res.map((obj: any) => ({value: obj.id.toString(), label: obj.name}));
			setRoleOption(options);
		}).catch(err => console.log(err));

		if (user_id) {
			Promise.all([getUser(user_id), getUserRoleByUserId(user_id)]).then((res: any) => {
				if (res[1].length > 0) {
					let role = res[1];
					form.setFieldValue('role', role[0].role_id);
				}
				form.setValues({
					username: res[0].username,
					email: res[0].email,
					status: res[0].status === 'active' ? true : false
				});
				if (res[0].status === 'active') setUserStatus(true);
				else setUserStatus(false);
			}).catch(err => console.log(err))
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
          visible={loaderVisible}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'violet', type: 'bars' }}
        />
			<Center pb={12}><Title order={3}>{user_id === undefined ? 'New User': 'Edit User'}</Title></Center>
			<form onSubmit={form.onSubmit(() => {handleSubmit(form.values)})}>
				<Box maw={340} mx="auto">
					<TextInput 
						name="username" 
						label="Username" 
						placeholder="Username" 
						disabled={user_id === undefined ? false: true}
						{...form.getInputProps('username')} 
					/>
					<TextInput 
						name="email" 
						mt="md" 
						label="Email" 
						placeholder="Email" 
						disabled={user_id === undefined ? false: true}
						{...form.getInputProps('email')} 
					/>
					<PasswordInput name="password" mt="md" label="Password" placeholder="Password" {...form.getInputProps('password')} />
					{checkIsRoleSuperAdmin() ? 
					<Select
						label="Role"
						name="role"
						placeholder="Pick role"
						data={roleOption}
						mt="md"
						{...form.getInputProps('role')}
					/>
					: <></>}
					{user_id === undefined ? <></> :
					<Switch
						mt="md"
						name="status"
						labelPosition="right"
						label="Status"
						size="md"
						radius="xs"
						checked={userStatus}
						onChange={(e) => {
							setUserStatus(e.currentTarget.checked)
							form.setFieldValue('status', e.currentTarget.checked);
						}}
						description={userStatus === true ? <Text size="sm" c="green">Active</Text> : <Text size="sm" c="red">Inactive</Text>}
					/>
					}
					<Group justify="center" mt="xl">
						<Button type="submit">
							{user_id === undefined ? 'Add user': 'Update user'}
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

export default UserForm;