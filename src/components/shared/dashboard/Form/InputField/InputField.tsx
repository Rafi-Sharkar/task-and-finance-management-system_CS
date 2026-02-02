/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import React, { useRef, useState } from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  register: any;
  required?: boolean;
  readOnly?: boolean;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  error,
  register,
  required = false,
  readOnly = false,
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const isPassword = type === "password";
  const isDate = type === "date";
  const inputType = isPassword && showPassword ? "text" : type;

  const { ref, ...restRegister } = register(name);

  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-[#181D27]">
        {label} {required && <span className="text-[#DC2727]">*</span>}
      </Label>

      <div className="relative">
        <Input
          type={inputType}
          placeholder={placeholder}
          readOnly={readOnly}
          {...restRegister}
          ref={(e) => {
            ref(e);
            inputRef.current = e;
          }}
          onClick={() => !readOnly && isDate && inputRef.current?.showPicker()}
          className={cn(
            "h-auto w-full p-3 text-base! font-normal! transition-all focus-visible:ring-0",
            "border-[#D5D7DA] focus-visible:border-[#90aded]",
            {
              "block cursor-pointer": isDate && !readOnly,
              "cursor-default bg-gray-50": readOnly,
              "bg-white": !readOnly,
              "border-[#DC2727] focus-visible:border-[#DC2727]": error,
            },
            className,
          )}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400 transition-colors hover:text-gray-600 focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? (
              <Eye className="h-5 w-5" />
            ) : (
              <EyeOff className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      {error && <p className="text-xs font-medium text-[#DC2727]">{error}</p>}
    </div>
  );
};

export default InputField;
