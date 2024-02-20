import { Outlet, useNavigate } from "react-router-dom"
import { AppShell, Burger, Group, Text } from '@mantine/core';
import { IconBrandReact } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { Navbar } from "../navbar/Navbar";
import { Header } from "../header/Header";
import { useTranslation } from 'react-i18next';

export function MainLayout() {
	const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const navigate = useNavigate();
	const { t } = useTranslation();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" grow>
          <Group preventGrowOverflow={false}>
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            <IconBrandReact size={30} color="#0063FF" onClick={() => navigate('/')}/>
            <Text c="blue" fw="bold" size="lg" visibleFrom="sm">{t('React Authen TS')}</Text>
          </Group>
          <Header />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <Navbar/>
      </AppShell.Navbar>
      <AppShell.Main>
				<Outlet/>
			</AppShell.Main>
    </AppShell>
  );
}