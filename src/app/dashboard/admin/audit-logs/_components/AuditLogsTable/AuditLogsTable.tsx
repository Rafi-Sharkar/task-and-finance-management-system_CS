"use client";

import { Input } from "@/components/ui/input";
import CustomTable from "@/components/shared/dashboard/CustomTable/CustomTable";
import { TColumn } from "@/types/custom-table.types";
import TableSkeletonLoader from "@/components/shared/loader/TableSkeletonLoader/TableSkeletonLoader";
import CustomPagination from "@/components/shared/dashboard/CustomPagination/CustomPagination";
import { useGetAuditAdminLogsQuery } from "@/redux/features/admin/auditLogs/auditLogs.api";
import { formatDateTime } from "@/utils/formatDateTime";
import { IAuditLogData } from "@/types/auditLogs.type";
import profileImage from "@/assets/fallback-image/user-avatar.jpg";
import Image from "next/image";
import EmptyState from "@/components/shared/EmptyState/EmptyState";
import { Search } from "lucide-react";
import useSetSearchQueryInURL from "@/hooks/useSetSearchQueryInURL";

function AuditLogsTable() {
  const { getQueryObject, setQuery, deleteQuery } = useSetSearchQueryInURL();
    const query = getQueryObject();

  const {
    data: auditLogsResponse,
    isLoading,
    isFetching,
  } = useGetAuditAdminLogsQuery(query);

  const handleSearchUsers = (search: string) => {
    if (search === "") {
      deleteQuery("search");
    } else {
      setQuery("search", search);
    }
  };

  const meta = {
    total: auditLogsResponse?.data?.total || 0,
    page: auditLogsResponse?.data?.page || 1,
    limit: auditLogsResponse?.data?.limit || 10,
    totalPages: auditLogsResponse?.data?.totalPages || 1,
  };

  const auditLogs = auditLogsResponse?.data?.data || [];

  const formatActionText = (action: string) => {
    const words = action.split("_");
    return words
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(" ");
  };

  const getActionColor = (action: string) => {
    if (action.includes("CREATE")) return "text-green-600 bg-green-100";
    if (action.includes("UPDATE")) return "text-blue-600 bg-blue-100";
    if (action.includes("DELETE")) return "text-red-600 bg-red-100";
    if (action.includes("LOGIN")) return "text-purple-600 bg-purple-100";
    return "text-gray-600 bg-gray-100";
  };

  const tableConfig: TColumn<IAuditLogData>[] = [
    {
      header: "User",
      cell: (row) => (
        <div className="flex items-center gap-3">
          {/* <div className="relative h-10 w-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <span className="text-sm font-semibold text-blue-600">
                {row.user.fullName?.charAt(0) ||
                  row.user.username?.charAt(0) ||
                  "U"}
              </span>
            </div>
          </div> */}
          <div className="relative h-10 w-10">
            <Image
              src={row.user.avatar || profileImage}
              alt={row.user.fullName || row.user.username || "User"}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#171717]">
              {row.user.fullName || row.user.username || "Unknown User"}
            </span>
            <span className="text-xs text-[#737373]">{row.user.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Email",
      cell: (row) => (
        <span className="text-sm text-gray-600">{row.user.email}</span>
      ),
    },
    {
      header: "Role",
      cell: (row) => (
        <span className="text-sm text-gray-600">
          {row.user.role
            ?.split("_")
            .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
            .join(" ") || "-"}
        </span>
      ),
    },
    {
      header: "Activity",
      cell: (row) => (
        <div className="flex flex-col">
          <span
            className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${getActionColor(row.action)}`}
          >
            {formatActionText(row.action)}
          </span>
        </div>
      ),
    },
    {
      header: "Date & Time",
      cell: (row) => (
        <div className="flex flex-col">
          <span className="text-sm text-gray-600">
            {formatDateTime(row.createdAt)}
          </span>
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
            placeholder="Search users, activities..."
            onChange={(e) => handleSearchUsers(e.target.value)}
            className="h-11 w-full border-[#D5D7DA] pl-12 shadow-none focus-visible:ring-1"
          />
          {/* <Input
            type="search"
            value={query.search || ""}
            placeholder="Search users, documents, invoices..."
            onChange={(e) => handleSearchUsers(e.target.value)}
            className="h-11 w-full border-[#D5D7DA] pl-12 shadow-none focus-visible:ring-1"
          /> */}
        </div>

        {/* <Button
          variant="outline"
          className="gap-2 border-[#D5D7DA] bg-[#FDFDFD] font-semibold text-[#181D27]"
        >
          <ListFilter size={18} /> Filter
        </Button> */}
      </div>

      {(isLoading || isFetching) && <TableSkeletonLoader />}

      {!isLoading && !isFetching && !auditLogsResponse?.data?.data?.length && (
        <EmptyState
          title="No Audit Logs found"
          description="No audit logs match your current criteria."
          className="rounded-xl border bg-white"
        />
      )}

      {!isLoading && !isFetching && auditLogsResponse?.data?.data?.length && (
        <>
          <CustomTable columns={tableConfig} data={auditLogs} />
          {meta.totalPages > 1 && <CustomPagination meta={meta} />}
        </>
      )}
    </div>
  );
}

export default AuditLogsTable;
