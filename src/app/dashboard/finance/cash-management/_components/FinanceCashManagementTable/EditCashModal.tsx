"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useUpdateCashMutation } from "@/redux/features/finance/cash/cash.api";
import { toast } from "sonner"; // or your toast library
import { catchAsyncMutation } from "@/utils/apiReqRes.utils";

interface EditCashModalProps {
  isOpen: boolean;
  onClose: () => void;
  cashRecord: {
    id: string;
    cashIn: number;
    cashOut: number;
    totalbalance: number;
  };
}
type UpdateCashPayload = {
  id: string;
  totalbalance: number;
  cashIn?: number;
  cashOut?: number;
};


const EditCashModal = ({ isOpen, onClose, cashRecord }: EditCashModalProps) => {
  // Determine which field to show based on which has a value
  const isCashInRecord = cashRecord.cashIn > 0;
  const isCashOutRecord = cashRecord.cashOut > 0;

  const [cashIn, setCashIn] = useState(cashRecord.cashIn.toString());
  const [cashOut, setCashOut] = useState(cashRecord.cashOut.toString());
  const [totalBalance, setTotalBalance] = useState(cashRecord.totalbalance.toString());
  const [updateCash, { isLoading }] = useUpdateCashMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedTotalBalance = parseFloat(totalBalance);
    if (isNaN(parsedTotalBalance)) {
      toast.error("Please enter a valid Total Balance");
      return;
    }

    const updatePayload: UpdateCashPayload = {
      id: cashRecord.id,
      totalbalance: parsedTotalBalance,
    };

    if (isCashInRecord) {
      const parsedCashIn = parseFloat(cashIn);
      if (isNaN(parsedCashIn) || parsedCashIn < 0) {
        toast.error("Please enter a valid Cash In amount");
        return;
      }
      updatePayload.cashIn = parsedCashIn;
      updatePayload.cashOut = 0;
    } else if (isCashOutRecord) {
      const parsedCashOut = parseFloat(cashOut);
      if (isNaN(parsedCashOut) || parsedCashOut < 0) {
        toast.error("Please enter a valid Cash Out amount");
        return;
      }
      updatePayload.cashOut = parsedCashOut;
      updatePayload.cashIn = 0;
    }

    await catchAsyncMutation(
      updateCash(updatePayload).unwrap(),
      (res) => {
        toast.success(res.message || "Cash record updated successfully");
        onClose();
      }
    );
  };


  const handleClose = () => {
    setCashIn(cashRecord.cashIn.toString());
    setCashOut(cashRecord.cashOut.toString());
    setTotalBalance(cashRecord.totalbalance.toString());
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Cash Record</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="cash-id">Record ID</Label>
            <Input
              id="cash-id"
              value={cashRecord.id}
              disabled
              className="bg-gray-50"
            />
          </div>

          {/* Conditionally show Cash In field */}
          {isCashInRecord && (
            <div className="space-y-2">
              <Label htmlFor="cashIn">Cash In *</Label>
              <Input
                id="cashIn"
                type="number"
                step="0.01"
                min="0"
                value={cashIn}
                onChange={(e) => setCashIn(e.target.value)}
                placeholder="Enter cash in amount"
                required
                className="focus-visible:ring-1"
              />
            </div>
          )}

          {/* Conditionally show Cash Out field */}
          {isCashOutRecord && (
            <div className="space-y-2">
              <Label htmlFor="cashOut">Cash Out *</Label>
              <Input
                id="cashOut"
                type="number"
                step="0.01"
                min="0"
                value={cashOut}
                onChange={(e) => setCashOut(e.target.value)}
                placeholder="Enter cash out amount"
                required
                className="focus-visible:ring-1"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="totalBalance">Total Balance *</Label>
            <Input
              id="totalBalance"
              type="number"
              step="0.01"
              value={totalBalance}
              onChange={(e) => setTotalBalance(e.target.value)}
              placeholder="Enter total balance"
              required
              className="focus-visible:ring-1"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-[#155DFC] hover:bg-[#0351f8] cursor-pointer">
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCashModal;