import addWeeks from "date-fns/addWeeks";
import isWeekend from "date-fns/isWeekend";

import weeks from "@/data/weeks.json";

const getStartOfWeek = () => {
  const currentDate = new Date();
  const diff =
    currentDate.getDate() -
    currentDate.getDay() +
    (currentDate.getDay() === 0 ? -6 : 1);
  return new Date(currentDate.setDate(diff)).setHours(0, 0, 0, 0);
};

const getCurrentWeek = () => {
  const startOfWeek = getStartOfWeek();

  const currentWeek = weeks.find(
    (week) => new Date(week.date).setHours(0, 0, 0, 0) == startOfWeek,
  );

  return currentWeek?.week;
};

const displayCurrentWeek = () => {
  const currentWeek = getCurrentWeek();

  if (isWeekend(new Date())) return "the weekend";
  if (!currentWeek || currentWeek === 0) return "half term";
  if (currentWeek === 1) return "week 1";
  if (currentWeek === 2) return "week 2";
};

const getNextWeek = () => {
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

export { getStartOfWeek, getCurrentWeek, displayCurrentWeek, getNextWeek };
