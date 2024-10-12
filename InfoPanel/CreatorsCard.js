import React from "react";
import { ReactComponent as Globe } from "../icons/Globe.svg";
import { ReactComponent as LinkedIn } from "../icons/Linkedin 1.svg";
import { InfoCard } from "./InfoCard";
import { CircleWithIcon } from "components/CircleWithIcon";

const style = {
  iconContainer: {
    display: "flex",
    position: "relative",
  },
};

export function CreatorsCard({ name, position, webLink, linkedinLink }) {
  return (
    <InfoCard title={name} description={position} height={178}>
      <div style={style.iconContainer}>
        <a href={webLink} target="_blank" rel="noreferrer">
          <CircleWithIcon withBorder>
            <Globe />
          </CircleWithIcon>
        </a>
        <a
          href={linkedinLink}
          target="_blank"
          rel="noreferrer"
          style={{
            position: "absolute",
            marginLeft: "35px",
          }}
        >
          <CircleWithIcon withBorder>
            <LinkedIn />
          </CircleWithIcon>
        </a>
      </div>
    </InfoCard>
  );
}
