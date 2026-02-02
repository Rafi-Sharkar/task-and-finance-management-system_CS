"use client";

import CustomTable from "@/components/shared/dashboard/CustomTable/CustomTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TColumn } from "@/types/custom-table.types";
import { ArrowRight, Eye, FileX, Search } from "lucide-react";
import { useGetAllInvoicesQuery, useChangeInvoiceStatusMutation } from "@/redux/features/finance/invoice/invoice.api";
import CustomPagination from "@/components/shared/dashboard/CustomPagination/CustomPagination";
import TableSkeleton from "@/components/shared/dashboard/FinanceTableSkeleton/TableSkeleton";
import { toast } from "sonner";
import { catchAsyncMutation } from "@/utils/apiReqRes.utils";
import useSetSearchQueryInURL from "@/hooks/useSetSearchQueryInURL";
// import { routerServerGlobal } from "next/dist/server/lib/router-utils/router-server-context";
import { useRouter } from "next/navigation";

// No Data Found Component
const PayableNoDataFound = () => (
  <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-16 px-6">
    <div className="mb-4 rounded-full bg-gray-100 p-6">
      <FileX className="h-12 w-12 text-gray-400" />
    </div>
    <h3 className="mb-2 text-xl font-semibold text-gray-900">No Payable Invoices Found</h3>
    <p className="mb-6 text-center text-gray-500 max-w-md">
      There are no payable invoices available at the moment.
    </p>
    <Button className="gap-2">
      Add Invoice <ArrowRight size={16} />
    </Button>
  </div>
);

// Type definitions
type InvoiceStatus = "PAID" | "PENDING" | "DUE";

export type PayableInvoiceRow = {
  id: string;
  invoiceType: string;
  clientId: string | null;
  orgName: string | null;
  supplierName: string | null;
  description: string;
  amount: string;
  invoiceDate: string;
  invoiceStatus: InvoiceStatus;
  fileId: string | null;
};

