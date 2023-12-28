import dayjs from 'dayjs';
import { DateInputProps } from '@mantine/dates';

export const dateParser: DateInputProps['dateParser'] = (input) => {
  return dayjs(input, 'DD/MM/YYYY').toDate();
};