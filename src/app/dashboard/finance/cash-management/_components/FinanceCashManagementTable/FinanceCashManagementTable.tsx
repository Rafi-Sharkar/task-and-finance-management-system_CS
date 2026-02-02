"use client";

import { useState } from "react";
import CustomPagination from "@/components/shared/dashboard/CustomPagination/CustomPagination";
import CustomTable from "@/components/shared/dashboard/CustomTable/CustomTable";
import TableSkeleton from "@/components/shared/dashboard/FinanceTableSkeleton/TableSkeleton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import useSetSearchQueryInURL from "@/hooks/useSetSearchQueryInURL";
import { useGetCashsQuery } from "@/redux/features/finance/cash/cash.api";
import { TColumn } from "@/types/custom-table.types";
import {
  ArrowRight,
  Edit,
  Eye,
  FileX,
  MoreVertical,
  Search,
} from "lucide-react";
import Link from "next/link";
import ViewCashModal from "../ViewCashModal/ViewCashModal";
import EditCashModal from "./EditCashModal";


// No Data Found Component
const CashNoDataFound = () => (
  <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white px-6 py-16">
    <div className="mb-4 rounded-full bg-gray-100 p-6">
      <FileX className="h-12 w-12 text-gray-400" />
    </div>
    <h3 className="mb-2 text-xl font-semibold text-gray-900">
      No Cash Records Found
    </h3>
    <p className="mb-6 max-w-md text-center text-gray-500">
      There are no cash management records available at the moment. Start by
      adding your first cash entry.
    </p>
    <Button className="gap-2 bg-[#155DFC] hover:bg-[#0351f8]">
      Add Cash Record <ArrowRight size={16} />
    </Button>
  </div>
);

// Type definitions
interface CashFile {
  id: string;
  url: string;
  mimeType?: string;
  extension?: string;
}

interface CashDocument {
  id: string;
  name: string;
  files: CashFile[];
}

interface CashRow {
  id: string;
  cashDate: string;
  referenceNo: string;
  description: string;
  cashIn: number;
  cashOut: number;
  totalbalance: number;
  document?: CashDocument[]; // Changed to array
}

const FinanceCashManagementTable = () => {
  const { getQueryObject, setQuery, deleteQuery } = useSetSearchQueryInURL();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCashRecord, setSelectedCashRecord] = useState<{
    id: string;
    cashIn: number;
    cashOut: number;
    totalbalance: number;
  } | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedViewCashRecord, setSelectedViewCashRecord] = useState<CashRow | null>(null);
  // const [cashTypeFilter, setCashTypeFilter] = useState<string | undefined>(undefined);


  const query = getQueryObject();

  const { data: cashData, isLoading } = useGetCashsQuery(query);
  console.log(cashData?.data, "cashData");

  const handleSearchCash = (search: string) => {
    if (search === "") {
      deleteQuery("search");
    } else {
      setQuery("search", search);
    }
  };





  const handleEditClick = (row: CashRow) => {
    setSelectedCashRecord({
      id: row.id,
      cashIn: row.cashIn,
      cashOut: row.cashOut,
      totalbalance: row.totalbalance,
    });
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedCashRecord(null);
  };

  const handleViewClick = (row: CashRow) => {
    setSelectedViewCashRecord(row);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedViewCashRecord(null);
  };

  const tableConfig: TColumn<CashRow>[] = [
    {
      header: "Date",
      accessor: "cashDate",
    },
    {
      header: "Reference No",
      accessor: "referenceNo",
    },
    {
      header: "Descriptions",
      accessor: "description",
    },
    {
      header: "Cash In",
      accessor: "cashIn",
    },
    {
      header: "Cash Out",
      accessor: "cashOut",
    },
    {
      header: "Balance",
      accessor: "totalbalance",
    },
    {
      header: "Attachment",
      cell: (row: CashRow) => {
        // Access files from the document array
        const documents = row.document ?? [];
        const allFiles = documents.flatMap(doc => doc.files ?? []);

        if (allFiles.length === 0)
          return <span className="text-gray-400">No files</span>;

        return (
          <div className="flex flex-col gap-1">
            {allFiles.map((file: CashFile, index: number) => (
              <Link
                key={file.id || index}
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer font-semibold text-[#155DFC] underline decoration-solid underline-offset-4 transition-colors hover:text-blue-700"
              >
                Download
              </Link>
            ))}
          </div>
        );
      },
    },
    {
      header: "Action",
      cell: (row: CashRow) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-lg p-2 text-gray-500 transition-all duration-200 hover:bg-gray-50 hover:text-gray-700 focus:ring-2 focus:ring-gray-200 focus:outline-none">
              <MoreVertical size={18} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-40 border border-gray-100 shadow-lg"
          >
            <DropdownMenuItem
              className="cursor-pointer gap-2 text-gray-700 transition-colors duration-150 hover:bg-blue-50 hover:text-blue-600"
              onClick={() => handleViewClick(row)}
            >
              <Eye size={16} />
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer gap-2 text-gray-700 transition-colors duration-150 hover:bg-blue-50 hover:text-blue-600"
              onClick={() => handleEditClick(row)}
            >
              <Edit size={16} />
              Edit
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
            onChange={(e) => handleSearchCash(e.target.value)}
            placeholder="Search users, documents, invoices..."
            className="h-11 w-full border-[#D5D7DA] pl-12 shadow-none focus-visible:ring-1"
          />
        </div>

        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 border-[#D5D7DA] bg-[#FDFDFD] font-semibold text-[#181D27]">
              <ListFilter size={18} /> {cashTypeFilter || "Status"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 bg-white">
            <DropdownMenuItem onClick={() => setCashTypeFilter("CASH_IN")}>Cash In </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCashTypeFilter("CASH_OUT")}>Cash</DropdownMenuItem>
            {cashTypeFilter && (
              <DropdownMenuItem onClick={() => setCashTypeFilter(undefined)} className="text-red-600">
                Clear Status
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>

      {/* Conditional Rendering */}
      {isLoading ? (
        <TableSkeleton />
      ) : !cashData?.data || cashData.data.length === 0 ? (
        <CashNoDataFound />
      ) : (
        <>
          <CustomTable columns={tableConfig} data={cashData.data} />
          {cashData?.metadata && <CustomPagination meta={cashData.metadata} />}
        </>
      )}

      {/* Edit Cash Modal */}
      {selectedCashRecord && (
        <EditCashModal
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          cashRecord={selectedCashRecord}
        />
      )}

      {/* View Cash Modal */}
      {selectedViewCashRecord && (
        <ViewCashModal
          isOpen={isViewModalOpen}
          onClose={handleCloseViewModal}
          cashRecord={selectedViewCashRecord}
        />
      )}
    </section>
  );
};

export default FinanceCashManagementTable;