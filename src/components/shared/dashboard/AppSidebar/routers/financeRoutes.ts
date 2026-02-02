import {
  ArrowLeftRight,
  BarChart3,
  CalendarRange,
  ClipboardList,
  CreditCard,
  FileCheck,
  FileIcon,
  FileMinus,
  FileText,
  HandCoins,
  Landmark,
  Layers,
  LayoutDashboard,
  LineChart,
  MessageCircle,
  Percent,
  Receipt,
  Settings,
  ShieldCheck,
  Users,
  Wallet
} from "lucide-react";
import { ISidebarSection } from ".";

export const financeRoutes: ISidebarSection[] = [
  {
    items: [
      {
        title: "Dashboard",
        url: "/dashboard/finance/overview",
        icon: LayoutDashboard,
      },
      // {
      //   title: "My Tasks",
      //   url: "/dashboard/finance/my-tasks",
      //   icon: CheckSquare,
      // },
      {
        title: "My Documents",
        url: "/dashboard/finance/my-documents",
        icon: FileText,
      },
      {
        title: "Transactions",
        url: "/dashboard/finance/transactions",
        icon: ArrowLeftRight,
      },
      {
        title: "Cash Management",
        url: "/dashboard/finance/cash-management",
        icon: Wallet,
      },
      {
        title: "Payment Processing",
        url: "/dashboard/finance/payment-processing",
        icon: CreditCard,
      },
      {
        title: "Bank Reconciliation",
        url: "/dashboard/finance/bank-reconciliation",
        icon: Landmark,
      },
      {
        title: "Account Receivable",
        url: "/dashboard/finance/account-receivable",
        icon: HandCoins,
      },
      {
        title: "Account Payable",
        url: "/dashboard/finance/account-payable",
        icon: Receipt,
      },
      {
        title: "Invoice",
        url: "/dashboard/finance/invoice",
        icon: FileIcon,
        subItems: [
          {
            title: "Clients Invoice",
            url: "/dashboard/finance/clients-invoice",
            icon: Users,
          },
          {
            title: "Expenses Invoices",
            url: "/dashboard/finance/expenses-invoices",
            icon: FileMinus,
          },
        ],
      },
      {
        title: "VAT",
        url: "/dashboard/finance/vat",
        icon: Percent,
        subItems: [
          {
            title: "VAT Returns",
            url: "/dashboard/finance/vat-returns",
            icon: FileCheck,
          },
          {
            title: "Regulatory Reporting",
            url: "/dashboard/finance/regulatory-reporting",
            icon: ClipboardList,
          },
        ],
      },
      {
        title: "Month & Year-End",
        url: "/dashboard/finance/month-year-end",
        icon: CalendarRange,
        subItems: [
          {
            title: "Accruals & Deferrals",
            url: "/dashboard/finance/accruals-deferrals",
            icon: Layers,
          },
          {
            title: "Provisions",
            url: "/dashboard/finance/provisions",
            icon: ShieldCheck,
          },
          {
            title: "Financial Statements",
            url: "/dashboard/finance/financial-statements",
            icon: BarChart3,
          },
          {
            title: "Management Reporting",
            url: "/dashboard/finance/management-reporting",
            icon: LineChart,
          },
        ],
      },
      {
        title: "Support Chat",
        url: "/dashboard/finance/support",
        icon: MessageCircle,
      },
      {
        title: "Settings",
        url: "/dashboard/finance/settings",
        icon: Settings,
      },
    ],
  },
];
