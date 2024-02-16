import { rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconX, IconCheck, IconAlertCircle } from '@tabler/icons-react';

const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
const warningIcon = <IconAlertCircle style={{ width: rem(20), height: rem(20) }} />;
const autoCloseMillis: number = 5000;

const notifyShow = (title: string, message: string, status: string = '') => { 
	if (status === 'success') {
		notifications.show({
			title: title,
			message: message,
			autoClose: autoCloseMillis,
			color: 'green',
			withBorder: true,
			icon: checkIcon
		});
	} else if (status === 'failed') {
		notifications.show({
			title: title,
			message: message,
			autoClose: autoCloseMillis,
			color: 'red',
			withBorder: true,
			icon: xIcon
		});
	} else if (status === 'warning') {
		notifications.show({
			title: title,
			message: message,
			autoClose: autoCloseMillis,
			color: 'yellow',
			withBorder: true,
			icon: warningIcon
		});
	} else {
		notifications.show({
			title: title,
			message: message,
			autoClose: autoCloseMillis,
			color: 'blue',
			withBorder: true
		});
	}
}

export const notifyAddSuccess = () => {
	notifyShow(
		'Create item success',
    'You successfully create item ',
		'success'
	);
}

export const notifyAddFailed = () => {
	notifyShow(
		'Create item failed',
    'Unsuccessfully create item, Please contact admin.',
		'failed'
	);
}

export const notifyEditSuccess = () => {
	notifyShow(
		'Update item success',
    'You successfully update item ',
		'success'
	);
}

export const notifyEditFailed = () => {
	notifyShow(
		'Update item failed',
    'Unsuccessfully update item, Please contact admin.',
		'failed'
	);
}

export const notifyDeleteSuccess = () => {
	notifyShow(
		'Delete item success',
    'You successfully delete item ',
		'success'
	);
}

export const notifyDeleteFailed = () => {
	notifyShow(
		'Delete item failed',
    'Unsuccessfully delete item, Please contact admin.',
		'failed'
	);
}

export const notifyProcessSuccess = () => {
	notifyShow(
		'Your process success',
    'Successfully your process',
		'success'
	);
}

export const notifyProcessFailed = () => {
	notifyShow(
		'Your process failed',
    'Unsuccessfully your process, Please contact admin.',
		'failed'
	);
}