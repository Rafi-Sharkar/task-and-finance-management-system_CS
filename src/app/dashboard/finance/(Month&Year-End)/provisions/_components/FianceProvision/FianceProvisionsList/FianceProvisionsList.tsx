"use client";

import CustomPagination from "@/components/shared/dashboard/CustomPagination/CustomPagination";
import DeleteConfirmationModal from "@/components/shared/dashboard/DeleteConfirmationModal/DeleteConfirmationModal";
import TableSkeleton from "@/components/shared/dashboard/FinanceTableSkeleton/TableSkeleton";
import EmptyState from "@/components/shared/EmptyState/EmptyState";
import { Input } from "@/components/ui/input";
import { useDeleteAction } from "@/hooks/useDeleteAction";
import useSetSearchQueryInURL from "@/hooks/useSetSearchQueryInURL";
import {
  useDeleteProvisionsMutation,
  useGetProvisionsQuery,
} from "@/redux/features/finance/provision/provision.api";
import { catchAsyncMutation } from "@/utils/apiReqRes.utils";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { ProvisionCard } from "./ProvisionCard/ProvisionCard";

export interface IProvision {
  id: string;
  name: string;
  description: string;
  amount: number;
  probability: number;
  provisionStatus: "POSTED" | "DRAFT";
  createdAt: string;
  expectedValue: number;
  startDate?: string;
  endDate?: string;
}

interface FianceProvisionsListProps {
  onEdit: (item: IProvision) => void;
}

const FianceProvisionsList = ({ onEdit }: FianceProvisionsListProps) => {
  //get and set all query params using hook in URL
  const { getQueryObject, setQuery, deleteQuery } = useSetSearchQueryInURL();
  //get query object from URL
  const query = getQueryObject();

  const {
    data: provisionsData,
    isLoading,
    isFetching,
  } = useGetProvisionsQuery(query);

  const [deleteProvision, { isLoading: isDeleting }] =
    useDeleteProvisionsMutation();


  const {
    deletedItemId,
    setDeletedItemId,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    triggerDelete,
  } = useDeleteAction();

  //Search Handler
  const handleSearchTask = (search: string) => {
    if (search === "") {
      deleteQuery("name");
    } else {
      setQuery("name", search);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletedItemId) return;
    await catchAsyncMutation(
      deleteProvision({ id: deletedItemId }).unwrap(),
      (res) => {
        toast.success(res?.message || "Provision deleted successfully!");
        setIsDeleteModalOpen(false);
        setDeletedItemId(null);
      },
    );
  };

  const provisions = provisionsData?.data || [];
  const meta = {
    total: provisionsData?.metadata?.total || 0,
    page: provisionsData?.metadata?.page || 1,
    limit: provisionsData?.metadata?.limit || 10,
    totalPages: provisionsData?.metadata?.totalPages || 1,
  };

  return (
    <div className="w-full space-y-5 pb-20">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-md bg-white p-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#667085]" />
          <Input
            type="search"
            value={query?.name || ""}
            placeholder="Search provisions by name..."
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
              <p className="text-sm font-medium">
                Filter by Status Coming Soon
              </p>
            </PopoverContent>
          </Popover>
        </div> */}
      </div>

      {(isLoading || isFetching) && <TableSkeleton />}

      {!isLoading && !isFetching && !provisions.length && (
        <EmptyState
          title="No provisions found"
          description="No provisions match your criteria."
          className="rounded-xl border bg-white"
        />
      )}

      {!isLoading && !isFetching && provisions.length > 0 && (
        <div className="w-full">
          {provisions.map((item: IProvision) => (
            <ProvisionCard
              key={item.id}
              data={item}
              onDelete={() => triggerDelete(item.id)}
              onEdit={() => onEdit(item)}
            />
          ))}
        </div>
      )}

      {!isLoading && !isFetching && provisions.length > 0 && (
        <CustomPagination meta={meta} />
      )}

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default FianceProvisionsList;
