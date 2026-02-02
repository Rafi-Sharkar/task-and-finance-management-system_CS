export interface IManagementReporting {
  id: string;
  month: string;
  organization: string;
  revenue: string;
  expense: string;
  profitLoss: string;
}

export const financeManagementData: IManagementReporting[] = [
  {
    id: "1",
    month: "Jan 2025",
    organization: "Acme Corp",
    revenue: "$500",
    expense: "$300",
    profitLoss: "+$200",
  },
  {
    id: "2",
    month: "Feb 2025",
    organization: "Acme Corp",
    revenue: "$200",
    expense: "$100",
    profitLoss: "+$100",
  },
  {
    id: "3",
    month: "Mar 2025",
    organization: "Acme Corp",
    revenue: "$600",
    expense: "$400",
    profitLoss: "+$200",
  },
  {
    id: "4",
    month: "Apr 2025",
    organization: "Acme Corp",
    revenue: "$650",
    expense: "$700",
    profitLoss: "-$50",
  },
];
