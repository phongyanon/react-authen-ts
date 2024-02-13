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
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { anchorState } from '../../store/user';
import { getProfilesPagination } from '../../services/profile';
import { IProfile } from '../../types/profile.type';
import DeleteProfileModal from './components/DeleteProfileModal';

const mockProfiles = [
  {
    id: '1',
    image_profile: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png",
    first_name_EN: "Jane",
    last_name_EN: "Fingerlicker",
    phone: "+6699 9995555",
		date_of_birth: "11/9/1990",
    gender: 'female'
  },
  {
    id: '2',
    image_profile: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png",
    first_name_EN: "Pink",
    last_name_EN: "Hotlicker",
    phone: "+6693 9991111",
    date_of_birth: "16/1/1990",
    gender: 'female'
  },
  {
    id: '3',
    image_profile: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png",
    first_name_EN: "Elsa",
    last_name_EN: "Alivelicker",
    phone: "+6693 9992345",
		date_of_birth: "16/11/1992",
    gender: 'female'
  },
  {
    id: '4',
    image_profile: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png",
    first_name_EN: "Blone",
    last_name_EN: "Shortlicker",
    phone: "+6692 2222345",
		date_of_birth: "9/6/1994",
    gender: 'female'
  },
  {
    id: '5',
    image_profile: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png",
    first_name_EN: "Sita",
    last_name_EN: "Shortlicker",
    phone: "+6682 9002345",
		date_of_birth: "30/12/1998",
    gender: 'female'
  },
]

const Profiles: React.FC = () =>{
  const [anchor, setAchor] = useRecoilState(anchorState);
  // const isMobileS = useMediaQuery(`(max-width: ${em(325)})`);
  const isTablet = useMediaQuery(`(max-width: ${rem(790)})`);
  const [filterOpened, setFilterOpened] = useState(false);
  const [viewMode, setViewMode] = useState<string>('card'); // card or table
  const [delProfileOpened, delProfileHandlers] = useDisclosure(false);
  const [delProfileId, setDelProfileId] = useState<string>('');
  const navigate = useNavigate();
  const [totalPage, setTotalPage]  = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [profileList, setProfileList] = useState<IProfile[]>([]);

  const rows = profileList.map((item) => (
    <Table.Tr key={`table-${item.profile_id}`}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={40} src={item.image_profile} radius={40} />
          <Text fz="sm" fw={500}>
            {item.first_name_EN}{"  "}{item.last_name_EN}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>{item.gender}</Table.Td>
      <Table.Td>{item.date_of_birth}</Table.Td>
      <Table.Td width={150}>{item.phone}</Table.Td>
      <Table.Td>
        <Group gap={0} justify="center">
          <ActionIcon variant="subtle" color="gray" onClick={() => {
            setAchor([...anchor, {title: `${item.first_name_EN}  ${item.last_name_EN}`, href: '#'}])
            navigate(`/profiles/${item.profile_id}`)
          }}
          >
            <IconEye style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="gray" onClick={() => {
            setAchor([...anchor, {title: 'edit', href: '#'}])
            navigate(`/profiles/${item.profile_id}/edit`)
          }}
          >
            <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red" onClick={() => handleDeleteProfile(item.profile_id)}>
            <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  const handleDeleteProfile = (profileId: string) => {
    setDelProfileId(profileId);
    delProfileHandlers.open();
  }

  useEffect(() => {
    getProfilesPagination(page, 8).then((res) => {
        // console.log('profiles: ', res)
        if (res.error) console.log(res.err);
        else {
          setTotalPage(res.pagination.total_pages);
          setProfileList(res.data);
        }
      }
    ).catch(err => console.log(err))
  }, [page, delProfileOpened]);

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
            navigate("/profiles/new");
          }}
        >
          Add
        </Button>
      </Group>
      </Group>

      {viewMode === 'card' ? 
      <Grid justify="flex-start" mt={16}>
        {
          profileList.map((item, index) => (
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={index}>
            <Group justify="center">
            <Card shadow="sm" padding="lg" radius="md" withBorder w={280} key={`card-${item.profile_id}`}>
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
                        navigate(`/profiles/${item.profile_id}/edit`)
                      }}
                    >
                      Edit
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                      color="red"
                      onClick={() => handleDeleteProfile(item.profile_id)}
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
                {item.first_name_EN}{"  "}{item.last_name_EN}
              </Text>
							<Text ta="center" fz="sm" c='dimmed'>
                {item.phone}
              </Text>
              <Button variant="default" ml={0} mr={0} mt="md" onClick={() => {
                setAchor([...anchor, {title: `${item.first_name_EN}  ${item.last_name_EN}`, href: '#'}])
                navigate(`/profiles/${item.profile_id}`)
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
              <Table.Th>Name</Table.Th>
              <Table.Th>Gender</Table.Th>
              <Table.Th>Date of birth</Table.Th>
              <Table.Th ta={"center"}>Phone</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      }
      <Group justify="center" pt={36}>
        <Pagination value={page} onChange={setPage} total={totalPage}/>
      </Group>
      <DeleteProfileModal opened={delProfileOpened} close={delProfileHandlers.close} profile_id={delProfileId} setPage={setPage}/>
    </>
    
  );
}
export default Profiles