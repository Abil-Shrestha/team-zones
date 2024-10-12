import * as colors from "tokens/colors";

export const numberOfLines = 96;

export const timelineStepMins = 15;

export const controlsColorMap = {
  light: {
    default: {
      active: colors.ColorTextLightL250,
      inactive: colors.ColorTextLightL200,
    },
    onHover: {
      active: colors.ColorTextLightL200,
      inactive: colors.ColorTextLightL250,
    },
  },
  dark: {
    default: {
      active: "#F6836A",
      inactive: colors.ColorTextDarkL200,
    },
    onHover: {
      active: "#F6836A",
      inactive: colors.ColorTextDarkL250,
    },
  },
};
