"use client";

import React from "react";

import { cn } from "@/lib/utils";

import Button from "../buttons";

type Props = {
  startTime: string;
  endTime: string;
  avlAppointments: number;
  isSelected?: boolean;
  className?: string;
  onClick: () => void;
};

const formatTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(":");
  const hour24 = parseInt(hours, 10);
  const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
  const ampm = hour24 >= 12 ? "PM" : "AM";

  return `${hour12}:${minutes} ${ampm}`;
};

const TimeSlotCard = ({
  startTime,
  endTime,
  avlAppointments,
  isSelected = false,
  className,
  onClick,
}: Props) => {
  const formattedStartTime = formatTime(startTime);
  const formattedEndTime = formatTime(endTime);

  return (
    <div
      className={cn(
        `relative rounded-10 body-3`,
        isSelected
          ? "!border-indicator-green-90 !bg-indicator-green-90 !text-white hover:!bg-indicator-green-90 hover:!text-white"
          : "",
        "disabled:!border-secondary-20 disabled:!bg-secondary-20 disabled:!text-white disabled:hover:!bg-secondary-20 disabled:hover:!text-secondary-20",
        className
      )}
    >
      <Button
        type="button"
        variant="primary-outlined"
        onClick={onClick}
        className={cn(
          "w-full",
          isSelected
            ? "!border-indicator-green-90 !bg-indicator-green-90 !text-white hover:!bg-indicator-green-90 hover:!text-white"
            : "",
          "disabled:!border-secondary-20 disabled:!bg-secondary-20 disabled:!text-white disabled:hover:!bg-secondary-20 disabled:hover:!text-secondary-20",
          className
        )}
        disabled={avlAppointments === 0}
      >
        {formattedStartTime} - {formattedEndTime}
      </Button>
      {avlAppointments && avlAppointments > 0 && (
        <div
          className={cn(
            "absolute -top-3 -right-3 size-6 rounded-full flex items-center justify-center text-xs font-bold",
            "rounded-full bg-primary text-white flex-center border-2 border-white"
          )}
        >
          {avlAppointments}
        </div>
      )}
    </div>
  );
};

export default TimeSlotCard;
