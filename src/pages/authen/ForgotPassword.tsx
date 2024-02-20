import { useState } from 'react';
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
  LoadingOverlay
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { IconArrowLeft } from '@tabler/icons-react';
import { requestResetPasswordEmail } from '../../services/authen';
import { useTranslation } from 'react-i18next';

export function ForgotPassword() {
  const [respSuccess, setRespSuccess] = useState<boolean>(false);
  const [respText, setRespText] = useState<string | null>(null);
  const [loading, loadingHandler] = useDisclosure(false);
	const { t } = useTranslation();
  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: (value) => !/^\S+@\S+$/.test(value) ? `${t('Email should contain @')}` : null,
    }
  });

  const resetPasswordHandler = async () => {
    loadingHandler.toggle();
    let result = await requestResetPasswordEmail(form.values);
    if (result.error) {
      setRespSuccess(false);
      setRespText(result.error);
    } else {
      setRespSuccess(true);
      setRespText('');
    }
    loadingHandler.close()
    form.setFieldValue('email', '');
  }

  return (
    <Container size={460}>
			<Center pb={12}><Title order={1} mt={30}>{t('Forgot your password?')}</Title></Center>
      <Text c="dimmed" fz="sm" ta="center">
        {t('Enter your email to get a reset link')}
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'violet', type: 'bars' }}
        />
        <form onSubmit={form.onSubmit(() => resetPasswordHandler())}>
          <TextInput name="email" label={t("Your email")} placeholder="name@email.com" {...form.getInputProps('email')} required />
          <Group justify="space-between" mt="lg">
            <Anchor href="/signin" c="dimmed" size="sm">
              <Center inline>
                <IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                <Box ml={5}>{t('Back to the login page')}</Box>
              </Center>
            </Anchor>
            <Button type='submit'>{t('Reset password')}</Button>
          </Group>
        </form>
        <Group justify="center" mt="lg">
          <Text c={respSuccess === true ? "green": "red"}>{respText}{respSuccess === true ? `${t("Please check your email to update password.")}`: ""}</Text>
        </Group>
        
      </Paper>
    </Container>
  );
}