import { ClipboardList, DollarSign, FileText, Users } from "lucide-react";

export type FinanceManagementReportingStatsDataType = {
  id: number;
  title: string;
  value: string | number;
};

export const FinanceManagementReportingStatsData: FinanceManagementReportingStatsDataType[] =
  [
    {
      id: 1,
      title: "Total Revenue",
      value: "2,847",
    },
    {
      id: 2,
      title: "Documents Uploads",
      value: "2,300",
    },
    {
      id: 3,
      title: "Total Tasks",
      value: "1,450",
    },
    {
      id: 4,
      title: "Total Revenue",
      value: "$12,847",
    },
  ];

export const FinanceManagementReportingStatsDataConfig = [
  {
    icon: Users,
    color: "#45B56E",
  },
  {
    icon: FileText,
    color: "#D4A136",
  },
  {
    icon: ClipboardList,
    color: "#E86E6E",
  },
  {
    icon: DollarSign,
    color: "#252B37",
  },
];
