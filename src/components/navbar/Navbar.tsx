import { useState } from 'react';
import { 
  IconUser, 
  IconClipboardText, 
  IconClipboardCheck,
  IconKey,
  IconSettings,
  IconPalette,
  IconBook,
  IconMail
} from '@tabler/icons-react';
import { Box, NavLink, Text } from '@mantine/core';

const nav_links = [
  { text: 'Navigation'},
  { label: 'User', leftSection: <IconUser size="1rem" stroke={1.5} /> },
  { label: 'Profile', leftSection: <IconClipboardText size="1rem" stroke={1.5} /> },
  { label: 'Verification', leftSection: <IconClipboardCheck size="1rem" stroke={1.5} /> },
  { label: 'Token', leftSection: <IconKey size="1rem" stroke={1.5} /> },
  { text: 'Setting'},
  { label: 'Setting', leftSection: <IconSettings size="1rem" stroke={1.5} /> },
  { label: 'Theme', leftSection: <IconPalette size="1rem" stroke={1.5} /> },
  { text: 'Support'},
  { label: 'Document', leftSection: <IconBook size="1rem" stroke={1.5} /> },
  { label: 'Contact', leftSection: <IconMail size="1rem" stroke={1.5} /> },
];

export function Navbar() {
  const [active, setActive] = useState(0);

  const nav_items = nav_links.map((item, index) => {
    if (item.hasOwnProperty('text')) {
      return(
        <Text size="xs" p="xs" c="dimmed">{item.text}</Text>
      )
    } else {
      return (
        <NavLink
          href="#required-for-focus"
          key={item.label}
          active={index === active}
          label={item.label}
          // description={item.description}
          leftSection={item.leftSection}
          onClick={() => setActive(index)}
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