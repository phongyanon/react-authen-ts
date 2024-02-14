import React, { useState, useEffect } from 'react';
import { 
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
  ThemeIcon,
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
import { IconCheck, IconX } from '@tabler/icons-react';
import { getUsersPagination } from '../../services/user';
import { useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { anchorState } from '../../store/user';
import { getVerifications } from '../../services/verification';
import { IAddVerification, IVerificationWithUser } from '../../types/verification.type';

const Verifications: React.FC = () =>{
  const [anchor, setAchor] = useRecoilState(anchorState);
  const isTablet = useMediaQuery(`(max-width: ${rem(790)})`);
  const [filterOpened, setFilterOpened] = useState(false);
  const [delUserOpened, delUserHandlers] = useDisclosure(false);
  const [delDataId, setDelDataId] = useState<string>('');
  const navigate = useNavigate();
  const [totalPage, setTotalPage]  = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [dataList, setDataList] = useState<IVerificationWithUser[]>([]);

  const rows = dataList.map((item) => (
    <Table.Tr key={`table-${item.id}`}>
      <Table.Td>
        {item.user_id.toString()}
      </Table.Td>
      <Table.Td ta={'center'}>
				{item.email_verified ? 
					<ThemeIcon variant="light" radius="xl" color="teal">
						<IconCheck style={{ width: '70%', height: '70%' }} />
					</ThemeIcon>
				:
				<ThemeIcon variant="light" radius="xl" color="red">
					<IconX style={{ width: '70%', height: '70%' }} />
				</ThemeIcon>
				}
      </Table.Td>
			<Table.Td ta={'center'}>
				{item.enable_opt ? 
					<ThemeIcon variant="light" radius="xl" color="teal">
						<IconCheck style={{ width: '70%', height: '70%' }} />
					</ThemeIcon>
				:
				<ThemeIcon variant="light" radius="xl" color="red">
					<IconX style={{ width: '70%', height: '70%' }} />
				</ThemeIcon>
				}
      </Table.Td>
			<Table.Td ta={'center'}>
				{item.otp_verified ? 
					<ThemeIcon variant="light" radius="xl" color="teal">
						<IconCheck style={{ width: '70%', height: '70%' }} />
					</ThemeIcon>
				:
				<ThemeIcon variant="light" radius="xl" color="red">
					<IconX style={{ width: '70%', height: '70%' }} />
				</ThemeIcon>
				}
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="center">
          <ActionIcon variant="subtle" color="gray" onClick={() => {
            setAchor([...anchor, {title: item.id, href: '#'}])
            navigate(`/verifications/${item.id}`)
          }}
          >
            <IconEye style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="gray" onClick={() => {
            setAchor([...anchor, {title: 'edit', href: '#'}])
            navigate(`/verifications/${item.id}/edit`)
          }}
          >
            <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red" onClick={() => handleDeleteItem(item.id)}>
            <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  const handleDeleteItem = (id: string) => {
    setDelDataId(id);
    delUserHandlers.open();
  }

  useEffect(() => {
    getVerifications().then((res: any) => {
      setDataList(res);
		}).catch(err => console.log(err))
  }, [delUserOpened]);

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
            navigate("/verifications/new");
          }}
        >
          Add
        </Button>
      </Group>
      </Group>

      <Table.ScrollContainer minWidth={500} mt={16}>
        <Table verticalSpacing="sm" stickyHeader>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>User</Table.Th>
              <Table.Th ta={'center'}>Email verified</Table.Th>
              <Table.Th ta={'center'}>Enable opt</Table.Th>
              <Table.Th ta={'center'}>Otp verified</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      
      {/* <DeleteUserModal opened={delUserOpened} close={delUserHandlers.close} user_id={delDataId} setPage={setPage}/> */}
    </>
    
  );
}
export default Verifications