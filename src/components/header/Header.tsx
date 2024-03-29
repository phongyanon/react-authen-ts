import { 
  Avatar,
  Menu, 
  Group, 
  Flex, 
  Text, 
  Indicator, 
  ActionIcon, 
  useMantineColorScheme, 
  useComputedColorScheme, 
  UnstyledButton,
  Switch,
  em
} from '@mantine/core';
import { 
  IconSun, 
  IconMoon, 
  IconUser, 
  IconEdit, 
  IconSettings, 
  IconLogout, 
  IconBell,
  IconPencil
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mantine/hooks';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState, registerState, profileState, verifyState } from "../../store/user";
import { signout } from '../../services/authen';
import { useTranslation } from 'react-i18next';

export function Header() {
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const [currentProfile, setCurrentProfile] = useRecoilState(profileState);
  const setCurrentVerify = useSetRecoilState(verifyState);
  const [_, setRegisterState] = useRecoilState(registerState);
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  const isMobileS = useMediaQuery(`(max-width: ${em(325)})`);
  const isMobileL = useMediaQuery(`(max-width: ${em(500)})`);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();


  const signOutHandler = async () => {
    try {
      setCurrentUser(undefined);
      setRegisterState(undefined);
      setCurrentProfile(undefined);
      setCurrentVerify(undefined);
      await signout();
      navigate('/signin');
    } catch (error) {
      console.log(error);
    }
  }

  const langHandle = (check: boolean) => {
    if (check) {
      // setLang('th');
      i18n.changeLanguage('th');
    } else {
      // setLang('en');
      i18n.changeLanguage('en');
    }
  }

  return (
    <Group justify="flex-end">
      <ActionIcon
          onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
          variant="default"
          radius="md"
          size={isMobileS ? "xs": "lg"}
          aria-label="Toggle color scheme"
        >
          {computedColorScheme === 'light' ? <IconMoon stroke={1.5} size={20} /> : <IconSun stroke={1.5} size={20} />}
      </ActionIcon>

      <Menu shadow="md" width={360}>
        {/* <img src={currentUser?.image_profile} referrerPolicy='no-referrer'/> */}
        <Switch size="lg" onLabel="EN" offLabel="TH" onChange={(event) => langHandle(event.currentTarget.checked)} />
        <Menu.Target>
          <ActionIcon variant="default" color="gray" aria-label="Settings" radius="md" size={isMobileS ? "xs": "lg"}>
            <Indicator inline label="5" size={18}>
              <IconBell stroke={1.5} size={20} />
            </Indicator>
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Notification</Menu.Label>
          <Menu.Divider />
          <Menu.Item h={54} leftSection={
            <Avatar variant="light" radius="xl" color="orange" src="">
              <IconSun size={15}/>
            </Avatar>
          }>
            <Text size="sm" >5:00 AM, It's my birth day</Text>
            <Text size="xs" c="dimmed">2 min ago</Text>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item h={54} leftSection={
            <Avatar variant="light" radius="xl" color="teal" src="">
              <IconEdit size={15}/>
            </Avatar>
          }>
            <Text size="sm" >6:00 PM, Warning for matainance</Text>
            <Text size="xs" c="dimmed">5 Feb</Text>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item h={54} leftSection={
            <Avatar variant="light" radius="xl" color="blue" src="">
              <IconUser size={15}/>          
            </Avatar>
          }>
            <Text size="sm" >9:30 AM, Adam says "Hi there" to you...</Text>
            <Text size="xs" c="dimmed">8 hours ago</Text>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      

      <Menu shadow="md" width={240}>
        <Menu.Target>
          <UnstyledButton style={{display: "flex", alignItems: "center"}}>
            {/* <Avatar color="cyan" radius="xl">US</Avatar> */}
            <Avatar src={currentUser?.image_profile} alt="it's me"/>
            {isMobileL ? <></>: <Text ml={16}>{currentUser?.username}</Text>}
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Group>
            {/* <Avatar color="cyan" radius="xl">US</Avatar> */}
            <Indicator 
              inline 
              size={20} 
              offset={7} 
              position="bottom-end" 
              color="gray" 
              withBorder
              style={{"cursor": 'pointer'}}
              label={<IconPencil style={{ width: '80%', height: '80%' }} stroke={2} />}
              onClick={() => navigate(`loading/user+profile+${currentUser?.uid}+image`)}
            >
              <Avatar src={currentUser?.image_profile} alt="it's me" />
            </Indicator>
            <Flex
              mih={50}
              gap="0"
              justify="center"
              align="flex-start"
              direction="column"
              wrap="wrap"
            >
              <Text size="sm">{currentUser?.username}</Text>
              <Text c="dimmed" size="sm">{currentUser?.email}</Text>
            </Flex>
          </Group>
          <Menu.Divider />
          <Menu.Item 
            leftSection={<IconUser size={15}/>} 
            onClick={() => navigate(`loading/user+profile+${currentUser?.uid}`)}
          >
            {t('View profile')}
          </Menu.Item>
          <Menu.Item 
            leftSection={<IconEdit size={15}/>}
            onClick={() => navigate(`loading/user+profile+${currentUser?.uid}+edit`)}  
          >
            {t('Edit profile')}
          </Menu.Item>
          <Menu.Item 
            leftSection={<IconSettings size={15}/>}
            onClick={() => navigate(`loading/account+setting`)} 
          >
            {t('Account setting')}
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item leftSection={<IconLogout size={15}/>} onClick={() => signOutHandler()}>
            {t('Sign out')}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}