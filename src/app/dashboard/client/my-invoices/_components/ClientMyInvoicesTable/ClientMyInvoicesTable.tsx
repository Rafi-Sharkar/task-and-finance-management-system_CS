/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CustomTable from "@/components/shared/dashboard/CustomTable/CustomTable";
import { Input } from "@/components/ui/input";
import { TColumn } from "@/types/custom-table.types";
import { Search } from "lucide-react";
import StatusBadge from "@/components/shared/dashboard/StatusBadge/StatusBadge";
import { useGetAllInvoicesQuery } from "@/redux/features/finance/invoice/invoice.api";
import useSetSearchQueryInURL from "@/hooks/useSetSearchQueryInURL";
import TableSkeletonLoader from "@/components/shared/loader/TableSkeletonLoader/TableSkeletonLoader";
import EmptyState from "@/components/shared/EmptyState/EmptyState";
import CustomPagination from "@/components/shared/dashboard/CustomPagination/CustomPagination";
import { useSelector } from "react-redux";

function ClientMyInvoicesTable() {
  const { getQueryObject, setQuery, deleteQuery } = useSetSearchQueryInURL();
  const urlQuery = getQueryObject();

  const user = useSelector((state: any) => state.auth.user);

  const { data: response, isLoading, isFetching } = useGetAllInvoicesQuery({
    ...urlQuery,
    clientId: user?.id,
  }, {
    skip: !user?.id 
  });

  const handleSearch = (searchTerm: string) => {
    if (searchTerm === "") {
      deleteQuery("search");
    } else {
      setQuery("search", searchTerm);
    }
  };

  const meta = {
    total: response?.pagination?.totalItems || 0,
    page: response?.pagination?.currentPage || 1,
    limit: response?.pagination?.limit || 10,
    totalPages: response?.pagination?.totalPages || 1,
  };

  const tableConfig: TColumn<any>[] = [
    {
      header: "Invoice ID",
      accessor: "id",
      cell: (row) => <span className="text-xs font-medium text-slate-500">#{row.id.slice(0, 8)}</span>
    },
    {
      header: "Type",
      accessor: "invoiceType"
    },
    {
      header: "Amount",
      accessor: "amount",
      cell: (row) => <span className="font-semibold">${row.amount}</span>
    },
    {
      header: "VAT",
      accessor: "vatAmount",
      cell: (row) => <span>${row.vatAmount} ({row.vat}%)</span>
    },
    {
      header: "Invoice Date",
      accessor: "invoiceDate",
      cell: (row) => <span>{new Date(row.invoiceDate).toLocaleDateString()}</span>
    },
    {
      header: "Status",
      cell: (row) => {
        const status = row.invoiceStatus;
        const isPending = status === "PENDING";
        const isPaid = status === "PAID";

        return (
          <StatusBadge
            status={status}
            bgColor={isPaid ? "#D1FADF" : isPending ? "#FEF0C7" : "#FEE4E2"}
            textColor={isPaid ? "#039855" : isPending ? "#B54708" : "#D92D20"}
          />
        );
      },
    },
    // {
    //   header: "File",
    //   cell: (row) =>
    //     row.fileId ? (
    //       <button className="cursor-pointer font-semibold text-[#155DFC] underline underline-offset-2 hover:text-blue-700">
    //         View File
    //       </button>
    //     ) : (
    //       <span className="text-[#667085]">No File</span>
    //     ),
    // },
  ];

  return (
    <section className="w-full space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-md bg-white p-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#667085]" />
          <Input
            type="search"
            placeholder="Search by description or ID..."
            onChange={(e) => handleSearch(e.target.value)}
            className="h-11 w-full border-[#D5D7DA] pl-12 shadow-none focus-visible:ring-1"
          />
        </div>
      </div>

      {isLoading || isFetching ? (
        <TableSkeletonLoader />
      ) : !response?.data || response.data.length === 0 ? (
        <EmptyState
          title="No invoices found"
          description="We couldn't find any invoices matching your search."
          className="rounded-xl border bg-white py-12"
        />
      ) : (
        <div className="space-y-4">
          <CustomTable columns={tableConfig} data={response.data} />

          {meta.totalPages > 1 && (
            <div className="mt-4">
              <CustomPagination meta={meta} />
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default ClientMyInvoicesTable;