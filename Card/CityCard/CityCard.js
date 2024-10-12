import { formatInTimeZone, utcToZonedTime } from "date-fns-tz";
import { useSelectedDateQwark } from "qwarks";
import React, { useMemo, useRef, useState } from "react";
import { Position } from "../../Position";
import { TimeBlock } from "./TimeBlock";
import { Timeline } from "./Timeline";
import { TimeMarks } from "./TimeMarks";
import { TimeSlider } from "./TimeSlider";
import { UpperBlock } from "./UpperBlock";
import addMinutes from "date-fns/addMinutes";

export const CityCard = ({
  active,
  onDelete,
  onEdit,
  hideDelete,
  onTimeChange,
  setCityActive,
  cityInfo,
  cardRef,
  timeFormat,
  baseTimeZone,
  baseTimeZoneOffset,
  showingCurrentTime,
  setShowingCurrentTime,
}) => {
  const timeLineRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [selectedTime] = useSelectedDateQwark();

  const { address, timeZone } = cityInfo || {};
  const { town, city, country, village, name } = address || {};

  const { name: timeZoneName, offset_sec } = timeZone || {};

  const handleTimeChange = (time) => {
    onTimeChange(time);
    setCityActive();
    setShowingCurrentTime(false);
  };

  const handleWheel = (event) => {
    // Check if the wheel event is mainly horizontal
    const isHorizontalSwipe = Math.abs(event.deltaX) > Math.abs(event.deltaY);

    if (isHorizontalSwipe && event.deltaMode === 0) {
      const newTime = addMinutes(selectedTime, -event.deltaX);

      handleTimeChange(newTime);
    }
  };

  const handleClick = () => {
    setCityActive();
  };

  const midnight = useMemo(() => {
    const date = new Date(utcToZonedTime(selectedTime, timeZoneName));
    return date.setHours(0, 0, 0, 0);
  }, [selectedTime, timeZoneName]);

  return (
    <div
      style={cardBoxStyle}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onWheel={handleWheel}
    >
      <Position top={cardPaddings} left={cardPaddings} right={cardPaddings}>
        <UpperBlock
          active={active}
          city={name || city || town || village}
          country={country}
          onDelete={onDelete}
          onEdit={onEdit}
          hideDelete={hideDelete}
          timeZone={formatInTimeZone(selectedTime, timeZoneName, "OOO")}
          date={formatInTimeZone(selectedTime, timeZoneName, "d MMM")}
          isSameDay={
            formatInTimeZone(selectedTime, timeZoneName, "d MMM") ===
            formatInTimeZone(selectedTime, baseTimeZone, "d MMM")
          }
        />
      </Position>

      <Position bottom={16} left={cardPaddings} right={cardPaddings}>
        {timeZoneName && (
          <TimeBlock
            active={active}
            style={{ marginBottom: 12 }}
            time={formatInTimeZone(
              selectedTime,
              timeZoneName,
              timeFormat === 12 ? "hh:mm" : "HH:mm"
            )}
            format={
              timeFormat === 12
                ? formatInTimeZone(selectedTime, timeZoneName, "a")
                : undefined
            }
            timeDiff={
              offset_sec !== undefined && baseTimeZoneOffset !== undefined
                ? offset_sec - baseTimeZoneOffset
                : null
            }
            showingCurrentTime={showingCurrentTime}
          />
        )}
        <Timeline
          ref={timeLineRef}
          active={active}
          timeZone={timeZoneName}
          midnight={midnight}
          style={{ marginLeft: "7.5px", marginRight: "7.5px" }}
        />
        <TimeMarks
          style={useMemo(() => ({ marginTop: "4px" }), [])}
          active={active}
          timeFormat={timeFormat}
        />
      </Position>

      {timeZoneName && (
        <TimeSlider
          cardRef={cardRef}
          timeLineRef={timeLineRef}
          onTimeChange={handleTimeChange}
          active={active}
          hovered={hovered}
          timeZone={timeZoneName}
        />
      )}
    </div>
  );
};

const cardPaddings = 20;

const cardBoxStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
};
