import React, { useRef, useState } from "react";
import { useMoveSlider } from "./hooks/useMoveSlider";
import { SliderHandle } from "./SliderHandle";
import { useCurrentColorScheme } from "hooks/useCurrentColorScheme";

const colorsMap = {
  light: {
    active:
      "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
    inactive: "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))",
  },
  dark: {
    active:
      "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
    inactive:
      "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
  },
};

export function TimeSlider({
  cardRef,
  timeLineRef,
  onTimeChange,
  active,
  hovered,
  timeZone,
}) {
  const knobRef = useRef();
  const handleRef = useRef();
  const [sliderIsVisible, setSliderIsVisible] = useState(false);

  const currentColorScheme = useCurrentColorScheme();

  useMoveSlider({
    cardRef,
    handleRef,
    timeLineRef,
    onTimeChange,
    knobRef,
    sliderIsVisible,
    timeZone,
    setSliderIsVisible,
  });

  return (
    <div
      style={{
        ...defaultKnobStyle,
        visibility: sliderIsVisible ? "visible" : "hidden",
        backgroundImage:
          colorsMap[currentColorScheme][active ? "active" : "inactive"],
      }}
      ref={knobRef}
    >
      <SliderHandle active={active} hovered={hovered} ref={handleRef} />
    </div>
  );
}

const defaultKnobStyle = {
  display: "block",
  width: 1,
  height: "100%",
  position: "absolute",
};
