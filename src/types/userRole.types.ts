export type TUserRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "MANAGER"
  | "EMPLOYEE"
  | "CLIENT"
  | "FINANCE";

export type TAccountStatus = "ACTIVE" | "PENDING" | "INACTIVE";

export type TLoginUser = {
  id: string;
  email: string;
  username: string;
  fullName: string;
  role: TUserRole;
  profilePicture?: string;
  phone?: string;
  accountStatus: TAccountStatus;
};

export interface IUser {
  id: string;
  username: string;
  email: string;
  role: TUserRole;
  accountStatus: TAccountStatus;
  isActive: boolean;
  isDeleted: boolean;
  isVerified: boolean;
  avatarUrl: string | null;
  fullName: string | null;
  phone: string | null;
  lastActive: string | null;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
}
