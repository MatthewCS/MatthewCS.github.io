/** @jsxImportSource theme-ui */
import React from "react";
import { Theme, ThemeProvider, Flex, Box } from "theme-ui";
import { darkTheme, deepTheme, robotoTheme } from "../themes";
import { ThemeToggler } from "../components/themeToggler";

type FrontPageProps = {};
type FrontPageState = {
  currentThemeName: string;
  currentThemeIndex: number;
  currentTheme: Theme;
};

const ALL_THEMES: { themeName: string; theme: Theme }[] = [
  { themeName: "dark", theme: darkTheme },
  { themeName: "deep", theme: deepTheme },
  { themeName: "roboto", theme: robotoTheme },
];

class FrontPage extends React.Component<FrontPageProps, FrontPageState> {
  constructor(props: FrontPageProps) {
    super(props);

    let initialThemeName: string;
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

    initialThemeName = ALL_THEMES[initialThemeIndex].themeName;
    initialTheme = ALL_THEMES[initialThemeIndex].theme;

    this.state = {
      currentThemeName: initialThemeName,
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
      currentThemeName: newTheme.themeName,
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
      <ThemeProvider theme={this.state.currentTheme}>
        <div
          sx={{
            "*": {
              transition: "all 1s ease-out",
            },
          }}
        >
          <Flex>
            <Box p={2}>
              <h1>PLACEHOLDER</h1>
            </Box>
            <Box p={2}>
              <ThemeToggler
                themes={[
                  { themeName: "dark", theme: darkTheme },
                  { themeName: "deep", theme: deepTheme },
                  { themeName: "roboto", theme: robotoTheme },
                ]}
                defaultThemeIndex={this.state.currentThemeIndex}
                onChangeEvent={this.changeTheme}
              />
            </Box>
          </Flex>
          <p>This page is a placeholder. Expect more soon!</p>
        </div>
      </ThemeProvider>
    );
  }
}

export default FrontPage;
