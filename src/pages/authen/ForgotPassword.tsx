import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';

export function ForgotPassword() {

  return (
    <Container size={460} my={30}>
			<Center pb={12}><Title order={1}>Forgot your password?</Title></Center>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your email to get a reset link
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <TextInput label="Your email" placeholder="name@email.com" required />
        <Group justify="space-between" mt="lg">
          <Anchor href="/signin" c="dimmed" size="sm">
            <Center inline>
              <IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
              <Box ml={5}>Back to the login page</Box>
            </Center>
          </Anchor>
          <Button>Reset password</Button>
        </Group>
      </Paper>
    </Container>
  );
}