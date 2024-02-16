import React from 'react';
import { 
	Modal, 
	Text, 
	Group, 
	Button, 
	Divider, 
	List, 
	Center, 
	CopyButton, 
	rem, 
	Tooltip, 
	ActionIcon, 
	PinInput 
} from '@mantine/core';
import { useRecoilState } from 'recoil';
import { verifyState } from '../../../store/user';
import { useForm } from '@mantine/form';
import {IconCopy} from '@tabler/icons-react';
import QRCode from "react-qr-code";
import { notifyProcessSuccess, notifyProcessFailed } from '../../../utils/notification';
import { verifyTOTP } from '../../../services/totp';

interface IProps {
  opened: boolean;
  close: VoidFunction;
	record_id: string;
	otp_auth_url: string;
	base32: string;
	setIs2faEnable: Function;
}

const Setup2faModal: React.FC<IProps> = (props) =>{
	const form = useForm({
		initialValues: {
			otp: ''
		}
	});
	const [currentVerify, setCurrentVerify] = useRecoilState(verifyState);

	const handleVerify = (id: string) => {
		const data = {...form.values};

		verifyTOTP(id, data.otp).then((res: any) => {
			if (res.otp_verified) {
				notifyProcessSuccess();
				if (currentVerify) setCurrentVerify({...currentVerify, enable_opt: true, otp_verified: true});
				form.setFieldValue('otp', '');
				props.setIs2faEnable(true);
				props.close()
			} else {
				throw 'Unsuccessfully'
			}
		}).catch(err => {
			notifyProcessFailed();
			form.setFieldValue('otp', '');
			console.log(err);
			props.close();
		})
	}

  return (
		<Modal opened={props.opened} onClose={props.close} withCloseButton={false} size={'lg'}>
			<Text size={'xl'} fw={700}>Two-factor authentication (2FA)</Text>
			<Divider pb={8}/>
			<Group pl={16} pb={8}>
				<Text size={'md'} fw={500} c='blue'>Configuring Google authentication</Text>
				<Divider pb={8}/>
				<List type="ordered" withPadding>
					<List.Item>Install Google authenticator (IOS - Android).</List.Item>
					<List.Item>In the authenticator app click '+' icon.</List.Item>
					<List.Item>Select scan QR code and use the phone's camera scan this QR code.</List.Item>
				</List>
				<Text size={'md'} fw={500} c='blue'>Scan this QR code</Text>
				<Divider pb={8}/>
			</Group>
			<Center>
				<div style={{ height: "auto", margin: "0 auto", maxWidth: 160, width: "100%"}}>
					<QRCode
						size={256}
						style={{ height: "auto", maxWidth: "100%", width: "100%" }}
						value={props.otp_auth_url}
						viewBox={`0 0 256 256`}
						/>
				</div>
			</Center>
			<Group pt={8} pl={16} pb={8}>
				<Text size={'md'} fw={500} c='blue'>Or enter code into your app</Text>
				<Divider pb={16}/>
			</Group>
			<Group pl={32} pb={8}>
				<Text>Secret key: {(props.base32).slice(0, 30)}...</Text>
				<CopyButton value="xxx" timeout={2000}>
					{({ copied, copy }) => (
						<Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
							<ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
								<IconCopy style={{ width: rem(16) }} />
							</ActionIcon>
						</Tooltip>
					)}
			</CopyButton>
			</Group>
			<Group pl={16} pb={8}>
				<Text size={'md'} fw={500} c='blue'>Verify code</Text>
				<Divider pb={16}/>
			</Group>
			<Group pl={32} pb={8}>
				<Text>For changing setting, Please verify the authentication code</Text>
			</Group>
			<Center mb={16} mt={8}>
				<PinInput placeholder="-" type="number" length={6} {...form.getInputProps('otp')} />
			</Center>
			<Divider pb={8}/>
			<Group justify='space-between'>
				<Button variant="default" onClick={props.close}>Close</Button>
				<Button color="blue" onClick={() => handleVerify(props.record_id)}>Verify & Activate</Button>
			</Group>
    </Modal>
	)
}

export default Setup2faModal;