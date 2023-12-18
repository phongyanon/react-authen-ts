import { Outlet } from "react-router-dom"
import { AppShell, Burger, Group, Skeleton, Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Navbar } from "../navbar/Navbar";
import { Header } from "../header/Header";

export function MainLayout() {
	const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

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
        <Group h="100%" px="md">
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
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