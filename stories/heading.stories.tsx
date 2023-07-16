import type { Meta, StoryObj } from "@storybook/react";

import { Heading } from "../app/_ui/typography";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Heading> = {
  title: "Ui/Typography/Heading",
  component: Heading,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Heading>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const H1: Story = {
  args: {
    level: 1,
    children: "Heading 1",
  },
};

export const H2: Story = {
  args: {
    level: 2,
    children: "Heading 2",
  },
};

export const H3: Story = {
  args: {
    level: 3,
    children: "Heading 3",
  },
};

export const H4: Story = {
  args: {
    level: 4,
    children: "Heading 4",
  },
};
