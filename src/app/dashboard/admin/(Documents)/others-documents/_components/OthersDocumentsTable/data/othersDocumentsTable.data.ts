export interface IOthersDocumentsTableData {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedBy: string;
  date: string;
  status: "Approved" | "Pending" | "Rejected";
}

export const othersDocumentsTableData: IOthersDocumentsTableData[] = [
  {
    id: "1",
    name: "Q4_Financial_Report.pdf",
    size: "2.4 MB",
    type: "PDF",
    uploadedBy: "Sarah Johnson (Manager)",
    date: "Nov 28, 2025",
    status: "Approved",
  },
  {
    id: "2",
    name: "Q4_Financial_Report.doc",
    size: "2.4 MB",
    type: "DOCX",
    uploadedBy: "Randall M. Dorsett (Manager)",
    date: "Nov 28, 2025",
    status: "Pending",
  },
  {
    id: "3",
    name: "Q4_Financial_Report.pdf",
    size: "2.4 MB",
    type: "PDF",
    uploadedBy: "Barbara M. Ford (Employee)",
    date: "Nov 28, 2025",
    status: "Approved",
  },
  {
    id: "4",
    name: "Q4_Financial_Report.pdf",
    size: "2.4 MB",
    type: "PDF",
    uploadedBy: "Barbara M. Ford (Accountant)",
    date: "Nov 28, 2025",
    status: "Rejected",
  },
];
