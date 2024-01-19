import React, { useState, useEffect } from 'react';
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
import { useMediaQuery, useDisclosure, usePagination } from '@mantine/hooks';
import DeleteUserModal from './components/DeleteUserModal';
import { getUsersPagination } from '../../services/user';
import { useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { anchorState } from '../../store/user';
import { IUserList } from '../../types/user.type';
import { mockUsers } from './mockUser';

const Users: React.FC = () =>{
  const [anchor, setAchor] = useRecoilState(anchorState);
  // const isMobileS = useMediaQuery(`(max-width: ${em(325)})`);
  const isTablet = useMediaQuery(`(max-width: ${rem(790)})`);
  const [filterOpened, setFilterOpened] = useState(false);
  const [viewMode, setViewMode] = useState<string>('card'); // card or table
  const [delUserOpened, delUserHandlers] = useDisclosure(false);
  const [delUserId, setDelUserId] = useState<string>('');
  const navigate = useNavigate();
  const [totalPage, setTotalPage]  = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [userList, setUserList] = useState<IUserList[]>([]);
  // const pagination = usePagination({ total: 10, page, onChange });

  const rows = userList.map((item) => (
    <Table.Tr key={`table-${item.id}`}>
      <Table.Td>
        <Group gap="sm">
          {/* <Avatar size={40} src={item.image_profile} radius={40} /> */}
          {item.username.length > 30 ? 
            <Tooltip
              withArrow
              position="bottom-start"
              transitionProps={{ duration: 200 }}
              label={item.username}
            >
              <Text fz="sm" fw={500}>{item.username.slice(0, 30) + '...'}</Text>
            </Tooltip>
            : 
            <Text fz="sm" fw={500}>{item.username}</Text>
          }
        </Group>
      </Table.Td>

      <Table.Td>
        {item.email.length > 30 ? 
          <Tooltip
            withArrow
            position="bottom-start"
            transitionProps={{ duration: 200 }}
            label={item.email}
          >
            <Text fz="sm" fw={400}>{item.email.slice(0, 30) + '...'}</Text>
          </Tooltip>
          : 
          <Text fz="sm" fw={400}>{item.email}</Text>
        }
      </Table.Td>
      {/* <Table.Td>{item.role.join(', ')}</Table.Td> */}
      <Table.Td>User</Table.Td>
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

  useEffect(() => {
    getUsersPagination(page, 5).then(
      (res) => {
        // console.log('users: ', res)
        if (res.error) console.log(res.err);
        else {
          setTotalPage(res.pagination.total_pages);
          setUserList(res.data);
        }
      }
    ).catch(err => console.log(err))
  }, [page]);

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
          userList.map((item, index) => (
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={index}>
            <Group justify="center">
            <Card shadow="sm" padding="lg" radius="md" withBorder w={280} key={`card-${item.id}`}>
              <Group justify="space-between">
                {item.status === 'active' ? (
                  <Badge size="lg" color="cyan">
                    Active
                  </Badge>
                ) : (
                  <Badge size="lg" color="gray">
                    Inactive
                  </Badge>
                )}
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
              {item.username.length > 30 ? 
                <Tooltip
                  withArrow
                  position="bottom-start"
                  transitionProps={{ duration: 200 }}
                  label={item.username}
                >
                  <Text fz="lg" fw={500} mt="md">
                    {item.username.slice(0, 30) + '...'}
                  </Text>
                </Tooltip>
                : 
                <Text fz="lg" fw={500} mt="md">
                  {item.username}
                </Text>
              }
              <Text fz="sm" c="dimmed" fw={400} mt="md">
                Email
              </Text>
              {item.email.length > 30 ? 
                <Tooltip
                  withArrow
                  position="bottom-start"
                  transitionProps={{ duration: 200 }}
                  label={item.email}
                >
                  <Text fz="md" fw={500} ml="xs">
                    {item.email.slice(0, 30) + '...'}    
                  </Text>
                </Tooltip>
                : 
                <Text fz="md" fw={500} ml="xs">
                  {item.email}    
                </Text>
              }
              <Text fz="sm" c="dimmed" fw={400} mt="md">
                Role
              </Text>
              <Group mt="xs" ml="xs" gap={6}>
                {['User'].map((r: any) => <Badge key={`${item.id}-${r}`} color="violet" radius="xs" variant="light">{r}</Badge>)}
              </Group>
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
        <Pagination value={page} onChange={setPage} total={totalPage}/>
      </Group>
      <DeleteUserModal opened={delUserOpened} close={delUserHandlers.close} user_id={delUserId}/>
    </>
    
  );
}
export default Users