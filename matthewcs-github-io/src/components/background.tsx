/** @jsxImportSource theme-ui */
import React from "react";
import { alpha } from "@theme-ui/color";

export type BackgroundProps = {};

type Direction = { x: -1 | 1; y: -1 | 0 | 1 } | { x: -1 | 0 | 1; y: -1 | 1 };
type Point = { x: number; y: number };
type Path = { start: Point; stop: Point; joints: Point[] };

export type BackgroundState = {
  paths: Path[];
};

class Background extends React.Component<BackgroundProps, BackgroundState> {
  constructor(props: BackgroundProps) {
    super(props);

    this.formPath = this.formPath.bind(this);

    this.state = {
      paths: Array.from({ length: 30 }, () => this.formPath()),
    };
  }

  // Returns a number between 5 and 95 and a multiple of 5
  randomPointValue(): number {
    return Math.floor(Math.random() * 19) * 5 + 5;
  }

  // Returns a random point using the randomPointValue() function
  randomPoint(): Point {
    return { x: this.randomPointValue(), y: this.randomPointValue() };
  }

  // Returns a random first direction for formPath()
  randomFirstDirection(): Direction {
    const validDirections: Direction[] = [
      { x: -1, y: -1 },
      { x: -1, y: 0 },
      { x: -1, y: 1 },
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: 1, y: -1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
    ];
    const randomIndex = Math.floor(Math.random() * validDirections.length);
    return validDirections[randomIndex];
  }

  // Picks a new direction based on an old direction
  pickNextDirection(d: Direction): Direction {
    // if one value is 0, we must change it
    if (d.x === 0)
      // 50% chance to be -1, 50% chance to be 1
      return { x: Math.random() < 0.5 ? -1 : 1, y: d.y };
    if (d.y === 0)
      // 50% chance to be -1, 50% chance to be 1
      return { x: d.x, y: Math.random() < 0.5 ? -1 : 1 };

    // if neither value is 0, we must randomly set a
    // value to 0
    // 50% chance to change x, otherwise change y
    if (Math.random() < 0.5) return { x: 0, y: d.y };
    else return { x: d.x, y: 0 };
  }

  formPath() {
    const startPoint = this.randomPoint();
    let stopPoint: Point;
    // between 1 and 5 joints
    const numJoints = Math.floor(Math.random() * 5 + 1);
    // Total length should be a set value
    let remainingLength = Math.floor(Math.random() * 20 + 5);
    let lastJoint = startPoint;
    const joints: Point[] = [];
    let randomDirection = this.randomFirstDirection();

    while (joints.length < numJoints + 1) {
      // we can use up to half of the remaining length
      const currentWireLength = Math.floor(
        Math.random() * (remainingLength / 2) + 1
      );
      remainingLength -= currentWireLength;

      joints.push({
        x: lastJoint.x + randomDirection.x * currentWireLength * 5,
        y: lastJoint.y + randomDirection.y * currentWireLength * 5,
      });

      lastJoint = joints[joints.length - 1];
      randomDirection = this.pickNextDirection(randomDirection);
    }

    stopPoint = joints.pop() as unknown as Point;

    console.log(joints);

    return {
      start: startPoint,
      stop: stopPoint,
      joints: joints,
    };
  }

  render() {
    return (
      <div
        sx={{
          zIndex: "-1",
          position: "fixed",
          minHeight: "100%",
          height: "auto",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          background: "muted",
        }}
      >
        <svg width="100%" height="100%" preserveAspectRatio="none">
          {this.state.paths.map((path, pathIndex) => {
            return (
              <>
                <line
                  key={`${pathIndex}-start-line`}
                  x1={`${path.start.x}%`}
                  y1={`${path.start.y}%`}
                  x2={`${path.joints[0].x}%`}
                  y2={`${path.joints[0].y}%`}
                  strokeWidth="2"
                  sx={{
                    stroke: (t) => `${alpha("secondary", 0.5)(t)}`,
                  }}
                />
                {path.joints.map((_, jointIndex) => {
                  if (jointIndex === 0) return <></>;

                  return (
                    <line
                      key={`${pathIndex}-${jointIndex}-line`}
                      x1={`${path.joints[jointIndex - 1].x}%`}
                      y1={`${path.joints[jointIndex - 1].y}%`}
                      x2={`${path.joints[jointIndex].x}%`}
                      y2={`${path.joints[jointIndex].y}%`}
                      strokeWidth="2"
                      sx={{
                        stroke: (t) => `${alpha("secondary", 0.5)(t)}`,
                      }}
                    />
                  );
                })}
                <line
                  key={`${pathIndex}-stop-line`}
                  x1={`${path.joints[path.joints.length - 1].x}%`}
                  y1={`${path.joints[path.joints.length - 1].y}%`}
                  x2={`${path.stop.x}%`}
                  y2={`${path.stop.y}%`}
                  strokeWidth="2"
                  sx={{
                    stroke: (t) => `${alpha("secondary", 0.5)(t)}`,
                  }}
                />
              </>
            );
          })}
          {this.state.paths.map((path, pathIndex) => {
            return (
              <>
                <circle
                  key={`${pathIndex}-start`}
                  cx={`${path.start.x}%`}
                  cy={`${path.start.y}%`}
                  r="8"
                  strokeWidth="2"
                  sx={{ stroke: "secondary", fill: (t) => "background" }}
                />
                <circle
                  key={`${pathIndex}-stop`}
                  cx={`${path.stop.x}%`}
                  cy={`${path.stop.y}%`}
                  r="8"
                  strokeWidth="2"
                  sx={{ stroke: "secondary", fill: "background" }}
                />
              </>
            );
          })}
        </svg>
      </div>
    );
  }
}

export default Background;
