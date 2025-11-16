import React from "react";

interface DividerProps {
  orientation?: "horizontal" | "vertical";
  color?: string;
  thickness?: string;
  dashLength?: string;
  gap?: string;
  className?: string;
}

const Divider: React.FC<DividerProps> = ({
  orientation = "horizontal",
  color = "#4b5563",          // default gray-600
  thickness = "1px",
  dashLength = "6px",         // short dashes
  gap = "4px",
  className = "",
}) => {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={className}
      style={{
        width: isHorizontal ? "100%" : thickness,
        height: isHorizontal ? thickness : "100%",
        backgroundImage: `repeating-linear-gradient(
          ${isHorizontal ? "to right" : "to bottom"},
          ${color},
          ${color} ${dashLength},
          transparent ${dashLength},
          transparent calc(${dashLength} + ${gap})
        )`,
      }}
    />
  );
};

export default Divider;
