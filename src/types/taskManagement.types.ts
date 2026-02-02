import { StaticImageData } from "next/image";

export interface IAssignedUser {
  id: string;
  name: string;
  avatarUrl: StaticImageData;
}

export interface ITaskManagementData {
  id: string;
  title: string;
  assignments: IAssignedUser[];
  priority: "Low" | "Medium" | "High";
  deadline: string;
  status: "Complete" | "In Progress" | "Not Complete";
}
