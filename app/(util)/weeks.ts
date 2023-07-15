import weeks from "@/data/weeks.json";
import addWeeks from "date-fns/addWeeks";

const getStartOfWeek = () => {
  const currentDate = new Date();
  const diff =
    currentDate.getDate() -
    currentDate.getDay() +
    (currentDate.getDay() === 0 ? -6 : 1);
  return new Date(currentDate.setDate(diff)).setHours(0, 0, 0, 0);
};

export const getCurrentWeek = () => {
  const startOfWeek = getStartOfWeek();

  const currentWeek = weeks.find(
    (week) => new Date(week.date).setHours(0, 0, 0, 0) == startOfWeek,
  );

  return currentWeek?.week;
};

export const getNextWeek = () => {
  const startOfWeek = getStartOfWeek();
  if (!startOfWeek) throw new Error("Start of week not found");

  const startOfNextWeek = addWeeks(startOfWeek, 1);

  const nextWeek = weeks.find(
    (week) =>
      new Date(week.date).setHours(0, 0, 0, 0) ==
      startOfNextWeek.setHours(0, 0, 0, 0),
  );

  return nextWeek?.week;
};
