"use client";
import CustomTable from "@/components/shared/dashboard/CustomTable/CustomTable";
import { Button } from "@/components/ui/button";
import { TColumn } from "@/types/custom-table.types";
import Image from "next/image";
import Link from "next/link";
import { IAuditLog } from "../../../GridBox";
import profileImage from "@/assets/fallback-image/user-avatar.jpg";


const AuditLogsTable = ({ recentAudits }: { recentAudits: IAuditLog[] } ) => {
  const AuditLogsConfig: TColumn<IAuditLog>[] = [
    {
      header: "User",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10">
            <Image
              src={profileImage}
              alt={row?.user?.fullName || "User"}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-black">
              {row?.user?.fullName}
            </span>
            <span className="text-xs text-[#737373] truncate w-24">
               ID: ...{row?.user?.id.slice(-6)}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Email",
      cell: (row) => (
        <span className="text-sm text-[#737373]">{row?.user?.email}</span>
      ),
    },
    {
      header: "Role",
      cell: (row) => (
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-100 text-[#737373]">
          {row?.user?.role.replace("_", " ")}
        </span>
      ),
    },
    {
      header: "Activity",
      cell: (row) => (
        <span className="font-medium text-sm text-[#181D27]">
          {row?.action.replace("_", " ")}
        </span>
      ),
    },
    {
      header: "Date & Time",
      cell: (row) => (
        <span className="text-sm text-[#181D27]">
          {new Date(row?.createdAt).toLocaleString([], {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </span>
      ),
    },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Header Section */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-[#1E1B39]">
          Recent Audit Logs
        </h2>

        <Link href={"/dashboard/admin/audit-logs"}>
          <Button className="bg-[#155DFC] px-6 font-medium text-white hover:bg-[#0856fd] md:py-5 cursor-pointer">
            View All
          </Button>
        </Link>
      </div>

      <CustomTable columns={AuditLogsConfig} data={recentAudits} />
    </div>
  );
};

export default AuditLogsTable;