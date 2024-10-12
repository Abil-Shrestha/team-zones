import React, { useState } from "react";
import { useScreenWidth } from "../hooks/useScreenWidth";
import { ReactComponent as LogoIcon } from "../icons/logo.svg";
import { ToggleTimeFormat } from "./ToggleTimeFormat";
import { easterEgg } from "./utils";
import { CurrentTime } from "./CurrentTime";
import { InfoPanelButton } from "./InfoPanelButton";
import { useCurrentColorScheme } from "hooks/useCurrentColorScheme";
import * as colors from "tokens/colors";
import { HEADER_HIGHT_MOBILE, HEADER_HIGHT_DESKTOP } from "constants";

export function Header({
  timeFormat,
  toggleTimeFormat,
  scrolledFromTop,
  setShowingCurrentTime,
  showingCurrentTime,
}) {
  const [easterEggCount, setEasterEggCount] = useState(0);
  const currentColorScheme = useCurrentColorScheme();
  const { isMobile } = useScreenWidth();

  const handleLogoClick = () => {
    setEasterEggCount(easterEggCount + 1);
    if (easterEggCount > 7) {
      easterEgg();
      setEasterEggCount(0);
    }
  };

  return (
    <header
      style={{
        ...headerStyle,
        height: isMobile ? HEADER_HIGHT_MOBILE : HEADER_HIGHT_DESKTOP,
        padding: isMobile ? 12 : 24,
        borderBottom: scrolledFromTop
          ? `1px solid ${
              currentColorScheme === "light"
                ? colors.ColorOnsurfaceDarkD150
                : colors.ColorOnsurfaceLightD150
            }`
          : undefined,
        boxShadow: scrolledFromTop
          ? "0px 8px 8px rgba(0, 0, 0, 0.04)"
          : undefined,
      }}
    >
      <LogoIcon
        color={
          currentColorScheme === "light"
            ? colors.ColorOnsurfaceLightD100
            : colors.ColorOnsurfaceDarkD100
        }
        onClick={handleLogoClick}
      />

      <CurrentTime
        setShowingCurrentTime={setShowingCurrentTime}
        timeFormat={timeFormat}
        showingCurrentTime={showingCurrentTime}
      />

      <ToggleTimeFormat
        toggled={timeFormat === 24 ? true : false}
        onToggle={toggleTimeFormat}
      />

      <InfoPanelButton />
    </header>
  );
}

const headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  zIndex: 20,
  gap: 4,
};
