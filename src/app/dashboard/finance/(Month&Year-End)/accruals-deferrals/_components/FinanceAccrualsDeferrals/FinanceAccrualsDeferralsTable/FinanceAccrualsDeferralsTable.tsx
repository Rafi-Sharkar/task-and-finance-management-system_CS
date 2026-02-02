"use client";

import CustomTable from "@/components/shared/dashboard/CustomTable/CustomTable";
import StatusBadge from "@/components/shared/dashboard/StatusBadge/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import DeleteConfirmationModal from "@/components/shared/dashboard/DeleteConfirmationModal/DeleteConfirmationModal";
import TableSkeleton from "@/components/shared/dashboard/FinanceTableSkeleton/TableSkeleton";
import EmptyState from "@/components/shared/EmptyState/EmptyState";
import { useDeleteAction } from "@/hooks/useDeleteAction";
import {
  useDeleteAccrualDeferralMutation,
  useUpdateAccrualDeferralMutation,
} from "@/redux/features/finance/accrualsAndDeferrals/accrualsAndDeferrals.api";
import { TColumn } from "@/types/custom-table.types";
import { catchAsyncMutation } from "@/utils/apiReqRes.utils";
import {
  Check,
  Edit,
  ListFilter,
  Search,
  Trash2
} from "lucide-react";
import { toast } from "sonner";
import { IAccrualDeferral } from "../FinanceAccrualsDeferrals";

interface FinanceAccrualsDeferralsTableProps {
  onEdit: (item: IAccrualDeferral) => void;
  data: IAccrualDeferral[];
  isLoading?: boolean;
  isFetching?: boolean
}

function FinanceAccrualsDeferralsTable({
  onEdit,
  data,
  isLoading,
  isFetching
}: FinanceAccrualsDeferralsTableProps) {

  // mutation Hook
  const [deleteAccrualDeferral, { isLoading: isDeleting }] = useDeleteAccrualDeferralMutation();
  const [updateAccrualDeferral] = useUpdateAccrualDeferralMutation();

  // Delete Action Hook
  const {
    deletedItemId,
    setDeletedItemId,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    triggerDelete,
  } = useDeleteAction();

  // Delete Confirm Handler
  const handleDeleteConfirm = async () => {
    if (!deletedItemId) return;
    await catchAsyncMutation(deleteAccrualDeferral(deletedItemId).unwrap(), (res) => {
      toast.success(res?.message || "Task deleted successfully!");
      setIsDeleteModalOpen(false);
      setDeletedItemId(null);
    });
  };

  // Handle Status Change
  const handlePost = async (row: IAccrualDeferral) => {
    await catchAsyncMutation(
      updateAccrualDeferral({
        id: row.id,
        status: "POSTED",
      }).unwrap(),
      () => {
        toast.success("Entry posted successfully!");
      }
    );
  };

  // Format period from startDate and endDate
  const formatPeriod = (startDate?: string, endDate?: string) => {
    if (!startDate || !endDate) return "N/A";

    try {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (isNaN(start.getTime()) || isNaN(end.getTime()))
        return "Invalid Date";

      const formatDate = (date: Date) => {
        const day = date.getDate();
        const month = date.toLocaleString("default", { month: "short" });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
      };

      return `${formatDate(start)} to ${formatDate(end)}`;
    } catch {
      return "N/A";
    }
  };

  const tableConfig: TColumn<IAccrualDeferral>[] = [
    {
      header: "Period",
      cell: (row) => formatPeriod(row.startDate, row.endDate),
    },
    {
      header: "Type",
      cell: (row) => (row.type === "ACCRUAL" ? "Accrual" : "Deferral"),
    },
    {
      header: "Account",
      cell: (row) => row?.name || "N/A",
    },
    {
      header: "Description",
      accessor: "description",
      cell: (row) => row.description || "N/A",
    },
    {
      header: "Amount",
      cell: (row) => `$${row.amount || 0}`,
    },
    {
      header: "Status",
      cell: (row) => {
        const isPosted = row.status === "POSTED";
        return (
          <StatusBadge
            status={row.status === "POSTED" ? "Posted" : "Draft"}
            bgColor={isPosted ? "#D1FADF" : "#EAECF0"}
            textColor={isPosted ? "#039855" : "#475467"}
          />
        );
      },
    },
    {
      header: "Action",
      cell: (row) => (
        <div className="flex items-center gap-3">

          {
            row.status === "DRAFT" ? <>
              <Check
                onClick={() => handlePost(row)}
                className="h-5 w-5 cursor-pointer text-[#16A34A] hover:text-[#15803d]"

              />
              <Edit
                onClick={() => onEdit(row)}
                className="h-5 w-5 cursor-pointer text-[#667085] hover:text-[#475467]"
              />
              <Trash2
                onClick={() => triggerDelete(row?.id)}
                className="h-5 w-5 cursor-pointer text-[#D92D20] hover:text-[#c5221f]"
              />
            </> : <>
              {/* <Eye
                className="h-5 w-5 cursor-pointer text-[#667085] hover:text-[#475467]"
              /> */}
              {/* <Download className="h-5 w-5 cursor-pointer text-[#667085] hover:text-[#475467]" /> */}
            </>
          }
        </div>
      ),
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
            placeholder="Search accruals/deferrals..."
            className="h-11 w-full border-[#D5D7DA] pl-12 shadow-none focus-visible:ring-1"
          />
        </div>

        <Button
          variant="outline"
          className="gap-2 border-[#D5D7DA] bg-[#FDFDFD] font-semibold text-[#181D27]"
        >
          <ListFilter size={18} /> Filter
        </Button>
      </div>

      {/* Loading States */}
      {(isLoading || isFetching) && <TableSkeleton />}

      {!isLoading && !isFetching && !data.length && (
        <EmptyState
          title="No Accruals & Deferrals found"
          description="No Accruals & Deferrals match your criteria."
          className="rounded-xl border bg-white"
        />
      )}

      {/* Table Content */}
      {!isLoading && !isFetching && data?.length && (
        <CustomTable columns={tableConfig} data={data} />
      )}

      {/* Global Delete Confirmation */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />

    </div>
  );
}

export default FinanceAccrualsDeferralsTable;