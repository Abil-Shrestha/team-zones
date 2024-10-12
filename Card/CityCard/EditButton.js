import React from "react";
import { ReactComponent as EditIcon } from "../../icons/edit.svg";
import { useControlColors } from "./hooks/useControlColors";
import { useCurrentColorScheme } from "hooks/useCurrentColorScheme";
import { controlsColorMap } from "./constants";

export function EditButton({ active, onClick }) {
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
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <EditIcon style={{ fill: color }} />
    </button>
  );
}
