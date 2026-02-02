/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import TaskDetails from "@/app/dashboard/admin/task-management/_components/TaskDetails/TaskDetails";
import fallbackImage from "@/assets/fallback-image/user-avatar.jpg";
import CustomTable from "@/components/shared/dashboard/CustomTable/CustomTable";
import DynamicModal from "@/components/shared/dashboard/DynamicModal/DynamicModal";
import EmptyState from "@/components/shared/EmptyState/EmptyState";
import TableSkeletonLoader from "@/components/shared/loader/TableSkeletonLoader/TableSkeletonLoader";
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
import useSetSearchQueryInURL from "@/hooks/useSetSearchQueryInURL";
import {
  useGetTasksAssignedToMeQuery,
  useUpdateAssignmentStatusMutation,
} from "@/redux/features/admin/tasks/tasks.api";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { TColumn } from "@/types/custom-table.types";
import { ITaskManagementData } from "@/types/taskManagement.types";
import { catchAsyncMutation } from "@/utils/apiReqRes.utils";
import { formatDateTime } from "@/utils/formatDateTime";
import { Eye, ListFilter, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

function FinanceMyTasksTable() {
  const { getQueryObject, setQuery, deleteQuery } = useSetSearchQueryInURL();
  const query = getQueryObject();

  // Fetch Tasks (Manager roles reuse the same assigned-to-me logic)
  const {
    data: tasks,
    isLoading,
    isFetching,
  } = useGetTasksAssignedToMeQuery(query);
  const currentUser = useAppSelector(useCurrentUser);

  const [updateAssignmentStatus] = useUpdateAssignmentStatusMutation();

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITaskManagementData | null>(
    null,
  );

  const handleSearchTask = (search: string) => {
    if (search === "") {
      deleteQuery("title");
    } else {
      setQuery("title", search);
    }
  };

  const handleView = (task: ITaskManagementData) => {
    setSelectedTask(task);
    setIsViewModalOpen(true);
  };

  const handleStatusChange = async (
    assignmentId: string,
    newStatus: string,
  ) => {
    await catchAsyncMutation(
      updateAssignmentStatus({ assignmentId, status: newStatus }).unwrap(),
      (res) => toast.success(res?.message || "Status updated successfully!"),
    );
  };

  // --- Table Configuration ---
  const tableConfig: TColumn<ITaskManagementData>[] = [
    { header: "Id", accessor: "id" },
    {
      header: "Task Name",
      cell: (row) => (
        <span className="font-semibold text-[#171717]">{row?.title}</span>
      ),
    },
    {
      header: "Priority",
      cell: (row) => {
        let color = "";
        const priority = row.priority?.toUpperCase();
        switch (priority) {
          case "HIGH":
            color = "#D92D20";
            break;
          case "MEDIUM":
            color = "#F79009";
            break;
          case "LOW":
            color = "#12B76A";
            break;
          default:
            color = "#737373";
        }
        return (
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span
              className="text-sm font-medium capitalize"
              style={{ color: color }}
            >
              {priority?.toLowerCase()}
            </span>
          </div>
        );
      },
    },
    {
      header: "Assigned by",
      cell: (row: any) => (
        <div className="flex items-center gap-2">
          <div className="relative h-6 w-6 overflow-hidden rounded-full border border-gray-100 bg-gray-50">
            <Image
              src={row?.creator?.avatarUrl || fallbackImage}
              alt={row?.creator?.fullName || "User"}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-sm text-[#475467]">
            {row?.creator?.role || row?.creator?.fullName}
          </span>
        </div>
      ),
    },
    {
      header: "Task Deadline",
      cell: (row) => (
        <span className="text-sm text-[#737373]">
          {formatDateTime(row?.deadline)}
        </span>
      ),
    },
    {
      header: "Status",
      cell: (row: any) => {
        const myAssignment = row?.assignments?.find(
          (a: any) => a.employeeId === currentUser?.id,
        );
        const currentAssignmentId = myAssignment?.id;
        const currentStatus = myAssignment?.status;

        return (
          <Select
            defaultValue={currentStatus}
            onValueChange={(value) => {
              if (currentAssignmentId) {
                handleStatusChange(currentAssignmentId, value);
              } else {
                toast.error("Could not find assignment ID!");
              }
            }}
          >
            <SelectTrigger
              disabled={currentStatus === "NOT_COMPLETED"}
              className="h-10 w-44 rounded-lg border-[#E4E7EC] bg-white text-sm focus:ring-0 disabled:bg-gray-50 disabled:opacity-70"
            >
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem
                value="IN_PROGRESS"
                disabled={
                  currentStatus === "COMPLETED" ||
                  currentStatus === "NOT_COMPLETED"
                }
              >
                <div className="flex items-center gap-2 text-[#B54708]">
                  <span className="h-2 w-2 rounded-full bg-[#F79009]" /> In
                  Progress
                </div>
              </SelectItem>
              <SelectItem
                value="COMPLETED"
                disabled={currentStatus === "NOT_COMPLETED"}
              >
                <div className="flex items-center gap-2 text-[#039855]">
                  <span className="h-2 w-2 rounded-full bg-[#12B76A]" />{" "}
                  Complete
                </div>
              </SelectItem>
              <SelectItem value="NOT_COMPLETED" disabled>
                <div className="flex items-center gap-2 text-[#D92D20]">
                  <span className="h-2 w-2 rounded-full bg-[#F04438]" /> Not
                  Complete
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        );
      },
    },
    {
      header: "Action",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleView(row)}
            className="cursor-pointer rounded p-1 text-[#3B82F6] transition-colors hover:bg-blue-50"
          >
            <Eye size={20} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <section className="w-full space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-md bg-white p-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#667085]" />
          <Input
            type="search"
            value={query?.title || ""}
            placeholder="Search tasks..."
            onChange={(e) => handleSearchTask(e.target.value)}
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

      {(isLoading || isFetching) && <TableSkeletonLoader />}

      {!isLoading && !isFetching && !tasks?.data?.length && (
        <EmptyState
          title="No tasks found"
          description="No tasks match your current criteria."
          className="rounded-xl border bg-white"
        />
      )}

      {!isLoading && !isFetching && tasks?.data?.length && (
        <CustomTable columns={tableConfig} data={tasks?.data} />
      )}

      {isViewModalOpen && selectedTask && (
        <DynamicModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title="Task Details"
        >
          <TaskDetails taskData={selectedTask} />
        </DynamicModal>
      )}
    </section>
  );
}

export default FinanceMyTasksTable;
