/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Folder } from "lucide-react";
import FolderGrid from "@/components/shared/dashboard/Documents/FolderGrid/FolderGrid";
import DynamicModal from "@/components/shared/dashboard/DynamicModal/DynamicModal";
import DeleteConfirmationModal from "@/components/shared/dashboard/DeleteConfirmationModal/DeleteConfirmationModal"; // Adjust path
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useCreateFolderMutation,
  useGetAllFoldersQuery,
  useUpdateFolderNameMutation,
  useDeleteFolderMutation,
  FolderType,
} from "@/redux/features/admin/folders/folders.api";
import { toast } from "sonner";
import { useDeleteAction } from "@/hooks/useDeleteAction";
import FolderLoadingCard from "@/components/shared/dashboard/FolderLoadingCard/FolderLoadingCard";

const ManagerDocumentManagementPage = () => {
  const router = useRouter();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<FolderType | null>(null);

  const { data: folderResponse, isLoading } = useGetAllFoldersQuery();
  const [createFolder, { isLoading: isCreating }] = useCreateFolderMutation();
  const [updateFolder, { isLoading: isUpdating }] =
    useUpdateFolderNameMutation();
  const [deleteFolder, { isLoading: isDeleting }] = useDeleteFolderMutation();

  const {
    deletedItemId,
    setDeletedItemId,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    triggerDelete,
  } = useDeleteAction();

  const allFolders = folderResponse?.data || [];
  const rootFolders = allFolders.filter((f) => !f.parentId);

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) {
      toast.error("Folder name is required");
      return;
    }
    try {
      const res = await createFolder({
        name: newFolderName,
        parentId: null,
      }).unwrap();

      if (!res.success) {
        setNewFolderName("");
        setShowCreateModal(false);
        toast.error(res.message);
        return;
      }

      toast.success(res.message);
      setNewFolderName("");
      setShowCreateModal(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create folder");
    }
  };

  const handleEditClick = (folder: FolderType) => {
    setSelectedFolder(folder);
    setNewFolderName(folder.name);
    setShowUpdateModal(true);
  };

  const handleUpdateFolder = async () => {
    if (!selectedFolder || !newFolderName.trim()) return;
    try {
      const res = await updateFolder({
        id: selectedFolder.id as string,
        data: { name: newFolderName },
      }).unwrap();

      if (!res.success) {
        setNewFolderName("");
        setShowUpdateModal(false);
        toast.error(res.message);
        return;
      }

      toast.success(res.message);
      setShowUpdateModal(false);
      setNewFolderName("");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to rename folder");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletedItemId) return;

    try {
      const res = await deleteFolder(deletedItemId).unwrap();

      if (!res.success) {
        setIsDeleteModalOpen(false);
        setDeletedItemId(null);
        toast.error(res.message);
        return;
      }

      toast.success(res?.message || "Folder deleted successfully!");
      setIsDeleteModalOpen(false);
      setDeletedItemId(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete folder");
    }
  };

  return (
    <div className="space-y-5 p-2 md:p-6">
      {/* <Breadcrumb
        path={[]}
        onNavigate={() => router.push("/dashboard/manager/my-documents")}
      /> */}

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
          <p className="text-sm text-gray-500">Manage organizational folders</p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="cursor-pointer"
        >
          <Plus className="mr-2 h-4 w-4" /> Create Folder
        </Button>
      </div>

      {isLoading ? (
        <div className="p-6">
          <FolderLoadingCard />
        </div>
      ) : rootFolders.length > 0 ? (
        <FolderGrid
          folders={rootFolders}
          onFolderClick={(folder) =>
            router.push(`/dashboard/manager/my-documents/${folder.id}`)
          }
          onEdit={handleEditClick}
          onDelete={(id) => triggerDelete(id as string)}
        />
      ) : (
        <div className="rounded-xl border-2 border-dashed py-20 text-center">
          <Folder className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-2 text-gray-500">No folders found.</p>
        </div>
      )}

      <DynamicModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Root Folder"
      >
        <Input
          placeholder="Folder Name"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          className="mb-4"
        />
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => setShowCreateModal(false)}
            disabled={isCreating}
          >
            Cancel
          </Button>
          <Button onClick={handleCreateFolder} disabled={isCreating} className="cursor-pointer">
            {isCreating ? "Creating..." : "Create"}
          </Button>
        </div>
      </DynamicModal>

      <DynamicModal
        isOpen={showUpdateModal}
        onClose={() => {
          setShowUpdateModal(false);
          setNewFolderName("");
        }}
        title="Rename Folder"
      >
        <Input
          placeholder="New Folder Name"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          className="mb-4"
        />
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => setShowUpdateModal(false)}
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button onClick={handleUpdateFolder} disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Name"}
          </Button>
        </div>
      </DynamicModal>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default ManagerDocumentManagementPage;
