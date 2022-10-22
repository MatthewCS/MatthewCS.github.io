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
        ml: ["3%", "8%", "13%", "18%"],
        mr: ["5%", "10%", "15%", "20%"],
      }}
    >
      <MDXProvider components={componentsWithStyles}>
        {React.Children.map(props.children, (child) => {
          return <div sx={{ pl: ["2%"], borderLeft: "solid" }}>{child}</div>;
        })}
      </MDXProvider>
    </div>
  );
}
