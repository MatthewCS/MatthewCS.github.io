/** @jsxImportSource theme-ui */
import React from "react";
import { Card, Flex, Box, Text } from "theme-ui";
import { alpha } from "@theme-ui/color";
import BoxResizeOnHover from "./boxResizeOnHover";

export type SkillCardProps = {
  vectorUrl: string;
  text: string;
  cardWidth: string;
  href: string;
};

export function SkillCard(props: SkillCardProps) {
  return (
    <Card
      mb={0.9}
      sx={{
        width: props.cardWidth,
        boxShadow: (t) => `0 10pt 1pt ${alpha("muted", 0.95)(t)}`,
        border: "solid",
        borderColor: (t) => alpha("secondary", 0.5)(t),
      }}
    >
      <Flex
        sx={{
          flexFlow: "column",
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
          <a href={props.href} sx={{ textDecoration: "none", color: "text" }}>
            <Text sx={{ fontSize: 4 }}>{props.text}</Text>
          </a>
        </Box>
      </Flex>
    </Card>
  );
}
