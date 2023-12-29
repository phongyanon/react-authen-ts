import { useState } from 'react';
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
	rem,
	Select,
	Textarea,
	Divider
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { 
	IconArrowLeft,
	IconUserPlus
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import '@mantine/dates/styles.css';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { dateParser } from '../../../utils/date';
import PolicyModal from '../../../components/policy/Policy';
import TermsOfUseModal from '../../../components/policy/TermsOfUse';

export function ProfileForm() {
	const navigate = useNavigate();
	const [otherGenderVisible, setOtherGenderVisible] = useState<boolean>(false);
	const [policyOpened, policyOpenHandler] = useDisclosure(false);
	const [termsOfUseOpened, termsOfUseOpenHandler] = useDisclosure(false);
  const form = useForm({
    initialValues: {
			firstname_en: '',
			lastname_en: '',
			firstname_th: '',
			lastname_th: '',
			date_of_birth: '',
			gender: '',
			other_gender: '',
			address_en: '',
			address_th: '',
			zip_code: '',
			phone: ''
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
						<Group justify="space-between" mt="lg">
							<Select
								w={120}
								label="Gender"
								placeholder="Gender"
								data={['Male', 'Female', 'Other']}
								defaultValue=''
								onChange={(value) => {value !== 'Other' ? setOtherGenderVisible(false): setOtherGenderVisible(true)}}
								clearable
							/>
							{otherGenderVisible === true ?
								<TextInput name="other_gender" label="Other" placeholder="Gender" {...form.getInputProps('other_gender')}/>							
							: <></>}
						</Group>
						<Textarea
							name="address_en"
							placeholder="Address"
							label="Address"
							autosize
							minRows={2}
							mt="md"
						/>
						<TextInput w={120} mt="md" name="zip_code" label="Zip code" placeholder="Zip code" {...form.getInputProps('zip_code')}/>							
						<TextInput mt="md" name="phone" label="Phone number" placeholder="Phone number" {...form.getInputProps('phone')}/>							
						
						<Divider mt="md" my="xs" label="Infomation in thai" labelPosition="center" />

						<TextInput name="firstname_th" label="Firstname in thai" placeholder="Firstname in thai" {...form.getInputProps('firstname_th')}/>
						<TextInput name="lastname_th" mt="md" label="Lastname in thai" placeholder="Lastname in thai" {...form.getInputProps('lastname_th')}/>
						<Textarea
							name="address_th"
							placeholder="Address in thai"
							label="Address in thai"
							autosize
							minRows={2}
							mt="md"
						/>
						<Text ta="center" mt="xl" c="dimmed" size="xs">
							By clicking Continue. you agree to {' '}
							<Text td="underline" span style={{"cursor": "pointer"}} onClick={() => termsOfUseOpenHandler.open()}>Term of Use</Text> {' '}and{' '}
							<Text td="underline" span style={{"cursor": "pointer"}} onClick={() => policyOpenHandler.open()}>Privacy Policy</Text>.
							We may send you communications. you may change your preference in your account setting.
							We'll never post without your permission.
						</Text>
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
			<PolicyModal opened={policyOpened} close={policyOpenHandler.close}/>
			<TermsOfUseModal opened={termsOfUseOpened} close={termsOfUseOpenHandler.close}/>
		</Container>
	)
}