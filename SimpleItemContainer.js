import React from "react";
import { colors } from "./colors";

export function SimpleItemContainer({
  children,
  style,
  onClick,
  color = colors.surface.light[100],
}) {
  return (
    <div
      style={{
        height: 32,
        borderRadius: 16,
        display: "flex",
        alignItems: "center",
        backgroundColor: color,
        boxShadow: "0px 8px 8px rgb(0 0 0 / 4%)",
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
