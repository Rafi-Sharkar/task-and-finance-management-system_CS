"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useUpdateTransactionMutation } from "@/redux/features/finance/transaction/transaction.api";
import { toast } from "sonner"; // or your toast library
import { catchAsyncMutation } from "@/utils/apiReqRes.utils";

interface EditTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    transaction: {
        id: string;
        amount: number;
    };
}

const EditTransactionModal = ({ isOpen, onClose, transaction }: EditTransactionModalProps) => {
    const [amount, setAmount] = useState(transaction.amount.toString());
    const [updateTransaction, { isLoading }] = useUpdateTransactionMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const parsedAmount = parseFloat(amount);

        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        await catchAsyncMutation(
            updateTransaction({
                id: transaction.id,
                amount: parsedAmount,
            }).unwrap(),
            (res) => {
                // onSuccess
                toast.success(res.message || "Transaction updated successfully");
                onClose();
            },
        );
    };


    const handleClose = () => {
        setAmount(transaction.amount.toString());
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Transaction</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="transaction-id">Transaction ID</Label>
                        <Input
                            id="transaction-id"
                            value={transaction.id}
                            disabled
                            className="bg-gray-50"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount *</Label>
                        <Input
                            id="amount"
                            type="number"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
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

export default EditTransactionModal;