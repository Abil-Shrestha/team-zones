import React from "react";
import { ReactComponent as TwoLinesIcon } from "../icons/two-lines.svg";
import { ReactComponent as CrossIcon } from "../icons/cross.svg";
import { useIsInfoPanelOpenQwark, useOverlayOpenQwark } from "qwarks";
import { useScreenWidth } from "hooks/useScreenWidth";
import { useCurrentColorScheme } from "hooks/useCurrentColorScheme";
import { ColorOnsurfaceDarkL100, ColorOnsurfaceLightL100 } from "tokens/colors";

const styles = {
  root: {
    display: "flex",
    flexShrink: "0",
    padding: "6px",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    borderRadius: "100px",
    boxShadow: "0px 8px 8px 0px rgba(0, 0, 0, 0.04)",
    transition: "0.3s, easy-out",
  },
};

export function InfoPanelButton() {
  const [isOpen, setIsOpen] = useIsInfoPanelOpenQwark();
  const [isOverlayOpen, setIsOverlayOpen] = useOverlayOpenQwark();
  const currentColorScheme = useCurrentColorScheme();
  const { isMobile } = useScreenWidth();

  const Button = isOpen ? CrossIcon : TwoLinesIcon;

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          ...styles.root,
          background:
            currentColorScheme === "dark"
              ? ColorOnsurfaceDarkL100
              : ColorOnsurfaceLightL100,
        }}
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isMobile) setIsOverlayOpen(!isOverlayOpen);
        }}
      >
        <Button />
      </div>
    </div>
  );
}
