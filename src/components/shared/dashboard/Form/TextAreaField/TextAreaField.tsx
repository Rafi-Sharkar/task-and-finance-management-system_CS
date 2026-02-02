/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

interface TextAreaFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  error?: string;
  register: any;
  required?: boolean;
  readOnly?: boolean;
  rows?: number;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  name,
  placeholder,
  error,
  register,
  required = false,
  readOnly = false,
  rows = 4,
}) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-[#181D27]">
        {label} {required && <span className="text-[#DC2727]">*</span>}
      </Label>

      <Textarea
        placeholder={placeholder}
        readOnly={readOnly}
        rows={rows}
        {...register(name)}
        className={`w-full resize-none p-3 transition-all focus-visible:border-[#155DFC] focus-visible:ring-0 ${readOnly
          ? "cursor-default bg-gray-50 text-gray-500"
          : "bg-white text-[#181D27]"
          } ${error
            ? "border-[#DC2727] focus-visible:border-[#DC2727]"
            : "border-[#D5D7DA]"
          }`}
      />

      {error && <p className="text-xs font-medium text-[#DC2727]">{error}</p>}
    </div>
  );
};

export default TextAreaField;
