"use client";

import CustomTable from "@/components/shared/dashboard/CustomTable/CustomTable";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TColumn } from "@/types/custom-table.types";
import { MoreVertical } from "lucide-react";
import {
  financeTransactionsTableData,
  IFinanceTransaction,
} from "./data/financeMyRecentTasksTable.data";

function FinanceMyRecentTasksTable() {
  const tableConfig: TColumn<IFinanceTransaction>[] = [
    { header: "Id", accessor: "id" },
    {
      header: "Task Name",
      cell: (row) => (
        <span className="font-semibold text-[#101828]">{row.taskName}</span>
      ),
    },
    {
      header: "Priority",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#12B76A]" />
          <span className="text-sm font-medium text-[#12B76A]">
            {row.priority}
          </span>
        </div>
      ),
    },
    { header: "Assigned by", accessor: "assignedBy" },
    { header: "Task DedalSine", accessor: "taskDedalSine" },
    { header: "Task Deadline", accessor: "taskDeadline" },
    {
      header: "Status",
      cell: (row) => (
        <Select defaultValue={row.status}>
          <SelectTrigger className="h-10 w-44 rounded-lg border-[#E4E7EC] bg-white text-sm focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="In Progress">
              <div className="flex items-center gap-2 text-[#B54708]">
                <span className="h-2 w-2 rounded-full bg-[#F79009]" /> In
                Progress
              </div>
            </SelectItem>
            <SelectItem value="Complete">
              <div className="flex items-center gap-2 text-[#039855]">
                <span className="h-2 w-2 rounded-full bg-[#12B76A]" /> Complete
              </div>
            </SelectItem>
            <SelectItem value="In Complete">
              <div className="flex items-center gap-2 text-[#D92D20]">
                <span className="h-2 w-2 rounded-full bg-[#F04438]" /> In
                Complete
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      header: "Action",
      cell: () => (
        <button className="rounded-full p-1 text-[#667085] hover:bg-gray-50">
          <MoreVertical size={20} />
        </button>
      ),
    },
  ];

  return (
    <section className="w-full space-y-5">
      {/* Header Section */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-[#1E1B39]">
          My Recent Tasks
        </h2>

        <Button className="bg-[#155DFC] px-6 font-medium text-white hover:bg-[#0856fd] md:py-5">
          View All
        </Button>
      </div>

      <CustomTable columns={tableConfig} data={financeTransactionsTableData} />
    </section>
  );
}

export default FinanceMyRecentTasksTable;
