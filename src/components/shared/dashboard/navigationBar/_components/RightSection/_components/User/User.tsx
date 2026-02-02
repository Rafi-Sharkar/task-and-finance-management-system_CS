"use client";
import Image from "@/assets/dashboard/Avatar1.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import * as Avatar from "@radix-ui/react-avatar";
import { ChevronDown, LogOut, Settings } from "lucide-react";

export default function UserAvatarDropdown() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex cursor-pointer items-center gap-3 rounded-lg p-1">
          {/* Avatar with Online Status Dot */}
          <div className="relative">
            <Avatar.Root className="block h-10 w-10 overflow-hidden rounded-full">
              <Avatar.Image
                src={Image?.src}
                alt="Admin User"
                className="h-full w-full object-cover"
              />
              <Avatar.Fallback>AD</Avatar.Fallback>
            </Avatar.Root>
            {/* Green Online Dot */}
            <span className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#17B26A]" />
          </div>

          {/* User Info */}
          <div className="hidden flex-col items-start sm:flex">
            <p className="text-sm font-bold text-[#171717]">Admin User</p>
            <p className="text-xs text-[#414651]">Admin</p>
          </div>

          {/* Dropdown Icon */}
          <ChevronDown size={18} className="text-[#181D27]" />
        </div>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-56 p-2 shadow-lg">
        <div className="space-y-1">
          {/* Settings Button */}
          <button className="flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-[#181D27] transition-colors hover:bg-gray-100">
            <Settings size={16} />
            <span>Settings</span>
          </button>

          {/* Divider */}
          <div className="my-1 h-px bg-gray-100" />

          {/* Logout Button */}
          <button className="flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
