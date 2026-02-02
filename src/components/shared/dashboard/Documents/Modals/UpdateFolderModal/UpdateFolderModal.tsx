import React from "react";
import DynamicModal from "../../../DynamicModal/DynamicModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UpdateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  folderName: string;
  setFolderName: (name: string) => void;
  onUpdate: () => void;
  isLoading: boolean;
}

const UpdateFolderModal: React.FC<UpdateFolderModalProps> = ({
  isOpen,
  onClose,
  folderName,
  setFolderName,
  onUpdate,
  isLoading,
}) => {
  return (
    <DynamicModal isOpen={isOpen} onClose={onClose} title="Rename Folder">
      <Input
        placeholder="New Name"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        className="mb-4"
      />
      <Button
        className="w-full"
        onClick={onUpdate}
        disabled={isLoading || !folderName.trim()}
      >
        {isLoading ? "Updating..." : "Update Name"}
      </Button>
    </DynamicModal>
  );
};

export default UpdateFolderModal;
