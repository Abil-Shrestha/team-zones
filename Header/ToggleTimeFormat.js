import React from "react";
import * as colors from "tokens/colors";
import { TRANSITION } from "constants";
import { Typography } from "../Typography";
import { SimpleItemContainer } from "../SimpleItemContainer";
import { useCurrentColorScheme } from "hooks/useCurrentColorScheme";

export function ToggleTimeFormat({ toggled, onToggle }) {
  const currentColorScheme = useCurrentColorScheme();

  const getTimeColor = (toggled) => {
    if (currentColorScheme === "light") {
      return toggled ? colors.ColorTextLightL200 : colors.ColorTextLightD100;
    } else {
      return toggled ? colors.ColorTextDarkL200 : colors.ColorTextDarkD100;
    }
  };

  return (
    <SimpleItemContainer
      style={{
        width: 60,
        position: "relative",
      }}
      onClick={() => onToggle(!toggled)}
      color={
        currentColorScheme === "light"
          ? colors.ColorOnsurfaceLightL100
          : colors.ColorOnsurfaceDarkL100
      }
    >
      <div
        style={{
          width: 24,
          height: 24,
          backgroundColor:
            currentColorScheme === "light"
              ? colors.ColorOnsurfaceLightD100
              : colors.ColorOnsurfaceDarkD100,
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 4,
          left: toggled ? 32 : 4,
          transition: TRANSITION,
        }}
      />
      <Typography
        fontSize={12}
        color={getTimeColor(toggled)}
        style={{
          position: "absolute",
          left: "9.5px",
          top: "8.5px",
          transition: TRANSITION,
        }}
      >
        12
      </Typography>

      <Typography
        fontSize={12}
        color={getTimeColor(!toggled)}
        style={{
          position: "absolute",
          right: "8.5px",
          top: "8.5px",
          transition: TRANSITION,
        }}
      >
        24
      </Typography>
    </SimpleItemContainer>
  );
}
