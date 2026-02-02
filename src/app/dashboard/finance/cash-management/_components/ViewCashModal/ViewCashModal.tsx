"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";

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

interface ViewCashModalProps {
  isOpen: boolean;
  onClose: () => void;
  cashRecord: {
    id: string;
    cashDate: string;
    referenceNo: string;
    description: string;
    cashIn: number;
    cashOut: number;
    totalbalance: number;
    document?: CashDocument[]; // Changed to array
  };
}

const ViewCashModal = ({ isOpen, onClose, cashRecord }: ViewCashModalProps) => {
  // Access files from the document array
  const documents = cashRecord.document ?? [];
  const allFiles = documents.flatMap(doc => doc.files ?? []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Cash Record Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          {/* Record ID */}
          <div className="flex justify-between border-b border-gray-100 pb-3">
            <span className="font-medium text-gray-600">Record ID:</span>
            <span className="font-semibold text-gray-900">{cashRecord.id}</span>
          </div>

          {/* Date */}
          <div className="flex justify-between border-b border-gray-100 pb-3">
            <span className="font-medium text-gray-600">Date:</span>
            <span className="text-gray-900">{cashRecord.cashDate}</span>
          </div>

          {/* Reference No */}
          <div className="flex justify-between border-b border-gray-100 pb-3">
            <span className="font-medium text-gray-600">Reference No:</span>
            <span className="font-medium text-gray-900">{cashRecord.referenceNo}</span>
          </div>

          {/* Cash In */}
          <div className="flex justify-between border-b border-gray-100 pb-3">
            <span className="font-medium text-gray-600">Cash In:</span>
            <span className="text-lg font-bold text-green-600">
              +${cashRecord.cashIn.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          {/* Cash Out */}
          <div className="flex justify-between border-b border-gray-100 pb-3">
            <span className="font-medium text-gray-600">Cash Out:</span>
            <span className="text-lg font-bold text-red-600">
              -${cashRecord.cashOut.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          {/* Total Balance */}
          <div className="flex justify-between rounded-lg bg-blue-50 p-3">
            <span className="font-semibold text-gray-700">Total Balance:</span>
            <span className="text-xl font-bold text-blue-700">
              ${cashRecord.totalbalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          {/* Description */}
          <div className="border-b border-gray-100 pb-3">
            <span className="font-medium text-gray-600">Description:</span>
            <p className="mt-2 text-gray-900">{cashRecord.description}</p>
          </div>

          {/* Attachments */}
          <div className="pb-3">
            <span className="font-medium text-gray-600">Attachments:</span>
            {allFiles.length === 0 ? (
              <p className="mt-2 text-gray-400">No attachments</p>
            ) : (
              <div className="mt-2 flex flex-col gap-2">
                {allFiles.map((file: CashFile, index: number) => (
                  <Link
                    key={file.id || index}
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-blue-50 px-3 py-2 font-semibold text-[#155DFC] transition-colors hover:bg-blue-100 hover:text-blue-700"
                  >
                    <span>📎</span>
                    Attachment {index + 1}
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

export default ViewCashModal;