import { Text } from '@mantine/core';
import { IconBrandReact } from '@tabler/icons-react';

export function Header() {

  return (
    <>
      <IconBrandReact size={30} color="#0063FF"/>
      <Text c="blue" fw="bold" size="lg">React Authen TS</Text>
    </>
  );
}