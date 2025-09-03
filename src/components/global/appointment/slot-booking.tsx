/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useMemo } from "react";

import { useSlotBooking } from "@/hooks/appointment/use-slot-booking";
import { cn } from "@/lib/utils";
import { AppointmentSlot } from "@/types/appointment/appointment.types";
import { ValueLabelProps } from "@/types/global";
import { AppointmentSlotPayload } from "@/types/invoice/invoice.types";

import Button from "../buttons";
import TimeSlotCard from "./time-slot-card";
import { DatePicker } from "../date-and-time/date-picker";
import Indicator from "../indicator";
import Select from "../input/select";

type Props = {
  className?: string;
  slotContainerClassName?: string;
  timeSlotClassName?: string;
  title: string;
  objId: number;
  locations?: ValueLabelProps[];
  defaultLocationId?: string;
  // onSlotSelect?: (slot: AppointmentSlot | null) => void;
  onSlotSelect?: (slot: AppointmentSlotPayload | null) => void;
  onLocationChange?: (params: {
    locationId: string;
    setLocationId: (newLocationId: string) => void;
  }) => void;
  onDateChange?: (date: Date) => void;
  onScheduleLater?: () => void;
  onNext?: (appointment: AppointmentSlotPayload) => void;
  slotAvailabilityAdjuster?: (
    slots: AppointmentSlot[],
    selectedDate: Date
  ) => AppointmentSlot[];
  footer?: React.ReactNode;
  showHeader?: boolean;
  hideActions?: boolean;
  compactCalender?: boolean;
};

