import { PencilLine } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";
import { AppointmentSlotPayload } from "@/types/invoice/invoice.types";

type Props = {
  appointment: AppointmentSlotPayload;
  className?: string;
  dateClassName?: string;
  timeClassName?: string;
  editClassName?: string;
  onEdit?: () => void;
};

// Format the date
const formatDate = (bookingDay: string) => {
  const date = new Date(bookingDay);
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = date.getDate();
  const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });

  return `${month} ${day} (${dayOfWeek})`;
};

// Format time from "HH:MM:SS" to "HH:MM AM/PM"
const formatTime = (time: string) => {
  const [hours, minutes] = time.split(":");
  const hour24 = parseInt(hours);
  const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
  const ampm = hour24 >= 12 ? "PM" : "AM";

  return `${hour12}:${minutes} ${ampm}`;
};

const AppointmentInfoCard = ({
  appointment,
  onEdit,
  className,
  dateClassName,
  timeClassName,
  editClassName,
}: Props) => {
  const appointmentKey = Object.keys(appointment)[0];
  const appointmentData = appointment[appointmentKey];

  if (!appointmentData) {
    return null;
  }

  if (!appointmentData.startTime) return null;

  const formattedDate = formatDate(appointmentKey);
  const timeRange = `${formatTime(appointmentData.startTime)} - ${formatTime(appointmentData.endTime)}`;

  return (
    <div
      className={cn(
        "flex min-h-16 w-fit items-center gap-4 rounded-10 px-5 py-3 text-black-heading",
        className
      )}
    >
      <div
        className={`flex-center h-[46px] min-w-[100px] rounded-10 border border-secondary-20 bg-white px-12 py-[10px] ${dateClassName}`}
      >
        <span className="body-1 text-black-70">{formattedDate}</span>
      </div>
      <div
        className={`flex-center h-[46px] rounded-10 border border-secondary-20 bg-white px-12 py-[10px] ${timeClassName}`}
      >
        <span className="body-1 text-black-70">{timeRange}</span>
      </div>
      {onEdit && (
        <PencilLine
          size={20}
          className={cn(`cursor-pointer`, editClassName)}
          onClick={onEdit}
        />
      )}
    </div>
  );
};

export default AppointmentInfoCard;
