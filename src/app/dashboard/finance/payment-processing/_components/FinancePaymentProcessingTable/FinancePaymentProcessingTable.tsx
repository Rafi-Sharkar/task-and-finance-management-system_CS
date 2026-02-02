"use client";

import { useState } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TColumn } from "@/types/custom-table.types";
import { ArrowRight, Eye, FileX, ListFilter, MoreVertical, Search } from "lucide-react";
import { useGetPaymentsQuery, useUpdatePaymentStatusMutation } from "@/redux/features/finance/paymentprocessing/paymentprocessing.api";
import { toast } from "sonner";
import CustomPagination from "@/components/shared/dashboard/CustomPagination/CustomPagination";
import TableSkeleton from "@/components/shared/dashboard/FinanceTableSkeleton/TableSkeleton";
import { catchAsyncMutation } from "@/utils/apiReqRes.utils";
import useSetSearchQueryInURL from "@/hooks/useSetSearchQueryInURL";
import ViewPaymentModal from "../ViewPaymentModal/ViewPaymentModal";
// import ViewPaymentModal from "../ViewPaymentModal/ViewPaymentModal";


// No Data Found Component
const PaymentNoDataFound = () => (
  <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-16 px-6">
    <div className="mb-4 rounded-full bg-gray-100 p-6">
      <FileX className="h-12 w-12 text-gray-400" />
    </div>
    <h3 className="mb-2 text-xl font-semibold text-gray-900">No Payments Found</h3>
    <p className="mb-6 text-center text-gray-500 max-w-md">
      There are no payment records available at the moment. Start by adding your first payment.
    </p>
    <Button className="gap-2 bg-[#155DFC] hover:bg-[#0351f8]">
      Add Payment <ArrowRight size={16} />
    </Button>
  </div>
);

// Type definitions
interface PaymentRow {
  id: string;
  paymentDate: string;
  vendor: string;
  paymentMethod: string;
  amount: number;
  invoiceId: string;
  paymentStatus: "COMPLETED" | "PENDING";
}

const FinancePaymentProcessingTable = () => {
  const [updatePaymentStatus, { isLoading: isUpdating }] = useUpdatePaymentStatusMutation();
  const { getQueryObject, setQuery, deleteQuery } = useSetSearchQueryInURL();
  // Add state at the top of the component
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);


  // View Modal state
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentRow | null>(null);

  const query = getQueryObject();
  const { data: paymentInfo, isLoading } = useGetPaymentsQuery({ query, paymentStatus: statusFilter });

  const handleSearchPayment = (search: string) => {
    if (search === "") {
      deleteQuery("search")
    } else {
      setQuery("search", search);
    };
  }

  // Handle status change
  const handleStatusChange = async (
    paymentId: string,
    newStatus: "COMPLETED" | "PENDING"
  ) => {
    await catchAsyncMutation(
      updatePaymentStatus({
        id: paymentId,
        paymentStatus: newStatus,
      }).unwrap(),
      (res) => {
        toast.success(res.message || "Payment status updated successfully!");
      },
    );
  };

  // Handle view click
  const handleViewClick = (payment: PaymentRow) => {
    setSelectedPayment(payment);
    setIsViewModalOpen(true);
  };

  // Close view modal
  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedPayment(null);
  };

  const tableConfig: TColumn<PaymentRow>[] = [
    {
      header: "Payment Date",
      accessor: "paymentDate",
    },
    {
      header: "Vendor",
      accessor: "vendor",
    },
    {
      header: "Payment Method",
      accessor: "paymentMethod",
    },
    {
      header: "Amount",
      accessor: "amount",
    },
    {
      header: "Invoice",
      accessor: "invoiceId",
    },
    {
      header: "Status",
      cell: (row: PaymentRow) => (
        <Select
          defaultValue={row.paymentStatus}
          onValueChange={(value) => handleStatusChange(row.id, value as "COMPLETED" | "PENDING")}
          disabled={isUpdating}
        >
          <SelectTrigger className="h-10 w-44 rounded-lg border-[#E4E7EC] bg-white text-sm focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="COMPLETED">
              <div className="flex items-center gap-2 text-[#039855]">
                <span className="h-2 w-2 rounded-full bg-[#12B76A]" /> Completed
              </div>
            </SelectItem>
            <SelectItem value="PENDING">
              <div className="flex items-center gap-2 text-[#B54708]">
                <span className="h-2 w-2 rounded-full bg-[#F79009]" /> Pending
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      header: "Action",
      cell: (row: PaymentRow) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-lg p-2 text-gray-500 transition-all duration-200 hover:bg-gray-50 hover:text-gray-700 focus:ring-2 focus:ring-gray-200 focus:outline-none">
              <MoreVertical size={18} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 border border-gray-100 shadow-lg">
            <DropdownMenuItem
              className="cursor-pointer gap-2 text-gray-700 transition-colors duration-150 hover:bg-blue-50 hover:text-blue-600"
              onClick={() => handleViewClick(row)}
            >
              <Eye size={16} />
              View
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
            onChange={(e) => handleSearchPayment(e.target.value)}
            placeholder="Search users, documents, invoices..."
            className="h-11 w-full border-[#D5D7DA] pl-12 shadow-none focus-visible:ring-1"
          />
        </div>

        {/* Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 border-[#D5D7DA] bg-[#FDFDFD] font-semibold text-[#181D27]">
              <ListFilter size={18} /> {statusFilter || "Status"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 bg-white">
            <DropdownMenuItem onClick={() => setStatusFilter("PENDING")}>PENDING</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("COMPLETED")}>COMPLETED</DropdownMenuItem>
            {statusFilter && (
              <DropdownMenuItem onClick={() => setStatusFilter(undefined)} className="text-red-600">
                Clear Status
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>


      </div>

      {/* Conditional Rendering */}
      {isLoading ? (
        <TableSkeleton />
      ) : !paymentInfo?.data || paymentInfo.data.length === 0 ? (
        <PaymentNoDataFound />
      ) : (
        <>
          <CustomTable columns={tableConfig} data={paymentInfo.data} />
          {paymentInfo?.metadata && (
            <CustomPagination meta={paymentInfo.metadata} />
          )}
        </>
      )}

      {/* View Payment Modal */}
      {selectedPayment && (
        <ViewPaymentModal
          isOpen={isViewModalOpen}
          onClose={handleCloseViewModal}
          payment={selectedPayment}
        />
      )}
    </section>
  );
}

export default FinancePaymentProcessingTable;