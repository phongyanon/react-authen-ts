import { useState } from 'react';
import {
  Paper,
  Title,
  Text,
  PasswordInput,
  Button,
  Container,
  Group,
  Center,
  LoadingOverlay
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { updateForgotPassword } from '../../services/authen';

export function NewPassword() {
  const params = new URLSearchParams(document.location.search);
  const [loading, loadingHandler] = useDisclosure(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      new_password: '',
    },
    validate: {
      new_password: (value) => (
				!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) ? 
					'Password must contain minimum eight characters, at least one letter and one number': null
			),
    }
  });

  const newPasswordHandle = async () => {
    loadingHandler.toggle();
    if ((params.get('user_id') !== null) && (params.get('token') !== null)) {
      let result = await updateForgotPassword(form.values, params.get('user_id') as string, params.get('token') as string);
      loadingHandler.close();
      if (result.error) {
        setErrorText(result.error);
      } else {
        navigate('/signin');
      }      
    } else {
      loadingHandler.close();
      setErrorText('Failed to update password.');
    }
  }

  return (
    <Container size={460} my={30}>
			<Center pb={12}><Title order={1}>New password</Title></Center>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your new password
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'violet', type: 'bars' }}
        />
        <form onSubmit={form.onSubmit(() => newPasswordHandle())}>
          <PasswordInput 
            name="new_password" 
            label="New password" 
            placeholder="New password" 
            {...form.getInputProps('new_password')}  
            error={errorText}
            required />
          <Group mt="lg" grow>
            <Button type='submit'>Update password</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}