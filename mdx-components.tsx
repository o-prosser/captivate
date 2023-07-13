import type { MDXComponents } from "mdx/types";
import {
  BasicTable,
  Heading,
  OrderedList,
  UnorderedList,
  TableCell,
  TableHeading,
  TableRow,
  Text,
  Callout,
  Columns,
} from "@/ui";
import MarkdownLink from "@/components/markdown-link";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

const defaultComponents: MDXComponents = {
  // Allows customizing built-in components, e.g. to add styling.
  // h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
  h1: ({ children }) => (
    <Heading level={1} link>
      {children}
    </Heading>
  ),
  h2: ({ children }) => (
    <Heading level={2} link>
      {children}
    </Heading>
  ),
  h3: ({ children }) => (
    <Heading level={3} link>
      {children}
    </Heading>
  ),
  h4: ({ children }) => (
    <Heading level={4} link>
      {children}
    </Heading>
  ),
  a: (props) => <MarkdownLink {...props} />,
  p: Text,
  strong: (props) => <span className="font-semibold" {...props} />,
  table: BasicTable,
  tr: TableRow,
  th: TableHeading,
  td: TableCell,
  ol: OrderedList,
  ul: UnorderedList,
  Callout,
  Columns,
};

export { defaultComponents as components };

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    ...components,
  };
}
