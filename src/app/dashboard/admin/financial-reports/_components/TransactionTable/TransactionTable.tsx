// "use client";

// import CustomTable from "@/components/shared/dashboard/CustomTable/CustomTable";
// import StatusBadge from "@/components/shared/dashboard/StatusBadge/StatusBadge";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { TColumn } from "@/types/custom-table.types";
// import { Download, ListFilter, Search } from "lucide-react";
// import {
//   ITransactionsTableData,
//   transactionsTableData,
// } from "./data/transactionTable.data";

// function TransactionsTable() {
//   const tableConfig: TColumn<ITransactionsTableData>[] = [
//     {
//       header: "Transaction ID",
//       accessor: "transactionId",
//     },
//     {
//       header: "Organization",
//       accessor: "organization",
//     },
//     {
//       header: "Type",
//       accessor: "type",
//     },
//     {
//       header: "Total Amount",
//       accessor: "totalAmount",
//     },
//     {
//       header: "Paid",
//       accessor: "paid",
//     },
//     {
//       header: "Due",
//       accessor: "due",
//     },
//     {
//       header: "Status",
//       cell: (row) => {
//         const isPaid = row.status === "Paid";
//         return (
//           <StatusBadge
//             status={row.status}
//             bgColor={isPaid ? "#D1FADF" : "#FEE4E2"}
//             textColor={isPaid ? "#039855" : "#D92D20"}
//           />
//         );
//       },
//     },
//   ];

//   return (
//     <section className="w-full space-y-5">
//       {/* Header Section */}
//       <div className="flex flex-wrap items-center justify-between gap-4 rounded-md bg-white p-4">
//         <div className="relative w-full max-w-md">
//           <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#667085]" />
//           <Input
//             type="search"
//             placeholder="Search users, documents, invoices..."
//             className="h-11 w-full border-[#D5D7DA] pl-12 shadow-none focus-visible:ring-1"
//           />
//         </div>

//         <div className="flex items-center gap-3">
//           {/* Export Button */}
//           <Button
//             variant="outline"
//             className="gap-2 border-[#D5D7DA] bg-[#FDFDFD] font-semibold text-[#181D27]"
//           >
//             <Download size={18} /> Export
//           </Button>

//           {/* Filter Popover */}
//           <Button
//             variant="outline"
//             className="gap-2 border-[#D5D7DA] bg-[#FDFDFD] font-semibold text-[#181D27]"
//           >
//             <ListFilter size={18} /> Filter
//           </Button>
//         </div>
//       </div>
//       <CustomTable columns={tableConfig} data={transactionsTableData} />
//     </section>
//   );
// }

// export default TransactionsTable;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CustomTable from "@/components/shared/dashboard/CustomTable/CustomTable";
import { TColumn } from "@/types/custom-table.types";
import { Download, FileText,  Search } from "lucide-react";
import StatusBadge from "@/components/shared/dashboard/StatusBadge/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAllInvoicesQuery } from "@/redux/features/finance/invoice/invoice.api";
import useSetSearchQueryInURL from "@/hooks/useSetSearchQueryInURL";
import TableSkeletonLoader from "@/components/shared/loader/TableSkeletonLoader/TableSkeletonLoader";
import CustomPagination from "@/components/shared/dashboard/CustomPagination/CustomPagination";
import EmptyState from "@/components/shared/EmptyState/EmptyState";
import { formatDateTime } from "@/utils/formatDateTime";
import useExportData from "@/hooks/useExportData";

function InvoicesTable() {
  const { getQueryObject, setQuery, deleteQuery } = useSetSearchQueryInURL();
  const query = getQueryObject();

  const {
    data: invoices,
    isLoading,
    isFetching,
  } = useGetAllInvoicesQuery(query);

  const handleSearchTask = (search: string) => {
    if (search === "") {
      deleteQuery("search");
    } else {
      setQuery("search", search);
    }
  };

  const meta = {
    total: invoices?.pagination?.totalItems || 0,
    page: invoices?.pagination?.currentPage || 1,
    limit: invoices?.pagination?.limit || 10,
    totalPages: invoices?.pagination?.totalPages || 1,
  };

  const { exportToCSV } = useExportData({
    fileName: "Invoices",
  });

  const handleExport = () => {
    const dataToExport = invoices?.data || [];
    exportToCSV(dataToExport);
  };

  const tableConfig: TColumn<any>[] = [
    {
      header: "Invoices",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#EFF6FF]">
            <FileText className="h-5 w-5 text-[#155DFC]" />
          </div>
          <div>
            <p className="leading-tight font-semibold text-[#171717] capitalize">
              {row?.supplierName}
            </p>
            <p className="mt-0.5 max-w-37.5 truncate text-xs text-[#737373]">
              {row?.description}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Date",
      cell: (row) => formatDateTime(row.invoiceDate),
    },
    {
      header: "Invoice Type",
      cell: (row) => row.orgName || row.invoiceType || "N/A",
    },
    {
      header: "Amount",
      cell: (row) => `$${row.amount}`,
    },
    {
      header: "VAT",
      cell: (row) => `$${row.vatAmount}`,
    },
    {
      header: "Status",
      cell: (row) => {
        const isPaid = row.invoiceStatus === "PAID";
        return (
          <StatusBadge
            status={row.invoiceStatus}
            bgColor={isPaid ? "#D1FADF" : "#FEE4E2"}
            textColor={isPaid ? "#039855" : "#D92D20"}
          />
        );
      },
    },
  ];

  return (
    <div className="w-full space-y-5">
      {/* Search and Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-md border bg-white p-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#667085]" />
          <Input
            type="search"
            placeholder="Search invoices..."
            value={query.search || ""}
            onChange={(e) => handleSearchTask(e.target.value)}
            className="h-11 w-full border-[#D5D7DA] pl-12 shadow-none focus-visible:ring-1"
          />
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleExport}
            disabled={isLoading || isFetching}
            className="gap-2 border-[#D5D7DA] bg-[#FDFDFD] font-semibold text-[#181D27]"
          >
            <Download size={18} /> Export
          </Button>
        </div>
      </div>

      {/* Table Section */}
      {isLoading || isFetching ? (
        <TableSkeletonLoader />
      ) : invoices?.data?.length > 0 ? (
        <CustomTable columns={tableConfig} data={invoices.data} />
      ) : (
        <EmptyState
          title="No invoices found"
          description="Try adjusting your search or filters."
          className="rounded-xl border bg-white"
        />
      )}

      {/* Pagination */}
      {invoices?.pagination?.totalPages > 1 && <CustomPagination meta={meta} />}
    </div>
  );
}

export default InvoicesTable;
