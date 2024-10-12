import React from "react";
import { CloseButton } from "./CloseButton";
import { EditButton } from "./EditButton";

export function Controls({ active, onDelete, onEdit, hideDelete }) {
  return (
    <div style={{ display: "flex" }}>
      <EditButton active={active} onClick={onEdit} />
      {!hideDelete && (
        <CloseButton
          style={{ marginLeft: 8 }}
          active={active}
          onClick={onDelete}
        />
      )}
    </div>
  );
}
