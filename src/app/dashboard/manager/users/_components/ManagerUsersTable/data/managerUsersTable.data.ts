import AvatarImage1 from "@/assets/dashboard/Avatar1.png";

import { StaticImageData } from "next/image";

export interface IManagerUser {
  id: string;
  user: {
    name: string;
    email: string;
    avatar: StaticImageData;
    isOnline: boolean;
  };
  displayEmail: string;
  organization: string;
  role: "Employee" | "Acccountant" | "Client";
  status: "Active" | "Pending" | "Inactive";
  lastActive: string;
}

export const managerUsersData: IManagerUser[] = [
  {
    id: "1",
    user: {
      name: "Sarah John",
      email: "sarah@company.com",
      avatar: AvatarImage1,
      isOnline: false,
    },
    displayEmail: "sarah@gmail.com",
    organization: "Softvence Agency",
    role: "Employee",
    status: "Pending",
    lastActive: "2 minutes ago",
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
    organization: "Softvence Agency",
    role: "Acccountant",
    status: "Inactive",
    lastActive: "2 minutes ago",
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
    organization: "Softvence Agency",
    role: "Employee",
    status: "Active",
    lastActive: "2 minutes ago",
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
    organization: "Softvence Agency",
    role: "Client",
    status: "Active",
    lastActive: "2 minutes ago",
  },
];
