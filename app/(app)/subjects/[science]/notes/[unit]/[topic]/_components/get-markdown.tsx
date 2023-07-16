import Physics11 from "../_markdown/physics1-1.mdx";
import Physics12 from "../_markdown/physics1-2.mdx";
import Physics13 from "../_markdown/physics1-3.mdx";
import Physics14 from "../_markdown/physics1-4.mdx";
import Physics15 from "../_markdown/physics1-5.mdx";
import Physics16 from "../_markdown/physics1-6.mdx";
import Physics17 from "../_markdown/physics1-7.mdx";

const GetMarkdown = ({
  science,
  unit,
  topic,
}: {
  science: string;
  unit: number;
  topic: number;
}) => {
  let Component;

  if (science === "physics") {
    if (unit === 1) {
      if (topic === 1) Component = <Physics11 />;
      if (topic === 2) Component = <Physics12 />;
      if (topic === 3) Component = <Physics13 />;
      if (topic === 4) Component = <Physics14 />;
      if (topic === 5) Component = <Physics15 />;
      if (topic === 6) Component = <Physics16 />;
      if (topic === 7) Component = <Physics17 />;
    }
  }

  // if (!Component) throw new Error("Science not found");

  return Component;
};

export default GetMarkdown;
