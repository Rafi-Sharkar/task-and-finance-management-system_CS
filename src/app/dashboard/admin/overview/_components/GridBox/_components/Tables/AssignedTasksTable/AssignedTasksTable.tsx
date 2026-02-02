/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import profileImage from "@/assets/fallback-image/user-avatar.jpg";
import CustomTable from "@/components/shared/dashboard/CustomTable/CustomTable";
import StatusBadge from "@/components/shared/dashboard/StatusBadge/StatusBadge";
import EmptyState from "@/components/shared/EmptyState/EmptyState";
import TableSkeletonLoader from "@/components/shared/loader/TableSkeletonLoader/TableSkeletonLoader";
import { Button } from "@/components/ui/button";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetMyTasksQuery,
  useUpdateTaskMutation,
} from "@/redux/features/admin/tasks/tasks.api";
import { TColumn } from "@/types/custom-table.types";
import { ITaskManagementData } from "@/types/taskManagement.types";
import { catchAsyncMutation } from "@/utils/apiReqRes.utils";
import { formatDateTime } from "@/utils/formatDateTime";
import { Select } from "@radix-ui/react-select";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

const AssignedTasksTable = () => {
  const { data: tasks, isLoading, isFetching } = useGetMyTasksQuery(undefined);

  // Inline Priority Update
  const handlePriorityChange = async (taskId: string, newPriority: string) => {
    await catchAsyncMutation(
      updateTask({ taskId, priority: newPriority }).unwrap(),
      (res) => toast.success(res?.message || "Priority updated successfully!"),
    );
  };

  // Mutations

  const [updateTask] = useUpdateTaskMutation();

  //Table Configuration
  const AssignedTasksConfig: TColumn<ITaskManagementData>[] = [
    {
      header: "Id",
      cell: (row) => (
        <div className="max-w-32 cursor-help truncate" title={row?.id}>
          {row?.id}
        </div>
      ),
    },
    {
      header: "Task Name",
      cell: (row) => (
        <span className="font-semibold text-[#171717]">{row?.title}</span>
      ),
    },
    {
      header: "Assigned",
      cell: (row) => (
        <div className="flex -space-x-2">
          {row?.assignments?.map((assign: any) => (
            <Image
              key={assign?.employee?.id}
              src={assign?.employee?.avatarUrl || profileImage}
              alt={assign?.employee?.fullName || "Employee Avatar"}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full border-2 border-white object-cover"
            />
          ))}
        </div>
      ),
    },
    {
      header: "Priority",
      cell: (row) => (
        <Select
          defaultValue={row?.priority}
          onValueChange={(value) => handlePriorityChange(row?.id, value)}
        >
          <SelectTrigger className="h-9 w-32 rounded-md border-[#D5D7DA] bg-white text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="LOW">
              <div className="flex items-center gap-2 text-[#17B26A]">
                <span className="h-2 w-2 rounded-full bg-[#17B26A]" /> Low
              </div>
            </SelectItem>
            <SelectItem value="MEDIUM">
              <div className="flex items-center gap-2 text-[#F79009]">
                <span className="h-2 w-2 rounded-full bg-[#F79009]" /> Medium
              </div>
            </SelectItem>
            <SelectItem value="HIGH">
              <div className="flex items-center gap-2 text-[#F04438]">
                <span className="h-2 w-2 rounded-full bg-[#F04438]" /> High
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      header: "Deadline",
      cell: (row) => (
        <span className="text-sm text-[#737373]">
          {formatDateTime(row?.deadline)}
        </span>
      ),
    },
    {
      header: "Status",
      cell: (row) => {
        const status = row?.status;
        const colors: any = {
          IN_PROGRESS: { bg: "#FEF0C7", text: "#B54708" },
          NOT_COMPLETE: { bg: "#FEE4E2", text: "#F04438" },
          COMPLETE: { bg: "#D1FADF", text: "#039855" },
        };
        const activeColor = colors[status] || {
          bg: "#F2F4F7",
          text: "#344054",
        };
        return (
          <StatusBadge
            status={status?.replace("_", " ")}
            bgColor={activeColor.bg}
            textColor={activeColor.text}
          />
        );
      },
    },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Header Section */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-[#1E1B39]">
          Recent Assigned Tasks
        </h2>

        <Link href={"/dashboard/admin/task-management"}>
          <Button className="bg-[#155DFC] px-6 font-medium text-white hover:bg-[#0856fd] md:py-5 cursor-pointer">
            View All
          </Button>
        </Link>
      </div>

      {/* Loading States */}
      {(isLoading || isFetching) && <TableSkeletonLoader />}

      {/* Empty State */}
      {!isLoading && !isFetching && !tasks?.data?.length && (
        <EmptyState
          title="No tasks found"
          description="No tasks match your current criteria."
          className="rounded-xl border bg-white"
        />
      )}

      {/* Table Content */}
      {!isLoading && !isFetching && tasks?.data?.length && (
        <CustomTable
          columns={AssignedTasksConfig}
          data={tasks?.data.slice(0, 5)}
        />
      )}
    </div>
  );
};

export default AssignedTasksTable;
