import React, { forwardRef } from "react";
import * as colors from "tokens/colors";
import { TRANSITION } from "constants";
import { useCurrentColorScheme } from "hooks/useCurrentColorScheme";
import { useScreenWidth } from "hooks/useScreenWidth";
import { ReactComponent as HandleIcon } from "icons/sliderHandle.svg";

const handleColorsMap = {
  light: {
    active: colors.ColorOnsurfaceLightL100,
    inactive: colors.ColorTextLightL100,
  },
  dark: {
    active: colors.ColorOnsurfaceLightL100,
    inactive: colors.ColorOnsurfaceLightL100,
  },
};

const handleIconColorsMap = {
  light: {
    active: colors.ColorTextLightL100,
    inactive: colors.ColorOnsurfaceLightL100,
  },
  dark: {
    active: colors.ColorAccentOrange100,
    inactive: colors.ColorTextLightL100,
  },
};

export const SliderHandle = forwardRef(function ({ active, hovered }, ref) {
  const { isMobile } = useScreenWidth();
  const currentColorScheme = useCurrentColorScheme();

  const bigSize = hovered || active || isMobile;

  return (
    <div
      style={{
        transform: "translateX(-49%)",
        width: 40,
        height: 40,
        margin: "auto 0",
        top: 0,
        bottom: 0,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
      ref={ref}
    >
      <div
        style={{
          ...defaultHandleStyle,
          transform: bigSize ? "scale3d(1, 1, 1)" : "scale3d(0.29, 0.29, 1)",
          backgroundColor:
            handleColorsMap[currentColorScheme][active ? "active" : "inactive"],
          width: 31,
          height: 31,
          willChange: "transform",
        }}
      >
        {bigSize ? (
          <HandleIcon
            style={{
              fill: handleIconColorsMap[currentColorScheme][
                active ? "active" : "inactive"
              ],
            }}
          />
        ) : null}
      </div>
    </div>
  );
});

const defaultHandleStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  transition: TRANSITION,
};
