/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { Control, useController } from "react-hook-form";

interface SelectFieldProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  error?: string;
  control: Control<any>;
  required?: boolean;
  placeholder?: string;
  maxHeight?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  error,
  control,
  required,
  maxHeight,
  placeholder = "Select an option",
}) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
  });

  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-[#181D27]">
        {label} {required && <span className="text-[#DC2727]">*</span>}
      </Label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger
          className={`focus-visible:birder-[#155DFC] h-auto w-full cursor-pointer p-3 py-6 transition-all focus-visible:ring-0 ${error ? "border-[#DC2727]" : "border-[#D5D7DA]"
            }`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <div style={maxHeight ? { maxHeight, overflowY: 'auto' } : undefined}>
            {options.map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                className="cursor-pointer"
              >
                {opt.label}
              </SelectItem>
            ))}
          </div>
        </SelectContent>
      </Select>
      {error && <p className="mt-1 text-xs text-[#DC2727]">{error}</p>}
    </div>

  );
};
export default SelectField;
