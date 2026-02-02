import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";
import { adminRoutes } from "./adminRoutes";
import { clientRoutes } from "./clientRoutes";
import { employeeRoutes } from "./employeeRoutes";
import { financeRoutes } from "./financeRoutes";
import { managerRouters } from "./managerRouter";

// ===============> Admin dashboard <==================
// http://localhost:3000/dashboard/admin/overview

// ===============> manager dashboard <==================
// http://localhost:3000/dashboard/manager/overview

// ===============> finance dashboard <==================
// http://localhost:3000/dashboard/finance/overview

// ===============> employee dashboard <==================
// http://localhost:3000/dashboard/employee/overview

// ===============> client dashboard <==================
// http://localhost:3000/dashboard/client/overview

export type TSidebarConfigRole =
  | "admin"
  | "manager"
  | "employee"
  | "client"
  | "finance";

export interface SidebarItem {
  title: string;
  url: string;
  icon?: LucideIcon | IconType;
  subItems?: SidebarItem[];
}

export interface ISidebarSection {
  title?: string;
  link?: string;
  icon?: LucideIcon | IconType;
  items?: SidebarItem[];
  subItems?: SidebarItem[];
}

export interface ISidebarConfig {
  admin: ISidebarSection[];
  manager: ISidebarSection[];
  finance: ISidebarSection[];
  employee: ISidebarSection[];
  client: ISidebarSection[];
}

export const sidebarConfig: ISidebarConfig = {
  admin: adminRoutes,
  manager: managerRouters,
  finance: financeRoutes,
  employee: employeeRoutes,
  client: clientRoutes,
};
