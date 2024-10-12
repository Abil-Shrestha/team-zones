import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { ReactComponent as RefreshArrow } from "../icons/refresh-arrow.svg";
import { Typography } from "../Typography";
import { SimpleItemContainerWithTransition } from "../SimpleItemContainerWithTransition";
import * as colors from "tokens/colors";
import { useSelectedDateQwark } from "qwarks";
import { useCurrentColorScheme } from "hooks/useCurrentColorScheme";

export function CurrentTime({
  timeFormat,
  setShowingCurrentTime,
  showingCurrentTime,
}) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [, setSelectedTime] = useSelectedDateQwark();
  const currentColorScheme = useCurrentColorScheme();

  const time = format(currentTime, timeFormat === 12 ? "hh:mm a" : "HH:mm");

  const [hours, minutes] = time.split(":");

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = new Date();
      setCurrentTime(newTime);

      if (showingCurrentTime) {
        setSelectedTime(newTime);
      }
    }, [1000]);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showingCurrentTime]);

  return (
    <SimpleItemContainerWithTransition
      onClick={() => {
        setShowingCurrentTime(true);
        setSelectedTime(new Date());
      }}
      containerStyle={{ marginLeft: "auto" }}
      style={{
        paddingRight: 16,
        paddingLeft: !showingCurrentTime ? 12 : 16,
      }}
      color={
        currentColorScheme === "light"
          ? colors.ColorOnsurfaceLightL100
          : colors.ColorOnsurfaceDarkL100
      }
    >
      {!showingCurrentTime && (
        <RefreshArrow
          style={{
            animation: "0.5s rotate ease",
            transformOrigin: "8.3px 8.8px",
          }}
        />
      )}
      <Typography
        fontSize={12}
        lineHeight={16}
        color={
          currentColorScheme === "light"
            ? colors.ColorTextLightL100
            : colors.ColorTextDarkL100
        }
        letterSpacing="-0.13px"
      >
        {hours}
        <span
          style={{
            animation: "1s linear hideAndShow infinite",
          }}
        >
          :
        </span>
        {minutes}
      </Typography>
    </SimpleItemContainerWithTransition>
  );
}
