/** @jsxImportSource theme-ui */
import React from "react";
import { Theme, ThemeProvider } from "theme-ui";
import { MDXProvider } from "@mdx-js/react";
import { darkTheme, deepTheme, robotoTheme } from "../themes";
import { Header } from "../components/header";
import AboutMe from "./contents/about-me.mdx";

type FrontPageProps = {};
type FrontPageState = {
  currentThemeIndex: number;
  currentTheme: Theme;
};

const ALL_THEMES: { themeName: string; theme: Theme }[] = [
  { themeName: "Dark", theme: darkTheme },
  { themeName: "Deep", theme: deepTheme },
  { themeName: "Roboto", theme: robotoTheme },
];

class FrontPage extends React.Component<FrontPageProps, FrontPageState> {
  constructor(props: FrontPageProps) {
    super(props);

    let initialThemeIndex: number;
    let initialTheme: Theme;

    // Do we have a theme cached?
    try {
      const indexStr = window.sessionStorage.getItem("current-theme-index");
      if (indexStr) {
        initialThemeIndex = +indexStr;

        if (
          isNaN(initialThemeIndex) ||
          initialThemeIndex < 0 ||
          initialThemeIndex >= ALL_THEMES.length
        )
          initialThemeIndex = 1; // deep
      } else initialThemeIndex = 1; // deep
    } catch (err) {
      initialThemeIndex = 1; // deep
    }

    initialTheme = ALL_THEMES[initialThemeIndex].theme;

    this.state = {
      currentThemeIndex: initialThemeIndex,
      currentTheme: initialTheme,
    };

    this.changeTheme = this.changeTheme.bind(this);
  }

  changeTheme(event: React.ChangeEvent<HTMLSelectElement>) {
    const index = +event.target.value;
    if (isNaN(index) || index < 0 || index >= ALL_THEMES.length) return;

    const newTheme = ALL_THEMES[index];
    this.setState({
      currentThemeIndex: index,
      currentTheme: newTheme.theme,
    });

    // Cache the selected theme
    try {
      window.sessionStorage.setItem("current-theme-index", index.toString());
    } catch (err) {
      // If we fail to cache the theme, it isn't that big of an issue.
      // Just log it and continue on
      console.error(`Error when saving theme to session storage: ${err}`);
    }
  }

  render() {
    return (
      <div
        sx={{
          "*": {
            transition: "all .3s ease-out",
          },
        }}
      >
        <ThemeProvider theme={this.state.currentTheme}>
          <Header
            text={"Matthew Sprague"}
            themeToggler={{
              themes: ALL_THEMES,
              defaultThemeIndex: this.state.currentThemeIndex,
              onChangeEvent: this.changeTheme,
            }}
          />
          <div
            sx={{
              ml: "8%",
              pl: "2%",
              mr: "35%",
              borderLeft: "solid",
            }}
          >
            <MDXProvider>
              <AboutMe />
            </MDXProvider>
          </div>
        </ThemeProvider>
      </div>
    );
  }
}

export default FrontPage;