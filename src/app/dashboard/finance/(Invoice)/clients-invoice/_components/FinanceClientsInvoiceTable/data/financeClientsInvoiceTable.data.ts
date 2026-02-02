export interface IFinanceClientInvoice {
  id: string;
  invoices: string;
  date: string;
  organization: string;
  amount: string;
  vat: string;
  status: "Paid" | "Pending" | "Due";
}

export const financeClientInvoicesData: IFinanceClientInvoice[] = [
  {
    id: "1",
    invoices: "INV-001",
    date: "April 12,2025",
    organization: "Acme Corp",
    amount: "$500",
    vat: "7%",
    status: "Paid",
  },
  {
    id: "2",
    invoices: "INV-001",
    date: "April 12,2025",
    organization: "Acme Corp",
    amount: "$500",
    vat: "7%",
    status: "Paid",
  },
  {
    id: "3",
    invoices: "INV-002",
    date: "April 12,2025",
    organization: "Acme Corp",
    amount: "$200",
    vat: "10%",
    status: "Pending",
  },
  {
    id: "4",
    invoices: "INV-002",
    date: "April 12,2025",
    organization: "Acme Corp",
    amount: "$200",
    vat: "10%",
    status: "Pending",
  },
  {
    id: "5",
    invoices: "INV-003",
    date: "April 12,2025",
    organization: "Acme Corp",
    amount: "$600",
    vat: "7%",
    status: "Due",
  },
  {
    id: "6",
    invoices: "INV-003",
    date: "April 12,2025",
    organization: "Acme Corp",
    amount: "$600",
    vat: "7%",
    status: "Due",
  },
  {
    id: "7",
    invoices: "INV-004",
    date: "April 12,2025",
    organization: "Acme Corp",
    amount: "$650",
    vat: "12%",
    status: "Paid",
  },
  {
    id: "8",
    invoices: "INV-004",
    date: "April 12,2025",
    organization: "Acme Corp",
    amount: "$650",
    vat: "12%",
    status: "Paid",
  },
];
