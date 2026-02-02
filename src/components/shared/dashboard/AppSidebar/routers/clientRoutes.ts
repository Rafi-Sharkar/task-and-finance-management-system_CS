import {
  CheckSquare,
  CreditCard,
  FileText,
  LayoutDashboard,
  MessagesSquare
} from "lucide-react";
import { ISidebarSection } from ".";

export const clientRoutes: ISidebarSection[] = [
  {
    items: [
      {
        title: "Dashboard",
        url: "/dashboard/client/overview",
        icon: LayoutDashboard,
      },
      {
        title: "Documents",
        url: "/dashboard/client/documents",
        icon: CheckSquare,
      },
      {
        title: "My Invoices",
        url: "/dashboard/client/my-invoices",
        icon: FileText,
      },
      // {
      //   title: "Notifications",
      //   url: "/dashboard/client/notifications",
      //   icon: ArrowLeftRight,
      // },
      {
        title: "Support Chat",
        url: "/dashboard/client/support",
        icon: MessagesSquare,
      },
      {
        title: "Settings",
        url: "/dashboard/client/settings",
        icon: CreditCard,
      },
    ],
  },
];
