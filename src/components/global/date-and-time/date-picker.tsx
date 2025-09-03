"use client";

import { CalendarDays } from "lucide-react";
import * as React from "react";
import {
  ClassNames,
  CustomComponents,
  DeprecatedUI,
  Formatters,
  Matcher,
  ModifiersClassNames,
} from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import InputWrapper from "../input/input-wrapper";

type Props = {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  captionLayout?: "label" | "dropdown" | "dropdown-months" | "dropdown-years";
  classNames?: Partial<ClassNames> & Partial<DeprecatedUI<string>>;
  className?: string;
  wrapperClassName?: string;
  inputClassName?: string;
  disabled?: Matcher | Matcher[] | undefined;
  modifiers?: Record<string, Matcher | Matcher[] | undefined> | undefined;
  modifiersClassNames?: ModifiersClassNames | undefined;
  defaultMonth?: Date | undefined;
  formatters?: Partial<Formatters> | undefined;
  components?: Partial<CustomComponents>;
  compact?: boolean;
};

export function DatePicker({
  date,
  onDateChange,
  captionLayout,
  classNames,
  className,
  wrapperClassName,
  inputClassName,
  disabled,
  modifiers,
  modifiersClassNames,
  defaultMonth,
  formatters,
  components,
  compact = false,
}: Props) {
  const [open, setOpen] = React.useState(false);
  // const [localDate, setLocalDate] = React.useState<Date | undefined>(date);

  if (compact) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <CalendarDays className="!size-6 cursor-pointer text-black-heading" />
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout={captionLayout}
            onSelect={(date) => {
              onDateChange?.(date);
              setOpen(false);
            }}
            defaultMonth={defaultMonth}
            classNames={classNames}
            className={className}
            disabled={disabled}
            modifiers={modifiers}
            modifiersClassNames={modifiersClassNames}
            formatters={formatters}
            components={components}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <InputWrapper className={cn("max-w-64", wrapperClassName)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            // className="w-48 justify-between font-normal"
            className={cn(
              "input-primary w-full justify-between",
              inputClassName
            )}
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <CalendarDays className="!size-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout={captionLayout}
            onSelect={(date) => {
              onDateChange?.(date);
              setOpen(false);
            }}
            defaultMonth={defaultMonth}
            classNames={classNames}
            className={className}
            disabled={disabled}
            modifiers={modifiers}
            modifiersClassNames={modifiersClassNames}
            formatters={formatters}
            components={components}
          />
        </PopoverContent>
      </Popover>
    </InputWrapper>
  );
}
