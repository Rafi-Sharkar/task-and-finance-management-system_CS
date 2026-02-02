import React from "react";
import { FolderType } from "@/redux/features/admin/folders/folders.api";
import FolderCard from "../FolderCard/FolderCard";

interface FolderGridProps {
  folders: FolderType[];
  onFolderClick: (folder: FolderType) => void;
  onEdit: (folder: FolderType) => void;
  onDelete: (id: string) => void;
}

const FolderGrid: React.FC<FolderGridProps> = ({
  folders,
  onFolderClick,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-6 md:grid-cols-7 bs:grid-cols-8 lg:grid-cols-9 xl:grid-cols-10 2xl:grid-cols-12 gap-4">
      {folders.map((folder) => (
        <FolderCard
          key={folder.id}
          folder={folder}
          onOpen={() => onFolderClick(folder)}
          onEdit={() => onEdit(folder)}
          onDelete={() => onDelete(folder.id)}
        />
      ))}
    </div>
  );
};

export default FolderGrid;
