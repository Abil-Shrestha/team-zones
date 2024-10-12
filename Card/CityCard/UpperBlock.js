import React, { memo } from "react";
import { City } from "./City";
import { Controls } from "./Controls";
import { Date } from "./Date";
import { Timezone } from "./Timezone";

export const UpperBlock = memo(function ({
  active,
  city,
  country,
  onDelete,
  onEdit,
  hideDelete,
  timeZone,
  date,
  isSameDay,
}) {
  return (
    <>
      <div style={upperBlockStyle}>
        <City active={active} city={city} country={country} />
        <Controls
          active={active}
          onDelete={onDelete}
          onEdit={onEdit}
          hideDelete={hideDelete}
        />
      </div>
      {timeZone && <Timezone active={active} timeZone={timeZone} />}
      {<Date active={active} date={date} isSameDay={isSameDay} />}
    </>
  );
});

const upperBlockStyle = {
  display: "grid",
  justifyContent: "space-between",
  gap: "16px",
  gridTemplateColumns: "1fr auto",
};