const FinanceAccountPayableTable = () => {

  const [changeInvoiceStatus, { isLoading: isUpdatingStatus }] = useChangeInvoiceStatusMutation();
  const router = useRouter();


  // const [showUploadModal, setShowUploadModal] = useState(false);
  // const [selectedInvoice, setSelectedInvoice] = useState<PayableInvoiceRow | null>(null);

  const { getQueryObject, setQuery, deleteQuery } = useSetSearchQueryInURL();

  const query = getQueryObject();
  const { data: payableData, isLoading, refetch } = useGetAllInvoicesQuery({ invoiceType: "EXPENSE", ...query });
  console.log(payableData, 'payableData');
  const handleSearchPayable = (search: string) => {
    if (search === "") {
      deleteQuery("search")
    } else {
      setQuery("search", search);
    };
  }


  const meta = {
    total: payableData?.pagination?.totalItems || 0,
    page: payableData?.pagination?.currentPage || 1,
    limit: payableData?.pagination?.limit || 10,
    totalPages: payableData?.pagination?.totalPages || 1,
  }


  const handleUploadClick = () => {
    router.push("/dashboard/finance/transactions")
  };

  const handleViewReceipt = (fileId: string) => {
    // TODO: Implement view logic - open file in new tab or modal
    console.log("View receipt with fileId:", fileId);
    // Example: window.open(`/api/files/${fileId}`, '_blank');
  };



  // Handle status change
  const handleStatusChange = async (invoiceId: string, newStatus: InvoiceStatus) => {
    await catchAsyncMutation(
      changeInvoiceStatus({
        invoiceId: invoiceId,
        invoiceStatus: newStatus,
      }).unwrap(),
      (res) => {
        // Success callback
        toast.success(res.message || "Invoice status updated successfully!");
        refetch(); // refresh data
      },

    );
  };


  // Table Config
  const tableConfig: TColumn<PayableInvoiceRow>[] = [
    {
      header: "Supplier",
      accessor: "supplierName",
      cell: (row: PayableInvoiceRow) => <span>{row.supplierName || "N/A"}</span>,
    },
    {
      header: "Invoice",
      accessor: "id",
      cell: (row: PayableInvoiceRow) => <span className="text-sm">{row.id.slice(0, 8)}...</span>,
    },
    {
      header: "Amount",
      accessor: "amount",
      cell: (row: PayableInvoiceRow) => {
        const amount = parseFloat(row.amount).toFixed(2);
        return <span>${amount}</span>;
      },
    },
    {
      header: "Invoice Date",
      accessor: "invoiceDate",
      cell: (row: PayableInvoiceRow) => {
        const date = new Date(row.invoiceDate).toLocaleDateString();
        return <span>{date}</span>;
      },
    },
    {
      header: "Status",
      cell: (row: PayableInvoiceRow) => (
        <Select
          value={row.invoiceStatus}
          onValueChange={(value) => handleStatusChange(row.id, value as InvoiceStatus)}
          disabled={isUpdatingStatus}
        >
          <SelectTrigger className="h-10 w-32 rounded-lg border-[#E4E7EC] bg-white text-sm focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PENDING">
              <div className="flex items-center gap-2 text-[#B54708]">
                <span className="h-2 w-2 rounded-full bg-[#F79009]" /> Pending
              </div>
            </SelectItem>
            <SelectItem value="PAID">
              <div className="flex items-center gap-2 text-[#039855]">
                <span className="h-2 w-2 rounded-full bg-[#12B76A]" /> Paid
              </div>
            </SelectItem>
            <SelectItem value="DUE">
              <div className="flex items-center gap-2 text-[#D92D20]">
                <span className="h-2 w-2 rounded-full bg-[#F04438]" /> Due
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      header: "Receipt",
      accessor: "fileId",
      cell: (row: PayableInvoiceRow) => (
        <span className="text-sm text-gray-600">
          {row.fileId ? "Uploaded" : "N/A"}
        </span>
      ),
    },
    {
      header: "Action",
      cell: (row: PayableInvoiceRow) => (
        <div className="flex justify-end gap-2">
          {row.fileId ? (
            <button
              onClick={() => handleViewReceipt(row.fileId!)}
              className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-[#155DFC] hover:underline"
            >
              <Eye size={16} />
              View Receipt
            </button>
          ) : row.invoiceStatus !== "PAID" ? (
            <button
              onClick={handleUploadClick}
              className="cursor-pointer rounded-lg bg-[#155DFC] px-4 py-2 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-blue-700"
            >
              Upload Receipt
            </button>
          ) : (
            <span className="text-sm text-gray-400">N/A</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <section className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-md bg-white p-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#667085]" />
          <Input
            type="search"
            onChange={(e) => handleSearchPayable(e.target.value)}
            placeholder="Search users, documents, invoices..."
            className="h-11 w-full border-[#D5D7DA] pl-12 shadow-none focus-visible:ring-1"
          />
        </div>

        {/* <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="gap-2 border-[#D5D7DA] bg-[#FDFDFD] font-semibold text-[#181D27]"
          >
            <Download size={18} /> Export
          </Button>

          <Button
            variant="outline"
            className="gap-2 border-[#D5D7DA] bg-[#FDFDFD] font-semibold text-[#181D27]"
          >
            <ListFilter size={18} /> Filter
          </Button>
        </div> */}
      </div>

      {/* Conditional Rendering */}
      {isLoading ? (
        <TableSkeleton />
      ) : !payableData?.data || payableData.data.length === 0 ? (
        <PayableNoDataFound />
      ) : (
        <>
          <CustomTable columns={tableConfig} data={payableData.data} />
          {payableData?.pagination && (
            <CustomPagination meta={meta} />
          )}
        </>
      )}

    </section>
  );
};

export default FinanceAccountPayableTable;