import React, { useEffect, useRef } from "react";

export function SimpleItemContainerWithTransition({
  children,
  style,
  containerStyle,
  onClick,
  color,
}) {
  const contentRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    const resizeObserver = new ResizeObserver(function (entries) {
      const width = entries[0].borderBoxSize[0].inlineSize;

      containerRef.current.style.width = `${width}px`;
    });
    resizeObserver.observe(contentRef.current);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: 32,
        borderRadius: 16,
        backgroundColor: color,
        boxShadow: "0px 8px 8px rgb(0 0 0 / 4%)",
        overflow: "hidden",
        position: "relative",
        transition: "all 0.3s cubic-bezier(0.18, 0.89, 0.28, 1.4) 0s",
        ...containerStyle,
      }}
      onClick={onClick}
    >
      <div
        ref={contentRef}
        style={{
          width: "max-content",
          display: "flex",
          gap: 4,
          height: "100%",
          alignItems: "center",
          position: "absolute",
          right: 0,
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
}
