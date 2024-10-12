import { useCallback, useEffect } from "react";
import { differenceInMinutes } from "date-fns";
import { useSelectedDateQwark } from "qwarks";

const numberOfMinutesInADay = 24 * 60;

const getClosestTimeNode = (mouseClientX, nodes) => {
  let closestTimeNode = nodes[0];

  for (let node of nodes) {
    const distToNode = Math.abs(
      node.getBoundingClientRect().left - mouseClientX
    );

    const distToClosestNode = Math.abs(
      closestTimeNode.getBoundingClientRect().left - mouseClientX
    );

    if (distToNode < distToClosestNode && node.dataset.time) {
      closestTimeNode = node;
    }
  }

  return closestTimeNode;
};

export function useMoveSlider({
  cardRef,
  handleRef,
  timeLineRef,
  onTimeChange,
  knobRef,
  sliderIsVisible,
  setSliderIsVisible,
  timeZone,
}) {
  const [selectedTime] = useSelectedDateQwark();
  const calculateSliderPosition = useCallback(() => {
    const midnight = new Date(timeLineRef.current.children[0].dataset.time);

    const numberOfMinutesFromTheBeginningOfTheDay = differenceInMinutes(
      selectedTime,
      midnight
    );

    const timeLineWidth = timeLineRef.current.getBoundingClientRect().width;

    const currentTimeFractionFromFullDay =
      numberOfMinutesFromTheBeginningOfTheDay / numberOfMinutesInADay;

    const currentTimePositionOnTimeLine =
      timeLineWidth * currentTimeFractionFromFullDay;

    const timeLineOffsetFromCard =
      timeLineRef.current.getBoundingClientRect().left -
      cardRef.current.getBoundingClientRect().left;

    const newKnobLeft = timeLineOffsetFromCard + currentTimePositionOnTimeLine;

    knobRef.current.style.left = `${newKnobLeft}px`;
  }, [cardRef, knobRef, selectedTime, timeLineRef]);

  // pointer drag
  useEffect(() => {
    const handleEl = handleRef.current;
    const timeLineEl = timeLineRef.current;

    const onPointerDownNew = (event) => {
      event.preventDefault(); // prevent selection start (browser action)
      event.stopPropagation(); // prevent card swapping

      handleEl.setPointerCapture(event.pointerId);
      handleEl.onpointermove = onHandleMoveNew;

      handleEl.onpointerup = () => {
        handleEl.onpointermove = null;
        handleEl.onpointerup = null;
      };
    };

    const onHandleMoveNew = (event) => {
      const closestTimeNode = getClosestTimeNode(
        event.clientX,
        timeLineEl.children
      );

      const newTime = new Date(closestTimeNode.dataset.time);

      onTimeChange(newTime);
    };

    handleEl.onpointerdown = onPointerDownNew;
    handleEl.ontouchstart = (e) => e.preventDefault(); // prevents scrolling on mobile browsers

    return () => {
      handleEl.onpointerdown = null;
      handleEl.ontouchstart = null;
    };
  }, [timeLineRef, handleRef, onTimeChange]);

  // react to time change and set slider to current time
  useEffect(() => {
    calculateSliderPosition();

    if (!sliderIsVisible) {
      setSliderIsVisible(true);
    }
  }, [
    cardRef,
    sliderIsVisible,
    setSliderIsVisible,
    timeLineRef,
    selectedTime,
    knobRef,
    timeZone,
    calculateSliderPosition,
  ]);

  useEffect(() => {
    window.addEventListener("resize", calculateSliderPosition);
    return () => window.removeEventListener("resize", calculateSliderPosition);
  }, [calculateSliderPosition]);
}
