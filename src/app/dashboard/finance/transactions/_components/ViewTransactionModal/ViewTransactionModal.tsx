"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";

interface TransactionFile {
  url: string;
  name?: string;
}

interface TransactionDocument {
  files?: TransactionFile[];
}

interface ViewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: {
    id: string;
    paymentMethod: string;
    transactionType: string;
    description: string;
    amount: number;
    createdAt: string;
    document?: TransactionDocument;
  };
}

const ViewTransactionModal = ({ isOpen, onClose, transaction }: ViewTransactionModalProps) => {
  const files = transaction.document?.files ?? [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Transaction Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          {/* Transaction ID */}
          <div className="flex justify-between border-b border-gray-100 pb-3">
            <span className="font-medium text-gray-600">Transaction ID:</span>
            <span className="font-semibold text-gray-900">{transaction.id}</span>
          </div>

          {/* Payment Method */}
          <div className="flex justify-between border-b border-gray-100 pb-3">
            <span className="font-medium text-gray-600">Payment Method:</span>
            <span className="text-gray-900">{transaction.paymentMethod}</span>
          </div>

          {/* Transaction Type */}
          <div className="flex justify-between border-b border-gray-100 pb-3">
            <span className="font-medium text-gray-600">Type:</span>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              {transaction.transactionType}
            </span>
          </div>

          {/* Amount */}
          <div className="flex justify-between border-b border-gray-100 pb-3">
            <span className="font-medium text-gray-600">Amount:</span>
            <span className="text-lg font-bold text-gray-900">
              ${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          {/* Date */}
          <div className="flex justify-between border-b border-gray-100 pb-3">
            <span className="font-medium text-gray-600">Date:</span>
            <span className="text-gray-900">{transaction.createdAt}</span>
          </div>

          {/* Description */}
          <div className="border-b border-gray-100 pb-3">
            <span className="font-medium text-gray-600">Description:</span>
            <p className="mt-2 text-gray-900">{transaction.description}</p>
          </div>

          {/* Attachments */}
          <div className="pb-3">
            <span className="font-medium text-gray-600">Attachments:</span>
            {files.length === 0 ? (
              <p className="mt-2 text-gray-400">No attachments</p>
            ) : (
              <div className="mt-2 flex flex-col gap-2">
                {files.map((file: TransactionFile, index: number) => (
                  <Link
                    key={index}
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-blue-50 px-3 py-2 font-semibold text-[#155DFC] transition-colors hover:bg-blue-100 hover:text-blue-700"
                  >
                    <span>📎</span>
                    {file.name || `Attachment ${index + 1}`}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4">
          <Button
            onClick={onClose}
            variant="outline"
            className="gap-2"
          >
            <X size={16} />
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewTransactionModal;