/** @jsxImportSource theme-ui */
import React from "react";
import { Flex, Box } from "theme-ui";
import { alpha } from "@theme-ui/color";
import { ThemeToggler, ThemeTogglerProps } from "../components/themeToggler";

export type HeaderProps = {
  text: string;
  themeToggler: ThemeTogglerProps;
};

export function Header(props: HeaderProps) {
  return (
    <Flex
      sx={{
        "*": {
          transition: "all 0.3s ease",
        },
        background: "background",
        backgroundImage: (t) => `
              linear-gradient(
                to right,
                ${alpha("primary", 0.6)(t)},
                ${alpha("secondary", 0.6)(t)}
              )
              `,
        alignItems: "center",
        borderBottom: (t) => `solid 10pt ${alpha("muted", 0.3)(t)}`,
        position: "sticky",
        top: 0,
        zIndex: 1,
      }}
    >
      <Box
        p={10}
        sx={{
          flex: "1 1 auto",
        }}
      >
        <h1>{props.text}</h1>
      </Box>
      <Box p={10}>
        <ThemeToggler
          themes={props.themeToggler.themes}
          defaultThemeIndex={props.themeToggler.defaultThemeIndex}
          onChangeEvent={props.themeToggler.onChangeEvent}
        />
      </Box>
    </Flex>
  );
}
