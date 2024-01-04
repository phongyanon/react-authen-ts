import React from "react";
import { Group, Paper, SimpleGrid, Text, Badge, NumberFormatter, Grid, AspectRatio, RingProgress, Center } from "@mantine/core";
import {
  IconArrowUpRight,
  IconArrowDownRight,
} from '@tabler/icons-react';
import { AreaChart, BarChart } from '@mantine/charts';
import '@mantine/charts/styles.css';
import { mockData } from "./mockData";

const data = [
  { title: 'PM2.5', icon: 'receipt', value: 13456, diff: 34 },
  { title: 'PM10', icon: 'coin', value: 4145, diff: -13 },
  { title: 'Ozone', icon: 'discount', value: 745, diff: 18 },
  { title: 'Temp C', icon: 'user', value: 188, diff: -30 },
] as const;

const Overview: React.FC = () =>{
	
	const stats = data.map((stat) => {
		const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="space-between">
          <Text size="md" c="dimmed">
            {stat.title}
          </Text>
          {/* <Icon size="1.4rem" stroke={1.5} /> */}
        </Group>

        <Group align="center" gap="xs" mt={10}>
          {/* <Text size="xl">{stat.value}</Text> */}
					<NumberFormatter style={{fontSize: "larger", fontWeight: "bold"}} value={stat.value} thousandSeparator />
					<Badge 
						color={stat.diff > 0 ? 'blue' : 'yellow'} 
						variant="light" 
						rightSection={<DiffIcon size="1rem" stroke={1.5} />}
					>
						{stat.diff}%
					</Badge>
				</Group>
        <Text fz="xs" c="dimmed" mt={7}>
					Compared to previous day
        </Text>
      </Paper>
    );
  });

	const getAQIsummary = () => {
		let aqi: number = mockData.aqi;
		let percent: number = aqi * 100 / 300;
		let color: string = '';
		let status: string = '';
		if ((aqi >= 0) && aqi <= 50) {
			color = 'green';
			status = 'Good';
		} else if ((aqi >= 51) && aqi <= 100) {
			color = 'yellow';
			status = 'Moderate';
		} else if ((aqi >= 101) && aqi <= 150) {
			color = 'orange';
			status = 'Unhealthy for sensitive'
		} else if ((aqi >= 151) && aqi <= 200) {
			color = 'red';
			status = 'Unhealthy'
		} else if ((aqi >= 201) && aqi <= 300) {
			color = 'grape.9';
			status = 'Very Unhealthy'
		} else if (aqi >= 301) {
			color = 'pink.9';
			status = 'Hazardous'
		}
		return {value: percent, color: color, status: status};
	}

	return (
	<>
	<Text size="xl">Overview</Text>
	<SimpleGrid mt={14} cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>
	<Grid mt={14}>
    <Grid.Col span={9}>
			<Text size="xl" mt={20}>PM2.5 Forecast</Text>
			<Paper withBorder p="md" mt={14} key={"PM25Forecast"}>
				<AreaChart
					pt="md"
					pr="md"
					pb="md"
					h={360}
					w={'100%'}
					data={mockData.forecast.daily.pm25}
					dataKey="day"
					series={[
						{ name: 'max', color: 'red.6' },
						{ name: 'avg', color: 'blue.6' },
						{ name: 'min', color: 'green.6' },
					]}
					curveType="monotone"
					withDots={false}
				/>
			</Paper>
		</Grid.Col>
    <Grid.Col span="auto">
			<Text size="xl" mt={20}>O3 stats</Text>
			<Paper withBorder p="md" mt={14} key={"O3Forecast"}>
				<BarChart
					h={360}
					data={mockData.forecast.daily.o3.slice(-7)}
					dataKey="day"
					type="stacked"
					orientation="vertical"
					series={[
						{ name: 'max', color: 'violet.6' },
						{ name: 'avg', color: 'blue.6' },
						{ name: 'min', color: 'teal.6' },
					]}
					tickLine="y"
					gridAxis="none"
					withXAxis={false}
				/>
			</Paper>
		</Grid.Col>
  </Grid>
	<Grid mt={14}>
    <Grid.Col span={9}>
			<Text size="xl" mt={20}>Location</Text>
			<Paper withBorder p="md" mt={14} key={"Location"}>
				<AspectRatio ratio={16 / 9} h={300}>
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d124435.14077610777!2d100.89267199999999!3d12.9335296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sth!2sth!4v1704350835370!5m2!1sth!2sth"
					title="Google map"
					style={{ border: 0 }}
				/>
			</AspectRatio>
			</Paper>
		</Grid.Col>
    <Grid.Col span="auto">
			<Text size="xl" mt={20}>Summary</Text>
			<Paper withBorder p="md" mt={14} key={"Summary"}>
				<Center h={300}>
					<RingProgress
						size={240}
						thickness={26}
						sections={[{ value: getAQIsummary().value, color: getAQIsummary().color }]}
						label={
							<Text c={getAQIsummary().color} fw={700} ta="center" size="xl">
								{getAQIsummary().status}
							</Text>
						}
					/>
				</Center>
			</Paper>
		</Grid.Col>
  </Grid>
	</>
	)
}

export default Overview;