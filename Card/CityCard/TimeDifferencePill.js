import React, { memo } from "react";
import { colors } from "../../colors";
import { Typography } from "../../Typography";

const iPhoneOrIpad =
  navigator.platform === "iPhone" || navigator.platform === "iPad";

export const TimeDifferencePill = memo(function ({ value }) {
  return (
    <div
      style={{
        display: "block",
        height: 26,
        backgroundColor:
          value > 0 ? colors.accent.green[25] : colors.accent.orange[25],
        borderRadius: 13,
        padding: "2px 8px",
        backdropFilter: "opacity(1) blur(3px)",
        WebkitBackdropFilter: iPhoneOrIpad ? "opacity(1) blur(3px)" : undefined,
        zIndex: 19,
      }}
    >
      <Typography
        fontSize={15}
        lineHeight={22}
        color={value > 0 ? colors.accent.green[100] : colors.accent.orange[100]}
      >
        {`${value > 0 ? "+" : ""}${value / 60 / 60}H`}
      </Typography>
    </div>
  );
});
