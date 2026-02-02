/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useDeleteAction } from "@/hooks/useDeleteAction";
import {
  useGetChildFoldersQuery,
  useCreateFolderMutation,
  useDeleteFolderMutation,
  useUpdateFolderNameMutation,
  FolderType,
} from "@/redux/features/admin/folders/folders.api";
import {
  useCreateDocumentMutation,
  useDeleteDocumentMutation,
  useGetDocumentByIdQuery,
  useGetDocumentsByFolderQuery,
  useShareDocumentToClientMutation,
} from "@/redux/features/admin/documents/documents.api";
import { useGetAllUsersQuery } from "@/redux/features/admin/user/user.api";
import DocumentManagementHeader from "@/components/shared/dashboard/Documents/DocumentManagement/DocumentManagementHeader";
import FolderSection from "@/components/shared/dashboard/Documents/DocumentManagement/FolderSection";
import DocumentSection from "@/components/shared/dashboard/Documents/DocumentManagement/DocumentSection";
import UpdateFolderModal from "@/components/shared/dashboard/Documents/Modals/UpdateFolderModal/UpdateFolderModal";
import UploadDocumentModal from "@/components/shared/dashboard/Documents/Modals/UploadDocumentModal/UploadDocumentModal";
import ShareDocumentModal from "@/components/shared/dashboard/Documents/Modals/ShareDocumentModal/ShareDocumentModal";
import DeleteConfirmationModal from "@/components/shared/dashboard/DeleteConfirmationModal/DeleteConfirmationModal";
import ViewDocumentModal from "@/components/shared/dashboard/Documents/Modals/ViewDocumentModal/ViewDocumentModal";
import CreateFolderModal from "@/components/shared/dashboard/Documents/Modals/CreateFolderModal/CreateFolderModal";

