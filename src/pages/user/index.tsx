import React, { useState } from 'react';
import { 
  Avatar, 
  Text, 
  Button, 
  Card, 
  Group, 
  Menu, 
  ActionIcon, 
  rem, 
  Breadcrumbs, 
  Anchor,
  Tooltip,
  Checkbox,
  Grid,
  TextInput,
  Popover,
  Pagination
} from '@mantine/core';
import { 
  IconEdit, 
  IconTrash,
  IconDots,
  IconList,
  IconTable,
  IconLayoutGrid,
  IconCirclePlus,
  IconSearch,
  IconAdjustments
} from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

interface IUserAnchor {
  title: string
  href: string
}

const mockUsers = [
  {
    image_profile: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png",
    first_name_EN: "Jane",
    last_name_EN: "Fingerlicker",
    email: "jfingerlicker@me.io"
  },
  {
    image_profile: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png",
    first_name_EN: "Pink",
    last_name_EN: "Hotlicker",
    email: "Hotlicker@email.com"
  },
  {
    image_profile: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png",
    first_name_EN: "Elsa",
    last_name_EN: "Alivelicker",
    email: "Alivelicker@email.com"
  },
  {
    image_profile: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png",
    first_name_EN: "Blone",
    last_name_EN: "Shortlicker",
    email: "Shortlicker@email.com"
  },
  {
    image_profile: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png",
    first_name_EN: "Sita",
    last_name_EN: "Shortlicker",
    email: "STShortlicker@email.com"
  },
]

const Users: React.FC = () =>{
  const [anchor, setAnchor] = useState<IUserAnchor[]>([{ title: 'Users', href: '#' }, { title: 'username', href: '#' }]);
  // const isMobileS = useMediaQuery(`(max-width: ${em(325)})`);
  const isTablet = useMediaQuery(`(max-width: ${rem(790)})`);
  const [filterOpened, setFilterOpened] = useState(false);

  return (
    <>
      <Group justify="space-between" p={6}>
        <Breadcrumbs>
          {
            anchor.map((item, index) => (
              <Anchor href={item.href} key={index}>
                {item.title}
              </Anchor>
              ))
          }
        </Breadcrumbs>
        <Group justify={isTablet? "flex-end": "center"}>
        <Group gap="0">
          <Tooltip label="List" openDelay={500}>
            <ActionIcon variant="subtle" color="gray" aria-label="Settings">
              <IconList style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Card" openDelay={500}>
            <ActionIcon variant="subtle" color="gray" aria-label="Settings">
              <IconLayoutGrid style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Table" openDelay={500}>
            <ActionIcon variant="subtle" color="gray" aria-label="Settings">
              <IconTable style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </Group>
        <TextInput
          size="sm"
          w="240"
          placeholder=" Search..."
          rightSectionWidth={34}
          leftSection={
            <ActionIcon size={36} color="gray" variant="subtle">
              <IconSearch radius="md" style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          }
          rightSection={
            <Popover opened={filterOpened} onChange={setFilterOpened} position="bottom-end" width={240}>
              <Popover.Target>
                <ActionIcon size={36} color="gray" variant="subtle" onClick={() => setFilterOpened((o) => !o)}>
                  <IconAdjustments radius="md" style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                </ActionIcon>
              </Popover.Target>
              <Popover.Dropdown>
                <Text size="sm" c="dimmed">Gender</Text>
                <Group p={12}>
                  <Checkbox label="Male"/>
                  <Checkbox label="Female"/>
                  <Checkbox label="Others"/>
                </Group>
                <Text size="sm" c="dimmed">Verified</Text>
                <Group p={12}>
                  <Checkbox label="Email"/>
                  <Checkbox label="OTP"/>
                </Group>
                <Text size="sm" c="dimmed">Status</Text>
                <Group p={12}>
                  <Checkbox label="Active"/>
                  <Checkbox label="Inactive"/>
                </Group>
                <Group p={12} grow>
                  <Button variant="filled" color="yellow" onClick={() => setFilterOpened((o) => !o)}>Done</Button>
                </Group>
              </Popover.Dropdown>
            </Popover>
          }
        />
        <Button 
          size="sm"
          variant="filled" 
          color="yellow" 
          radius="md"
          leftSection={<IconCirclePlus size={20}/>}
        >
          Add
        </Button>
      </Group>
      </Group>
      <Group justify="space-between" p={6} mb={12}>
        
        
      </Group>

      <Grid justify="flex-start">
        {
          mockUsers.map((item, index) => (
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Group justify="center">
            <Card shadow="sm" padding="lg" radius="md" withBorder w={280} key={index}>
              <Group justify="flex-end">
                <Menu withinPortal position="bottom-end" shadow="sm" width={120}>
                  <Menu.Target>
                    <ActionIcon variant="subtle" color="gray">
                      <IconDots style={{ width: rem(16), height: rem(16) }} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}
                    >
                      Edit
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                      color="red"
                    >
                      Delete
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
                </Group>
    
              <Avatar
                src={item.image_profile}
                size={120}
                radius={120}
                mx="auto"
              />
              <Text ta="center" fz="lg" fw={500} mt="md">
                {item.first_name_EN} {item.last_name_EN}
              </Text>
              <Text ta="center" c="dimmed" fz="sm">
                {item.email}
              </Text>
    
              <Button variant="default" ml={0} mr={0} mt="md">
                View
              </Button>
    
            </Card>
            </Group>
            </Grid.Col>
          ))
        }
      </Grid >
      <Group justify="center" pt={36}>
        <Pagination total={10} />
      </Group>
    </>
    
  );
}
export default Users