import { useState } from "react";

export const useDeleteAction = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletedItemId, setDeletedItemId] = useState<string | null>(null);

  // Open delete modal and set selectedId
  const triggerDelete = (id: string) => {
    setDeletedItemId(id);
    setIsDeleteModalOpen(true);
  };

  return {
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    triggerDelete,
    deletedItemId,
    setDeletedItemId,
  };
};
