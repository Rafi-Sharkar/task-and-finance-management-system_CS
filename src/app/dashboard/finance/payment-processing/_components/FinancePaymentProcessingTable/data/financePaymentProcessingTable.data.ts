export interface IFinancePayment {
  id: string;
  paymentDate: string;
  referenceNo: string;
  vendor: string;
  paymentMethod: string;
  amount: string;
  invoice: string;
  status: "Completed" | "Pending";
}

export const financePaymentData: IFinancePayment[] = [
  {
    id: "1",
    paymentDate: "Feb 25 2025",
    referenceNo: "123123",
    vendor: "Office Supplier",
    paymentMethod: "Bank Transfer",
    amount: "$500",
    invoice: "Download",
    status: "Completed",
  },
  {
    id: "2",
    paymentDate: "Feb 25 2025",
    referenceNo: "123213",
    vendor: "House Rent",
    paymentMethod: "Card",
    amount: "$500",
    invoice: "Download",
    status: "Pending",
  },
  {
    id: "3",
    paymentDate: "Feb 25 2025",
    referenceNo: "123213",
    vendor: "House Rent",
    paymentMethod: "Card",
    amount: "$500",
    invoice: "Download",
    status: "Pending",
  },
];
