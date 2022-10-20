import React from "react";
import { Theme, Select } from "theme-ui";

export type ThemeTogglerProps = {
  themes: { themeName: string; theme: Theme }[];
  defaultTheme: string;
  onChangeEvent: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export function ThemeToggler(props: ThemeTogglerProps) {
  return (
    <Select defaultValue={props.defaultTheme} onChange={props.onChangeEvent}>
      {props.themes.map((theme, index) => {
        return (
          <option key={theme.themeName} value={index}>
            {theme.themeName}
          </option>
        );
      })}
    </Select>
  );
}
