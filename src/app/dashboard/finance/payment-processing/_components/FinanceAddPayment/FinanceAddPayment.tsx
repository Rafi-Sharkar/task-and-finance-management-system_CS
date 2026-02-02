"use client";
import DynamicModal from "@/components/shared/dashboard/DynamicModal/DynamicModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import FinanceAddPaymentForm from "./_components/FinanceAddPaymentForm/FinanceAddPaymentForm";

const FinanceAddPayment = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* Trigger Button */}
      <Button onClick={handleOpen} className="bg-[#155DFC] hover:bg-[#0351f8] cursor-pointer">
        <Plus size={20} strokeWidth={1.5} />
        Add Payment
      </Button>

      {/* Modal */}
      <DynamicModal isOpen={isOpen} onClose={handleClose} title="Add Payment">
        <FinanceAddPaymentForm onClose={handleClose} />
      </DynamicModal>
    </>
  );
};

export default FinanceAddPayment;
