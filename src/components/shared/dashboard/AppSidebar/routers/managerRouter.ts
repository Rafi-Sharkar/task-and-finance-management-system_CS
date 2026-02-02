import {
  BriefcaseBusiness,
  CheckCircle,
  LayoutDashboard,
  Radio,
  Users,
} from "lucide-react";
import { ISidebarSection } from ".";

export const managerRouters: ISidebarSection[] = [
  {
    items: [
      {
        title: "Dashboard",
        url: "/dashboard/manager/overview",
        icon: LayoutDashboard,
      },
      {
        title: "Users",
        url: "/dashboard/manager/users",
        icon: Users,
      },
      {
        title: "Task Management",
        url: "#",
        icon: CheckCircle,
        subItems: [
          {
            title: "Manage Tasks",
            url: "/dashboard/manager/manage-tasks",
            icon: CheckCircle,
          },
          {
            title: "My Tasks",
            url: "/dashboard/manager/my-tasks",
            icon: Radio,
          },
        ],
      },
      {
        title: "My Documents",
        url: "/dashboard/manager/my-documents",
        icon: BriefcaseBusiness,
      },
      {
        title: "Audit Logs",
        url: "/dashboard/manager/audit-logs",
        icon: BriefcaseBusiness,
      },
      {
        title: "Support Chat",
        url: "/dashboard/manager/support",
        icon: BriefcaseBusiness,
      },
      {
        title: "Settings",
        url: "/dashboard/manager/settings",
        icon: BriefcaseBusiness,
      },
    ],
  },
];
