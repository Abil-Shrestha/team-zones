import { useState } from "react";

export function useControlColors({ defaultColor, onHoverColor, onPressColor }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  let color = defaultColor;

  if (hovered) {
    color = onHoverColor;
  }

  if (pressed) {
    color = onPressColor;
  }

  return {
    color,
    handlePointerOver: () => setHovered(true),
    handlePointerOut: () => setHovered(false),
    handlePointerDown: () => setPressed(true),
    handlePointerUp: () => setPressed(false),
  };
}
