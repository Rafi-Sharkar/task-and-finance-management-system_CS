export interface IFinanceStatement {
  id: string;
  item: string;
  issue: string;
  status: "Done" | "Pending" | "Missing";
  actionLabel: "View" | "Review" | "Add" | "Upload";
}

export const financeStatementsData: IFinanceStatement[] = [
  {
    id: "1",
    item: "Accruals reviewed",
    issue: "—",
    status: "Done",
    actionLabel: "View",
  },
  {
    id: "2",
    item: "Deferrals posted",
    issue: "1 Pending entry",
    status: "Pending",
    actionLabel: "Review",
  },
  {
    id: "3",
    item: "Provisions confirmed",
    issue: "No provision for legal case",
    status: "Missing",
    actionLabel: "Add",
  },
  {
    id: "4",
    item: "Bank reconciliation",
    issue: "—",
    status: "Done",
    actionLabel: "View",
  },
  {
    id: "5",
    item: "Documents attached",
    issue: "Rent invoice missing",
    status: "Missing",
    actionLabel: "Upload",
  },
];
