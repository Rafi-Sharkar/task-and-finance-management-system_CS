"use client";
import profileImage from "@/assets/fallback-image/user-avatar.jpg";
import CustomTable from "@/components/shared/dashboard/CustomTable/CustomTable";
import EmptyState from "@/components/shared/EmptyState/EmptyState";
import TableSkeletonLoader from "@/components/shared/loader/TableSkeletonLoader/TableSkeletonLoader";
import { Button } from "@/components/ui/button";
import { useGetAuditManagerLogsQuery } from "@/redux/features/admin/auditLogs/auditLogs.api";
import { IAuditLogData } from "@/types/auditLogs.type";
import { TColumn } from "@/types/custom-table.types";
import { formatDateTime } from "@/utils/formatDateTime";
import Image from "next/image";
import Link from "next/link";

const ManagerRecentAuditLogsTable = () => {
  const {
    data: auditLogsResponse,
    isLoading,
    isFetching,
  } = useGetAuditManagerLogsQuery({});

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
    <section className="w-full space-y-5">
      {/* Header Section */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-[#1E1B39]">
          Recent Audit Logs
        </h2>

        <Link href="/dashboard/manager/audit-logs">
          <Button className="btn-primary px-6 py-5! cursor-pointer">View All</Button>
        </Link>
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
        <CustomTable columns={tableConfig} data={auditLogs.slice(0, 5)} />
      )}
    </section>
  );
};

export default ManagerRecentAuditLogsTable;
