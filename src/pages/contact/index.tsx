import { 
	Paper, 
	Box, 
	Group, 
	Title, 
	Center, 
	Button, 
	TextInput,
	Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';

const Contact: React.FC = () => {
	
	const form = useForm({
    initialValues: {
			subject: '',
			message: ''
    },
    validate: {},
  });

	return (
		<>
		<Paper p={36} mt={16} shadow="md" radius="md" withBorder>
				
			<Center pb={12}><Title order={3}>Contact</Title></Center>
			<form onSubmit={form.onSubmit(() => {} )}>
				<Box maw={540} mx="auto">
					<TextInput
						label="Subject"
						placeholder="Subject"
						mt="md"
						name="subject"
						variant="filled"
						required
						{...form.getInputProps('subject')}
					/>
					<Textarea
						label="Message"
						description="You message wil send to developer"
						placeholder="Input message"
						mt={'lg'}
						maxRows={10}
						minRows={5}
						autosize
						{...form.getInputProps('message')}
					/>
					
					<Group justify="center" mt="xl">
						<Button type="submit">
							Send
						</Button>
					</Group>
				</Box>
			</form>

		</Paper>
		</>
	)
}

export default Contact;