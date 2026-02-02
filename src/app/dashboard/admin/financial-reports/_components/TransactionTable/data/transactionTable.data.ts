export interface ITransactionsTableData {
  id: string;
  transactionId: string;
  organization: string;
  type: "Revenue" | "Expense";
  totalAmount: string;
  paid: string;
  due: string;
  status: "Paid" | "Due";
}

export const transactionsTableData: ITransactionsTableData[] = [
  {
    id: "1",
    transactionId: "TX-001",
    organization: "Acme Corp",
    type: "Revenue",
    totalAmount: "$500",
    paid: "$500",
    due: "$0",
    status: "Paid",
  },
  {
    id: "2",
    transactionId: "TX-002",
    organization: "Acme Corp",
    type: "Revenue",
    totalAmount: "$200",
    paid: "$200",
    due: "$0",
    status: "Paid",
  },
  {
    id: "3",
    transactionId: "TX-003",
    organization: "Acme Corp",
    type: "Expense",
    totalAmount: "$800",
    paid: "$600",
    due: "$200",
    status: "Due",
  },
  {
    id: "4",
    transactionId: "TX-004",
    organization: "Acme Corp",
    type: "Expense",
    totalAmount: "$650",
    paid: "$650",
    due: "$0",
    status: "Paid",
  },
];
