import React from "react";
import { ChevronLeft, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentManagementHeaderProps {
  title: string;
  description: string;
  onBack: () => void;
  onUploadClick: () => void;
  onCreateFolderClick: () => void;
  isFolderDisabled: boolean;
}

const DocumentManagementHeader: React.FC<DocumentManagementHeaderProps> = ({
  title,
  description,
  onBack,
  onUploadClick,
  onCreateFolderClick,
  isFolderDisabled,
}) => {
  return (
    <div className="flex flex-wrap items-start justify-between gap-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="size-10 border border-[#D5D7DA] hover:bg-gray-100 cursor-pointer"
          onClick={onBack}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={onUploadClick}
          disabled={isFolderDisabled}
        >
          <Upload className="h-4 w-4" />
          Upload File
        </Button>
        <Button onClick={onCreateFolderClick} className="cursor-pointer">
          <Plus className="h-4 w-4" />
          Create Subfolder
        </Button>
      </div>
    </div>
  );
};

export default DocumentManagementHeader;
