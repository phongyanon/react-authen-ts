import { useEffect } from "react";
import { Outlet } from "react-router-dom"
import { AppShell, Burger, Group, Text } from '@mantine/core';
import { IconBrandReact } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { Navbar } from "../navbar/Navbar";
import { Header } from "../header/Header";
import { getCurrentUser, getCurrentProfile } from "../../services/user";
import { useRecoilState } from 'recoil';
import { userState } from "../../store/user";
import { IUserInfo } from "../../types/user.type";

export function MainLayout() {
  const [_, setCurrentUser] = useRecoilState(userState);
	const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  useEffect( () => {
    Promise.all([getCurrentUser(), getCurrentProfile()]).then((values) => {
      console.log(values);
      if ((values[0] !== null) && (values[1].image_profile)) {
        let user_info: IUserInfo = values[0];
        user_info.image_profile = values[1];
        setCurrentUser(user_info);
      }
      else if (values[0] !== null) {
        setCurrentUser(values[0]);
      }
    });
  }, []);

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
            <IconBrandReact size={30} color="#0063FF"/>
            <Text c="blue" fw="bold" size="lg" visibleFrom="sm">React Authen TS</Text>
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