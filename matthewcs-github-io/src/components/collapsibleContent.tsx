/** @jsxImportSource theme-ui */
import React, { ReactNode } from "react";
import type { ElementType } from "react";
import { Flex, Box, Heading, IconButton } from "theme-ui";
import { keyframes } from "@emotion/react";

export type CollapsibleContentProps = {
  children: ReactNode;
  text: string;
  headingSize?: ElementType<any>;
};
export type CollapsibleContentState = {
  contents: ReactNode;
  isOpen: boolean;
  isHovering: boolean;
  text: string;
  headingSize: ElementType<any>;
  iconRotation: number;
  initialLoad: boolean;
  contentHeight: string;
};

class CollapsibleContent extends React.Component<
  CollapsibleContentProps,
  CollapsibleContentState
> {
  constructor(props: CollapsibleContentProps) {
    super(props);

    this.state = {
      contents: props.children,
      text: props.text,
      headingSize: props.headingSize ?? "h1",
      isHovering: false,
      isOpen: true,
      iconRotation: 0,
      initialLoad: true,
      contentHeight: "100%",
    };

    this.onHover = this.onHover.bind(this);
    this.onLeave = this.onLeave.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onHover() {
    this.setState({ isHovering: true });
  }

  onLeave() {
    this.setState({ isHovering: false });
  }

  onButtonClick() {
    const newIsOpen = !this.state.isOpen;
    this.setState({
      isOpen: newIsOpen,
      iconRotation: newIsOpen ? -180 : 0,
      initialLoad: false,
      contentHeight: newIsOpen ? "100%" : "0",
    });
  }

  render() {
    const iconColor = this.state.isHovering ? "primary" : "text";
    const iconTransform = `${
      this.state.isHovering ? "scale(2)" : "scale(1.25)"
    }`;
    const rotateKeyframes = keyframes`
    from {
      transform: rotate(${this.state.iconRotation}deg);
    }
    to {
      transform: rotate(${this.state.isOpen ? 0 : -180}deg);
    `;
    const rotateAnimation = `${rotateKeyframes} 0.5s linear 1 forwards`;
    const collapseKeyframes = keyframes`
    from {
      transform: scaleY(${
        this.state.initialLoad ? 1 : this.state.isOpen ? 0 : 1
      });
      transform-origin: 100% 0%;
    }
    to {
      transform: scaleY(${this.state.isOpen ? 1 : 0});
      transform-origin: 100% 0%;
    }
    `;
    const collapseAnimation = `${collapseKeyframes} 0.5s ease-in-out 1 forwards`;

    return (
      <>
        <Flex
          sx={{
            mt: "5%",
            mb: "5%",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              flex: "1 1 auto",
            }}
          >
            <Heading as={this.state.headingSize}>{this.state.text}</Heading>
          </Box>
          <Box>
            <IconButton
              onMouseEnter={this.onHover}
              onMouseLeave={this.onLeave}
              onClick={this.onButtonClick}
              sx={{
                animation: rotateAnimation,
                "*": { transition: "all .25s ease-in" },
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                sx={{
                  aspectRatio: "1 / 1",
                  fill: iconColor,
                }}
              >
                <g
                  x="0"
                  y="0"
                  transform={iconTransform}
                  sx={{ transformOrigin: "center" }}
                >
                  <path
                    x="0"
                    y="0"
                    d="M7.41 7.84l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z"
                  />
                </g>
              </svg>
            </IconButton>
          </Box>
        </Flex>
        <Box
          sx={{
            mb: "5%",
            overflow: "hidden",
            animation: collapseAnimation,
            maxHeight: this.state.contentHeight,
          }}
        >
          {this.state.contents}
        </Box>
      </>
    );
  }
}
export default CollapsibleContent;
