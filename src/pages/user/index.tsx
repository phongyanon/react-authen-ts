import React from 'react';
import { Avatar, Text, Button, Card, Grid } from '@mantine/core';
import { 
  IconFileDescription, 
  IconEdit, 
  IconTrash
} from '@tabler/icons-react';

const Users: React.FC = () =>{
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder w={280}>
      <Avatar
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
        size={120}
        radius={120}
        mx="auto"
      />
      <Text ta="center" fz="lg" fw={500} mt="md">
        Jane Fingerlicker
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        jfingerlicker@me.io • Art director
      </Text>

			<Grid>
      	<Grid.Col span={4}>
					<Button variant="default" ml={0} mr={0} mt="md" leftSection={<IconFileDescription stroke={1.5} size={14} />}>
						View
					</Button>
				</Grid.Col>
      	<Grid.Col span={4}>
					<Button variant="default" ml={0} mr={0} mt="md" leftSection={<IconEdit stroke={1.5} size={14} />}>
						Edit
					</Button>
				</Grid.Col>
      	<Grid.Col span={4}>
					<Button variant="default" ml={0} mr={0} mt="md" leftSection={<IconTrash stroke={1.5} size={14} />}>
						Delete
					</Button>
				</Grid.Col>
    	</Grid>
      
    </Card>
  );
}
export default Users