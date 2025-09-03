"use client";
import * as React from "react";

import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface CircularProgressHelperProps {
  value: number;
  renderLabel?: (progress: number) => number | string;
  size?: number;
  strokeWidth?: number;
  circleStrokeWidth?: number;
  progressStrokeWidth?: number;
  shape?: "square" | "round";
  className?: string;
  progressClassName?: string;
  labelClassName?: string;
  showLabel?: boolean;
  duration?: number;
}

const CircularProgressHelper = ({
  value,
  renderLabel,
  className,
  progressClassName,
  labelClassName,
  showLabel,
  shape = "round",
  size = 100,
  strokeWidth,
  circleStrokeWidth = 10,
  progressStrokeWidth = 10,
  duration = 500,
}: CircularProgressHelperProps) => {
  const [animatedValue, setAnimatedValue] = React.useState(0);
  const [displayValue, setDisplayValue] = React.useState(0);

  const radius = size / 2 - 10;
  const circumference = Math.ceil(3.14 * radius * 2);
  const percentage = Math.ceil(circumference * ((100 - animatedValue) / 100));
  const viewBox = `-${size * 0.125} -${size * 0.125} ${size * 1.25} ${size * 1.25}`;

  // Animate the progress value smoothly
  React.useEffect(() => {
    const startValue = animatedValue;
    const endValue = value;
    const startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOutCubic(progress);

      const currentValue = startValue + (endValue - startValue) * easedProgress;
      setAnimatedValue(currentValue);
      setDisplayValue(Math.round(currentValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration, animatedValue]);

  return (
    <div className="relative">
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "rotate(-90deg)" }}
        className="relative"
      >
        {/* Base Circle */}
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          strokeWidth={strokeWidth ?? circleStrokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset="0"
          className={cn("stroke-primary/25", className)}
        />
        {/* Progress Circle with CSS transition */}
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeWidth={strokeWidth ?? progressStrokeWidth}
          strokeLinecap={shape}
          strokeDashoffset={percentage}
          fill="transparent"
          strokeDasharray={circumference}
          className={cn(
            "stroke-primary transition-all ease-out",
            progressClassName
          )}
          style={{
            transitionDuration: `${duration}ms`,
            transitionProperty: "stroke-dashoffset",
          }}
        />
      </svg>
      {showLabel && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center text-md transition-all duration-300 ease-out",
            labelClassName
          )}
        >
          {renderLabel ? renderLabel(displayValue) : displayValue}
        </div>
      )}
    </div>
  );
};

type CircularProgressProps = {
  value?: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  labelClassName?: string;
  className?: string;
  progressClassName?: string;
  renderLabel?: (progress: number) => number | string;
  showSlider?: boolean;
  duration?: number;
};

export default function CircularProgress({
  value = 13,
  className,
  labelClassName,
  progressClassName,
  showLabel = true,
  size = 120,
  strokeWidth = 10,
  renderLabel,
  showSlider = false,
  duration = 500,
}: CircularProgressProps) {
  const [progress, setProgress] = React.useState([value]);

  React.useEffect(() => {
    setProgress([value]);
  }, [value]);

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-xs flex-col items-center",
        className
      )}
    >
      <div className="flex items-center gap-1">
        <CircularProgressHelper
          value={progress[0]}
          size={size}
          strokeWidth={strokeWidth}
          showLabel={showLabel}
          labelClassName={cn("text-xl font-bold", labelClassName)}
          renderLabel={renderLabel ?? ((progress) => `${progress}%`)}
          className="stroke-indigo-500/25"
          progressClassName={cn("stroke-indigo-500", progressClassName)}
          circleStrokeWidth={strokeWidth}
          duration={duration}
        />
      </div>
      {showSlider && (
        <Slider
          defaultValue={progress}
          max={100}
          step={1}
          onValueChange={setProgress}
          className="mt-6"
        />
      )}
    </div>
  );
}
