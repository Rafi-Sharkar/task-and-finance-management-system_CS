import {
  BarChart3,
  BriefcaseBusiness,
  CheckCircle,
  LayoutDashboard,
  Radio,
  UserCog,
  Users,
} from "lucide-react";
import { ISidebarSection } from ".";

export const adminRoutes: ISidebarSection[] = [
  {
    items: [
      {
        title: "Dashboard",
        url: "/dashboard/admin/overview",
        icon: LayoutDashboard,
      },
      {
        title: "User Management",
        url: "/dashboard/admin/users-management",
        icon: Users,
      },
      {
        title: "Documents",
        url: "/dashboard/admin/tasks",
        icon: CheckCircle,
        subItems: [
          {
            title: "Others Documents",
            url: "/dashboard/admin/others-documents",
            icon: CheckCircle,
          },
          {
            title: "My Documents",
            url: "/dashboard/admin/my-documents",
            icon: Radio,
          },
        ],
      },
      // {
      //   title: "Projects & Clients Overview",
      //   url: "/dashboard/admin/projects-clients-overview",
      //   icon: BriefcaseBusiness,
      // },
      {
        title: "Task Management",
        url: "/dashboard/admin/task-management",
        icon: BriefcaseBusiness,
      },
      {
        title: "Invoices",
        url: "/dashboard/admin/invoices",
        icon: BriefcaseBusiness,
      },
      {
        title: "Financial Reports",
        url: "/dashboard/admin/financial-reports",
        icon: BriefcaseBusiness,
      },
      {
        title: "Audit Logs",
        url: "/dashboard/admin/audit-logs",
        icon: BriefcaseBusiness,
      },
      {
        title: "Support Chat",
        url: "/dashboard/admin/support",
        icon: BarChart3,
      },
      {
        title: "Settings",
        url: "/dashboard/admin/settings",
        icon: UserCog,
      },
    ],
  },
];
