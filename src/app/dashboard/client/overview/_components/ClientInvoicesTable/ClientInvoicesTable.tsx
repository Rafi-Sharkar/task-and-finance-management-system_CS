/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CustomTable from "@/components/shared/dashboard/CustomTable/CustomTable";
import StatusBadge from "@/components/shared/dashboard/StatusBadge/StatusBadge";
import { Button } from "@/components/ui/button";
import { TColumn } from "@/types/custom-table.types";
import { useGetAllInvoicesQuery } from "@/redux/features/finance/invoice/invoice.api";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import TableSkeletonLoader from "@/components/shared/loader/TableSkeletonLoader/TableSkeletonLoader";
import EmptyState from "@/components/shared/EmptyState/EmptyState";

function ClientInvoicesTable() {
  const router = useRouter();
  const user = useSelector((state: any) => state.auth.user);

  const { data: response, isLoading, isFetching } = useGetAllInvoicesQuery(
    {
      clientId: user?.id,
    },
    {
      skip: !user?.id,
    }
  );

  const route = "/dashboard/client/my-invoices";

  const invoices = response?.data?.slice(0, 5) || [];

  const tableConfig: TColumn<any>[] = [
    {
      header: "Invoice ID",
      accessor: "id",
      cell: (row) => <span className="text-xs font-medium">#{row.id.slice(0, 8)}</span>
    },
    {
      header: "Amount",
      accessor: "amount",
      cell: (row) => <span>${row.amount}</span>
    },
    {
      header: "Type",
      accessor: "invoiceType",
    },
    {
      header: "Date",
      accessor: "invoiceDate",
      cell: (row) => <span>{new Date(row.invoiceDate).toLocaleDateString()}</span>
    },
    {
      header: "Status",
      cell: (row) => {
        const status = row.invoiceStatus;
        const isPaid = status === "PAID";
        const isPending = status === "PENDING";

        return (
          <StatusBadge
            status={status}
            bgColor={isPaid ? "#D1FADF" : isPending ? "#FEF0C7" : "#FEE4E2"}
            textColor={isPaid ? "#039855" : isPending ? "#B54708" : "#D92D20"}
          />
        );
      },
    },
  ];

  const handleViewAll = () => {
    router.push(route);
  };

  return (
    <section className="w-full space-y-5 rounded-md bg-white p-4 sm:p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-lg font-bold text-[#1E1B39] sm:text-xl">
          Recent Invoices
        </h1>

        <Button
          onClick={handleViewAll}
          className="bg-[#155DFC] px-6 font-medium text-white hover:bg-[#0856fd] cursor-pointer"
        >
          View All
        </Button>
      </div>

      {isLoading || isFetching ? (
        <TableSkeletonLoader />
      ) : invoices.length === 0 ? (
        <EmptyState
          title="No invoices found"
          description="Your invoice list is currently empty."
          className="rounded-xl border bg-white py-10"
        />
      ) : (
        <CustomTable columns={tableConfig} data={invoices} />
      )}
    </section>
  );
}

export default ClientInvoicesTable;