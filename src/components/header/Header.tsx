import { Avatar, Menu, Group, Flex, Text } from '@mantine/core';
import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { IconSun, IconMoon, IconUserCircle, IconEdit, IconSettings, IconLogout } from '@tabler/icons-react';

export function Header() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <Group justify="flex-end">
      <ActionIcon
          onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
          variant="default"
          size="lg"
          aria-label="Toggle color scheme"
        >
          {computedColorScheme === 'light' ? <IconMoon stroke={1.5} /> : <IconSun stroke={1.5} />}
      </ActionIcon>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Avatar color="cyan" radius="xl">US</Avatar>
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
          <Menu.Item leftSection={<IconUserCircle size={15}/>}>
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