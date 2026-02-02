"use client";
import DynamicModal from "@/components/shared/dashboard/DynamicModal/DynamicModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddUserForm from "../AddUserForm/AddUserForm";

const AddUser = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* Trigger Button */}
      <Button onClick={handleOpen} className="bg-[#155DFC] hover:bg-[#0351f8]">
        <Plus size={20} strokeWidth={1.5} />
        Add User
      </Button>

      {/* Modal */}
      <DynamicModal isOpen={isOpen} onClose={handleClose} title="Add User">
        <AddUserForm onClose={handleClose} />
      </DynamicModal>
    </>
  );
};

export default AddUser;
