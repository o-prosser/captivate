const minutesToHoursAndMinutes = (totalMinutes: number) => {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
};

export { minutesToHoursAndMinutes };
