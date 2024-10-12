import React from "react";
import { colors } from "colors";
import { Typography } from "Typography";
import { TRANSITION } from "constants";
import { useCurrentColorScheme } from "hooks/useCurrentColorScheme";

const colorMap = {
  light: {
    active: colors.text[150],
    inactive: colors.text[125],
  },
  dark: {
    active: "rgba(0, 0, 0, 0.44)",
    inactive: colors.text[125],
  },
};

export function TimeAMPM({ active, format }) {
  const currentColorScheme = useCurrentColorScheme();

  return (
    <Typography
      fontSize={28}
      lineHeight={32}
      fontWeight={500}
      color={colorMap[currentColorScheme][active ? "active" : "inactive"]}
      letterSpacing="-1.5px"
      transition={TRANSITION}
      style={{
        width: 42,
        display: "flex",
        justifyContent: "center",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {format}
    </Typography>
  );
}
