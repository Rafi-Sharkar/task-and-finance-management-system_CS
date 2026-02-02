import UserAvatar from "@/assets/dashboard/Avatar1.png";
import { StaticImageData } from "next/image";

export interface IAuditLogData {
  id: number;
  user: {
    name: string;
    id: string;
    avatar: StaticImageData;
    status: "online" | "offline";
  };
  email: string;
  role: string;
  activity: string;
  dateTime: string;
}

export const AuditLogsData: IAuditLogData[] = [
  {
    id: 1,
    user: {
      name: "Sarah John",
      id: "sa@company.com",
      avatar: UserAvatar,
      status: "online",
    },
    email: "sarah@gmail.com",
    role: "Manager",
    activity: "Task Completed",
    dateTime: "April 14, 2025  10:00 PM",
  },
  {
    id: 2,
    user: {
      name: "Sarah John",
      id: "sa@company.com",
      avatar: UserAvatar,
      status: "online",
    },
    email: "sarah@gmail.com",
    role: "Manager",
    activity: "Loggedout",
    dateTime: "April 14, 2025  10:00 PM",
  },
  {
    id: 3,
    user: {
      name: "Sarah John",
      id: "sa@company.com",
      avatar: UserAvatar,
      status: "online",
    },
    email: "sarah@gmail.com",
    role: "Manager",
    activity: "Sign in Recently",
    dateTime: "April 14, 2025  10:00 PM",
  },
  {
    id: 4,
    user: {
      name: "Sarah John",
      id: "sa@company.com",
      avatar: UserAvatar,
      status: "online",
    },
    email: "sarah@gmail.com",
    role: "Manager",
    activity: "Uploaded Documents",
    dateTime: "April 14, 2025  10:00 PM",
  },
];
