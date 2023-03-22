import dayjs from 'dayjs';

const today = dayjs();

export const formatDate = (source: string) => {
  const date = dayjs(source);

  return date.isSame(today, 'date')
    ? date.format('HH:mm')
    : date.format('YYYY-MM-DD');
};
