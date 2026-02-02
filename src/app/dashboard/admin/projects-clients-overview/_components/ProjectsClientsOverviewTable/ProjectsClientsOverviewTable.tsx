"use client";

import CustomTable from "@/components/shared/dashboard/CustomTable/CustomTable";
import StatusBadge from "@/components/shared/dashboard/StatusBadge/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TColumn } from "@/types/custom-table.types";
import {
  CheckCircle2,
  CircleAlert,
  ListFilter,
  Search,
  TriangleAlert,
} from "lucide-react";
import Image from "next/image";
import {
  IProjectOverviewData,
  projectsOverviewData,
} from "./data/projectsClientsOverviewTable.data";

const ProjectsClientsOverviewTable = () => {
  const tableConfig: TColumn<IProjectOverviewData>[] = [
    {
      header: "Project Name",
      cell: (row) => (
        <span className="font-semibold text-[#171717]">{row?.projectName}</span>
      ),
    },
    {
      header: "Assigned",
      cell: (row) => (
        <div className="flex -space-x-2">
          {row?.assigned?.map((user) => (
            <Image
              key={user?.id}
              src={user?.avatar}
              alt={user?.name}
              width={50}
              height={50}
              className="h-10 w-10 rounded-full border-2 border-white"
            />
          ))}
        </div>
      ),
    },
    {
      header: "Progress",
      cell: (row) => (
        <Select defaultValue={row?.progress}>
          <SelectTrigger className="h-9 w-40 border-[#D5D7DA] bg-white text-xs">
            <div className="flex items-center gap-2">
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Complete">
              <div className="flex items-center gap-2 text-[#17B26A]">
                <span className="h-2 w-2 rounded-full bg-[#17B26A]" /> Complete
              </div>
            </SelectItem>
            <SelectItem value="In Progress">
              <div className="flex items-center gap-2 text-[#F79009]">
                <span className="h-2 w-2 rounded-full bg-[#F79009]" /> In
                Progress
              </div>
            </SelectItem>
            <SelectItem value="Not Complete">
              <div className="flex items-center gap-2 text-[#F04438]">
                <span className="h-2 w-2 rounded-full bg-[#DC2727]" /> Not
                Complete
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    { header: "Task Deadline", accessor: "taskDeadline" },
    {
      header: "Invoice",
      cell: (row) => {
        const isPaid = row.invoice === "Paid";
        return (
          <StatusBadge
            status={row.invoice}
            bgColor={isPaid ? "#D1FADF" : "#FEF0C7"}
            textColor={isPaid ? "#039855" : "#B54708"}
            className="rounded-md px-4 py-1.5 text-xs font-medium"
          />
        );
      },
    },
    { header: "Client Name", accessor: "clientName" },
    {
      header: "Risk",
      cell: (row) => {
        if (row.risk === "High")
          return <TriangleAlert className="text-[#F04438]" size={22} />;
        if (row.risk === "Medium")
          return <CircleAlert className="text-[#F79009]" size={22} />;
        return <CheckCircle2 className="text-[#12B76A]" size={22} />;
      },
    },
  ];

  return (
    <div className="w-full space-y-5">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-md bg-white p-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#667085]" />
          <Input
            type="search"
            placeholder="Search users, documents..."
            className="h-11 w-full border-[#D5D7DA] pl-12 shadow-none focus-visible:ring-1"
          />
        </div>

        <div className="flex items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="gap-2 border-[#D5D7DA] bg-[#FDFDFD] font-semibold text-[#181D27]"
              >
                <ListFilter size={18} /> Filter
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4" align="end">
              <p className="text-sm font-medium">Filter Options Coming Soon</p>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <CustomTable columns={tableConfig} data={projectsOverviewData} />
    </div>
  );
};

export default ProjectsClientsOverviewTable;
