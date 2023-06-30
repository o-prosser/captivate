import createMdx from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkTocPlugin from "remark-toc";

import "katex/dist/contrib/mhchem.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  // experimental: {
  //   mdxRs: true,
  // },
};

const remarkToc = [remarkTocPlugin, { maxDepth: 3 }];

const withMdx = createMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkMath, remarkToc],
    rehypePlugins: [rehypeKatex],
    // providerImportSource: "@mdx-js/react",
  },
});
export default withMdx(nextConfig);
