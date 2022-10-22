import React, { ReactNode } from "react";
import { Grid } from "theme-ui";

export type CardGridProps = { children: ReactNode };

export function CardGrid(props: CardGridProps) {
  return (
    <>
      <Grid width={["40%", "30%"]} columns={[2, 3]} gap={3}>
        {props.children}
      </Grid>
    </>
  );
}
