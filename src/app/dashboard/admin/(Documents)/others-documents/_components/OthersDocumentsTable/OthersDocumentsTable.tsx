/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CustomPagination from "@/components/shared/dashboard/CustomPagination/CustomPagination";
import CustomTable from "@/components/shared/dashboard/CustomTable/CustomTable";
import ViewDocumentModal from "@/components/shared/dashboard/Documents/Modals/ViewDocumentModal/ViewDocumentModal";
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
import useExportData from "@/hooks/useExportData";
import useSetSearchQueryInURL from "@/hooks/useSetSearchQueryInURL";
import {
  useGetAllDocumentsQuery,
  useUpdateDocumentMutation,
} from "@/redux/features/admin/documents/documents.api";
import { TColumn } from "@/types/custom-table.types";
import { Download, Eye, FileText, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const OthersDocumentsTable = () => {
  const { getQueryObject, setQuery, deleteQuery } = useSetSearchQueryInURL();
  const query = getQueryObject();

  const {
    data: documents,
    isLoading,
    isFetching,
  } = useGetAllDocumentsQuery(query);
  const [updateDocumentStatus] = useUpdateDocumentMutation();

  const { exportToCSV } = useExportData({
    fileName: "Others_Documents_Report",
  });

  const handleExport = () => {
    const dataToExport = documents?.data?.data || [];
    if (dataToExport.length > 0) {
      exportToCSV(dataToExport);
    }
  };

  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStatusChange = async (documentId: string, newStatus: string) => {
    toast.loading("Updating status...");
    try {
      const res = await updateDocumentStatus({
        documentId,
        status: newStatus,
      }).unwrap();

      if (!res.success) {
        toast.dismiss();
        toast.error(res.message || "Failed to update status");
        return;
      }

      toast.dismiss();
      toast.success("Status updated successfully");
    } catch (error: any) {
      toast.dismiss();
      toast.error(error?.data?.message || "Failed to update status");
    }
  };

  const handleSearchTask = (documentName: string) => {
    if (documentName === "") {
      deleteQuery("documentName");
    } else {
      setQuery("documentName", documentName);
    }
  };

  const handleViewDetails = (row: any) => {
    setSelectedDoc(row);
    setIsModalOpen(true);
  };

  const meta = {
    total: documents?.data?.total || 0,
    page: documents?.data?.page || 1,
    limit: documents?.data?.limit || 10,
    totalPages: documents?.data?.totalPages || 1,
  };

  const tableConfig: TColumn<any>[] = [
    {
      header: "Name",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#EFF6FF]">
            <FileText className="h-5 w-5 text-[#155DFC]" />
          </div>
          <div>
            <p className="max-w-37.5 truncate leading-tight font-semibold text-[#171717]">
              {row?.name}
            </p>
            <p className="mt-0.5 text-xs text-[#737373]">
              {row?.files?.[0]?.sizeKB} KB
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Type",
      cell: (row) => (
        <span className="text-xs font-medium uppercase">
          {row?.files?.[0]?.extension || "N/A"}
        </span>
      ),
    },
    {
      header: "Uploaded By",
      cell: (row) =>
        row?.uploader?.fullName || row?.uploader?.username || "System",
    },
    {
      header: "Date",
      cell: (row) => new Date(row?.createdAt).toLocaleDateString(),
    },
    {
      header: "Status",
      cell: (row) => {
        return (
          <Select
            defaultValue={row?.status}
            onValueChange={(value) => handleStatusChange(row.id, value)}
          >
            <SelectTrigger className="h-9 w-32 cursor-pointer border-[#D5D7DA]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {/* Using Enums based on your Requirement */}
              <SelectItem value="PENDING" className="text-[#C98904]">
                Pending
              </SelectItem>
              <SelectItem value="APPROVED" className="text-[#17B26A]">
                Approved
              </SelectItem>
              <SelectItem value="REJECTED" className="text-[#F04438]">
                Rejected
              </SelectItem>
            </SelectContent>
          </Select>
        );
      },
    },
    {
      header: "Action",
      cell: (row) => (
        <button
          onClick={() => handleViewDetails(row)}
          className="cursor-pointer text-[#155DFC] transition-transform hover:scale-110"
        >
          <Eye size={20} />
        </button>
      ),
    },
  ];

  return (
    <div className="w-full space-y-5">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-md bg-white p-4 shadow-sm">
        <div className="relative w-full max-w-md">
          <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#667085]" />
          <Input
            type="search"
            placeholder="Search documents..."
            onChange={(e) => handleSearchTask(e.target.value)}
            className="h-11 w-full border-[#D5D7DA] pl-12 shadow-none focus-visible:ring-1"
          />
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleExport}
            disabled={!documents?.data?.data?.length}
            className="gap-2 border-[#D5D7DA] bg-[#FDFDFD] font-semibold"
          >
            <Download size={18} /> Export
          </Button>
        </div>
      </div>

      {isLoading || isFetching ? (
        <TableSkeletonLoader />
      ) : !documents?.data?.data?.length ? (
        <EmptyState
          title="No documents found"
          description="No documents match your current criteria."
          className="rounded-xl border bg-white"
        />
      ) : (
        <>
          <CustomTable
            columns={tableConfig}
            data={documents?.data?.data || []}
          />
          {meta.totalPages > 1 && <CustomPagination meta={meta} />}
        </>
      )}

      <ViewDocumentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedDoc}
        isLoading={false}
      />
    </div>
  );
};

export default OthersDocumentsTable;
