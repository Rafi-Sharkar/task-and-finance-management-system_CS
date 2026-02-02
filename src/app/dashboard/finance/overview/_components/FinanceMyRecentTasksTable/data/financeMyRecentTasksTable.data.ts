export interface IFinanceTransaction {
  id: string;
  taskName: string;
  priority: "Low" | "Medium" | "High";
  assignedBy: string;
  taskDedalSine: string;
  taskDeadline: string;
  status: "In Progress" | "Complete" | "In Complete";
}

export const financeTransactionsTableData: IFinanceTransaction[] = [
  {
    id: "£1232131",
    taskName: "Upload Docuemnts",
    priority: "Low",
    assignedBy: "Mehedi (Admin)",
    taskDedalSine: "April 12,2025",
    taskDeadline: "April 12,2025",
    status: "In Progress",
  },
  {
    id: "£1232131",
    taskName: "Upload Docuemnts",
    priority: "Low",
    assignedBy: "Mehedi (Admin)",
    taskDedalSine: "April 12,2025",
    taskDeadline: "April 12,2025",
    status: "Complete",
  },
  {
    id: "£1232131",
    taskName: "Upload Docuemnts",
    priority: "Low",
    assignedBy: "Mehedi (Admin)",
    taskDedalSine: "April 12,2025",
    taskDeadline: "April 12,2025",
    status: "Complete",
  },
  {
    id: "£1232131",
    taskName: "Upload Docuemnts",
    priority: "Low",
    assignedBy: "Mehedi (Admin)",
    taskDedalSine: "April 12,2025",
    taskDeadline: "April 12,2025",
    status: "Complete",
  },
  {
    id: "£1232131",
    taskName: "Upload Docuemnts",
    priority: "Low",
    assignedBy: "Mehedi (Admin)",
    taskDedalSine: "April 12,2025",
    taskDeadline: "April 12,2025",
    status: "In Complete",
  },
  {
    id: "£1232131",
    taskName: "Upload Docuemnts",
    priority: "Low",
    assignedBy: "Mehedi (Admin)",
    taskDedalSine: "April 12,2025",
    taskDeadline: "April 12,2025",
    status: "Complete",
  },
];
