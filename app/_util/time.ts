import { isSameHour, isSameMinute } from "date-fns";

const minutesToHoursAndMinutes = (totalMinutes: number) => {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
};

export { minutesToHoursAndMinutes };

export const isAllDay = (dateLeft: number | Date, dateRight: number | Date) => {
  return isSameMinute(dateLeft, dateRight) && isSameHour(dateLeft, dateRight);
};
