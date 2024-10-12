import React from "react";
import * as colors from "tokens/colors";
import { Typography } from "Typography";
import { TRANSITION } from "constants";
import { useCurrentColorScheme } from "hooks/useCurrentColorScheme";

const colorsMap = {
  light: {
    active: colors.ColorTextLightL200,
    inactive: colors.ColorTextLightL150,
  },
  dark: {
    active: "#F6836A",
    inactive: colors.ColorTextDarkL150,
  },
};

export function Timezone({ timeZone, active }) {
  const currentColorScheme = useCurrentColorScheme();

  return (
    <Typography
      fontSize={15}
      lineHeight={24}
      fontWeight={500}
      color={colorsMap[currentColorScheme][active ? "active" : "inactive"]}
      letterSpacing="-0.13px"
      transition={TRANSITION}
    >
      {timeZone}
    </Typography>
  );
}
