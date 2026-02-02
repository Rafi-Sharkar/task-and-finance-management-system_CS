export interface IAuditLogData {
  id: string;
  userId: string;
  action: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
    email: string;
    fullName: string;
    role: string;
    avatar?: string;
  };
}
