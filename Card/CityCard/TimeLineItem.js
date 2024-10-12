import React, { memo } from "react";
import { colors } from "colors";
import { TRANSITION } from "constants";
import { numberOfLines } from "./constants";
import { useCurrentColorScheme } from "hooks/useCurrentColorScheme";

const colorMap = {
  light: {
    active: {
      wholeHour: `1px solid ${colors.onSurface.dark[200]}`,
      notWholeHour: `1px solid ${colors.onSurface.dark[225]}`,
    },
    inactive: {
      wholeHour: `1px solid ${colors.onSurface.light[150]}`,
      notWholeHour: `1px solid ${colors.onSurface.light[125]}`,
    },
  },
  dark: {
    active: {
      wholeHour: " 1px solid #F6836A",
      notWholeHour: "1px solid #F45D3C",
    },
    inactive: {
      wholeHour: `1px solid ${colors.onSurface.dark[200]}`,
      notWholeHour: `1px solid ${colors.onSurface.dark[225]}`,
    },
  },
};

export const TimeLineItem = memo(({ time, active, wholeHour, pixelWidth }) => {
  const currentColorScheme = useCurrentColorScheme();

  return (
    <div
      data-time={time ? time.toString() : undefined}
      style={{
        ...defaultStyle,
        width: pixelWidth ? "1px" : `calc(100% / ${numberOfLines})`,
        borderLeft:
          colorMap[currentColorScheme][active ? "active" : "inactive"][
            wholeHour ? "wholeHour" : "notWholeHour"
          ],
      }}
    />
  );
});

const defaultStyle = {
  transition: TRANSITION,
  height: "100%",
};
