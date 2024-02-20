import React from 'react';
import { Modal, Text, Group, Button, Divider, ScrollArea , List } from '@mantine/core';
import { IconLicense } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

interface IProps {
  opened: boolean;
  close: VoidFunction;
}

const TermsOfUseModal: React.FC<IProps> = (props) =>{
	const { t } = useTranslation();
  return (
		<Modal opened={props.opened} onClose={props.close} title={<Group><IconLicense size={30}/><Text size="lg" fw="bold">{t('Terms of Use')}</Text></Group>} size={"xl"}>
			<Divider pb={16}/>
			<ScrollArea h={440} p="xl">
				<Text fw="bold" ta="center" mb={20}>Paper is the most basic ui component</Text>
				<Text mb={20}>
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
					Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
					when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
					It has survived not only five centuries, but also the leap into electronic typesetting, 
					remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset 
					sheets containing Lorem Ipsum passages, and more recently with desktop publishing software 
					like Aldus PageMaker including versions of Lorem Ipsum.
				</Text>
				<List mb={20}>
					<List.Item>Clone or download repository from GitHub</List.Item>
					<List.Item>Install dependencies with yarn</List.Item>
					<List.Item>To start development server run npm start command</List.Item>
					<List.Item>Run tests to make sure your changes do not break the build</List.Item>
					<List.Item>Submit a pull request once you are done</List.Item>
				</List>
				<Text mb={20}>
					It is a long established fact that a reader will be distracted by the readable content 
					of a page when looking at its layout. The point of using Lorem Ipsum is that it has a 
					more-or-less normal distribution of letters, as opposed to using 'Content here, content here', 
					making it look like readable English. Many desktop publishing packages and web page editors
					now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will 
					uncover many web sites still in their infancy. Various versions have evolved over the years,
					sometimes by accident, sometimes on purpose (injected humour and the like).
				</Text>
				<List mb={20}>
					<List.Item>Clone or download repository from GitHub</List.Item>
					<List.Item>Install dependencies with yarn</List.Item>
					<List.Item>To start development server run npm start command</List.Item>
					<List.Item>Run tests to make sure your changes do not break the build</List.Item>
					<List.Item>Submit a pull request once you are done</List.Item>
				</List>
   		</ScrollArea >
			<Divider pb={16}/>
			<Group justify="center">
				<Button variant="default" onClick={props.close}>{t('Close')}</Button>
			</Group>
    </Modal>
	)
}

export default TermsOfUseModal;