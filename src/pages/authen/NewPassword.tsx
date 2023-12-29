import {
  Paper,
  Title,
  Text,
  PasswordInput,
  Button,
  Container,
  Group,
  Center,
} from '@mantine/core';

export function NewPassword() {

  return (
    <Container size={460} my={30}>
			<Center pb={12}><Title order={1}>New password</Title></Center>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your new password
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <PasswordInput label="New password" placeholder="New password" required />
        <Group mt="lg" grow>
          <Button>Update password</Button>
        </Group>
      </Paper>
    </Container>
  );
}