import React from "react";
import { ReactComponent as CloseIcon } from "../../icons/close.svg";
import { useControlColors } from "./hooks/useControlColors";
import { controlsColorMap } from "./constants";
import { useCurrentColorScheme } from "hooks/useCurrentColorScheme";

export function CloseButton({ style, active, onClick }) {
  const currentColorScheme = useCurrentColorScheme();

  const { color, handlePointerOver, handlePointerOut } = useControlColors({
    defaultColor:
      controlsColorMap[currentColorScheme].default[
        active ? "active" : "inactive"
      ],
    onHoverColor:
      controlsColorMap[currentColorScheme].onHover[
        active ? "active" : "inactive"
      ],
  });

  return (
    <button
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <CloseIcon style={{ fill: color }} />
    </button>
  );
}
