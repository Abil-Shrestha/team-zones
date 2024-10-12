import { SimpleItemContainer } from "SimpleItemContainer";
import { colors } from "colors";
import * as colorsNew from "tokens/colors";
import { useCurrentColorScheme } from "hooks/useCurrentColorScheme";
import { Typography } from "Typography";

export function Button({ text, onClick, styles, withPointer }) {
  const currentColorScheme = useCurrentColorScheme();

  return (
    <button
      onClick={onClick}
      style={{
        width: "fit-content",
        cursor: withPointer ? "pointer" : undefined,
      }}
    >
      <SimpleItemContainer
        color={colors.surface.dark[100]}
        style={{
          padding: "0 16px",
          backgroundColor:
            currentColorScheme === "light"
              ? colorsNew.ColorOnsurfaceLightD100
              : colorsNew.ColorOnsurfaceDarkD100,
          ...styles,
        }}
      >
        <Typography
          color={
            currentColorScheme === "light"
              ? colorsNew.ColorTextLightD100
              : colorsNew.ColorTextDarkD100
          }
          fontSize={12}
        >
          {text}
        </Typography>
      </SimpleItemContainer>
    </button>
  );
}
