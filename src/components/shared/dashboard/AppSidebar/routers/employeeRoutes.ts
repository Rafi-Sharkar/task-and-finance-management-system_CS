import {
  CheckSquare,
  CreditCard,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Wallet
} from "lucide-react";
import { ISidebarSection } from ".";

export const employeeRoutes: ISidebarSection[] = [
  {
    items: [
      {
        title: "Dashboard",
        url: "/dashboard/employee/overview",
        icon: LayoutDashboard,
      },
      {
        title: "My Tasks",
        url: "/dashboard/employee/my-tasks",
        icon: Wallet,
      },
      {
        title: "My Documents",
        url: "/dashboard/employee/my-documents",
        icon: CheckSquare,
      },
      // {
      //   title: "Notifications",
      //   url: "/dashboard/employee/notifications",
      //   icon: ArrowLeftRight,
      // },
      {
        title: "Audit Logs",
        url: "/dashboard/employee/audit-logs",
        icon: FileText,
      },
      {
        title: "Support Chat",
        url: "/dashboard/employee/support",
        icon: HelpCircle,
      },
      {
        title: "Settings",
        url: "/dashboard/employee/settings",
        icon: CreditCard,
      },
    ],
  },
];
