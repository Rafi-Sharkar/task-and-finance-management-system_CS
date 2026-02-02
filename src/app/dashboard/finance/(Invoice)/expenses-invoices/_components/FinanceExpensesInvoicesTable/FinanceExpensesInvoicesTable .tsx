"use client";

import { useState } from "react";
import CustomPagination from "@/components/shared/dashboard/CustomPagination/CustomPagination";
import CustomTable from "@/components/shared/dashboard/CustomTable/CustomTable";
import StatusBadge from "@/components/shared/dashboard/StatusBadge/StatusBadge";
import EmptyState from "@/components/shared/EmptyState/EmptyState";
import TableSkeletonLoader from "@/components/shared/loader/TableSkeletonLoader/TableSkeletonLoader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import useSetSearchQueryInURL from "@/hooks/useSetSearchQueryInURL";
import { useChangeInvoiceStatusMutation, useGetAllInvoicesQuery } from "@/redux/features/finance/invoice/invoice.api";
import { TColumn } from "@/types/custom-table.types";
import { TInvoice } from "@/types/invoice.types";
import { catchAsyncMutation } from "@/utils/apiReqRes.utils";
import { formatDate } from "@/utils/formatDateTime";
import { Check, Copy, ListFilter, MoreVertical, Search } from "lucide-react";
import { toast } from "sonner";
import ViewExpenseInvoiceModal from "../ViewExpenseInvoiceModal/ViewExpenseInvoiceModal";


function FinanceExpensesInvoicesTable() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<TInvoice | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);

  const handleCopy = async (id: string): Promise<void> => {
    await navigator.clipboard.writeText(id);
    setCopiedId(id);

    setTimeout(() => {
      setCopiedId(null);
    }, 1000);
  };

  const [changeInvoiceStatus, { isLoading: isChangeInvoiceStatusLoading }] = useChangeInvoiceStatusMutation();

  //get and set all query params using hook in URL
  const { getQueryObject, setQuery, deleteQuery } = useSetSearchQueryInURL();

  //get query object from URL
  const query = getQueryObject();
  const { data: invoicesData, isLoading, isFetching } = useGetAllInvoicesQuery({ invoiceStatus: statusFilter, invoiceType: "EXPENSE", ...query });

  const handleSearchInvoices = (search: string) => {
    if (search === "") {
      deleteQuery("search")
    } else {
      setQuery("search", search);
    };
  }

  //Pagination Meta
  const meta = {
    total: invoicesData?.pagination?.totalItems || 0,
    page: invoicesData?.pagination?.currentPage || 1,
    limit: invoicesData?.pagination?.limit || 10,
    totalPages: invoicesData?.pagination?.totalPages || 1,
  }

  //Change Invoice Status
  const handleStatusChange = async (invoiceId: string) => {
    await catchAsyncMutation(
      changeInvoiceStatus({ invoiceId, invoiceStatus: "PAID" }).unwrap(),
      (res) => {
        toast.success(
          res?.message || "Invoice status updated successfully!",
        );
      }
    )
  }

  // Handle view click
  const handleViewClick = (invoice: TInvoice) => {
    setSelectedInvoice(invoice);
    setIsViewModalOpen(true);
  };

  // Close view modal
  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedInvoice(null);
  };

  const tableConfig: TColumn<TInvoice>[] = [
    {
      header: "Invoices",
      accessor: "id",
      cell: (row) => {
        return (
          <div className="flex items-center gap-2">
            <span className="font-medium">{row.id}</span>

            <button
              onClick={() => handleCopy(row.id)}
              title={copiedId === row.id ? "Copied!" : "Copy Invoice ID"}
            >

              {copiedId === row.id ? (
                <Check size={16} className="text-green-600" />
              ) : (
                <Copy size={16} className="text-gray-500" />
              )}

            </button>
          </div>
        );
      },
    },
    {
      header: "Date",
      cell: (row) => {
        return (<p>{formatDate(row?.invoiceDate)}</p>);
      }
    },
    {
      header: "Supplier Name",
      accessor: "supplierName",
    },
    {
      header: "Amount",
      accessor: "amount",
    },
    {
      header: "VAT",
      cell: (row) => {
        return (<p>{row.vat} %</p>
        );
      }
    },
    {
      header: "Status",
      cell: (row) => {
        const status = row?.invoiceStatus;
        const colors =
          status === "PAID"
            ? { bg: "#D1FADF", text: "#039855" }
            : status === "PENDING"
              ? { bg: "#FEF0C7", text: "#B54708" }
              : status === "DUE"
                ? { bg: "#FEE4E2", text: "#D92D20" }
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
    {
      header: "Actions",
      cell: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full p-1.5 text-[#667085] transition-colors hover:bg-gray-100">
              <MoreVertical size={20} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuItem
              disabled={row?.invoiceStatus === "PAID"}
              onClick={() => handleStatusChange(row?.id)}
              className="cursor-pointer hover:bg-gray-50 disabled:cursor-not-allowed"
            >
              {isChangeInvoiceStatusLoading ? "Updating..." : "Mark As Paid"}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer font-medium text-[#155DFC] hover:bg-blue-50"
              onClick={() => handleViewClick(row)}
            >
              View
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
            onChange={(e) => handleSearchInvoices(e.target.value)}
            placeholder="Search invoices..."
            className="h-11 w-full border-[#D5D7DA] pl-12 shadow-none focus-visible:ring-1"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Export Button */}
          {/* <Button
            variant="outline"
            className="gap-2 border-[#D5D7DA] bg-[#FDFDFD] font-semibold text-[#181D27]"
          >
            <Download size={18} /> Export
          </Button> */}

          {/* Filter Popover */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 border-[#D5D7DA] bg-[#FDFDFD] font-semibold text-[#181D27]">
                <ListFilter size={18} /> {statusFilter || "Status"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 bg-white">
              <DropdownMenuItem onClick={() => setStatusFilter("PENDING")}>PENDING</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("PAID")}>COMPLETED</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("DUE")}>DUE</DropdownMenuItem>
              {statusFilter && (
                <DropdownMenuItem onClick={() => setStatusFilter(undefined)} className="text-red-600">
                  Clear Status
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {(isLoading || isFetching) && <TableSkeletonLoader />}

      {!isLoading && !isFetching && !invoicesData?.data?.length && (
        <EmptyState
          title="No invoices found"
          description="No invoices match your current search or filter criteria."
          className="rounded-xl border bg-white"
        />
      )}

      {!isLoading && !isFetching && invoicesData?.data?.length > 0 && (
        <CustomTable columns={tableConfig} data={invoicesData?.data || []} />
      )}

      {invoicesData?.data?.length > 0 && <CustomPagination meta={meta} />}

      {/* View Invoice Modal */}
      {selectedInvoice && (
        <ViewExpenseInvoiceModal
          isOpen={isViewModalOpen}
          onClose={handleCloseViewModal}
          invoice={{
            ...selectedInvoice,
            invoiceDate: typeof selectedInvoice.invoiceDate === 'string' ? selectedInvoice.invoiceDate : formatDate(selectedInvoice.invoiceDate),
          }}
        />
      )}
    </section>
  );
}

export default FinanceExpensesInvoicesTable;