"use client";

import CustomTable from "@/components/shared/dashboard/CustomTable/CustomTable";
import StatusBadge from "@/components/shared/dashboard/StatusBadge/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TColumn } from "@/types/custom-table.types";
import { ArrowRight, Download, FileX, Search } from "lucide-react";
import { useGetAllInvoicesQuery } from "@/redux/features/finance/invoice/invoice.api";
import CustomPagination from "@/components/shared/dashboard/CustomPagination/CustomPagination";
import { useState } from "react";
import ReminderModal from "../FinanceReminderModal/FinanceReminderModal";
// import ViewReceivableModal from "../ViewReceivableModal/ViewReceivableModal";
import useSetSearchQueryInURL from "@/hooks/useSetSearchQueryInURL";
import useExportData from "@/hooks/useExportData";
import TableSkeleton from "@/components/shared/dashboard/FinanceTableSkeleton/TableSkeleton";
import ViewReceivableModal from "../Viewreceivablemodal/Viewreceivablemodal";


// No Data Found Component
const InvoiceNoDataFound = () => (
  <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-16 px-6">
    <div className="mb-4 rounded-full bg-gray-100 p-6">
      <FileX className="h-12 w-12 text-gray-400" />
    </div>
    <h3 className="mb-2 text-xl font-semibold text-gray-900">No Invoices Found</h3>
    <p className="mb-6 text-center text-gray-500 max-w-md">
      There are no invoices available at the moment. Start by creating your first invoice.
    </p>
    <Button className="gap-2">
      Add Invoice <ArrowRight size={16} />
    </Button>
  </div>
);

// Type definitions
type InvoiceStatus = "PAID" | "PENDING" | "DUE";

interface InvoiceRow {
  id: string;
  invoices: string;
  invoiceDate: string;
  orgName: string;
  amount: number | string;
  vat: number | string;
  invoiceStatus: InvoiceStatus;
  clientId: string;
}

function FinanceAccountsReceivableTable() {
  // For searchbar filter
  const { getQueryObject, setQuery, deleteQuery } = useSetSearchQueryInURL();
  const query = getQueryObject();
  const { data: receivableData, isLoading } = useGetAllInvoicesQuery({ invoiceType: "SELLS", ...query });
  console.log(receivableData, 'receivableData');
  
  const handleSearchReceivable = (search: string) => {
    if (search === "") {
      deleteQuery("search")
    } else {
      setQuery("search", search);
    };
  }

  const meta = {
    total: receivableData?.pagination?.totalItems || 0,
    page: receivableData?.pagination?.currentPage || 1,
    limit: receivableData?.pagination?.limit || 10,
    totalPages: receivableData?.pagination?.totalPages || 1,
  }

  const { exportToCSV } = useExportData({
    fileName: "Account Receivable",
  });

  const handleExport = () => {
    const dataToExport = receivableData?.data || [];
    if (dataToExport.length > 0) {
      exportToCSV(dataToExport);
    }
  };

  // Reminder Modal state
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [selectedReminderInvoice, setSelectedReminderInvoice] = useState<InvoiceRow | null>(null);

  // View Modal state
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedViewInvoice, setSelectedViewInvoice] = useState<InvoiceRow | null>(null);

  console.log(receivableData, 'invoicesData');

  // Open reminder modal with pre-filled data
  const handleOpenReminderModal = (invoice: InvoiceRow) => {
    setSelectedReminderInvoice(invoice);
    setIsReminderModalOpen(true);
  };

  // Close reminder modal
  const handleCloseReminderModal = () => {
    setIsReminderModalOpen(false);
    setSelectedReminderInvoice(null);
  };

  // Handle view button click
  const handleView = (invoice: InvoiceRow) => {
    setSelectedViewInvoice(invoice);
    setIsViewModalOpen(true);
  };

  // Close view modal
  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedViewInvoice(null);
  };

  const tableConfig: TColumn<InvoiceRow>[] = [
    {
      header: "Invoices",
      accessor: "id",
      cell: (row: InvoiceRow) => <span>{row.invoices || "N/A"}</span>,
    },
    {
      header: "Date",
      accessor: "invoiceDate",
      cell: (row: InvoiceRow) => <span>{row.invoiceDate || "N/A"}</span>,
    },
    {
      header: "Organization",
      accessor: "orgName",
      cell: (row: InvoiceRow) => <span>{row.orgName || "N/A"}</span>,
    },
    {
      header: "Amount",
      accessor: "amount",
      cell: (row: InvoiceRow) => {
        const amount = typeof row.amount === 'number' ? row.amount.toFixed(2) : row.amount;
        return <span>${amount || "0.00"}</span>;
      },
    },
    {
      header: "VAT",
      accessor: "vat",
      cell: (row: InvoiceRow) => {
        const vat = typeof row.vat === 'number' ? row.vat.toFixed(2) : row.vat;
        return <span>${vat || "0.00"}</span>;
      },
    },
    {
      header: "Status",
      cell: (row: InvoiceRow) => {
        const status = row.invoiceStatus;
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
      cell: (row: InvoiceRow) => (
        <div className="flex justify-center">
          {row.invoiceStatus === "PAID" ? (
            <button
              className="cursor-pointer text-sm font-semibold text-[#155DFC] hover:underline"
              onClick={() => handleView(row)}
            >
              View
            </button>
          ) : (
            <button
              className="cursor-pointer rounded-md bg-[#155DFC] px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              onClick={() => handleOpenReminderModal(row)}
            >
              Remind
            </button>
          )}
        </div>
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
            onChange={(e) => handleSearchReceivable(e.target.value)}
            placeholder="Search users, documents, invoices..."
            className="h-11 w-full border-[#D5D7DA] pl-12 shadow-none focus-visible:ring-1"
          />
        </div>

         <div className="flex items-center gap-3">
          Export Button
          <Button
            onClick={handleExport}
            variant="outline"
            className="gap-2 border-[#D5D7DA] bg-[#FDFDFD] font-semibold text-[#181D27]"
          >
            <Download size={18} /> Export
          </Button>

          {/* Filter Popover */}
          {/* <Button
            variant="outline"
            className="gap-2 border-[#D5D7DA] bg-[#FDFDFD] font-semibold text-[#181D27]"
          >
            <ListFilter size={18} /> Filter
          </Button> */}
        </div> 
      </div>

      {/* Conditional Rendering */}
      {isLoading ? (
        <TableSkeleton />
      ) : !receivableData?.data || receivableData.data.length === 0 ? (
        <InvoiceNoDataFound />
      ) : (
        <>
          <CustomTable columns={tableConfig} data={receivableData.data} />
          {receivableData?.pagination && (
            <CustomPagination meta={meta} />
          )}
        </>
      )}

      {/* Reminder Modal */}
      {selectedReminderInvoice && (
        <ReminderModal
          isOpen={isReminderModalOpen}
          onClose={handleCloseReminderModal}
          invoice={selectedReminderInvoice}
        />
      )}

      {/* View Invoice Modal */}
      {selectedViewInvoice && (
        <ViewReceivableModal
          isOpen={isViewModalOpen}
          onClose={handleCloseViewModal}
          invoice={selectedViewInvoice}
        />
      )}
    </section>
  );
}

export default FinanceAccountsReceivableTable;