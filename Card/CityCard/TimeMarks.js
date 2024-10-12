import React, { memo } from "react";
import { colors } from "../../colors";
import { Typography } from "../../Typography";
import { useCurrentColorScheme } from "hooks/useCurrentColorScheme";

const format24 = ["00", "06", "12", "18", "00"];
const format12 = ["12", "6", "12", "6", "12"];

const marksColorMap = {
  light: {
    active: colors.onSurface.dark[200],
    inactive: colors.onSurface.light[150],
  },
  dark: {
    active: "#F6836A",
    inactive: colors.onSurface.dark[200],
  },
};

function Mark({ time, active }) {
  const currentColorScheme = useCurrentColorScheme();
  return (
    <Typography
      fontSize={12}
      lineHeight={16}
      color={marksColorMap[currentColorScheme][active ? "active" : "inactive"]}
    >
      {time}
    </Typography>
  );
}

export const TimeMarks = memo(function ({ active, style, timeFormat }) {
  const marks = timeFormat === 24 ? format24 : format12;
  return (
    <div style={{ display: "flex", justifyContent: "space-between", ...style }}>
      {marks.map((time, index) => (
        <Mark key={index} time={time} active={active} />
      ))}
    </div>
  );
});
