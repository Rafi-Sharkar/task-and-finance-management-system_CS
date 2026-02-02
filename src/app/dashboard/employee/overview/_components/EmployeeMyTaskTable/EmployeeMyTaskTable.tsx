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
import { TColumn } from "@/types/custom-table.types";
import { ITaskManagementData } from "@/types/taskManagement.types";
import { catchAsyncMutation } from "@/utils/apiReqRes.utils";
import { formatDateTime } from "@/utils/formatDateTime";
import { Eye, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

function EmployeeMyTaskTable() {
  //get and set all query params using hook in URL
  const { getQueryObject, setQuery, deleteQuery } = useSetSearchQueryInURL();
  //get query object from URL
  const query = getQueryObject();

  // Fetch Tasks Assigned to Me
  const {
    data: tasks,
    isLoading,
    isFetching,
  } = useGetTasksAssignedToMeQuery(query);

  // Search Handler
  const handleSearchTask = (search: string) => {
    if (search === "") {
      deleteQuery("title");
    } else {
      setQuery("title", search);
    }
  };

  // Mutation Hooks
  const [updateAssignmentStatus] = useUpdateAssignmentStatusMutation();

  // --- Local States ---
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITaskManagementData | null>(
    null,
  );

  // View Task Details
  const handleView = (task: ITaskManagementData) => {
    setSelectedTask(task);
    setIsViewModalOpen(true);
  };

  // Update Assignment Status
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
        const currentAssignmentId = row?.assignments?.find(
          (a: any) => a.id,
        )?.id;

        const currentStatus = row?.status;

        return (
          <Select
            defaultValue={currentStatus}
            onValueChange={(value) => {
              if (currentAssignmentId) {
                handleStatusChange(currentAssignmentId, value);
              } else {
                console.error("Assignment ID not found for row:", row);
                toast.error("Could not find assignment ID!");
              }
            }}
          >
            <SelectTrigger
              disabled={currentStatus === "NOT_COMPLETED"}
              className="h-10 w-44 rounded-lg border-[#E4E7EC] bg-white text-sm focus:ring-0"
            >
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem
                value="IN_PROGRESS"
                disabled={currentStatus === "COMPLETED"}
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
      {/* Header Section */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-[#1E1B39]">
          My Recent Assigned Tasks
        </h2>

        <Link href={"/dashboard/employee/my-tasks"}>
          <Button className="bg-[#155DFC] px-6 font-medium text-white hover:bg-[#0856fd] md:py-5">
            View All
          </Button>
        </Link>
      </div>

      {/* Search and Filter */}
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
      </div>

      {/* Loading State */}
      {(isLoading || isFetching) && <TableSkeletonLoader />}

      {/* Empty State */}
      {!isLoading && !isFetching && !tasks?.data?.length && (
        <EmptyState
          title="No tasks found"
          description="No tasks match your current criteria."
          className="rounded-xl border bg-white"
        />
      )}

      {/* Tasks Table */}
      {!isLoading && !isFetching && tasks?.data?.length > 0 && (
        <CustomTable columns={tableConfig} data={tasks?.data.slice(0, 5)} />
      )}

      {/* View Task Modal */}
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

export default EmployeeMyTaskTable;
