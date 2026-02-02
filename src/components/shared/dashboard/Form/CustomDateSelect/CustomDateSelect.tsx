"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface SelectDatePickerProps {
  selected?: Date;
  onSelect?: (date?: Date) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  error?: boolean | string;
  errorClassName?: string;
}

export function SelectDatePicker({
  selected,
  onSelect,
  placeholder = "Pick a date",
  className,
  disabled = false,
  error = false,
  errorClassName = "border-red-500 ring-red-200",
}: SelectDatePickerProps) {
  const handleSelect = (date?: Date) => {
    if (onSelect) {
      onSelect(date);
    }
  };

  const hasError = !!error;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          data-empty={!selected}
          className={cn(
            "mt-1 w-full justify-between border py-6 text-left font-normal",
            hasError && errorClassName,
            selected ? "" : "",
            className,
          )}
        >
          {selected ? format(selected, "PPP") : <span>{placeholder}</span>}
          <CalendarIcon className={cn("h-4 w-4 opacity-50")} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={handleSelect}
          defaultMonth={selected}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
