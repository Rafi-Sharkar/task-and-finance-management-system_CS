"use client";
import NotificationButton from "../../../NotificationButton/NotificationButton";
import ProfileAvatar from "./_components/ProfileAvatar/ProfileAvatar";

function RightSection() {
  return (
    <div className="flex items-center gap-4">
      {/* Notification Bell */}
      {/* <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#D5D7DA] text-[#414651] hover:bg-gray-50">
        <Bell size={20} />
      </button> */}
      <NotificationButton />

      {/* User Dropdown Section */}
      {/* <UserAvatarDropdown /> */}
      <ProfileAvatar />
    </div>
  );
}

export default RightSection;
