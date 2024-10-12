import React, { forwardRef, useMemo, memo } from "react";
import { zonedTimeToUtc } from "date-fns-tz";
import { TimeLineItem } from "./TimeLineItem";
import { numberOfLines, timelineStepMins } from "./constants";

const createTimeLineArray = (timeZone, midnight) => {
  return Array.from({ length: numberOfLines }, (_, i) => {
    const date = new Date(midnight);
    date.setMinutes(i * timelineStepMins);
    return zonedTimeToUtc(date, timeZone);
  });
};

export const Timeline = memo(
  forwardRef(function ({ active, timeZone, midnight, style }, ref) {
    const timeLineArray = useMemo(
      () => createTimeLineArray(timeZone, midnight),
      [timeZone, midnight]
    );

    return (
      <div style={{ display: "flex", height: 8, ...style }} ref={ref}>
        {timeLineArray.map((time, i) => (
          <TimeLineItem
            key={time.getTime()}
            time={time}
            active={active}
            wholeHour={i % 4 === 0}
          />
        ))}
        <TimeLineItem key={"lastItem"} active={active} wholeHour pixelWidth />
      </div>
    );
  })
);
