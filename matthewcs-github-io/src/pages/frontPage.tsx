/** @jsxImportSource theme-ui */
import React from "react";
import { Theme, ThemeProvider, Flex, Box } from "theme-ui";
import { darkTheme, deepTheme, robotoTheme } from "../themes";
import { ThemeToggler } from "../components/themeToggler";

type FrontPageProps = {
  theme?: { themeName?: string; theme?: Theme };
};
type FrontPageState = {
  allThemes: { themeName: string; theme: Theme }[];
  currentThemeName: string;
  currentTheme: Theme;
};

class FrontPage extends React.Component<FrontPageProps, FrontPageState> {
  constructor(props: FrontPageProps) {
    super(props);

    this.state = {
      allThemes: [
        { themeName: "dark", theme: darkTheme },
        { themeName: "deep", theme: deepTheme },
        { themeName: "roboto", theme: robotoTheme },
      ],
      currentThemeName:
        props.theme && props.theme.themeName ? props.theme.themeName : "dark",
      currentTheme:
        props.theme && props.theme.theme ? props.theme.theme : darkTheme,
    };

    this.changeTheme = this.changeTheme.bind(this);
  }

  changeTheme(event: React.ChangeEvent<HTMLSelectElement>) {
    const index = +event.target.value;
    if (isNaN(index) || index < 0 || index >= this.state.allThemes.length)
      return;

    const newTheme = this.state.allThemes[index];
    this.setState({
      currentThemeName: newTheme.themeName,
      currentTheme: newTheme.theme,
    });
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
                defaultTheme={this.state.currentThemeName}
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
