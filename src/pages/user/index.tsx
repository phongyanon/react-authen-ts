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
  Pagination,
  Table,
  Badge
} from '@mantine/core';
import { 
  IconEdit, 
  IconTrash,
  IconDots,
  // IconList,
  IconTable,
  IconLayoutGrid,
  IconCirclePlus,
  IconSearch,
  IconAdjustments,
  IconPencil,
  IconEye
} from '@tabler/icons-react';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import DeleteUserModal from './components/DeleteUserModal';
import { useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { anchorState } from '../../store/user';

const mockUsers = [
  {
    id: '1',
    image_profile: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png",
    first_name_EN: "Jane",
    last_name_EN: "Fingerlicker",
    username: "Fingerlicker",
    email: "jfingerlicker@me.io",
    phone: "+6699 9995555",
    role: 'user',
    status: 'active'
  },
  {
    id: '2',
    image_profile: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png",
    first_name_EN: "Pink",
    last_name_EN: "Hotlicker",
    username: "Hotlicker",
    email: "Hotlicker@email.com",
    phone: "+6693 9991111",
    role: 'user',
    status: 'active'
  },
  {
    id: '3',
    image_profile: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png",
    first_name_EN: "Elsa",
    last_name_EN: "Alivelicker",
    username: "Alivelicker",
    email: "Alivelicker@email.com",
    phone: "+6693 9992345",
    role: 'user',
    status: 'active'
  },
  {
    id: '4',
    image_profile: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png",
    first_name_EN: "Blone",
    last_name_EN: "Shortlicker",
    username: "Shortlicker",
    email: "Shortlicker@email.com",
    phone: "+6692 2222345",
    role: 'user',
    status: 'inactive'
  },
  {
    id: '5',
    image_profile: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png",
    first_name_EN: "Sita",
    last_name_EN: "Shortlicker",
    username: "SitaShort",
    email: "STShortlicker@email.com",
    phone: "+6682 9002345",
    role: 'admin',
    status: 'active'
  },
]

const Users: React.FC = () =>{
  const [anchor, setAchor] = useRecoilState(anchorState);
  // const isMobileS = useMediaQuery(`(max-width: ${em(325)})`);
  const isTablet = useMediaQuery(`(max-width: ${rem(790)})`);
  const [filterOpened, setFilterOpened] = useState(false);
  const [viewMode, setViewMode] = useState<string>('card'); // card or table
  const [delUserOpened, delUserHandlers] = useDisclosure(false);
  const [delUserId, setDelUserId] = useState<string>('');
  const navigate = useNavigate();

  const rows = mockUsers.map((item) => (
    <Table.Tr key={`table-${item.id}`}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={40} src={item.image_profile} radius={40} />
          <Text fz="sm" fw={500}>
            {item.username}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>{item.email}</Table.Td>
      <Table.Td>{item.role}</Table.Td>
      <Table.Td width={150}>
        {item.status === 'active' ? (
          <Badge fullWidth variant="light">
            Active
          </Badge>
        ) : (
          <Badge color="gray" fullWidth variant="light">
            Inactive
          </Badge>
        )}
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="center">
          <ActionIcon variant="subtle" color="gray" onClick={() => {
            setAchor([...anchor, {title: item.username, href: '#'}])
            navigate(`/users/${item.id}`)
          }}
          >
            <IconEye style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="gray" onClick={() => {
            setAchor([...anchor, {title: 'edit', href: '#'}])
            navigate(`/users/${item.id}/edit`)
          }}
          >
            <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red" onClick={() => handleDeleteUser(item.id)}>
            <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  const handleDeleteUser = (userId: string) => {
    setDelUserId(userId);
    delUserHandlers.open();
  }

  return (
    <>
      <Group justify="space-between" p={6}>
        <Breadcrumbs>
          {
            anchor.map((item, index) => (
              <Anchor key={index} onClick={() => navigate(item.href)}>
                {item.title}
              </Anchor>
              ))
          }
        </Breadcrumbs>
        <Group justify={isTablet? "flex-end": "center"}>
        <Group gap="0">
          {/* <Tooltip label="List" openDelay={500}>
            <ActionIcon variant="subtle" color="gray" aria-label="Settings">
              <IconList style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
          </Tooltip> */}
          <Tooltip label="Card" openDelay={500}>
            <ActionIcon variant="subtle" color="gray" aria-label="Settings" onClick={() => {setViewMode('card')}}>
              <IconLayoutGrid style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Table" openDelay={500}>
            <ActionIcon variant="subtle" color="gray" aria-label="Settings" onClick={() => {setViewMode('table')}}>
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
          onClick={() => {
            setAchor([...anchor, {title: 'new', href: '#'}]);
            navigate("/users/new");
          }}
        >
          Add
        </Button>
      </Group>
      </Group>

      {viewMode === 'card' ? 
      <Grid justify="flex-start" mt={16}>
        {
          mockUsers.map((item, index) => (
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={index}>
            <Group justify="center">
            <Card shadow="sm" padding="lg" radius="md" withBorder w={280} key={`card-${item.id}`}>
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
                      onClick={() => {
                        setAchor([...anchor, {title: 'edit', href: '#'}]);
                        navigate(`/users/${item.id}/edit`)
                      }}
                    >
                      Edit
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                      color="red"
                      onClick={() => handleDeleteUser(item.first_name_EN)}
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
                {item.username}
              </Text>
              <Text ta="center" c="dimmed" fz="sm">
                {item.email}
              </Text>
    
              <Button variant="default" ml={0} mr={0} mt="md" onClick={() => {
                setAchor([...anchor, {title: item.username, href: '#'}])
                navigate(`/users/${item.id}`)
                }}
              >
                View
              </Button>
    
            </Card>
            </Group>
            </Grid.Col>
          ))
        }
      </Grid >
      : 
      <Table.ScrollContainer minWidth={500} mt={16}>
        <Table verticalSpacing="sm" stickyHeader>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>User</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Role</Table.Th>
              <Table.Th ta={"center"}>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      }
      <Group justify="center" pt={36}>
        <Pagination total={10} />
      </Group>
      <DeleteUserModal opened={delUserOpened} close={delUserHandlers.close} user_id={delUserId}/>
    </>
    
  );
}
export default Users