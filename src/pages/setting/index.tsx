import { useState, useEffect } from 'react';
import { 
	Paper, 
	Box, 
	Group, 
	Title, 
	Center, 
	Button, 
	NumberInput, 
	LoadingOverlay,
	Switch,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifyAddSuccess, notifyAddFailed, notifyEditSuccess, notifyEditFailed } from '../../utils/notification';
import { IUpdateSetting, IAddSetting } from '../../types/setting.type';
import { getSettings, updateSetting, addSetting } from '../../services/setting';

const Setting: React.FC = () => {
	const [hasSetting, setHasSetting] = useState<boolean>(false);
	const [record_id, setRecord_id] = useState<string>('');
	const [loading, loadingHandler] = useDisclosure(false);
	const form = useForm({
    initialValues: {
			reset_password_interval: 0,
    	enable_reset_password_interval: false,
    	enable_verify_email: false,
    },
    validate: {},
  });

	const handleSubmit = async () => {
		const form_data = {...form.values};
		if (hasSetting){
			handleSubmitUpdate(form_data as IUpdateSetting);
		} else {
			handleSubmitAdd(form_data as IAddSetting)
		}
	}

	const handleSubmitAdd = async (data: IAddSetting) => {
		loadingHandler.toggle();
		try {
			let result = await addSetting(data);
			if (result === false) throw 'Unsuccessfully addSetting';

			notifyAddSuccess();
			loadingHandler.close();

		} catch (err) {
			loadingHandler.close();
			notifyAddFailed();
			console.log(err);
		}
		
	}

	const handleSubmitUpdate = async (data: IUpdateSetting) => {
		loadingHandler.toggle();
		try {
			let result = await updateSetting({...data, id: record_id});
			if (result === false) throw 'Unsuccessfully updateSetting';

			notifyEditSuccess();
			loadingHandler.close();

		} catch (err) {
			loadingHandler.close();
			notifyEditFailed();
			console.log(err);
		}
	}

	useEffect(() => {
		getSettings().then((res: any) => {
			if (res.length > 0) {
				setHasSetting(true);
				setRecord_id(res[0].id)
				form.setValues({
					reset_password_interval: res[0].reset_password_interval,
					enable_reset_password_interval: res[0].enable_reset_password_interval,
					enable_verify_email: res[0].enable_verify_email
				})
			}
		}).catch(err => console.log(err));
	}, []);

	return (
		<>
		<Paper p={36} mt={16} shadow="md" radius="md" withBorder>
				<LoadingOverlay
          visible={loading}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'violet', type: 'bars' }}
					pos={"fixed"}
        />
			<Center pb={12}><Title order={3}>Setting</Title></Center>
			<form onSubmit={form.onSubmit(() => {handleSubmit()})}>
				<Box maw={340} mx="auto">
					<NumberInput
						label="Reset password interval (Days)"
						description=""
						placeholder="Example: 90 days"
						{...form.getInputProps('reset_password_interval')}
					/>
					<Switch
						mt="md"
						name="enable_reset_password_interval"
						labelPosition="right"
						label="Enable password expired"
						checked={form.values.enable_reset_password_interval}
						{...form.getInputProps('enable_reset_password_interval')}
					/>
					<Switch
						mt="md"
						name="enable_verify_email"
						labelPosition="right"
						label="Enable verify email"
						checked={form.values.enable_verify_email}
						{...form.getInputProps('enable_verify_email')}
					/>
					<Group justify="center" mt="xl">
						<Button type="submit">
							{hasSetting ? 'Update': 'Create'}
						</Button>
						{hasSetting ? 
						<>
							<Button variant="outline" onClick={() => {
								form.setValues({
									reset_password_interval: 0,
									enable_reset_password_interval: false,
									enable_verify_email: false
								})
							}}>
								Set default
							</Button>
						</>
						: <></>}
					</Group>
				</Box>
			</form>

		</Paper>
		</>
	)
}

export default Setting;