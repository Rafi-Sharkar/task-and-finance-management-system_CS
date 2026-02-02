export interface NotificationItem {
  id: number;
  title: string;
  type: string;
  time: string;
  unread: boolean;
}

export const EmployeeNotificationsData: NotificationItem[] = [
  {
    id: 1,
    title: "New task assigned: Upload Financial Report Q2",
    type: "New task",
    time: "Just now",
    unread: true,
  },
  {
    id: 2,
    title: "Document approved: Invoice_123456.pdf",
    type: "Document",
    time: "Just now",
    unread: true,
  },
  {
    id: 3,
    title: "New task assigned: Upload Financial Report Q2",
    type: "New task",
    time: "5 minutes ago",
    unread: false,
  },
  {
    id: 4,
    title: "Document rejected: HR_Policy_Update.docx",
    type: "Document",
    time: "2 hours ago",
    unread: false,
  },
  {
    id: 5,
    title: "Document uploaded: Q2_Financial_Report.pdf",
    type: "Document",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 6,
    title: "New task assigned: Upload Financial Report Q2",
    type: "New task",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 7,
    title: "New task assigned: Upload Financial Report Q2",
    type: "New task",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 8,
    title: "New task assigned: Upload Financial Report Q2",
    type: "New task",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 9,
    title: "New task assigned: Upload Financial Report Q2",
    type: "New task",
    time: "Apr 24, 2025",
    unread: false,
  },
  {
    id: 10,
    title: "New task assigned: Upload Financial Report Q2",
    type: "New task",
    time: "Apr 24, 2025",
    unread: false,
  },
];
