"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface ViewPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: {
    id: string;
    paymentDate: string;
    vendor: string;
    paymentMethod: string;
    amount: number;
    invoiceId: string;
    paymentStatus: "COMPLETED" | "PENDING";
  };
}

const ViewPaymentModal = ({ isOpen, onClose, payment }: ViewPaymentModalProps) => {
  // Status colors
  const statusColors = payment.paymentStatus === "COMPLETED"
    ? { bg: "#D1FADF", text: "#039855" }
    : { bg: "#FEF0C7", text: "#B54708" };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Payment Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          {/* Payment ID */}
          <div className="flex justify-between border-b border-gray-100 pb-3">
            <span className="font-medium text-gray-600">Payment ID:</span>
            <span className="font-semibold text-gray-900">{payment.id}</span>
          </div>

          {/* Payment Date */}
          <div className="flex justify-between border-b border-gray-100 pb-3">
            <span className="font-medium text-gray-600">Payment Date:</span>
            <span className="text-gray-900">{payment.paymentDate}</span>
          </div>

          {/* Vendor */}
          <div className="flex justify-between border-b border-gray-100 pb-3">
            <span className="font-medium text-gray-600">Vendor:</span>
            <span className="font-medium text-gray-900">{payment.vendor}</span>
          </div>

          {/* Payment Method */}
          <div className="flex justify-between border-b border-gray-100 pb-3">
            <span className="font-medium text-gray-600">Payment Method:</span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
              {payment.paymentMethod}
            </span>
          </div>

          {/* Invoice ID */}
          <div className="flex justify-between border-b border-gray-100 pb-3">
            <span className="font-medium text-gray-600">Invoice ID:</span>
            <span className="text-gray-900">{payment.invoiceId}</span>
          </div>

          {/* Amount */}
          <div className="flex justify-between rounded-lg bg-blue-50 p-4">
            <span className="font-semibold text-gray-700">Amount:</span>
            <span className="text-2xl font-bold text-blue-700">
              ${payment.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          {/* Status */}
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <span className="font-medium text-gray-600">Status:</span>
            <span
              className="rounded-full px-4 py-1.5 text-sm font-semibold"
              style={{
                backgroundColor: statusColors.bg,
                color: statusColors.text
              }}
            >
              {payment.paymentStatus}
            </span>
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

export default ViewPaymentModal;