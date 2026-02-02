"use client";
import DynamicModal from "@/components/shared/dashboard/DynamicModal/DynamicModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateExpensesInvoicesForm from "./_components/CreateExpensesInvoicesForm/CreateExpensesInvoicesForm";

const CreateExpensesInvoices = () => {

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);


  return (
    <>
      {/* Trigger Button */}
      <Button onClick={handleOpen} className="bg-[#155DFC] hover:bg-[#0351f8]">
        <Plus size={20} strokeWidth={1.5} />
        Create Invoices
      </Button>

      {/* Modal */}
      <DynamicModal
        isOpen={isOpen}
        onClose={handleClose}
        title="Create Invoice"
      >
        <CreateExpensesInvoicesForm handleClose={handleClose} />
      </DynamicModal>
    </>
  );
};

export default CreateExpensesInvoices;
