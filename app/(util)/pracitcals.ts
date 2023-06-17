import sciencesData from "@/data/science.json";
import { notFound } from "next/navigation";

export const getScience = (id: string) => {
  if (id !== "physics" && id !== "chemistry") return null;

  const science =
    id === "physics"
      ? sciencesData.sciences.physics
      : sciencesData.sciences.chemistry;

  return science;
};

export const getPractical = (scienceId: string, practicalId: string) => {
  const science = getScience(scienceId);
  if (!science) return { science: null, practical: null };

  const practical = science.practicals.filter((item) => {
    return item.id === practicalId;
  });

  return { science, practical: practical[0] };
};
