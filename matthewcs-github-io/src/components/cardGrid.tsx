import React, { ReactNode } from "react";
import { Grid } from "theme-ui";

export type CardGridProps = {
  children: ReactNode;
  width?: string[];
  columns?: number[];
};

export function CardGrid(props: CardGridProps) {
  return (
    <>
      <Grid
        width={props.width ?? ["40%", "30%"]}
        columns={props.columns ?? [2, 3]}
        gap={3}
      >
        {props.children}
      </Grid>
    </>
  );
}
