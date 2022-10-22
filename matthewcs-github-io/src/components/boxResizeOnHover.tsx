/** @jsxImportSource theme-ui */
import React, { ReactNode } from "react";
import { Box } from "theme-ui";

type BoxResizeOnHoverProps = {
  initialSize: string | string[];
  hoverSize: string | string[];
  children: ReactNode;
};
type BoxResizeOnHoverState = {
  isHovering: boolean;
  initialSize: string | string[];
  hoverSize: string | string[];
  children: ReactNode;
};

class BoxResizeOnHover extends React.Component<
  BoxResizeOnHoverProps,
  BoxResizeOnHoverState
> {
  constructor(props: BoxResizeOnHoverProps) {
    super(props);

    this.state = { ...props, isHovering: false };

    this.onHover = this.onHover.bind(this);
    this.onLeave = this.onLeave.bind(this);
  }

  onHover() {
    this.setState({ isHovering: true });
  }

  onLeave() {
    this.setState({ isHovering: false });
  }

  render() {
    return (
      <Box
        onMouseEnter={this.onHover}
        onMouseLeave={this.onLeave}
        sx={{
          width: this.state.isHovering
            ? this.state.hoverSize
            : this.state.initialSize,
          height: this.state.isHovering
            ? this.state.hoverSize
            : this.state.initialSize,
        }}
      >
        {this.state.children}
      </Box>
    );
  }
}

export default BoxResizeOnHover;
