import React, { useEffect, useRef, useState } from "react";
import { Typography } from "../../Typography";
import * as colorsNew from "tokens/colors";
import { useCurrentColorScheme } from "hooks/useCurrentColorScheme";

const colorsMap = {
  light: {
    active: colorsNew.ColorOnsurfaceLightL150,
    inactive: colorsNew.ColorOnsurfaceLightL100,
  },
  dark: {
    active: colorsNew.ColorOnsurfaceDarkL150,
    inactive: colorsNew.ColorOnsurfaceDarkL100,
  },
};

export function SearchItem({
  onClick,
  active,
  setActive,
  index,
  city: {
    address: { name, country },
  },
}) {
  const ref = useRef();

  const currentColorScheme = useCurrentColorScheme();

  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (active && !hovered) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [active, hovered]);

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => {
        setHovered(true);
        setActive(index);
      }}
      onMouseLeave={() => {
        setHovered(false);
        setActive(-1);
      }}
      style={{
        ...searchItemStyle,
        backgroundColor:
          colorsMap[currentColorScheme][active ? "active" : "inactive"],
        borderBottom: `1px solid ${
          currentColorScheme === "light"
            ? colorsNew.ColorDividerLightL100
            : colorsNew.ColorDividerDarkL100
        }`,
      }}
    >
      <Typography
        fontSize={15}
        fontWeight={500}
        letterSpacing="-0.13px"
        lineHeight={24}
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          color:
            currentColorScheme === "dark"
              ? colorsNew.ColorTextDarkL100
              : colorsNew.ColorTextLightL100,
        }}
      >
        {`${name}, ${country}`}
      </Typography>
    </div>
  );
}

const searchItemStyle = {
  height: "48px",
  padding: "0px 20px",
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
};
