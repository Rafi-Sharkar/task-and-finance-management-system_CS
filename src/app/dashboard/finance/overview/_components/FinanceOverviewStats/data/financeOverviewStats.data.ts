import { ClipboardList, DollarSign, FileText, Users } from "lucide-react";

export type financeOverviewStatsDataType = {
  id: number;
  title: string;
  value: string | number;
};

export const financeOverviewStatsData: financeOverviewStatsDataType[] = [
  {
    id: 1,
    title: "Total Invoices",
    value: "2,847",
  },
  {
    id: 2,
    title: "Pending Payments",
    value: "$487,250",
  },
  {
    id: 3,
    title: "Paid",
    value: "$287,250",
  },
  {
    id: 4,
    title: "VAT Due",
    value: "$8,450",
  },
];

export const financeOverviewStatsConfig = [
  {
    icon: Users,
    color: "#155DFC",
  },
  {
    icon: FileText,
    color: "#155DFC",
  },
  {
    icon: ClipboardList,
    color: "#155DFC",
  },
  {
    icon: DollarSign,
    color: "#155DFC",
  },
];
