import React, { useState, useEffect } from 'react';
import { 
  Text, 
  Button, 
  Group, 
  Menu, 
  ActionIcon, 
  rem, 
  Breadcrumbs, 
  Anchor,
  Checkbox,
  TextInput,
  Popover,
  Pagination,
  Table,
} from '@mantine/core';
import { 
  IconTrash,
  IconSearch,
  IconAdjustments,
	IconDotsVertical
} from '@tabler/icons-react';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import { useRecoilState } from 'recoil';
import { anchorState } from '../../store/user';
import DeleteTokenModal from './components/DeleteTokenModal';
import { getTokensPagination } from '../../services/token';
import { ITokenWithUser } from '../../types/token.type';

const Tokens: React.FC = () =>{
  const [anchor, setAchor] = useRecoilState(anchorState);
  const isTablet = useMediaQuery(`(max-width: ${rem(790)})`);
  const [filterOpened, setFilterOpened] = useState(false);
  const [delUserOpened, delUserHandlers] = useDisclosure(false);
  const [delDataId, setDelDataId] = useState<string>('');
  const navigate = useNavigate();
  const [totalPage, setTotalPage]  = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [dataList, setDataList] = useState<ITokenWithUser[]>([]);

  const rows = dataList.map((item) => (
    <Table.Tr key={`table-${item.id}`}>
      <Table.Td>
				<Group align='center'>
				<Menu withinPortal position="bottom-start" shadow="sm" width={120}>
          <Menu.Target>
            <ActionIcon variant="subtle" color="indigo">
              <IconDotsVertical style={{ width: rem(16), height: rem(16) }} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
              color="red"
              onClick={() => handleDeleteItem(item.id)}
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
				<Text>{item.username}</Text>
				</Group>
      </Table.Td>
      <Table.Td ta={'center'}>
				{moment(item.create_at).format('DD/MM/YYYY, hh:mm:ss')}
      </Table.Td>
      <Table.Td ta={'center'}>
				{item.description}
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="center">
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
    getTokensPagination(page, 8).then((res: any) => {
      setDataList(res.data);
      setTotalPage(res.pagination.total_pages);
		}).catch(err => console.log(err))
  }, [page, delUserOpened]);

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
      </Group>
      </Group>

      <Table.ScrollContainer minWidth={500} mt={16}>
        <Table verticalSpacing="sm" stickyHeader>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>User</Table.Th>
              <Table.Th ta={'center'}>Create at</Table.Th>
              <Table.Th ta={'center'}>Description</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <Group justify="center" pt={36}>
        <Pagination value={page} onChange={setPage} total={totalPage}/>
      </Group>
      <DeleteTokenModal opened={delUserOpened} close={delUserHandlers.close} record_id={delDataId} setPage={setPage}/>
    </>
    
  );
}
export default Tokens