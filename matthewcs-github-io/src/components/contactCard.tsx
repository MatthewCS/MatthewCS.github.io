/** @jsxImportSource theme-ui */
import React from "react";
import { Card, Flex, Box, Text } from "theme-ui";
import { alpha } from "@theme-ui/color";
import BoxResizeOnHover from "./boxResizeOnHover";

export type ContactCardProps = {
  vectorUrl: string;
  text: string;
  cardWidth: string;
  href: string;
};

export function ContactCard(props: ContactCardProps) {
  return (
    <Card
      sx={{
        width: props.cardWidth,
        boxShadow: (t) => `0 10pt 1pt ${alpha("muted", 0.95)(t)}`,
        border: "solid",
        borderColor: (t) => alpha("primary", 0.5)(t),
      }}
    >
      <Flex
        sx={{
          flexFlow: "row",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BoxResizeOnHover
          initialSize={["80%", "67%", "53%", "40%"]}
          hoverSize={["90%", "80%", "70%", "60%"]}
        >
          <a href={props.href}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              sx={{
                margin: "10%",
                maxHeight: "80%",
                maxWidth: "80%",
                aspectRatio: "1 / 1",
              }}
            >
              <image xlinkHref={props.vectorUrl} width="100%" height="100%" />
            </svg>
          </a>
        </BoxResizeOnHover>
        <Box sx={{ paddingBottom: "2%" }}>
          <Text sx={{ fontSize: 4 }}>{props.text}</Text>
        </Box>
      </Flex>
    </Card>
  );
}
