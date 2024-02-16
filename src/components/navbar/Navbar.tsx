import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
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
import { anchorState, userState } from '../../store/user';

const nav_links = [
  { text: 'Navigation'},
  { label: 'Overview', leftSection: <IconHome size="1rem" stroke={1.5} />, path: "/overview", roles: ['SuperAdmin', 'Admin', 'User'] },
  { label: 'User', leftSection: <IconUser size="1rem" stroke={1.5} />, path: "/users", roles: ['SuperAdmin', 'Admin'] },
  { label: 'Profile', leftSection: <IconClipboardText size="1rem" stroke={1.5} />, path: "/profiles", roles: ['SuperAdmin', 'Admin'] },
  { label: 'Verification', leftSection: <IconClipboardCheck size="1rem" stroke={1.5} />, path: "/verifications", roles: ['SuperAdmin', 'Admin'] },
  { label: 'Token', leftSection: <IconKey size="1rem" stroke={1.5} />, path: "/tokens", roles: ['SuperAdmin', 'Admin']},
  { text: 'Config', roles: ['SuperAdmin', 'Admin']},
  { label: 'Setting', leftSection: <IconSettings size="1rem" stroke={1.5} />, path: "/setting", roles: ['SuperAdmin', 'Admin'] },
  // { label: 'Theme', leftSection: <IconPalette size="1rem" stroke={1.5} />, path: "/theme" },
  { text: 'Support'},
  { label: 'Document', leftSection: <IconBook size="1rem" stroke={1.5} />, path: "/document" },
  { label: 'Contact', leftSection: <IconMail size="1rem" stroke={1.5} />, path: "/contact" },
];

export function Navbar() {
  const [active, setActive] = useState(0);
  const [_, setAchor] = useRecoilState(anchorState);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  const nav_items = nav_links.map((item, index) => {
    if (item.roles) {
      let hasPermission: boolean = false;
      item.roles.forEach((role: string) => {
        if (user) {
          if (user.roles.includes(role)) hasPermission = true;
        }
      });

      if (hasPermission === false) {
        return
      }
    }

    if (item.hasOwnProperty('text')) {
      return(
        <Text size="xs" p="xs" c="dimmed" key={`${item.text}-${index}`}>{item.text}</Text>
      )
    } else {
      return (
        <NavLink
          // href={item.path}
          key={`${item.label}-${index}`}
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