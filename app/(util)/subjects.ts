export const parseSubjectName = (name: string) => {
  if (name === "Maths") return "maths";
  if (name === "maths") return "maths";
  if (name === "Chemistry") return "chemistry";
  if (name === "chemistry") return "chemistry";
  if (name === "Physics") return "physics";
  if (name === "physics") return "physics";
  return null;
};
