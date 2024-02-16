import React, {useState} from 'react';
import { Modal, Text, Group, Button, Divider, PinInput, Center, LoadingOverlay } from '@mantine/core';
import { useRecoilState } from 'recoil';
import { useDisclosure } from '@mantine/hooks';
import { verifyState } from '../../../store/user';
import { notifyProcessSuccess, notifyProcessFailed } from '../../../utils/notification';
import { disableTOTP, validateTOTP } from '../../../services/totp';
import { useForm } from '@mantine/form';

interface IProps {
  opened: boolean;
  close: VoidFunction;
	record_id: string;
	setIs2faEnable: Function;
}

const Disable2faModal: React.FC<IProps> = (props) =>{
	const form = useForm({
		initialValues: {
			otp: ''
		}
	});
	const [loading, loadingHandler] = useDisclosure(false);
	const [currentVerify, setCurrentVerify] = useRecoilState(verifyState);
	const [error, setError] = useState<boolean>(false);

	const handleDisable = (id: string, otp: string) => {
		loadingHandler.toggle();
		validateTOTP(id, otp).then((res: any) => {
			if (res.otp_valid) {
				return disableTOTP(id);
			} else {
				throw 'Unsuccessfully'
			}
		}).then((res: any) => {
			if (res.otp_disabled) {
				notifyProcessSuccess();
				if (currentVerify) setCurrentVerify({...currentVerify, enable_opt: false});
				props.setIs2faEnable(false);
				form.setFieldValue('otp', '');
				loadingHandler.close();
				props.close()
			}
		}).catch(err => {
			setError(true);
			setTimeout(() => {
				setError(false);
			}, 1000);
			loadingHandler.close();
			notifyProcessFailed();
			form.setFieldValue('otp', '');
			console.log(err);
		})
	}

  return (
		<Modal opened={props.opened} onClose={props.close} withCloseButton={false} size={'lg'} centered>
			<LoadingOverlay 
				visible={loading} 
				zIndex={1000} 
				overlayProps={{ radius: "sm", blur: 2 }}
				loaderProps={{ color: 'blue', type: 'bars' }} 
			/>
			<Text size={'xl'} fw={700}>Disable Two-factor authentication (2FA)</Text>
			<Divider/>
			<Group pt={8} pb={8}>
				<Text size={'md'}>Enter OTP code to disable Two-factor authentication (2FA)</Text>
				<Divider pb={16}/>
			</Group>
			<Center mb={64} mt={64}>
				<PinInput 
					placeholder="-" 
					type="number" 
					length={6} 
					onComplete={(value: string) => handleDisable(props.record_id, value)}
					{...form.getInputProps('otp')}
					error={error}
				/>
			</Center>
			<Divider pb={8}/>
			<Group justify='center'>
				<Button variant="default" onClick={props.close}>Close</Button>
			</Group>
    </Modal>
	)
}

export default Disable2faModal;