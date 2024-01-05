import { 
	AppShell, 
	Overlay, 
	Container, 
	Title, 
	Button, 
	Text, 
	Group, 
	ActionIcon,
	useComputedColorScheme,
	useMantineColorScheme,
	useMantineTheme,
	Card,
	Flex,
	SimpleGrid,
	em,
	rem,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { 
	IconBrandReact,
	IconMoon,
	IconSun,
	IconChartLine,
	IconUser,
	IconLock,
	IconBrandTwitter,
	IconBrandYoutube,
	IconBrandFacebook,
 } from '@tabler/icons-react';
import classes from './landing.module.css';
import { useMediaQuery } from '@mantine/hooks';

const links = [
  { link: '/about', label: 'Features' },
  { link: '/pricing', label: 'Pricing' },
  { link: '/document', label: 'Document' },
  { link: '/contact', label: 'Contact' },
];

const featureList = [
  {
    title: 'Data Visualization',
    description:
      'Intigarte data to be graph, gauge, chart or dashboard.',
    icon: IconChartLine,
  },
  {
    title: 'User Management',
    description:
      'Provide feature to manage user data and keep user privacy.',
    icon: IconUser,
  },
  {
    title: 'Security',
    description:
      'Token base authentication will be apply to system and TOTP for more secure data.',
    icon: IconLock,
  },
];

export function LandingPage() {
  const { setColorScheme } = useMantineColorScheme();
	const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  const isMobileS = useMediaQuery(`(max-width: ${em(325)})`);
	const theme = useMantineTheme();
	const navigate = useNavigate();

  const features = featureList.map((feature) => (
    <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
      <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={2}
        color={theme.colors.blue[6]}
      />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));
  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </a>
  ));

  return (
		<AppShell
      header={{ height: 60 }}
      padding="md"
    >
		<AppShell.Header>
      <Group h="100%" px="md" grow preventGrowOverflow={false}>
        <Group preventGrowOverflow={false}>
          <IconBrandReact size={30} color="#0063FF"/>
          <Text c="blue" fw="bold" size="lg" visibleFrom="sm">React Authen TS</Text>
        </Group>
        <Group justify="flex-end" gap={5}>
					<ActionIcon
						onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
						variant="default"
						radius="md"
						size={isMobileS ? "xs": "lg"}
						aria-label="Toggle color scheme"
					>
						{computedColorScheme === 'light' ? <IconMoon stroke={1.5} size={20} /> : <IconSun stroke={1.5} size={20} />}
					</ActionIcon>
					<Flex visibleFrom="sm">
          {items}
					</Flex>
					<Button variant="subtle" radius="xs" onClick={() => navigate('/signin')}>Sign in</Button>
					<Button variant="outline" radius="xs" onClick={() => navigate('/register')}>Sign up</Button>
        </Group>
      </Group>
    </AppShell.Header>
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="md">
        <Title className={classes.title}>React Typescript Authentication Platform</Title>
        <Text className={classes.description} size="xl" mt="xl">
          Boilerplate for start-up project that has a plenty of showcase for present to 
					customer or MVP starter for developer. This project will improve our productivity 
					and techinical knowledge about web development. 
        </Text>

        <Button 
					variant="gradient" 
					gradient={{ from: 'blue', to: 'grape', deg: 150 }} 
					size="xl" 
					radius="md" 
					className={classes.control}
					onClick={() => navigate('/signin')}
				>
          Get started
        </Button>
      </Container>
    </div>
		<Container size="lg" py="xl">

      <Title order={2} className={classes.featureTitle} ta="center" mt="sm">
        Boilerplate project for startup MVP
      </Title>

      <Text c="dimmed" className={classes.featutrDescription} ta="center" mt="md">
        This project has an objective to be an example source code that help us to 
				make new project faster. The brand new MVP will be go live in 3 months. 
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
		<div className={classes.footer}>
      <div className={classes.inner}>
				<Group preventGrowOverflow={false}>
          <IconBrandReact size={30} color="#0063FF"/>
          <Text c="blue" fw="bold" size="lg" visibleFrom="sm">React Authen TS</Text>
        </Group>

        <Group className={classes.links}>{items}</Group>

        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandFacebook style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>
    </div>
		</AppShell>
  );
}