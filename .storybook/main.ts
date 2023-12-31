import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";
const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-styling",
      options: {
        // Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
        // For more details on this addon's options.
        postCss: true,
      },
    },
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config, { configType }) => {
    if (!config.resolve) return config;

    config.resolve.alias = {
      ...config.resolve.alias,
      "@/ui": path.resolve(__dirname, "../app/(ui)/index.ts"),
      "@/util": path.resolve(__dirname, "../app/(util)/index.ts"),
    };

    return config;
  },
};
export default config;
