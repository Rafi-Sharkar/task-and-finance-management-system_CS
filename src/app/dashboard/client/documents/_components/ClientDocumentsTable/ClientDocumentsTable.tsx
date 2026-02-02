/* eslint-disable @typescript-eslint/no-explicit-any */
// ============ FILE 1: ClientDocumentsTable Component ============
// Path: components/ClientDocumentsTable.tsx

"use client";

import CustomTable from "@/components/shared/dashboard/CustomTable/CustomTable";
import StatusBadge from "@/components/shared/dashboard/StatusBadge/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TColumn } from "@/types/custom-table.types";
import { FileText, Search } from "lucide-react";
import useSetSearchQueryInURL from "@/hooks/useSetSearchQueryInURL";
import { useGetCurrentClientDocumentsQuery } from "@/redux/features/admin/documents/documents.api";
import TableSkeletonLoader from "@/components/shared/loader/TableSkeletonLoader/TableSkeletonLoader";
import EmptyState from "@/components/shared/EmptyState/EmptyState";
import CustomPagination from "@/components/shared/dashboard/CustomPagination/CustomPagination";
import { formatDateTime } from "@/utils/formatDateTime";
import { useRouter } from "next/navigation";

function ClientDocumentsTable() {
  const router = useRouter();
  const { getQueryObject, setQuery, deleteQuery } = useSetSearchQueryInURL();
  const query = getQueryObject();

  const { data: clientDocuments, isLoading, isFetching } = useGetCurrentClientDocumentsQuery(query);

  const meta = {
    total: clientDocuments?.data?.total || 0,
    page: clientDocuments?.data?.page || 1,
    limit: clientDocuments?.data?.limit || 10,
    totalPages: clientDocuments?.data?.totalPages || 1,
  }

  const handleSearchTask = (documentName: string) => {
    if (documentName === "") {
      deleteQuery("documentName");
    } else {
      setQuery("documentName", documentName);
    }
  };

  console.log(meta, "meta")

  const handleActionClick = (doc: any) => {
    const file = doc.files?.[0];
    const mode = doc.clientShareTypes === "SIGN" ? "sign" : "view";

    // URL parameters তৈরি করা
    const params = new URLSearchParams();
    params.set("mode", mode);
    params.set("docId", doc.id);
    params.set("fileId", file?.id || "");
    params.set("fileUrl", file?.url || "");
    params.set("fileName", doc.name);

    // নতুন পেজে নেভিগেট করা (যেমন: /dashboard/client/documents/sign)
    router.push(`/dashboard/client/documents/view?${params.toString()}`);
  };

  const tableConfig: TColumn<any>[] = [
    {
      header: "Name",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#EFF6FF]">
            <FileText className="h-5 w-5 text-[#155DFC]" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[#101828]">{row.name}</span>
            <span className="mt-1 text-xs text-[#667085]">
              {(row.files?.[0]?.sizeKB || 0).toFixed(2)} KB
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Shared by",
      cell: (row) => <span>{row.uploader?.fullName || "N/A"}</span>,
    },
    {
      header: "Date",
      cell: (row) => <span>{formatDateTime(row.createdAt || "")}</span>,
    },
    {
      header: "Status",
      cell: (row) => {
        const status = row.statusByClient;
        const colors =
          status === "SIGNED" || status === "VIEWED"
            ? { bg: "#B7E2C7", text: "#0C5A29" }
            : { bg: "#FAF3E6", text: "#6F4B02" };

        return (
          <StatusBadge
            status={status}
            bgColor={colors.bg}
            textColor={colors.text}
          />
        );
      },
    },
    {
      header: "Action",
      cell: (row) => (
        <Button
          onClick={() => handleActionClick(row)}
          className="h-10 w-32 rounded-lg text-sm font-semibold bg-[#155DFC] text-white hover:bg-[#155DFC]/90 cursor-pointer"
        >
          {row.clientShareTypes === "SIGN" ? "Sign Document" : "View Only"}
        </Button>
      ),
    },
  ];

  return (
    <section className="w-full space-y-5">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-md bg-white p-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#667085]" />
          <Input
            type="search"
            placeholder="Search documents..."
            onChange={(e) => handleSearchTask(e.target.value)}
            className="h-11 w-full border-[#D5D7DA] pl-12 shadow-none focus-visible:ring-1"
          />
        </div>
      </div>

      {
        isLoading && isFetching ? (
          <TableSkeletonLoader />
        ) :
          !clientDocuments?.data?.data?.length ? (
            <EmptyState
              title="No documents found"
              description="No documents match your current criteria."
              className="rounded-xl border bg-white"
            />
          ) : (
            <>
              <CustomTable
                columns={tableConfig}
                data={clientDocuments?.data?.data || []}
              />
              {meta.totalPages > 1 && <CustomPagination meta={meta} />}
            </>
          )}

    </section>
  );
}

export default ClientDocumentsTable;
