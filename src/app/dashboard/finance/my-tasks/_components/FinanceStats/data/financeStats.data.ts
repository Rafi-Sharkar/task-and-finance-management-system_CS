export type FinanceStatsStatsDataType = {
  id: number;
  title: string;
  value: string | number;
};

export const FinanceStatsStatsData: FinanceStatsStatsDataType[] = [
  {
    id: 1,
    title: "Total Tasks",
    value: "1000",
  },
  {
    id: 2,
    title: "In Progress",
    value: "1",
  },
  {
    id: 3,
    title: "Completed",
    value: "6",
  },
  {
    id: 4,
    title: "Not Completed",
    value: "3",
  },
];

export const FinanceStatsStatsConfig = [
  {
    color: "#2563EB",
  },
  {
    color: "#C98904",
  },
  {
    color: "#16A34A",
  },
  {
    color: "#DC2727",
  },
];
