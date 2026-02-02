import React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DynamicModal from "../../../DynamicModal/DynamicModal";

interface CreateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  folderName: string;
  setFolderName: (name: string) => void;
  onCreate: () => void;
  isLoading: boolean;
}

const CreateFolderModal: React.FC<CreateFolderModalProps> = ({
  isOpen,
  onClose,
  folderName,
  setFolderName,
  onCreate,
  isLoading,
}) => {
  return (
    <DynamicModal isOpen={isOpen} onClose={onClose} title="Create Subfolder">
      <Input
        placeholder="Subfolder Name"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        className="mb-4"
      />
      <Button
        className="w-full"
        onClick={onCreate}
        disabled={isLoading || !folderName.trim()}
      >
        {isLoading ? <Loader2 className="animate-spin" /> : "Create"}
      </Button>
    </DynamicModal>
  );
};

export default CreateFolderModal;
