"use client";

import { useEffect, useState } from "react";

interface AnimatedStatProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedStat({
  value,
  suffix = "",
  prefix = "",
  duration = 2000,
  className = "",
}: AnimatedStatProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(value * easeOutQuart);
      
      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration]);

  const formatNumber = (num: number): string => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(0) + "B";
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(0) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K";
    }
    return num.toString();
  };

  // Format the number based on suffix
  let displayText: string;
  if (suffix === "B") {
    displayText = `${prefix}${(displayValue / 1000000000).toFixed(0)}${suffix}`;
  } else if (suffix === "M") {
    displayText = `${prefix}${(displayValue / 1000000).toFixed(0)}${suffix}`;
  } else if (suffix === "K") {
    displayText = `${prefix}${(displayValue / 1000).toFixed(0)}${suffix}`;
  } else if (suffix) {
    displayText = `${prefix}${displayValue.toLocaleString()}${suffix}`;
  } else {
    displayText = `${prefix}${formatNumber(displayValue)}`;
  }

  return (
    <div
      className={`text-center font-medium text-[#364314] text-4xl sm:text-5xl md:text-6xl lg:text-7xl ${className}`}
    >
      {displayText}
    </div>
  );
}

