import AvatarImage1 from "@/assets/dashboard/Avatar1.png";
import AvatarImage2 from "@/assets/dashboard/Avatar2.png";
import AvatarImage3 from "@/assets/dashboard/Avatar3.png";
import AvatarImage4 from "@/assets/dashboard/Avatar4.png";

import { StaticImageData } from "next/image";
export interface IAssignedUser {
  id: string;
  name: string;
  avatar: StaticImageData;
}

export interface IProjectOverviewData {
  id: string;
  projectName: string;
  assigned: IAssignedUser[];
  progress: "Complete" | "In Progress" | "Not Complete";
  taskDeadline: string;
  invoice: "Paid" | "Pending";
  clientName: string;
  risk: "High" | "Medium" | "Low";
}

export const projectsOverviewData: IProjectOverviewData[] = [
  {
    id: "1",
    projectName: "Website Redesign",
    assigned: [
      { id: "1", name: "Alice", avatar: AvatarImage1 },
      { id: "2", name: "John", avatar: AvatarImage2 },
      { id: "3", name: "Sarah", avatar: AvatarImage3 },
      { id: "4", name: "David", avatar: AvatarImage4 },
    ],
    progress: "Complete",
    taskDeadline: "April 12, 2025",
    invoice: "Pending",
    clientName: "Lawrence",
    risk: "High",
  },
  {
    id: "2",
    projectName: "Mobile App Development",
    assigned: [
      { id: "1", name: "Alice", avatar: AvatarImage1 },
      { id: "2", name: "John", avatar: AvatarImage2 },
      { id: "3", name: "Sarah", avatar: AvatarImage3 },
      { id: "4", name: "David", avatar: AvatarImage4 },
    ],
    progress: "Complete",
    taskDeadline: "April 12, 2025",
    invoice: "Paid",
    clientName: "Una D. Gomez",
    risk: "Low",
  },
  {
    id: "3",
    projectName: "Website Redesign",
    assigned: [
      { id: "1", name: "Alice", avatar: AvatarImage1 },
      { id: "2", name: "John", avatar: AvatarImage2 },
      { id: "3", name: "Sarah", avatar: AvatarImage3 },
      { id: "4", name: "David", avatar: AvatarImage4 },
    ],
    progress: "In Progress",
    taskDeadline: "April 12, 2025",
    invoice: "Pending",
    clientName: "Una D. Gomez",
    risk: "High",
  },
  {
    id: "4",
    projectName: "Data Analytics Dashboard",
    assigned: [
      { id: "1", name: "Alice", avatar: AvatarImage1 },
      { id: "2", name: "John", avatar: AvatarImage2 },
      { id: "3", name: "Sarah", avatar: AvatarImage3 },
      { id: "4", name: "David", avatar: AvatarImage4 },
    ],
    progress: "Not Complete",
    taskDeadline: "April 12, 2025",
    invoice: "Pending",
    clientName: "Una D. Gomez",
    risk: "High",
  },
  {
    id: "5",
    projectName: "Mobile App Development",
    assigned: [
      { id: "1", name: "Alice", avatar: AvatarImage1 },
      { id: "2", name: "John", avatar: AvatarImage2 },
      { id: "3", name: "Sarah", avatar: AvatarImage3 },
      { id: "4", name: "David", avatar: AvatarImage4 },
    ],
    progress: "Complete",
    taskDeadline: "April 12, 2025",
    invoice: "Paid",
    clientName: "Lawrence",
    risk: "Low",
  },
  {
    id: "6",
    projectName: "Mobile App Development",
    assigned: [
      { id: "1", name: "Alice", avatar: AvatarImage1 },
      { id: "2", name: "John", avatar: AvatarImage2 },
      { id: "3", name: "Sarah", avatar: AvatarImage3 },
      { id: "4", name: "David", avatar: AvatarImage4 },
    ],
    progress: "Complete",
    taskDeadline: "April 12, 2025",
    invoice: "Paid",
    clientName: "Lawrence",
    risk: "Low",
  },
  {
    id: "7",
    projectName: "Website Redesign",
    assigned: [
      { id: "1", name: "Alice", avatar: AvatarImage1 },
      { id: "2", name: "John", avatar: AvatarImage2 },
      { id: "3", name: "Sarah", avatar: AvatarImage3 },
      { id: "4", name: "David", avatar: AvatarImage4 },
    ],
    progress: "In Progress",
    taskDeadline: "April 12, 2025",
    invoice: "Paid",
    clientName: "Lawrence",
    risk: "Medium",
  },
];
