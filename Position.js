import React from "react";

export function Position({ children, top, right, bottom, left, width }) {
  return (
    <div style={{ position: "absolute", top, right, bottom, left, width }}>
      {children}
    </div>
  );
}
