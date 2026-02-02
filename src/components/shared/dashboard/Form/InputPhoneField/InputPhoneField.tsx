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
import { cn } from "@/lib/utils";
import React from "react";

interface InputPhoneFieldProps {
  label: string;
  name: string;
  register: any;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

const InputPhoneField: React.FC<InputPhoneFieldProps> = ({
  label,
  name,
  register,
  error,
  required = false,
  placeholder = "Enter your phone number",
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace",
      "Tab",
      "Enter",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
    ];

    if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-[#181D27]">
        {label} {required && <span className="text-[#DC2727]">*</span>}
      </Label>

      <div
        className={cn(
          "flex items-center rounded-md border bg-white transition-all focus-within:border-[#90aded]",
          error ? "border-[#DC2727]" : "border-[#D5D7DA]",
        )}
      >
        {/* Shadcn UI Select for Country Code */}
        <Select defaultValue="+880">
          <SelectTrigger className="w-[110px] border-none bg-transparent text-base shadow-none focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="+880">🇧🇩 +880</SelectItem>
            <SelectItem value="+1">🇺🇸 +1</SelectItem>
            <SelectItem value="+44">🇬🇧 +44</SelectItem>
          </SelectContent>
        </Select>

        {/* Vertical Divider */}
        <div className="mx-1 h-6 w-[1px] bg-[#D5D7DA]"></div>

        <input
          {...register(name)}
          type="text"
          inputMode="numeric"
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 border-none bg-transparent p-3 text-base font-normal placeholder:text-gray-400 focus:ring-0 focus:outline-none"
        />
      </div>

      {error && <p className="text-xs font-medium text-[#DC2727]">{error}</p>}
    </div>
  );
};

export default InputPhoneField;
