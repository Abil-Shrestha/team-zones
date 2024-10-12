import React, { useState } from "react";
import { ReactComponent as HeartLetter } from "../icons/heartLetter.svg";
import { Typography } from "../Typography";
import MailTo from "./MailTo";
import { InfoCard } from "./InfoCard";
import { CircleWithIcon } from "components/CircleWithIcon";

export function SendEmail() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <InfoCard
      title="We create products"
      description="Wanna chat? Drop us a line or a thousand:"
      rightElement={
        <CircleWithIcon>
          <HeartLetter />
        </CircleWithIcon>
      }
    >
      <MailTo
        mail={"hello@timezones.digital"}
        styles={{ cursor: "pointer", textDecoration: "none" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Typography
          color={isHovered ? "blue" : "#FF4026"}
          fontSize={12}
          fontStyle={"normal"}
          fontWeight={500}
          lineHeight={16}
          letterSpacing={"0.01px"}
        >
          {"hello@timezones.digital"}
        </Typography>
      </MailTo>
    </InfoCard>
  );
}
