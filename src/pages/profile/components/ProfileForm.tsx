import { 
	Paper, 
	TextInput, 
	Box, 
	Group, 
	Title, 
	Center, 
	Button,
  Text,
	Container, 
	Anchor,
	rem
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { 
	IconArrowLeft,
	IconUserPlus
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import '@mantine/dates/styles.css';
import { useNavigate } from 'react-router-dom';
import { dateParser } from '../../../utils/date';

export function ProfileForm() {
	const navigate = useNavigate();
  const form = useForm({
    initialValues: {
			firstname_en: '',
			lastname_en: '',
			// firstname_th: '',
			// lastname_th: '',
			date_of_birth: '',
			// gender: '',
			// address_en: '',
			// address_th: '',
			// zip_code: '',
			// phone: ''
    },
    // validate: {
    // },
  });

	return (
		<Container size={860} my={30}>
			<Center pb={12}><Title order={1}>Profile</Title></Center>
			<Text c="dimmed" fz="sm" ta="center">
        Account profile
      </Text>

			<Paper p={36} mt={16} shadow="md" radius="md" withBorder>

				<form onSubmit={form.onSubmit(() => {console.log(form.values)})}>
					<Box maw={340} mx="auto">
						<TextInput name="firstname_en" label="Firstname" placeholder="Firstname" {...form.getInputProps('firstname_en')} required/>
						<TextInput name="lastname_en" mt="md" label="Lastname" placeholder="Lastname" {...form.getInputProps('lastname_en')} required/>
						<DateInput
							name="date_of_birth"
							dateParser={dateParser}
							mt="md"
							valueFormat="DD/MM/YYYY"
							label="Date of birth"
							placeholder="DD/MM/YYYY"
							{...form.getInputProps('date_of_birth')}
							clearable 
						/>
						<Group justify="space-around" mt="lg" grow>
							<Button type="submit" leftSection={<IconUserPlus size={20}/>}>
								Continue
							</Button>
						</Group>
						<Group justify="center" p={12} gap={"xs"}>
							<Text c="dimmed" fz="sm" ta="center">
								Already have an account then {' '}
							</Text>
							<Anchor c="blue" size="sm" onClick={() => navigate(-1)}>
								<Center inline>
									<IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
									<Box ml={5}>Back</Box>
								</Center>
							</Anchor>
						</Group>
					</Box>
				</form>

			</Paper>
		</Container>
	)
}