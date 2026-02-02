export interface IRegulatoryReporting {
  id: string;
  periodType: string;
  period: string;
  years: number;
  jurisdictions: string | null;
  inVat: number;
  outVat: number;
  netVat: number;
  documentId: string | null;
  createdAt: string;
  updatedAt: string;
  vatStatus: "PENDING" | "PAID" | "SUBMITTED";
}