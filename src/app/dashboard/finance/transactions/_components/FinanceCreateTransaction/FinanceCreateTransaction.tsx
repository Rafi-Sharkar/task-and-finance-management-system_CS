"use client";
import DynamicModal from "@/components/shared/dashboard/DynamicModal/DynamicModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import FinanceCreateTransactionForm from "./_componenets/FinanceCreateTransactionFrom/FinanceCreateTransactionFrom";

const FinanceCreateTransaction = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* Trigger Button */}
      <Button onClick={handleOpen} className="bg-[#155DFC] hover:bg-[#0351f8] cursor-pointer">
        <Plus size={20} strokeWidth={1.5} />
        Create Transaction
      </Button>

      {/* Modal */}
      <DynamicModal
        isOpen={isOpen}
        onClose={handleClose}
        title="Create Transactions"
      >
        <FinanceCreateTransactionForm onClose={handleClose} />
      </DynamicModal>
    </>
  );
};

export default FinanceCreateTransaction;
