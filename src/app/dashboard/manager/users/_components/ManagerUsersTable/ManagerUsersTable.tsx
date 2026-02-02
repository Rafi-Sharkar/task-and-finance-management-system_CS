"use client";

import profileImage from "@/assets/fallback-image/user-avatar.jpg";
import CustomPagination from "@/components/shared/dashboard/CustomPagination/CustomPagination";
import CustomTable from "@/components/shared/dashboard/CustomTable/CustomTable";
import StatusBadge from "@/components/shared/dashboard/StatusBadge/StatusBadge";
import EmptyState from "@/components/shared/EmptyState/EmptyState";
import TableSkeletonLoader from "@/components/shared/loader/TableSkeletonLoader/TableSkeletonLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useExportData from "@/hooks/useExportData";
import useSetSearchQueryInURL from "@/hooks/useSetSearchQueryInURL";
import { useGetAllUsersQuery } from "@/redux/features/admin/user/user.api";
import { TColumn } from "@/types/custom-table.types";
import { IUser } from "@/types/userRole.types";
import { formatDateTime } from "@/utils/formatDateTime";
import { Download, Search } from "lucide-react";
import Image from "next/image";

function ManagerUsersTable() {
  const { getQueryObject, setQuery, deleteQuery } = useSetSearchQueryInURL();
  const query = getQueryObject();
  const { data: users, isLoading, isFetching } = useGetAllUsersQuery(query);

  const handleSearchUsers = (search: string) => {
    if (search === "") {
      deleteQuery("search");
    } else {
      setQuery("search", search);
    }
  };

  const meta = {
    total: users?.data?.meta?.total || 0,
    page: users?.data?.meta?.page || 1,
    limit: users?.data?.meta?.limit || 10,
    totalPages: users?.data?.meta?.totalPages || 1,
  };

  const { exportToCSV } = useExportData({
    fileName: "Manager Users",
  });

  const handleExport = () => {
    const dataToExport = users?.data?.data || [];
    exportToCSV(dataToExport);
  };

  const tableConfig: TColumn<IUser>[] = [
    {
      header: "User",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10">
            <Image
              src={row?.avatarUrl || profileImage}
              alt={row?.username}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <span
              className={`absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white ${row.accountStatus === "ACTIVE" ? "bg-[#12B76A]" : "bg-[#F79009]"
                }`}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#171717]">
              {row?.fullName || row?.username || "N/A"}
            </span>
            <span className="text-xs text-[#737373]">{row?.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Email",
      accessor: "email",
    },
    {
      header: "Organization",
      cell: () => "N/A",
    },
    {
      header: "Role",
      accessor: "role",
    },
    {
      header: "Status",
      cell: (row) => {
        const statusColorMap: Record<string, { bg: string; text: string }> = {
          ACTIVE: { bg: "#D1FADF", text: "#039855" },
          PENDING: { bg: "#FEF0C7", text: "#B54708" },
          INACTIVE: { bg: "#F2F4F7", text: "#475467" },
        };

        const colors =
          statusColorMap[row.accountStatus] || statusColorMap.INACTIVE;
        return (
          <StatusBadge
            status={row.accountStatus}
            bgColor={colors.bg}
            textColor={colors.text}
          />
        );
      },
    },
    {
      header: "Last Active",
      cell: (row) => (
        <span className="text-sm text-[#737373]">
          {formatDateTime(row?.lastActive)}
        </span>
      ),
    },
  ];

  return (
    <section className="w-full space-y-5 pb-20">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-md bg-white p-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#667085]" />
          <Input
            type="search"
            value={query.search || ""}
            placeholder="Search users..."
            onChange={(e) => handleSearchUsers(e.target.value)}
            className="h-11 w-full border-[#D5D7DA] pl-12 shadow-none focus-visible:ring-1"
          />
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleExport}
            className="gap-2 border-[#D5D7DA] bg-[#FDFDFD] font-semibold text-[#181D27]"
          >
            <Download size={18} /> Export
          </Button>

          {/* <Button
            variant="outline"
            className="gap-2 border-[#D5D7DA] bg-[#FDFDFD] font-semibold text-[#181D27]"
          >
            <ListFilter size={18} /> Filter
          </Button> */}
        </div>
      </div>

      {(isLoading || isFetching) && <TableSkeletonLoader />}

      {!isLoading && !isFetching && !users?.data?.data?.length && (
        <EmptyState
          title="No users found"
          description="No users match your current search or filter criteria."
          className="rounded-xl border bg-white"
        />
      )}

      {!isLoading && !isFetching && users?.data?.data?.length > 0 && (
        <CustomTable columns={tableConfig} data={users?.data?.data} />
      )}

      {users?.data?.data?.length > 0 && <CustomPagination meta={meta} />}
    </section>
  );
}

export default ManagerUsersTable;