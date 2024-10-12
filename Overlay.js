import { useState, useEffect, useRef } from "react";
import { useOverlayOpenQwark } from "qwarks";
import { useCurrentColorScheme } from "hooks/useCurrentColorScheme";

const TRANSITION_TIME_MILLISECONDS = 200;
const TRANSITION_START_BLUR = 0;
const TRANSITION_END_BLUR = 7;

const overlayStyles = {
  position: "fixed",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  transition: `background-color ${TRANSITION_TIME_MILLISECONDS}ms ease`,
  backgroundColor: "rgba(0, 0, 0, 0)",
  pointerEvents: "none",
  zIndex: -1, // Overlay starts behind other elements
  // Adding cursor pointer to ensure iOS recognizes the element as clickable
  cursor: "pointer",
};

export function Overlay({ onClose }) {
  const [isOpen, setIsOpen] = useOverlayOpenQwark();
  const [shouldRender, setShouldRender] = useState(isOpen);
  const currentScheme = useCurrentColorScheme();
  const overlayRef = useRef(null);

  const animateBlur = (startBlur, endBlur) => {
    let start = null;
    const element = overlayRef.current;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min(
        1,
        (timestamp - start) / TRANSITION_TIME_MILLISECONDS
      );
      const currentBlur = startBlur + (endBlur - startBlur) * progress;
      element.style.backdropFilter = `blur(${currentBlur}px)`;
      element.style.WebkitBackdropFilter = `blur(${currentBlur}px)`; // Safari compatibility

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  };

  useEffect(() => {
    if (isOpen) {
      const alphaLevel = currentScheme === "light" ? "0.25" : "0.92";
      setShouldRender(true);
      // Increase the delay slightly to ensure the transition is noticeable
      window.setTimeout(() => {
        overlayRef.current.style.backgroundColor = `rgba(0, 0, 0, ${alphaLevel})`;
        animateBlur(TRANSITION_START_BLUR, TRANSITION_END_BLUR);
      }, 20); // Slightly longer delay for better reliability on iPad
    } else if (shouldRender) {
      animateBlur(TRANSITION_END_BLUR, TRANSITION_START_BLUR);
      overlayRef.current.style.backgroundColor = "rgba(0, 0, 0, 0)";
      const timeoutId = window.setTimeout(() => {
        setShouldRender(false);
      }, TRANSITION_TIME_MILLISECONDS);
      return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const alphaLevel = currentScheme === "light" ? "0.25" : "0.92";
      overlayRef.current.style.backgroundColor = `rgba(0, 0, 0, ${alphaLevel})`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentScheme]);

  const currentStyles = {
    ...overlayStyles,
    ...(shouldRender
      ? {
          pointerEvents: "auto",
          zIndex: 40, // Make sure the overlay is above other elements
        }
      : {}),
  };

  return shouldRender ? (
    <div
      ref={overlayRef}
      id="overlay"
      style={currentStyles}
      onClick={() => {
        setIsOpen(false);
        onClose();
      }}
    />
  ) : null;
}
