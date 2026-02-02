/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CustomTable from "@/components/shared/dashboard/CustomTable/CustomTable";
import StatusBadge from "@/components/shared/dashboard/StatusBadge/StatusBadge";
import { Button } from "@/components/ui/button";
import { TColumn } from "@/types/custom-table.types";
import { FileText } from "lucide-react";
import { useGetCurrentClientDocumentsQuery } from "@/redux/features/admin/documents/documents.api";
import { useRouter } from "next/navigation";
import TableSkeletonLoader from "@/components/shared/loader/TableSkeletonLoader/TableSkeletonLoader";
import EmptyState from "@/components/shared/EmptyState/EmptyState";

function ClientRecentDocumentsTable() {
  const router = useRouter();
  const { data: clientDocuments, isLoading, isFetching } = useGetCurrentClientDocumentsQuery({});

  const route = "/dashboard/client/documents";

  const documents = clientDocuments?.data?.data?.slice(0, 5) || [];

  const tableConfig: TColumn<any>[] = [
    {
      header: "Name",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F2F4F7]">
            <FileText className="h-5 w-5 text-[#3067ED]" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[#101828]">
              {row.name}
            </span>
            <span className="mt-1 text-xs text-[#667085]">
              {row.files?.[0]?.sizeKB ? `${row.files[0].sizeKB} KB` : "N/A"}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Shared by",
      cell: (row) => <span>{row.uploader?.fullName || row.uploader?.username}</span>,
    },
    {
      header: "Date",
      cell: (row) => <span>{new Date(row.createdAt).toLocaleDateString()}</span>,
    },
    {
      header: "Status",
      cell: (row) => {
        const status = row.statusByClient || "PENDING";
        const colors =
          status === "SIGNED"
            ? { bg: "#D1FADF", text: "#039855" }
            : status === "PENDING"
              ? { bg: "#FEF0C7", text: "#B54708" }
              : { bg: "#F2F4F7", text: "#344054" };
        return (
          <StatusBadge
            status={status}
            bgColor={colors.bg}
            textColor={colors.text}
          />
        );
      },
    },
  ];

  const handleViewAll = () => {
    router.push(route);
  };

  return (
    <section className="w-full rounded-md bg-white p-4 sm:p-6 space-y-5">
      {/* Header Section */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="mb-4 text-lg font-bold text-[#1E1B39] sm:mb-6 sm:text-xl">
          Recent Documents
        </h1>

        <Button
          onClick={handleViewAll}
          className="bg-[#155DFC] px-6 font-medium text-white hover:bg-[#0856fd] md:py-5 cursor-pointer"
        >
          View All
        </Button>
      </div>

      {isLoading || isFetching ? (
        <TableSkeletonLoader />
      ) : documents.length === 0 ? (
        <EmptyState
          title="No documents found"
          description="No documents match your current criteria."
          className="rounded-xl border bg-white"
        />
      ) : (
        <CustomTable columns={tableConfig} data={documents} />
      )}
    </section>
  );
}

export default ClientRecentDocumentsTable;