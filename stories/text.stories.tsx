import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "../app/(ui)";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Text> = {
  title: "Ui/Typography/Text",
  component: Text,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Text>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Base: Story = {
  args: {
    children:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam repellat modi, incidunt rerum sapiente dolor quo atque, quia harum maxime soluta natus ad numquam perspiciatis? Accusamus consequuntur non dignissimos repellendus.",
  },
};
