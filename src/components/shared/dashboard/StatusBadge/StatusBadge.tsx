import { cn } from "@/lib/utils";
import React from "react";

interface StatusBadgeProps {
  status: string;
  bgColor: string;
  textColor: string;
  className?: string;
  children?: React.ReactNode;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  bgColor,
  textColor,
  className,
  children,
}) => {
  return (
    <span
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm px-3 py-1 text-sm whitespace-nowrap",
        className,
      )}
    >
      {children ? children : status}
    </span>
  );
};

export default StatusBadge;
