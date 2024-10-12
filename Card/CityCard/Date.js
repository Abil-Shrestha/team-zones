import React from "react";
import * as colors from "tokens/colors";
import { Typography } from "Typography";
import { useCurrentColorScheme } from "hooks/useCurrentColorScheme";

const colorsMap = {
  light: {
    sameDay: {
      active: colors.ColorTextLightL200,
      inactive: colors.ColorTextLightL150,
    },
    notSameDay: {
      active: colors.ColorAccentOrange100,
      inactive: colors.ColorAccentOrange100,
    },
  },
  dark: {
    sameDay: {
      active: "#F6836A",
      inactive: colors.ColorTextLightL150,
    },
    notSameDay: {
      active: colors.ColorAccentOrange100,
      inactive: colors.ColorTextLightL150,
    },
  },
};

export function Date({ date, isSameDay, active }) {
  const currentColorScheme = useCurrentColorScheme();

  return (
    <Typography
      fontSize={15}
      lineHeight={24}
      fontWeight={500}
      color={
        colorsMap[currentColorScheme][isSameDay ? "sameDay" : "notSameDay"][
          active ? "active" : "inactive"
        ]
      }
      letterSpacing="-0.13px"
    >
      {date}
    </Typography>
  );
}
