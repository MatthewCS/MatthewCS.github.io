/** @jsxImportSource theme-ui */
import React, { ReactNode } from "react";
import { useThemedStylesWithMdx } from "@theme-ui/mdx";
import { MDXProvider, useMDXComponents } from "@mdx-js/react";
import { MDXComponents } from "mdx/types";

export type MarkdownProps = {
  children: ReactNode;
  mdxComponents?: MDXComponents;
};

export function Markdown(props: MarkdownProps) {
  const componentsWithStyles = useThemedStylesWithMdx(
    useMDXComponents(props.mdxComponents)
  );

  return (
    <div
      sx={{
        ml: "8%",
        pl: "2%",
        mr: "35%",
        borderLeft: "solid",
      }}
    >
      <MDXProvider components={componentsWithStyles}>
        {props.children}
      </MDXProvider>
    </div>
  );
}
