"use client";
import fallbackImage from "@/assets/fallback-image/user-avatar.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/useLogout";
import { useGetSingleUserQuery } from "@/redux/features/admin/user/user.api";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { TLoginUser } from "@/types/userRole.types";

import { Loader2, LogOut } from "lucide-react";
import { CgProfile } from "react-icons/cg";

export type TProfileAvatar = {
  user: TLoginUser | null;
};

const ProfileAvatar = () => {
  // Get Current User
  const user = useAppSelector(useCurrentUser);

  // Fetch User Data
  const { data: userData, isLoading: isUserLoading } =
    useGetSingleUserQuery(undefined);

  // Logout Handler
  const handleLogOut = useLogout();

  return (
    <div className="font-medium">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          {user ? (
            <Avatar className="ml-4 flex h-12 w-12 cursor-pointer items-center justify-center border-4 border-slate-300 bg-white lg:ml-0">
              <AvatarImage
                src={userData?.data?.avatarUrl || fallbackImage}
                alt={userData?.data?.fullName || "User Profile"}
              />
              {isUserLoading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
                  <Loader2 className="h-6 w-6 animate-spin text-white" />
                </div>
              )}
              <AvatarFallback>
                {userData?.data?.username?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ) : (
            <span>
              <CgProfile className="ml-4 cursor-pointer text-3xl text-white transition hover:scale-105 hover:text-white lg:ml-0" />
            </span>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="mt-3 min-w-44 rounded-2xl border-2 border-slate-300 bg-white p-2 font-medium text-black"
        >
          <DropdownMenuLabel>
            {user ? (
              <div className="flex items-center gap-2 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={userData?.data?.avatarUrl || fallbackImage}
                    alt={user?.username}
                  />
                  <AvatarFallback className="rounded-lg">DP</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="mb-1 truncate text-xs font-semibold text-black">
                    {user?.username}
                  </span>
                  <span className="truncate text-xs font-medium text-slate-800">
                    {user?.email}
                  </span>
                </div>
              </div>
            ) : (
              "My Account"
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-slate-100" />
          <DropdownMenuGroup className="space-y-1.5"></DropdownMenuGroup>
          {user && (
            <>
              <DropdownMenuItem
                className="hover:text-primary-bg flex cursor-pointer items-center rounded-lg px-3 py-1 hover:bg-red-50! hover:text-red-500"
                onClick={handleLogOut}
              >
                <LogOut className="mr-2 h-4 w-4 text-red-500" />
                Log out
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileAvatar;
