import { useCurrentColorScheme } from "hooks/useCurrentColorScheme";

export function CircleWithIcon({
  children,
  onMouseEnter,
  onMouseLeave,
  withBorder,
}) {
  const currentColorScheme = useCurrentColorScheme();

  return (
    <div
      style={{
        ...defaultStyles.wrapper,
        background: currentColorScheme === "light" ? "#F4F5F7" : "#242424",
        border: withBorder
          ? `2px solid ${currentColorScheme === "light" ? "#FFF" : "#181818"}`
          : undefined,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}

const defaultStyles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    width: 44,
    height: 44,
    minWidth: 44,
  },
};
