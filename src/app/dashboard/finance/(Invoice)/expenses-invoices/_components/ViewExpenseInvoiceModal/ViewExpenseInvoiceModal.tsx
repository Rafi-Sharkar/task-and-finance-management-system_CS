"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import StatusBadge from "@/components/shared/dashboard/StatusBadge/StatusBadge";
import { formatDate } from "@/utils/formatDateTime";

type InvoiceStatus = "PAID" | "PENDING" | "DUE";

interface ViewExpenseInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: {
    id: string;
    invoiceDate: string;
    supplierName: string;
    amount: number | string;
    vat: number | string;
    invoiceStatus: InvoiceStatus;
  };
}

const ViewExpenseInvoiceModal = ({ isOpen, onClose, invoice }: ViewExpenseInvoiceModalProps) => {
  // Calculate amounts
  const amount = typeof invoice.amount === 'number' ? invoice.amount : parseFloat(invoice.amount || '0');
  const vatPercentage = typeof invoice.vat === 'number' ? invoice.vat : parseFloat(invoice.vat || '0');
  const vatAmount = (amount * vatPercentage) / 100;
  const totalAmount = amount + vatAmount;

  // Status colors
  const getStatusColors = (status: InvoiceStatus) => {
    switch (status) {
      case "PAID":
        return { bg: "#D1FADF", text: "#039855" };
      case "PENDING":
        return { bg: "#FEF0C7", text: "#B54708" };
      case "DUE":
        return { bg: "#FEE4E2", text: "#D92D20" };
      default:
        return { bg: "#F2F4F7", text: "#344054" };
    }
  };

  const statusColors = getStatusColors(invoice.invoiceStatus);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Expense Invoice Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          {/* Invoice ID */}
          <div className="flex justify-between border-b border-gray-100 pb-3">
            <span className="font-medium text-gray-600">Invoice ID:</span>
            <span className="font-semibold text-gray-900">{invoice.id}</span>
          </div>

          {/* Date */}
          <div className="flex justify-between border-b border-gray-100 pb-3">
            <span className="font-medium text-gray-600">Invoice Date:</span>
            <span className="text-gray-900">{formatDate(invoice.invoiceDate)}</span>
          </div>

          {/* Supplier Name */}
          <div className="flex justify-between border-b border-gray-100 pb-3">
            <span className="font-medium text-gray-600">Supplier Name:</span>
            <span className="font-medium text-gray-900">{invoice.supplierName || "N/A"}</span>
          </div>

          {/* Amount Breakdown */}
          <div className="rounded-lg bg-gray-50 p-4 space-y-3">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Base Amount:</span>
              <span className="font-semibold text-gray-900">
                ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">VAT ({vatPercentage}%):</span>
              <span className="font-semibold text-gray-900">
                ${vatAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            
            <div className="flex justify-between border-t border-gray-200 pt-3">
              <span className="font-bold text-gray-700">Total Amount:</span>
              <span className="text-xl font-bold text-blue-700">
                ${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Status */}
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <span className="font-medium text-gray-600">Status:</span>
            <StatusBadge
              status={invoice.invoiceStatus}
              bgColor={statusColors.bg}
              textColor={statusColors.text}
            />
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

export default ViewExpenseInvoiceModal;