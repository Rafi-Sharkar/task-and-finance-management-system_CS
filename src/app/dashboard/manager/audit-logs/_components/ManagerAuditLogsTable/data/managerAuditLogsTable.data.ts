import AvatarImage1 from "@/assets/dashboard/Avatar1.png";
import { StaticImageData } from "next/image";

export interface IManagerAuditLog {
  id: string;
  user: {
    name: string;
    email: string;
    avatar: StaticImageData;
    isOnline: boolean;
  };
  displayEmail: string;
  role: string;
  activity: string;
  dateTime: string;
}

export const managerAuditLogsData: IManagerAuditLog[] = [
  {
    id: "1",
    user: {
      name: "Sarah John",
      email: "sarah@company.com",
      avatar: AvatarImage1,
      isOnline: true,
    },
    displayEmail: "sarah@gmail.com",
    role: "Manager",
    activity: "Uploaded Documents",
    dateTime: "April 14, 2025  10:00 PM",
  },
  {
    id: "2",
    user: {
      name: "Sarah John",
      email: "sarah@company.com",
      avatar: AvatarImage1,
      isOnline: true,
    },
    displayEmail: "sarah@gmail.com",
    role: "Manager",
    activity: "File Downloaded",
    dateTime: "April 14, 2025  10:00 PM",
  },
  {
    id: "3",
    user: {
      name: "Sarah John",
      email: "sarah@company.com",
      avatar: AvatarImage1,
      isOnline: true,
    },
    displayEmail: "sarah@gmail.com",
    role: "Manager",
    activity: "Task Completed",
    dateTime: "April 14, 2025  10:00 PM",
  },
  {
    id: "4",
    user: {
      name: "Sarah John",
      email: "sarah@company.com",
      avatar: AvatarImage1,
      isOnline: true,
    },
    displayEmail: "sarah@gmail.com",
    role: "Manager",
    activity: "Loggedout",
    dateTime: "April 14, 2025  10:00 PM",
  },
  {
    id: "5",
    user: {
      name: "Sarah John",
      email: "sarah@company.com",
      avatar: AvatarImage1,
      isOnline: true,
    },
    displayEmail: "sarah@gmail.com",
    role: "Manager",
    activity: "Sign in Recently",
    dateTime: "April 14, 2025  10:00 PM",
  },
];
