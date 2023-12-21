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
  Paper,
  em,
  SimpleGrid 
} from '@mantine/core';
import { 
  IconEdit, 
  IconTrash,
  IconDots
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
  const isMobileS = useMediaQuery(`(max-width: ${em(325)})`);
  const isTablet = useMediaQuery(`(max-width: ${em(768)})`);

  return (
    <>
      <Breadcrumbs>
        {
          anchor.map((item, index) => (
            <Anchor href={item.href} key={index}>
              {item.title}
            </Anchor>
            ))
        }
      </Breadcrumbs>
      <Paper shadow="md" withBorder p={isMobileS ? "0" : "sm"} mt="lg">
        <SimpleGrid cols={isTablet ? 1 : 4}>
          {
            mockUsers.map((item, index) => (
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
            ))
          }
        </SimpleGrid >
        
      </Paper>
    </>
    
  );
}
export default Users