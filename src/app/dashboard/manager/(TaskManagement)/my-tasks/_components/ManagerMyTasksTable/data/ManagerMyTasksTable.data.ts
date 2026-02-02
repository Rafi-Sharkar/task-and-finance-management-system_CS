import AvatarImage1 from "@/assets/dashboard/Avatar1.png";
import AvatarImage2 from "@/assets/dashboard/Avatar2.png";
import AvatarImage3 from "@/assets/dashboard/Avatar3.png";
import AvatarImage4 from "@/assets/dashboard/Avatar4.png";
import { StaticImageData } from "next/image";

export interface IManagerMyTask {
  id: string;
  taskName: string;
  priority: "Low" | "Medium" | "High";
  assignedBy: {
    name: string;
    avatar: StaticImageData;
  };
  taskDeadline: string;
  status: "Complete" | "In Progress" | "In Complete";
}

export const managerMyTasksData: IManagerMyTask[] = [
  {
    id: "£1232131",
    taskName: "Upload Docuemnts",
    priority: "Low",
    assignedBy: { name: "Meshed (Admin)", avatar: AvatarImage1 },
    taskDeadline: "April 12, 2025",
    status: "In Progress",
  },
  {
    id: "£1232131",
    taskName: "Upload Documents",
    priority: "High",
    assignedBy: { name: "Meshed (Admin)", avatar: AvatarImage2 },
    taskDeadline: "April 12, 2025",
    status: "Complete",
  },
  {
    id: "£1232131",
    taskName: "Upload Documents",
    priority: "Low",
    assignedBy: { name: "Mahdi (Admin)", avatar: AvatarImage3 },
    taskDeadline: "April 12, 2025",
    status: "Complete",
  },
  {
    id: "£1232131",
    taskName: "Upload Documents",
    priority: "Medium",
    assignedBy: { name: "Meed (Admin)", avatar: AvatarImage4 },
    taskDeadline: "April 12, 2025",
    status: "In Complete",
  },
];
