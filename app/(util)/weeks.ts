import weeks from "@/data/weeks.json";

export const getCurrentWeek = () => {
  const currentDate = new Date();
  const diff =
    currentDate.getDate() -
    currentDate.getDay() +
    (currentDate.getDay() === 0 ? -6 : 1);
  const startOfWeek = new Date(currentDate.setDate(diff)).setHours(0, 0, 0, 0);

  const currentWeek = weeks.find(
    (week) => new Date(week.date).setHours(0, 0, 0, 0) == startOfWeek,
  );

  return currentWeek?.week;
};
