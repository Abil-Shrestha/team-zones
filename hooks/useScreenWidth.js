import { useState, useEffect } from "react";

const iphoneProMaxScreenWidth = 430;

function getWidth() {
  return window.innerWidth <= iphoneProMaxScreenWidth ? "mobile" : "desktop";
}

export function useScreenWidth() {
  const [width, setWidth] = useState(() => getWidth());

  useEffect(() => {
    const handleResize = () => {
      setWidth(getWidth());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isMobile: width === "mobile" };
}