const DynamicDocumentManagementPage = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const slug = params?.slug as string[];
  const folderId = React.useMemo(() => slug?.[slug.length - 1] || "", [slug]);

  const [viewDocId, setViewDocId] = useState<string>("");
  const [showViewModal, setShowViewModal] = useState(false);

  const { data: clientsResponse } = useGetAllUsersQuery({
    role: "CLIENT",
    limit: 20,
  });
  const { data: response, isLoading: isFolderLoading } =
    useGetChildFoldersQuery(folderId, { skip: !folderId });
  const {
    data: docsResponse,
    isLoading: isDocsLoading,
    refetch: refetchDocuments,
  } = useGetDocumentsByFolderQuery(
    { folderId, page, limit },
    { skip: !folderId, refetchOnMountOrArgChange: true },
  );

  const [createFolder, { isLoading: isCreating }] = useCreateFolderMutation();
  const [updateFolder, { isLoading: isUpdating }] =
    useUpdateFolderNameMutation();
  const [deleteFolder, { isLoading: isDeletingFolder }] =
    useDeleteFolderMutation();
  const [createDocument, { isLoading: isCreatingDocument }] =
    useCreateDocumentMutation();
  const [deleteDocument, { isLoading: isDeletingDocument }] =
    useDeleteDocumentMutation();
  const [shareDocumentToClient, { isLoading: isSharing }] =
    useShareDocumentToClientMutation();
  const { data: documentDetail, isLoading: isViewLoading } =
    useGetDocumentByIdQuery(viewDocId, {
      skip: !viewDocId,
    });

  const {
    deletedItemId,
    setDeletedItemId,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    triggerDelete,
  } = useDeleteAction();

  const [deleteType, setDeleteType] = useState<"FOLDER" | "DOCUMENT" | null>(
    null,
  );
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState("");
  const [selectedDocument, ] = useState<any>(null);
  const [shareData, setShareData] = useState({
    clientId: "",
    shareType: "VIEW",
  });
  const [selectedFolder, setSelectedFolder] = useState<FolderType | null>(null);

  const currentFolder = response?.data?.folder || null;
  const childFolders = response?.data?.childFolders || [];
  const documents = docsResponse?.data?.data || [];
  const meta = {
    total: docsResponse?.data?.total || 0,
    page: docsResponse?.data?.page || 1,
    limit: docsResponse?.data?.limit || 10,
    totalPages: docsResponse?.data?.totalPages || 1,
  };

  const filteredClients = clientsResponse?.data?.data?.filter(
    (u: any) => u.role === "CLIENT",
  );

  useEffect(() => {
    if (folderId) refetchDocuments();
  }, [refetchDocuments, folderId]);

  const handleViewDocument = (id: string) => {
    setViewDocId(id);
    setShowViewModal(true);
  };

  const handleBackNavigation = () => {
    if (!slug || slug.length <= 1) {
      router.push("/dashboard/employee/my-documents");
    } else {
      const parentSlug = slug.slice(0, -1).join("/");
      router.push(`/dashboard/employee/my-documents/${parentSlug}`);
    }
  };

  const handleFolderClick = (folder: FolderType) => {
    const currentPath = slug ? slug.join("/") : "";
    router.push(`/dashboard/employee/my-documents/${currentPath}/${folder.id}`);
  };

  const handleCreateSubFolder = async () => {
    if (!newFolderName.trim()) return;
    try {
      const res = await createFolder({
        name: newFolderName,
        parentId: folderId,
      }).unwrap();
      if (res.success) {
        toast.success(res.message);
        setShowCreateModal(false);
        setNewFolderName("");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create folder");
    }
  };

  const handleUpdateFolder = async () => {
    if (!selectedFolder || !newFolderName.trim()) return;
    try {
      const res = await updateFolder({
        id: selectedFolder.id,
        data: { name: newFolderName },
      }).unwrap();
      if (res.success) {
        toast.success(res.message);
        setShowUpdateModal(false);
        setNewFolderName("");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to rename folder");
    }
  };

  const handleGlobalDelete = async () => {
    if (!deletedItemId || !deleteType) return;
    try {
      const res =
        deleteType === "FOLDER"
          ? await deleteFolder(deletedItemId).unwrap()
          : await deleteDocument(deletedItemId).unwrap();

      if (res.success) {
        toast.success(res.message || "Deleted successfully");
        if (deleteType === "DOCUMENT") refetchDocuments();
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Deletion failed");
    } finally {
      setIsDeleteModalOpen(false);
      setDeletedItemId(null);
      setDeleteType(null);
    }
  };

  const handleUploadFile = async () => {
    if (!uploadFile || !documentName.trim() || !folderId) {
      toast.error("Please provide document name and select a file");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", documentName);
      formData.append("folderId", folderId);
      formData.append("files", uploadFile);
      const res = await createDocument(formData).unwrap();
      if (res.success) {
        toast.success(res.message);
        setShowUploadModal(false);
        setUploadFile(null);
        setDocumentName("");
        refetchDocuments();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to upload.");
    }
  };

  const handleShare = async () => {
    if (!selectedDocument || !shareData.clientId) {
      toast.error("Please select a client");
      return;
    }
    try {
      const res = await shareDocumentToClient({
        documentId: selectedDocument.id,
        clientId: shareData.clientId,
        shareType: shareData.shareType,
      }).unwrap();
      if (res.success) {
        toast.success(res.message);
        setShowShareModal(false);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to share.");
    }
  };

  return (
    <div className="space-y-5 p-6">
      <DocumentManagementHeader
        title={currentFolder?.name || "Documents"}
        description="Manage files and subfolders"
        onBack={handleBackNavigation}
        onUploadClick={() => setShowUploadModal(true)}
        onCreateFolderClick={() => setShowCreateModal(true)}
        isFolderDisabled={!folderId}
      />

      <FolderSection
        isLoading={isFolderLoading}
        folders={childFolders}
        onFolderClick={handleFolderClick}
        onEdit={(folder) => {
          setSelectedFolder(folder);
          setNewFolderName(folder.name);
          setShowUpdateModal(true);
        }}
        onDelete={(id) => {
          setDeleteType("FOLDER");
          triggerDelete(id);
        }}
      />

      <DocumentSection
        isLoading={isDocsLoading}
        documents={documents}
        meta={meta}
        // onShare={(doc) => {
        //   setSelectedDocument(doc);
        //   setShareData({ clientId: "", shareType: "VIEW" });
        //   setShowShareModal(true);
        // }}
        onDelete={(id) => {
          setDeleteType("DOCUMENT");
          triggerDelete(id);
        }}
        onView={(id) => handleViewDocument(id)}
        onUploadClick={() => setShowUploadModal(true)}
        isFolderDisabled={!folderId}
      />

      <CreateFolderModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        folderName={newFolderName}
        setFolderName={setNewFolderName}
        onCreate={handleCreateSubFolder}
        isLoading={isCreating}
      />

      <UpdateFolderModal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        folderName={newFolderName}
        setFolderName={setNewFolderName}
        onUpdate={handleUpdateFolder}
        isLoading={isUpdating}
      />

      <UploadDocumentModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        documentName={documentName}
        setDocumentName={setDocumentName}
        uploadFile={uploadFile}
        setUploadFile={setUploadFile}
        onUpload={handleUploadFile}
        isLoading={isCreatingDocument}
      />

      <ShareDocumentModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        documentName={selectedDocument?.name || ""}
        clients={filteredClients || []}
        shareData={shareData}
        setShareData={setShareData}
        onShare={handleShare}
        isLoading={isSharing}
      />

      <ViewDocumentModal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setViewDocId("");
        }}
        data={documentDetail?.data}
        isLoading={isViewLoading}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onOpenChange={(open) => {
          setIsDeleteModalOpen(open);
          if (!open) setDeleteType(null);
        }}
        onConfirm={handleGlobalDelete}
        isLoading={isDeletingFolder || isDeletingDocument}
      />
    </div>
  );
};

export default DynamicDocumentManagementPage;
