import React from "react";
import * as colors from "tokens/colors";
import { TRANSITION } from "constants";
import { Typography } from "../../Typography";
import { useCurrentColorScheme } from "hooks/useCurrentColorScheme";

const cityNameColorMap = {
  light: {
    active: colors.ColorTextLightD100,
    inactive: colors.ColorTextLightL100,
  },
  dark: {
    active: colors.ColorTextLightD100,
    inactive: colors.ColorTextDarkL100,
  },
};

export function City({ city, country, active }) {
  const currentColorScheme = useCurrentColorScheme();
  return (
    <Typography
      fontSize={15}
      lineHeight={24}
      fontWeight={500}
      color={
        cityNameColorMap[currentColorScheme][active ? "active" : "inactive"]
      }
      letterSpacing="-0.13px"
      transition={TRANSITION}
      style={{
        height: 24,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      }}
    >
      {city && country ? `${city}, ${country}` : "Locating your city..."}
    </Typography>
  );
}
