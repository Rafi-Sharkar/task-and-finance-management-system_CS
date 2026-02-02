"use client";

import { useState } from "react";
import CustomTable from "@/components/shared/dashboard/CustomTable/CustomTable";
import { Input } from "@/components/ui/input";
import { TColumn } from "@/types/custom-table.types";
import { Edit, Eye, MoreVertical, Search } from "lucide-react";
import { useGetTransactionsQuery } from "@/redux/features/finance/transaction/transaction.api";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import CustomPagination from "@/components/shared/dashboard/CustomPagination/CustomPagination";
import TransactonsNoDataFound from "../TransactonsNoDataFound/TransactonsNoDataFound";
import TableSkeleton from "@/components/shared/dashboard/FinanceTableSkeleton/TableSkeleton";
import useSetSearchQueryInURL from "@/hooks/useSetSearchQueryInURL";
// import EditTransactionModal from "../EditTransactionModal/EditTransactionModal";
import ViewTransactionModal from "../ViewTransactionModal/ViewTransactionModal";
import EditTransactionModal from "./EditTransactionModal";


// Define proper type for transaction row
interface TransactionFile {
  url: string;
  name?: string;
}

interface TransactionDocument {
  files?: TransactionFile[];
}

interface TransactionRow {
  id: string;
  paymentMethod: string;
  transactionType: string;
  description: string;
  amount: number;
  createdAt: string;
  document?: TransactionDocument;
}

const FinanceTransactionsTable = () => {
  const { getQueryObject, setQuery, deleteQuery } = useSetSearchQueryInURL();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<{ id: string; amount: number } | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedViewTransaction, setSelectedViewTransaction] = useState<TransactionRow | null>(null);

  //get query object from URL
  const query = getQueryObject();
  const { data: transactionsData, isLoading } = useGetTransactionsQuery(query);

  const handleSearchTransactions = (search: string) => {
    if (search === "") {
      deleteQuery("search")
    } else {
      setQuery("search", search);
    };
  }

  const handleEditClick = (row: TransactionRow) => {
    setSelectedTransaction({
      id: row.id,
      amount: row.amount,
    });
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleViewClick = (row: TransactionRow) => {
    setSelectedViewTransaction(row);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedViewTransaction(null);
  };

  console.log(transactionsData?.metadata, "transactionsData.data")

  const tableConfig: TColumn<TransactionRow>[] = [
    {
      header: "Transaction ID",
      accessor: "id",
    },
    {
      header: "Payment Method",
      accessor: "paymentMethod",
    },
    {
      header: "Type",
      accessor: "transactionType",
    },
    {
      header: "Descriptions",
      accessor: "description",
    },
    {
      header: "Amount",
      accessor: "amount",
    },
    {
      header: "Date",
      accessor: "createdAt",
    },
    {
      header: "Attachment",
      cell: (row: TransactionRow) => {
        const files = row.document?.files ?? [];

        if (files.length === 0) return <span className="text-gray-400">No files</span>;

        return (
          <div className="flex flex-col gap-1">
            {files.map((file: TransactionFile, index: number) => (
              <Link
                key={index}
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer font-semibold text-[#155DFC] underline decoration-solid underline-offset-4 transition-colors hover:text-blue-700"
              >
                {`Download`}
              </Link>
            ))}
          </div>
        );
      },
    },
    {
      header: "Action",
      cell: (row: TransactionRow) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-lg p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200">
              <MoreVertical size={18} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 shadow-lg border border-gray-100">
            <DropdownMenuItem
              className="text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors duration-150 gap-2"
              onClick={() => handleViewClick(row)}
            >
              <Eye size={16} />
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors duration-150 gap-2"
              onClick={() => handleEditClick(row)}
            >
              <Edit size={16} />
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    }
  ];

  return (
    <section className="w-full space-y-5">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-md bg-white p-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#667085]" />
          <Input
            type="search"
            onChange={(e) => handleSearchTransactions(e.target.value)}
            placeholder="Search users, documents, invoices..."
            className="h-11 w-full border-[#D5D7DA] pl-12 shadow-none focus-visible:ring-1"
          />
        </div>

        {/* Filter Popover */}
        {/* <Button
          variant="outline"
          className="gap-2 border-[#D5D7DA] bg-[#FDFDFD] font-semibold text-[#181D27]"
        >
          <ListFilter size={18} /> Filter
        </Button> */}
      </div>

      {/* Conditional Rendering */}
      {isLoading ? (
        <TableSkeleton />
      ) : !transactionsData?.data || transactionsData.data.length === 0 ? (
        <TransactonsNoDataFound />
      ) : (
        <>
          <CustomTable columns={tableConfig} data={transactionsData.data || []} />
          {transactionsData?.metadata && (
            <CustomPagination meta={transactionsData.metadata} />
          )}
        </>
      )}

      {/* Edit Transaction Modal */}
      {selectedTransaction && (
        <EditTransactionModal
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          transaction={selectedTransaction}
        />
      )}

      {/* View Transaction Modal */}
      {selectedViewTransaction && (
        <ViewTransactionModal
          isOpen={isViewModalOpen}
          onClose={handleCloseViewModal}
          transaction={selectedViewTransaction}
        />
      )}
    </section>
  );
}

export default FinanceTransactionsTable;