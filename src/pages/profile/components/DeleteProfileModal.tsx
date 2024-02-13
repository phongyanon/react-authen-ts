import React, { useState } from 'react';
import { Modal, Text, Group, Button, Divider } from '@mantine/core';
import {IconExclamationCircle} from '@tabler/icons-react';
import { deleteProfile } from '../../../services/profile';
import { notifyDeleteSuccess, notifyDeleteFailed } from '../../../utils/notification';
interface IProps {
  opened: boolean;
  close: VoidFunction;
	profile_id: string;
	setPage: Function
}

const DeleteProfileModal: React.FC<IProps> = (props) =>{
	const handleDelete = (id: string) => {
		deleteProfile(id).then(() => {
			props.setPage(1);
			notifyDeleteSuccess();
			props.close();
		}).catch(err => {
			notifyDeleteFailed();
			console.log(err);
			props.close();
		})
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