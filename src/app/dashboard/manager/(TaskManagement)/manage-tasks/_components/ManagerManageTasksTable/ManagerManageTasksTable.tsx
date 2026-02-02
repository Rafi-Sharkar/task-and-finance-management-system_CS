/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import profileImage from "@/assets/fallback-image/user-avatar.jpg";
import CustomTable from "@/components/shared/dashboard/CustomTable/CustomTable";
import DeleteConfirmationModal from "@/components/shared/dashboard/DeleteConfirmationModal/DeleteConfirmationModal";
import DynamicModal from "@/components/shared/dashboard/DynamicModal/DynamicModal";
import StatusBadge from "@/components/shared/dashboard/StatusBadge/StatusBadge";
import EmptyState from "@/components/shared/EmptyState/EmptyState";
import TableSkeletonLoader from "@/components/shared/loader/TableSkeletonLoader/TableSkeletonLoader";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDeleteAction } from "@/hooks/useDeleteAction";
import useSetSearchQueryInURL from "@/hooks/useSetSearchQueryInURL";
import {
  useDeleteTaskMutation,
  useGetMyTasksQuery,
  useUpdateTaskMutation,
} from "@/redux/features/admin/tasks/tasks.api";
import { TColumn } from "@/types/custom-table.types";
import { ITaskManagementData } from "@/types/taskManagement.types";
import { catchAsyncMutation } from "@/utils/apiReqRes.utils";
import { formatDateTime } from "@/utils/formatDateTime";
import { Eye, Search, SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import ManageTasksEditTaskForm from "../ManageTasksEditTaskForm/ManageTasksEditTaskForm";
import ManageTasksTaskDetails from "../ManageTasksTaskDetails/ManageTasksTaskDetails";

function ManagerManageTasksTable() {
  //get and set all query params using hook in URL
  const { getQueryObject, setQuery, deleteQuery } = useSetSearchQueryInURL();
  //get query object from URL
  const query = getQueryObject();

  const { data: tasks, isLoading, isFetching } = useGetMyTasksQuery(query);

  //Search Handler
  const handleSearchTask = (search: string) => {
    if (search === "") {
      deleteQuery("title");
    } else {
      setQuery("title", search);
    }
  };

  // Mutations
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  // Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITaskManagementData | null>(
    null,
  );

  // Delete Action Hook
  const {
    deletedItemId,
    setDeletedItemId,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    triggerDelete,
  } = useDeleteAction();

  // --- Handlers ---
  const handleView = (task: ITaskManagementData) => {
    setSelectedTask(task);
    setIsViewModalOpen(true);
  };

  const handleEdit = (task: ITaskManagementData) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedTask(null);
  };

  // Inline Priority Update
  const handlePriorityChange = async (taskId: string, newPriority: string) => {
    await catchAsyncMutation(
      updateTask({ taskId, priority: newPriority }).unwrap(),
      (res) => toast.success(res?.message || "Priority updated successfully!"),
    );
  };

  // Delete Confirm Handler
  const handleDeleteConfirm = async () => {
    if (!deletedItemId) return;
    await catchAsyncMutation(deleteTask(deletedItemId).unwrap(), (res) => {
      toast.success(res?.message || "Task deleted successfully!");
      setIsDeleteModalOpen(false);
      setDeletedItemId(null);
    });
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
          NOT_COMPLETED: { bg: "#FEE4E2", text: "#F04438" },
          COMPLETED: { bg: "#D1FADF", text: "#039855" },
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
          <button
            onClick={() => handleEdit(row)}
            className="cursor-pointer rounded p-1 text-[#667085] transition-colors hover:bg-gray-50"
          >
            <SquarePen size={20} />
          </button>
          <button
            onClick={() => triggerDelete(row?.id)}
            className="cursor-pointer rounded p-1 text-[#EF4444] transition-colors hover:bg-red-50"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <section className="w-full space-y-5">
      {/* Search Header */}
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
        {/* <div className="flex items-center gap-3">
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
        </div> */}
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
      {!isLoading && !isFetching && tasks?.data?.length > 0 && (
        <CustomTable columns={tableConfig} data={tasks?.data} />
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedTask && (
        <DynamicModal
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          title="Edit Task"
        >
          <ManageTasksEditTaskForm
            onClose={handleCloseModal}
            taskData={selectedTask}
          />
        </DynamicModal>
      )}

      {/* View Modal */}
      {isViewModalOpen && selectedTask && (
        <DynamicModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title="Task Details"
        >
          <ManageTasksTaskDetails taskData={selectedTask} />
        </DynamicModal>
      )}

      {/* Global Delete Confirmation */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />
    </section>
  );
}

export default ManagerManageTasksTable;
