import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { 
  IconUser, 
  IconClipboardText, 
  IconClipboardCheck,
  IconKey,
  IconSettings,
  IconHome,
  // IconPalette,
  IconBook,
  IconMail
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { Box, NavLink, Text } from '@mantine/core';
import { anchorState } from '../../store/user';

const nav_links = [
  { text: 'Navigation'},
  { label: 'Overview', leftSection: <IconHome size="1rem" stroke={1.5} />, path: "/" },
  { label: 'User', leftSection: <IconUser size="1rem" stroke={1.5} />, path: "/users" },
  { label: 'Profile', leftSection: <IconClipboardText size="1rem" stroke={1.5} />, path: "/profiles" },
  { label: 'Verification', leftSection: <IconClipboardCheck size="1rem" stroke={1.5} />, path: "/verifications" },
  { label: 'Token', leftSection: <IconKey size="1rem" stroke={1.5} />, path: "/tokens"},
  { text: 'Config'},
  { label: 'Setting', leftSection: <IconSettings size="1rem" stroke={1.5} />, path: "/setting" },
  // { label: 'Theme', leftSection: <IconPalette size="1rem" stroke={1.5} />, path: "/theme" },
  { text: 'Support'},
  { label: 'Document', leftSection: <IconBook size="1rem" stroke={1.5} />, path: "/document" },
  { label: 'Contact', leftSection: <IconMail size="1rem" stroke={1.5} />, path: "/contact" },
];

export function Navbar() {
  const [active, setActive] = useState(0);
  const [_, setAchor] = useRecoilState(anchorState);
  const navigate = useNavigate();

  const nav_items = nav_links.map((item, index) => {
    if (item.hasOwnProperty('text')) {
      return(
        <Text size="xs" p="xs" c="dimmed" key={item.text}>{item.text}</Text>
      )
    } else {
      return (
        <NavLink
          // href={item.path}
          key={item.label}
          active={index === active}
          label={item.label}
          // description={item.description}
          leftSection={item.leftSection}
          onClick={() => {
            setAchor([{title: (item.label as string), href: (item.path as string)}])
            setActive(index)
            navigate((item.path as string))
          }}
          pl="md"
        />
      )
    }
  });

  return(
    <Box w={300}>
      {nav_items}
    </Box>);
}