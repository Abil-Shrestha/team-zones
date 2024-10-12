import React from "react";
import { TimeDifferencePill } from "./TimeDifferencePill";
import { Time } from "./Time";
import { TimeAMPM } from "./TimeAMPM";

export function TimeBlock({
  style,
  active,
  time,
  timeDiff,
  format,
  showingCurrentTime,
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        ...style,
      }}
    >
      <Time
        active={active}
        time={time}
        showingCurrentTime={showingCurrentTime}
      />
      {format && <TimeAMPM active={active} format={format} />}
      {!active && timeDiff ? <TimeDifferencePill value={timeDiff} /> : null}
    </div>
  );
}
