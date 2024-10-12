import React from "react";

import { ReactComponent as Dog } from "../icons/dog.svg";
import { InfoCard } from "./InfoCard";
import { CircleWithIcon } from "components/CircleWithIcon";
import { Button } from "components/Button";

export function Donation() {
  return (
    <InfoCard
      title="Support us..."
      description="Your small donation will help keep the service running. We use all donations exclusively for this purpose. Thank you for your support, pumpkins 💖"
      rightElement={
        <CircleWithIcon>
          <Dog />
        </CircleWithIcon>
      }
    >
      <Button
        text="Make a donation"
        withPointer
        onClick={() =>
          window.open("https://www.buymeacoffee.com/guilty.digital", "_blank")
        }
      />
    </InfoCard>
  );
}