const SlotBooking = ({
  className,
  slotContainerClassName,
  timeSlotClassName,
  title = "",
  locations = [],
  defaultLocationId,
  objId,
  onSlotSelect,
  onLocationChange,
  onDateChange,
  onScheduleLater,
  onNext,
  slotAvailabilityAdjuster,
  footer,
  showHeader = true,
  hideActions = false,
  compactCalender = false,
}: Props) => {
  const {
    state,
    setSelectedDate,
    setSelectedLocationId,
    setSelectedSlot,
    weekDates,
    weekday,
    timezone,
    isLoading,
    error,
    formatDate,
    isDateSelected,
    isSlotSelected,
    prefetchSlots,
    slots: rawSlots,
  } = useSlotBooking({
    initialLocationId: defaultLocationId,
    locations,
    enabled: true,
  });

  const adjustedSlots = useMemo(() => {
    if (!slotAvailabilityAdjuster) return rawSlots;
    return slotAvailabilityAdjuster(rawSlots, state.selectedDate);
  }, [rawSlots, slotAvailabilityAdjuster, state.selectedDate]);

  const getAdjustedAvailableSlots = useMemo(() => {
    return adjustedSlots.filter((slot) => slot.availableAppointments > 0);
  }, [adjustedSlots]);

  // Handle external callbacks
  useEffect(() => {
    const date = state.selectedDate.toISOString().split("T")[0]; // This gives you "2025-07-29" format

    const payload: AppointmentSlotPayload = {
      [date]: {
        bookingDay: weekday,
        startTime: state.selectedSlot?.startTime || "",
        endTime: state.selectedSlot?.endTime || "",
        locId: Number(state.selectedLocationId),
        objId,
      },
    };

    onSlotSelect?.(payload);
    // }, [state.selectedSlot, onSlotSelect]);
  }, [
    state.selectedSlot,
    // onSlotSelect,
    // state.selectedDate,
    // state.selectedLocationId,
    // weekday,
    // objId,
  ]);
  useEffect(() => {
    onDateChange?.(state.selectedDate);
  }, [state.selectedDate, onDateChange]);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
    // Prefetch next day's slots for better UX
    if (state.selectedLocationId) {
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      prefetchSlots(nextDay, state.selectedLocationId);
    }
  };

  const handleLocationChange = (locationId: string) => {
    if (onLocationChange) {
      onLocationChange({
        locationId,
        setLocationId: (newLocationId: string) => {
          setSelectedLocationId(newLocationId);
          // Prefetch slots for current date with new location
          if (state.selectedDate && newLocationId) {
            prefetchSlots(state.selectedDate, newLocationId);
          }
        },
      });
      return;
    }
    setSelectedLocationId(locationId);
    // Prefetch slots for current date with new location
    if (locationId) {
      prefetchSlots(state.selectedDate, locationId);
    }
  };

  const handleSlotSelect = (slot: AppointmentSlot) => {
    // Check if this slot is from the adjusted slots (to use the adjusted availability)
    const adjustedSlot = adjustedSlots.find(
      (s) => s.startTime === slot.startTime && s.endTime === slot.endTime
    );

    const slotToUse = adjustedSlot || slot;
    const newSelectedSlot = isSlotSelected(slotToUse) ? null : slotToUse;
    setSelectedSlot(newSelectedSlot);
  };

  const handleNextClick = () => {
    if (
      !state ||
      !state.selectedSlot ||
      !state.selectedDate ||
      !state.selectedLocationId
    ) {
      return;
    }

    const date = state.selectedDate.toISOString().split("T")[0]; // This gives you "2025-07-29" format

    const payload: AppointmentSlotPayload = {
      [date]: {
        bookingDay: weekday,
        startTime: state.selectedSlot?.startTime,
        endTime: state.selectedSlot?.endTime,
        locId: Number(state.selectedLocationId),
        objId,
      },
    };

    onNext?.(payload);
  };

  const renderDateButtons = () => {
    return weekDates.map((date, index) => (
      <Button
        key={index}
        variant="primary-outlined"
        onClick={() => handleDateSelect(date)}
        className={cn(
          "transition-all duration-200 flex-shrink-0",
          isDateSelected(date) &&
            "!border-indicator-green-90 !bg-indicator-green-90 !text-white hover:!bg-indicator-green-90 hover:!text-white"
        )}
      >
        {formatDate(date)}
      </Button>
    ));
  };

  const renderTimeSlots = () => {
    if (isLoading) {
      return (
        <div className="flex w-full items-center justify-center py-8">
          <div className="size-8 animate-spin rounded-full border-b-2 border-primary"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex w-full items-center justify-center py-8">
          <p className="text-red-500">Error loading slots. Please try again.</p>
        </div>
      );
    }

    if (!state.selectedLocationId) {
      return (
        <div className="flex w-full items-center justify-center py-8">
          <p className="text-gray-500">
            Please select a location to view available slots.
          </p>
        </div>
      );
    }

    const availableSlots = getAdjustedAvailableSlots;

    if (availableSlots.length === 0) {
      return (
        <div className="flex w-full items-center justify-center py-8">
          <p className="text-gray-500">
            No available slots for the selected date.
          </p>
        </div>
      );
    }

    return (
      <div
        className={cn("flex flex-wrap gap-4 w-full", slotContainerClassName)}
      >
        {availableSlots.map((slot, i) => (
          <TimeSlotCard
            key={i}
            startTime={slot.startTime}
            endTime={slot.endTime}
            avlAppointments={slot.availableAppointments}
            isSelected={isSlotSelected(slot)}
            onClick={() => handleSlotSelect(slot)}
            className={cn(
              "w-[160px] transition-all duration-200 md:w-[180px] lg:w-[200px]",
              timeSlotClassName
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      className={cn(
        "relative border border-secondary-20 rounded-10 h-fit text-black-90",
        className
      )}
    >
      {showHeader && (
        <div className="md:flex-between flex flex-col gap-4 p-4 md:flex-row">
          <div className="heading-7-medium">{title}</div>
          <Select
            options={locations}
            value={state.selectedLocationId}
            onValueChange={handleLocationChange}
            className="max-w-96"
            placeholder="Select location"
          />
        </div>
      )}

      <div
        className={`grid gap-4 ${showHeader ? "border-y" : "border-b"} border-secondary-20 p-4 md:grid-cols-[auto_1fr] md:gap-0 md:p-0 ${compactCalender ? "grid-cols-[auto_1fr] !gap-0 !p-0" : "grid-cols-1"}`}
      >
        <div
          className={`md:flex-center flex md:border-r md:border-secondary-20 md:p-4 ${compactCalender ? "flex-center border-r p-4" : ""}`}
        >
          <DatePicker
            date={state.selectedDate}
            onDateChange={handleDateSelect}
            wrapperClassName="min-w-48"
            disabled={{
              before: new Date(),
            }}
            compact={compactCalender}
          />
        </div>
        <div className="flex-center min-w-0 p-2 md:p-2">
          <div className="no-scrollbar overflow-x-auto">
            <div className="flex min-h-12 w-max gap-4">
              {renderDateButtons()}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 p-4 py-6">
        <div className="flex items-center justify-between">
          <div className="body-1-medium">
            Business Timezone: {timezone || "Not specified"}
          </div>
        </div>
        <div className={cn("flex flex-wrap gap-4")}>{renderTimeSlots()}</div>
      </div>

      {!hideActions && (
        <div className="flex-between flex-col gap-4 rounded-b-10 border-t border-secondary-20 bg-white p-4 md:flex-row">
          <div className="flex gap-4">
            <div className="flex-center gap-2">
              <Indicator className="bg-primary" />
              <div>Available</div>
            </div>
            <div className="flex-center gap-2">
              <Indicator className="bg-secondary-20" />
              <div>Booked</div>
            </div>
            <div className="flex-center gap-2">
              <Indicator className="bg-indicator-green-90" />
              <div>Selected</div>
            </div>
          </div>
          <div className="flex-center gap-4">
            <Button
              variant="primary"
              onClick={handleNextClick}
              disabled={!state.selectedDate || !state.selectedSlot}
              className="sm:min-h-11 sm:min-w-36"
            >
              Next
            </Button>
            <Button
              variant="primary-outlined"
              onClick={onScheduleLater}
              className="sm:min-h-11 sm:min-w-36"
            >
              Schedule For Later
            </Button>
          </div>
        </div>
      )}
      {footer || <></>}
    </div>
  );
};

export default SlotBooking;
