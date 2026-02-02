
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import { useSendNotificationMutation } from "@/redux/features/notification/notification.api";
import { useSendNotificationMutation } from "@/redux/features/finance/invoice/invoice.api";
import { catchAsyncMutation } from "@/utils/apiReqRes.utils";
import { useState } from "react";
import { toast } from "sonner";

interface InvoiceRow {
  id: string;
  invoices: string;
  invoiceDate: string;
  orgName: string;
  amount: number | string;
  vat: number | string;
  invoiceStatus: string;
  clientId: string;
}

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: InvoiceRow;
}

const ReminderModal = ({ isOpen, onClose, invoice }: ReminderModalProps) => {
  const [sendNotification, { isLoading: isSending }] =
    useSendNotificationMutation();

  const [formData, setFormData] = useState({
    title: "",
    message: "",
  });

  const handleRemindSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await catchAsyncMutation(
      sendNotification({
        userId: invoice.clientId,
        title: formData.title,
        message: formData.message,
        type: "PAYMENT_REMINDER",
      }).unwrap(),

      (res) => {
        toast.success(res.message || "Payment reminder sent successfully!");
        onClose();
      },
    );
  };


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Send Payment Reminder</DialogTitle>
          <DialogDescription>
            Send a payment reminder notification to the client for invoice{" "}
            {invoice.invoices}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleRemindSubmit}>
          <div className="space-y-4 py-4">
            {/* Title Field */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter notification title"
                required
                className="w-full"
              />
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your reminder message"
                required
                rows={5}
                className="w-full resize-none"
              />
            </div>

            {/* Type Field (Read-only) */}
            <div className="space-y-2">
              <Label htmlFor="type">Notification Type</Label>
              <Input
                id="type"
                name="type"
                value="PAYMENT_REMINDER"
                readOnly
                disabled
                className="w-full bg-gray-50"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSending}>
              {isSending ? "Sending..." : "Send Reminder"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReminderModal;
