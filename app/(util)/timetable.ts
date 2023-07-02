const lessonEndingTimes = ["09:35", "10:35", "12:05", "13:35", "15:00"];

export const lessonHasPassed = (lesson: number) => {
  if (lesson > 5) throw new Error("Invalid lesson number provided");
  const endingTime = lessonEndingTimes[lesson - 1];

  const time = new Date();
  const [hours, minutes] = endingTime.split(":");

  const endingDate = new Date().setHours(
    parseInt(hours),
    parseInt(minutes),
    0,
    0,
  );

  const hasPassed = time > new Date(endingDate);

  return hasPassed;
};
