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
  em
} from '@mantine/core';
import { 
  IconSun, 
  IconMoon, 
  IconUser, 
  IconEdit, 
  IconSettings, 
  IconLogout, 
  IconBell 
} from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

export function Header() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  const isMobileS = useMediaQuery(`(max-width: ${em(320)})`);

  return (
    <Group justify="flex-end">
      <ActionIcon
          onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
          variant="default"
          size={isMobileS ? "xs": "lg"}
          aria-label="Toggle color scheme"
        >
          {computedColorScheme === 'light' ? <IconMoon stroke={1.5} size={20} /> : <IconSun stroke={1.5} size={20} />}
      </ActionIcon>

      <ActionIcon variant="default" color="gray" aria-label="Settings" size={isMobileS ? "xs": "lg"}>
        <Indicator inline label="5" size={18}>
          <IconBell stroke={1.5} size={20} />
        </Indicator>
      </ActionIcon>

      <Menu shadow="md" width={200}>
        <Menu.Target>
          <UnstyledButton>
            <Avatar color="cyan" radius="xl">US</Avatar>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Group>
            <Avatar color="cyan" radius="xl">US</Avatar>
            {/* <Avatar src="avatar.png" alt="it's me" /> */}
            <Flex
              mih={50}
              gap="0"
              justify="center"
              align="flex-start"
              direction="column"
              wrap="wrap"
            >
              <Text size="sm">Username</Text>
              <Text c="dimmed" size="sm">User@email.com</Text>
            </Flex>
          </Group>
          <Menu.Divider />
          <Menu.Item leftSection={<IconUser size={15}/>}>
            View profile
          </Menu.Item>
          <Menu.Item leftSection={<IconEdit size={15}/>}>
            Edit profile
          </Menu.Item>
          <Menu.Item leftSection={<IconSettings size={15}/>}>
            Account setting
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item leftSection={<IconLogout size={15}/>}>
            Sign out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}