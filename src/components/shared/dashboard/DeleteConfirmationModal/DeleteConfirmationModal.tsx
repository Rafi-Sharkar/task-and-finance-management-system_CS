"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";
import React from "react";

interface DeleteModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onConfirm: () => void;
    isLoading?: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteModalProps> = ({
    isOpen,
    onOpenChange,
    onConfirm,
    isLoading = false
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="bg-white border-none sm:max-w-100">
                <div className="flex flex-col items-center justify-center text-center pt-4">
                    <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-full mb-4">
                        <AlertTriangle className="w-8 h-8 text-red-600" />
                    </div>

                    <DialogHeader className="space-y-2">
                        <DialogTitle className="text-xl font-bold text-center">Confirm Deletion</DialogTitle>
                        <DialogDescription className="text-center text-gray-500">
                            Are you sure you want to permanently delete this record? This action is irreversible and the data cannot be recovered.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <DialogFooter className="mt-4 gap-2 sm:gap-0">
                    <Button
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => onOpenChange(false)}
                        disabled={isLoading}
                    >
                        No, Keep it
                    </Button>
                    <Button
                        variant="destructive"
                        className="w-full sm:w-auto ml-0 sm:ml-3 cursor-pointer"
                        onClick={() => {
                            onConfirm();
                        }}
                        disabled={isLoading}
                    >
                        {isLoading ? "Deleting..." : "Yes, Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteConfirmationModal;