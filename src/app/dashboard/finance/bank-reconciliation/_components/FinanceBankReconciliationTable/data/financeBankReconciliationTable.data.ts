export interface IBankReconciliation {
  id: string;
  paymentDate: string;
  referenceNo: string;
  vendor: string;
  ledgerAmount: string;
  bankAmount: string;
  status: "Match" | "Pending" | "Adjustment" | "Failed";
}

export const financeReconciliationData: IBankReconciliation[] = [
  {
    id: "1",
    paymentDate: "Feb 25 2025",
    referenceNo: "123123",
    vendor: "Office Supplier",
    ledgerAmount: "$200",
    bankAmount: "$500",
    status: "Match",
  },
  {
    id: "2",
    paymentDate: "Feb 25 2025",
    referenceNo: "123213",
    vendor: "House Rent",
    ledgerAmount: "$1000",
    bankAmount: "0",
    status: "Pending",
  },
  {
    id: "3",
    paymentDate: "Feb 25 2025",
    referenceNo: "123213",
    vendor: "House Rent",
    ledgerAmount: "$1000",
    bankAmount: "$500",
    status: "Adjustment",
  },
  {
    id: "4",
    paymentDate: "Feb 25 2025",
    referenceNo: "123213",
    vendor: "House Rent",
    ledgerAmount: "$1000",
    bankAmount: "0",
    status: "Failed",
  },
];
