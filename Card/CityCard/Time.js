import React from "react";
import { colors } from "colors";
import { Typography } from "Typography";
import { TRANSITION } from "constants";
import { useCurrentColorScheme } from "hooks/useCurrentColorScheme";

const colorMap = {
  light: {
    active: colors.text[100],
    inactive: colors.text[200],
  },
  dark: {
    active: colors.text[100],
    inactive: colors.text[100],
  },
};

export function Time({ active, time, showingCurrentTime }) {
  const currentColorScheme = useCurrentColorScheme();

  const [hours, minutes] = time.split(":");

  return (
    <Typography
      fontSize={28}
      lineHeight={32}
      fontWeight={500}
      color={colorMap[currentColorScheme][active ? "active" : "inactive"]}
      letterSpacing="-1.5px"
      transition={TRANSITION}
      style={{
        display: "flex",
        justifyContent: "center",
        fontVariantNumeric: "tabular-nums slashed-zero",
      }}
    >
      {hours}
      <span
        style={{
          animation: showingCurrentTime
            ? "1s linear hideAndShow infinite"
            : undefined,
        }}
      >
        :
      </span>
      {minutes}
    </Typography>
  );
}
