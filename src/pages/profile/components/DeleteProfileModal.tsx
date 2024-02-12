import React, { useState } from 'react';
import { Modal, Text, Group, Button, Divider } from '@mantine/core';
import {IconExclamationCircle} from '@tabler/icons-react';
import { deleteUser } from '../../../services/user';
import { getUserRoleByUserId, deleteUserRole } from '../../../services/userRole';
import { getProfileByUserId, deleteProfile } from '../../../services/profile';
import { getVerificationByUserId, deleteVerification } from '../../../services/verification';
import { notifyDeleteSuccess, notifyDeleteFailed } from '../../../utils/notification';
interface IProps {
  opened: boolean;
  close: VoidFunction;
	profile_id: string;
	setPage: Function
}

const DeleteProfileModal: React.FC<IProps> = (props) =>{
	const handleDelete = (id: string) => {
		props.setPage(1);
		notifyDeleteSuccess();
		props.close();

		// Promise.all([getUserRoleByUserId(id), getProfileByUserId(id), getVerificationByUserId(id)]).then( async (res: any) => {
		// 	// console.log(res);
		// 	try {
		// 		if (!res[0].error && res[0].length > 0){
		// 			let userRole = res[0];
		// 			await deleteUserRole(userRole[0].id);
		// 		}
		// 		if (!res[1].error) await deleteProfile(res[1].id);
		// 		if (!res[2].error) await deleteVerification(res[2].id);

		// 		await deleteUser(id);
		// 		props.setPage(1);
		// 		notifyDeleteSuccess();
		// 		props.close();
		// 	} catch (err) {
		// 		notifyDeleteFailed();
		// 		console.log(err);
		// 		props.close();
		// 	}
		// }).catch(err => {
		// 	notifyDeleteFailed();
		// 	console.log(err);
		// 	props.close();
		// })
	}
  return (
		<Modal opened={props.opened} onClose={props.close} centered withCloseButton={false}>
			<Group justify="center" pb={32} pt={32}>
				<Group c="red">
					<IconExclamationCircle size={50} stroke={1.5}/>
				</Group>
				<div>
					<Text c="red" size="lg" fw={600}>Are you sure ?</Text>
      		<Text c="dimmed" size="sm">If you delete this item you can't undo this.</Text>
				</div>
			</Group>
			<Divider pb={16}/>
			<Group justify="flex-end">
				<Button variant="default" onClick={props.close}>Cancel</Button>
				<Button color="red" onClick={() => handleDelete(props.profile_id)}>Delete</Button>
			</Group>
    </Modal>
	)
}

export default DeleteProfileModal;