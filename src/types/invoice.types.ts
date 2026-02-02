export type InvoiceStatus = "PENDING" | "PAID" | "DUE";
export type InvoiceType = "SELLS" | "EXPENSE";

export type TInvoice ={
  id: string;
  amount: string;
  vat: string;
  vatAmount: string;
  discount: string;
  supplierName: string;
  description: string;
  invoiceStatus: InvoiceStatus;
  invoiceType: InvoiceType;
  invoiceDate: string | Date;
  createdAt: string | Date;
  updatedAt: string | Date;

  // Nullable fields
  clientId: string | null;
  orgName: string | null;
  transactionId: string | null;
  discountDeadline: string | null;
}
