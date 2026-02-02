export interface IClientInvoice {
  id: string;
  invoiceId: string;
  totalAmount: string;
  paid: string;
  due: string;
  dueDate: string;
  status: "Paid" | "Due";
  receipt: "View" | "-";
}

export const clientInvoicesTableData: IClientInvoice[] = [
  {
    id: "1",
    invoiceId: "INV-2025-0045",
    totalAmount: "$2500",
    paid: "0",
    due: "$2500",
    dueDate: "Nov 20, 2025",
    status: "Due",
    receipt: "View",
  },
  {
    id: "2",
    invoiceId: "INV-2025-0045",
    totalAmount: "$2500",
    paid: "0",
    due: "$2500",
    dueDate: "Nov 20, 2025",
    status: "Due",
    receipt: "View",
  },
  {
    id: "3",
    invoiceId: "INV-2025-0045",
    totalAmount: "$2500",
    paid: "$2500",
    due: "-",
    dueDate: "-",
    status: "Paid",
    receipt: "-",
  },
  {
    id: "4",
    invoiceId: "INV-2025-0045",
    totalAmount: "$2500",
    paid: "$2500",
    due: "-",
    dueDate: "-",
    status: "Paid",
    receipt: "-",
  },
];
