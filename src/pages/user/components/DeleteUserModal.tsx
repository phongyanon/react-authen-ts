import React, { useState } from 'react';
import { Modal, Text, Group, Button, Divider } from '@mantine/core';
import {IconExclamationCircle} from '@tabler/icons-react';
interface IProps {
  opened: boolean;
  close: VoidFunction;
	user_id: string;
}

const DeleteUserModal: React.FC<IProps> = (props) =>{
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
			{/* <p>{props.user_id}</p> */}
			<Divider pb={16}/>
			<Group justify="flex-end">
				<Button variant="default" onClick={props.close}>Cancel</Button>
				<Button color="red" onClick={props.close}>Delete</Button>
			</Group>
    </Modal>
	)
}

export default DeleteUserModal;