export interface ClientNotification {
  id: number;
  message: string;
  targetName: string;
  actionText: string;
}

export const ClientOverviewNotificationsData: ClientNotification[] = [
  {
    id: 1,
    message: "Document pending signature:",
    targetName: "Client_Agreement.pdf",
    actionText: "Sign Document",
  },
  {
    id: 2,
    message: "Invoice due:",
    targetName: "INV-2025-0045",
    actionText: "Pay invoice",
  },
  {
    id: 3,
    message: "New document shared:",
    targetName: "Project_Scope.pdf",
    actionText: "View document",
  },
];
