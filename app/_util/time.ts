import {
  differenceInDays,
  format,
  isPast,
  isSameHour,
  isSameMinute,
  isToday,
  isTomorrow,
} from "date-fns";

const minutesToHoursAndMinutes = (totalMinutes: number) => {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
};

export { minutesToHoursAndMinutes };

export const isAllDay = (dateLeft: number | Date, dateRight: number | Date) => {
  return isSameMinute(dateLeft, dateRight) && isSameHour(dateLeft, dateRight);
};

export const formatRelativeDate = (date: number | Date) => {
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  if (isPast(date)) return `${differenceInDays(new Date(), date)} days ago`;
  return format(date, "EEE, dd MMM");
};
