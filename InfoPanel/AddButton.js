import React, { useEffect, useState } from "react";
import { ReactComponent as ArrowIcon } from "../icons/arrow.svg";
import { ReactComponent as ShareIcon } from "../icons/shareIcon.svg";
import { ReactComponent as SquarePlusIcon } from "../icons/squarePlus.svg";
import { ReactComponent as InstallChromeDesktop } from "../icons/install_desktop__chrome_black_18dp.svg";
import { ReactComponent as ThreeDotsIcon } from "../icons/three_dots.svg";
import { InfoCard } from "./InfoCard";
import { useCurrentColorScheme } from "hooks/useCurrentColorScheme";
import { CircleWithIcon } from "components/CircleWithIcon";

const styles = {
  addDockButtonStyle: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "44px",
    padding: "10px, 16px, 10px, 16px",
    borderRadius: "100px",
    flexShrink: "3",
  },

  addDockButtonTextStyle: {
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "20px",
    letterSpacing: "-0.12999999523162842px",
    textAlign: "left",
    color: "#888C95",
    marginLeft: "16px",
  },

  iconsContainer: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
};

function useBrowserDetect() {
  const [browser, setBrowser] = useState({
    isDesktopChrome: false,
    isAndroidChrome: false,
    isSafariMacOS: false,
    isSafariiOS: false,
  });

  useEffect(() => {
    const userAgent = navigator.userAgent;

    const isDesktopChrome =
      userAgent.match(/Chrome/) &&
      !userAgent.match(/Edg/) &&
      !userAgent.match(/Android/);
    const isSafariMacOS =
      userAgent.match(/Safari/) &&
      !userAgent.match(/Chrome/) &&
      userAgent.match(/Mac OS X/);
    const isSafariiOS =
      userAgent.match(/Safari/) &&
      !userAgent.match(/Chrome/) &&
      userAgent.match(/iPhone|iPad|iPod/);
    const isAndroidChrome =
      userAgent.match(/Chrome/) && userAgent.match(/Android/);

    setBrowser({
      isDesktopChrome,
      isSafariMacOS,
      isSafariiOS,
      isAndroidChrome,
    });
  }, []);

  return browser;
}

export function AddToHomeScreen() {
  const currentScheme = useCurrentColorScheme();
  const browser = useBrowserDetect();

  let Icon = ShareIcon;
  let RightIcon = SquarePlusIcon;
  let description = "";
  let text = "Add to Home Screen";

  if (browser.isDesktopChrome) {
    Icon = InstallChromeDesktop;
    description =
      "Click on install icon on the right side of the URL bar and then click Install";
    text = "Install";
    RightIcon = () => null;
  } else if (browser.isSafariiOS) {
    Icon = ShareIcon;
    description =
      'Tap the share icon and then tap on "Add to Home Screen" option';
    text = "Add to Home Screen";
    RightIcon = SquarePlusIcon;
  } else if (browser.isSafariMacOS) {
    Icon = ShareIcon;
    description = 'Tap the share icon and then tap on "Add to Dock" option';
    text = "Add to Dock";
    RightIcon = () => null;
  } else if (browser.isAndroidChrome) {
    Icon = ThreeDotsIcon;
    description = 'Tap the "three dot" icon and tap "Add to Home screen"';
    text = "Add to Home Screen";
    RightIcon = () => null;
  }

  return (
    <InfoCard title="Install Timezones" description={description}>
      <div style={styles.iconsContainer}>
        <CircleWithIcon>
          <Icon color={currentScheme === "light" ? "#888C95" : "#63666C"} />
        </CircleWithIcon>
        <div
          style={{
            display: "flex",
            flexShrink: "0",
          }}
        >
          <ArrowIcon
            color={currentScheme === "light" ? "#888C95" : "#63666C"}
          />
        </div>
        <div
          style={{
            ...styles.addDockButtonStyle,
            background: currentScheme === "light" ? "#F4F5F7" : "#242424",
          }}
        >
          <div style={styles.addDockButtonTextStyle}>{text}</div>
          <div style={{ marginRight: "16px", marginLeft: "auto" }}>
            <RightIcon />
          </div>
        </div>
      </div>
    </InfoCard>
  );
}
