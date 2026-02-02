"use client";

import CustomTable from "@/components/shared/dashboard/CustomTable/CustomTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TColumn } from "@/types/custom-table.types";
import { ArrowRight, FileX, Search } from "lucide-react";
import { useGetBankReconciliationsQuery, useUpdateBankReconciliationStatusMutation } from "@/redux/features/finance/bankReconciliation/bankReconciliation.api";
import CustomPagination from "@/components/shared/dashboard/CustomPagination/CustomPagination";
// import { catchAsyncMutation } from "@/utils/catchAsyncMutation";
import { toast } from "sonner";
import { catchAsyncMutation } from "@/utils/apiReqRes.utils";
import TableSkeleton from "@/components/shared/dashboard/FinanceTableSkeleton/TableSkeleton";
import useSetSearchQueryInURL from "@/hooks/useSetSearchQueryInURL";


// No Data Found Component
const ReconciliationNoDataFound = () => (
  <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-16 px-6">
    <div className="mb-4 rounded-full bg-gray-100 p-6">
      <FileX className="h-12 w-12 text-gray-400" />
    </div>
    <h3 className="mb-2 text-xl font-semibold text-gray-900">No Reconciliation Records Found</h3>
    <p className="mb-6 text-center text-gray-500 max-w-md">
      There are no bank reconciliation records available at the moment. Start by adding your first reconciliation entry.
    </p>
    <Button className="gap-2">
      Add Reconciliation <ArrowRight size={16} />
    </Button>
  </div>
);

// Type definitions - Backend expects UPPERCASE
type ReconciliationStatus = "PENDING" | "ADJUSTMENT" | "MATCH" | "FAILED";

interface ReconciliationRow {
  id: string;
  paymentDate: string;
  invoiceId: string;
  vendor: string;
  ledgerAmount: number | string;
  backAmount: number | string;
  reconciliationStatus: ReconciliationStatus;
}

const FinanceBankReconciliationTable = () => {

  const [updateReconciliationStatus, { isLoading: isUpdating }] = useUpdateBankReconciliationStatusMutation();
  // const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);

  const { getQueryObject, setQuery, deleteQuery } = useSetSearchQueryInURL();

  const query = getQueryObject();
  const { data: reconciliationData, isLoading } = useGetBankReconciliationsQuery(query);
  console.log(reconciliationData, 'reconciliationData');
  const handleSearchBank = (search: string) => {
    if (search === "") {
      deleteQuery("search")
    } else {
      setQuery("search", search);
    };
  }


  // Handle status change
  const handleStatusChange = async (reconciliationId: string, newStatus: ReconciliationStatus) => {
    await catchAsyncMutation(
      updateReconciliationStatus({
        id: reconciliationId,
        reconciliationStatus: newStatus // Send uppercase to backend
      }).unwrap(),
      (res) => {
        // Success callback
        toast.success(res?.message || "Reconciliation status updated successfully!");
      },

    );
  };
  const displayValue = (value: string | number | null | undefined): string => {
    if (value === null || value === undefined || value === "") return "N/A";
    if (typeof value === "string" && value.trim() === "") return "N/A";
    return String(value);
  };

  const tableConfig: TColumn<ReconciliationRow>[] = [
    {
      header: "Payment Date",
      accessor: "paymentDate",
      cell: (row: ReconciliationRow) => <span>{displayValue(row.paymentDate)}</span>,
    },
    {
      header: "Reference No",
      accessor: "invoiceId",
      cell: (row: ReconciliationRow) => (
        <span>{row.invoiceId && row.invoiceId.trim() !== "" ? row.invoiceId : "N/A"}</span>
      ),
    },
    {
      header: "Vendor",
      accessor: "vendor",
      cell: (row: ReconciliationRow) => (
        <span>{row.vendor && row.vendor.trim() !== "" ? row.vendor : "N/A"}</span>
      ),
    },
    {
      header: "Ledger Amount",
      accessor: "ledgerAmount",
      cell: (row: ReconciliationRow) => (
        <span>
          {row.ledgerAmount !== null &&
            row.ledgerAmount !== undefined &&
            row.ledgerAmount !== ""
            ? row.ledgerAmount
            : "N/A"}
        </span>
      ),
    },
    {
      header: "Bank Amount",
      accessor: "backAmount",
      cell: (row: ReconciliationRow) => (
        <span>
          {row.backAmount !== null &&
            row.backAmount !== undefined &&
            row.backAmount !== ""
            ? row.backAmount
            : "N/A"}
        </span>
      ),
    },
    {
      header: "Status",
      cell: (row: ReconciliationRow) => (
        <Select
          value={row.reconciliationStatus}
          onValueChange={(value) => handleStatusChange(row.id, value as ReconciliationStatus)}
          disabled={isUpdating}
        >
          <SelectTrigger className="h-10 w-48 rounded-lg border-[#E4E7EC] bg-white text-sm focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MATCH">
              <div className="flex items-center gap-2 text-[#039855]">
                <span className="h-2 w-2 rounded-full bg-[#12B76A]" /> Match
              </div>
            </SelectItem>
            <SelectItem value="PENDING">
              <div className="flex items-center gap-2 text-[#B54708]">
                <span className="h-2 w-2 rounded-full bg-[#F79009]" /> Pending
              </div>
            </SelectItem>
            <SelectItem value="ADJUSTMENT">
              <div className="flex items-center gap-2 text-[#475467]">
                <span className="h-2 w-2 rounded-full bg-[#667085]" /> Adjustment
              </div>
            </SelectItem>
            <SelectItem value="FAILED">
              <div className="flex items-center gap-2 text-[#D92D20]">
                <span className="h-2 w-2 rounded-full bg-[#F04438]" /> Failed
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
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
            onChange={(e) => handleSearchBank(e.target.value)}
            placeholder="Search users, documents, invoices..."
            className="h-11 w-full border-[#D5D7DA] pl-12 shadow-none focus-visible:ring-1"
          />
        </div>

        {/* Filter Popover */}
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 border-[#D5D7DA] bg-[#FDFDFD] font-semibold text-[#181D27]">
              <ListFilter size={18} /> {statusFilter || "Status"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 bg-white">
            <DropdownMenuItem onClick={() => setStatusFilter("PENDING")}>PENDING</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("PENDING")}>PENDING</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("PENDING")}>PENDING</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("COMPLETED")}>COMPLETED</DropdownMenuItem>
            {statusFilter && (
              <DropdownMenuItem onClick={() => setStatusFilter(undefined)} className="text-red-600">
                Clear Status
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>

      {/* Conditional Rendering */}
      {isLoading ? (
        <TableSkeleton />
      ) : !reconciliationData?.data || reconciliationData.data.length === 0 ? (
        <ReconciliationNoDataFound />
      ) : (
        <>
          <CustomTable columns={tableConfig} data={reconciliationData.data} />
          {reconciliationData?.metadata && (
            <CustomPagination meta={reconciliationData.metadata} />
          )}
        </>
      )}
    </section>
  );
}

export default FinanceBankReconciliationTable;