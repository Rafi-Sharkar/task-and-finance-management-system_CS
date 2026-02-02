import React from "react";
import { FolderType } from "@/redux/features/admin/folders/folders.api";
import FolderGrid from "../FolderGrid/FolderGrid";
import FolderLoadingCard from "../../FolderLoadingCard/FolderLoadingCard";

interface FolderSectionProps {
  isLoading: boolean;
  folders: FolderType[];
  onFolderClick: (folder: FolderType) => void;
  onEdit: (folder: FolderType) => void;
  onDelete: (id: string) => void;
}

const FolderSection: React.FC<FolderSectionProps> = ({
  isLoading,
  folders,
  onFolderClick,
  onEdit,
  onDelete,
}) => {
  if (isLoading) {
    return <FolderLoadingCard />;
  }

  return (
    <div className="space-y-3">
      <h2 className="font-semibold text-gray-700">Folders</h2>
      {folders.length > 0 ? (
        <FolderGrid
          folders={folders}
          onFolderClick={onFolderClick}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ) : (
        <p className="text-sm text-gray-400 italic">No subfolders here.</p>
      )}
    </div>
  );
};

export default FolderSection;
