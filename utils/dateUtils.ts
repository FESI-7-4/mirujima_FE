import { WEEK_DAYS } from '@/constant/date';

const today = new Date();
const tomorrow = new Date();
const dayAfterTomorrow = new Date();

tomorrow.setDate(today.getDate() + 1);
dayAfterTomorrow.setDate(today.getDate() + 2);

export const dates = [
  { date: today.getDate(), day: WEEK_DAYS[today.getDay()] },
  { date: tomorrow.getDate(), day: WEEK_DAYS[tomorrow.getDay()] },
  { date: dayAfterTomorrow.getDate(), day: WEEK_DAYS[dayAfterTomorrow.getDay()] }
];
