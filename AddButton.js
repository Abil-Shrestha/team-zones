import React from "react";
import { useControlColors } from "./Card/CityCard/hooks/useControlColors";
import { colors } from "./colors";
import { ReactComponent as PlusIcon } from "./icons/plus.svg";
import { useCurrentColorScheme } from "hooks/useCurrentColorScheme";

export function AddButton({ onClick, style }) {
  const currentColorScheme = useCurrentColorScheme();

  const {
    color,
    handlePointerDown,
    handlePointerOut,
    handlePointerOver,
    handlePointerUp,
  } = useControlColors({
    defaultColor:
      currentColorScheme === "dark"
        ? colors.surface.light[100]
        : colors.accent.orange[100],
    onHoverColor:
      currentColorScheme === "dark"
        ? colors.surface.light[100]
        : colors.accent.orange[125],
    onPressColor:
      currentColorScheme === "dark"
        ? colors.surface.light[100]
        : colors.accent.orange[150],
  });

  return (
    <div style={style}>
      <button
        onClick={onClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <plus-icon
          style={{
            display: "flex",
            borderRadius: "50%",
            width: 56,
            height: 56,
            backgroundColor: color,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PlusIcon
            color={
              currentColorScheme === "light"
                ? colors.text[100]
                : colors.text[200]
            }
          />
        </plus-icon>
      </button>
    </div>
  );
}
