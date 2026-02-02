/* eslint-disable @typescript-eslint/no-explicit-any */
// // "use client";
// // import DocumentTable from "@/components/shared/dashboard/Documents/DocumentTable/DocumentTable";
// // import FolderGrid from "@/components/shared/dashboard/Documents/FolderGrid/FolderGrid";
// // import DynamicModal from "@/components/shared/dashboard/DynamicModal/DynamicModal";
// // import {  FileText, Folder, Plus, Upload } from "lucide-react";
// // import React, { ChangeEvent, useState } from "react";
// // import SearchAndFilters from "./_componenets/SearchAndFilters/SearchAndFilters";
// // import { DocumentsData, FoldersData } from "./data/myDocuments.data";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Select } from "@/components/ui/select";
// // import Breadcrumb from "@/components/ui/breadcrumb";

// // // ============ TYPE DEFINITIONS ============
// // interface FolderType {
// //   id: number;
// //   name: string;
// //   slug: string;
// //   parentId: number | null;
// //   createdAt: string;
// // }

// // interface DocumentType {
// //   id: number;
// //   folderId: number;
// //   name: string;
// //   type: string;
// //   size: string;
// //   status: "Signed" | "Viewed" | "Pending" | null;
// //   date: string;
// // }

// // interface ShareData {
// //   client: string;
// //   priority: string;
// //   action: string;
// // }

// // const AdminDocumentManagementPage: React.FC = () => {
// //   const [currentFolderId, setCurrentFolderId] = useState<number | null>(null);
// //   const [showCreateModal, setShowCreateModal] = useState(false);
// //   const [showUploadModal, setShowUploadModal] = useState(false);
// //   const [showShareModal, setShowShareModal] = useState(false);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [selectedFile, setSelectedFile] = useState<DocumentType | null>(null);

// //   const [folders, setFolders] = useState<FolderType[]>(FoldersData);

// //   const [documents, setDocuments] = useState<DocumentType[]>(DocumentsData);

// //   const [newFolderName, setNewFolderName] = useState("");
// //   const [uploadFile, setUploadFile] = useState<File | null>(null);
// //   const [shareData, setShareData] = useState<ShareData>({
// //     client: "",
// //     priority: "Urgent",
// //     action: "Need Sign",
// //   });

// //   const itemsPerPage = 5;

// //   // Get current folder path for breadcrumb
// //   const getCurrentPath = (): FolderType[] => {
// //     const path: FolderType[] = [];
// //     let currentId = currentFolderId;

// //     while (currentId !== null) {
// //       const folder = folders.find((f) => f.id === currentId);
// //       if (folder) {
// //         path.unshift(folder);
// //         currentId = folder.parentId;
// //       } else {
// //         break;
// //       }
// //     }

// //     return path;
// //   };

// //   // Get folders in current location
// //   const getCurrentFolders = (): FolderType[] => {
// //     return folders.filter((f) => f.parentId === currentFolderId);
// //   };

// //   // Get documents in current folder
// //   const getCurrentDocuments = (): DocumentType[] => {
// //     if (currentFolderId === null) return [];
// //     const filtered = documents.filter((d) => d.folderId === currentFolderId);
// //     const start = (currentPage - 1) * itemsPerPage;
// //     return filtered.slice(start, start + itemsPerPage);
// //   };

// //   const handleCreateFolder = () => {
// //     if (newFolderName.trim()) {
// //       const newFolder: FolderType = {
// //         id: folders.length + 1,
// //         name: newFolderName,
// //         slug: newFolderName.toLowerCase().replace(/\s+/g, "-"),
// //         parentId: currentFolderId,
// //         createdAt: new Date().toISOString().split("T")[0],
// //       };
// //       setFolders([...folders, newFolder]);
// //       setNewFolderName("");
// //       setShowCreateModal(false);
// //     }
// //   };

// //   const handleUploadFile = () => {
// //     if (uploadFile && currentFolderId !== null) {
// //       const reader = new FileReader();
// //       reader.onload = () => {
// //         const newDoc: DocumentType = {
// //           id: documents.length + 1,
// //           folderId: currentFolderId,
// //           name: uploadFile.name,
// //           type: uploadFile.type.split("/")[1]?.toUpperCase() || "FILE",
// //           size: `${(uploadFile.size / 1024 / 1024).toFixed(1)} MB`,
// //           status: null,
// //           date: new Date().toLocaleDateString("en-US", {
// //             month: "short",
// //             day: "numeric",
// //             year: "numeric",
// //           }),
// //         };
// //         setDocuments([...documents, newDoc]);
// //         setUploadFile(null);
// //         setShowUploadModal(false);
// //       };
// //       reader.readAsDataURL(uploadFile);
// //     }
// //   };

// //   const handleShare = () => {
// //     console.log("Sharing file:", selectedFile, shareData);
// //     setShowShareModal(false);
// //     setShareData({ client: "", priority: "Urgent", action: "Need Sign" });
// //   };

// //   const handleFolderClick = (folder: FolderType) => {
// //     setCurrentFolderId(folder.id);
// //     setCurrentPage(1);
// //   };

// //   const handleNavigate = (folderId: number | null) => {
// //     setCurrentFolderId(folderId);
// //     setCurrentPage(1);
// //   };

// //   const handleDeleteDoc = (docId: number) => {
// //     setDocuments(documents.filter((d) => d.id !== docId));
// //   };

// //   const currentFolders = getCurrentFolders();
// //   const currentDocs = getCurrentDocuments();
// //   const currentPath = getCurrentPath();
// //   const isInFolder = currentFolderId !== null;

// //   return (
// //     <div className="space-y-5">
// //       <Breadcrumb path={currentPath} onNavigate={handleNavigate} />

// //       {/* Header */}
// //       <div className="mb-6 flex items-start justify-between">
// //         <div>
// //           <h1 className="text-2xl font-bold text-gray-900">
// //             {isInFolder ? "Documents" : "My Documents"}
// //           </h1>
// //           <p className="mt-1 text-sm text-gray-500">
// //             {isInFolder
// //               ? `Browse files and folders in ${currentPath[currentPath.length - 1]?.name || ""}`
// //               : "Manage and review uploaded documents"}
// //           </p>
// //         </div>
// //         <div className="flex gap-2">
// //           {isInFolder && (
// //             <Button onClick={() => setShowUploadModal(true)}>
// //               <Plus className="mr-2 h-4 w-4" />
// //               Upload File
// //             </Button>
// //           )}
// //           <Button onClick={() => setShowCreateModal(true)}>
// //             <Plus className="mr-2 h-4 w-4" />
// //             Create Folder
// //           </Button>
// //         </div>
// //       </div>

// //       {/* Search and Filters */}
// //       <SearchAndFilters />

// //       {/* Document Table */}
// //       {isInFolder && currentDocs.length > 0 && (
// //         <>
// //           <h2 className="mb-4 text-lg font-semibold text-gray-900">
// //             Documents
// //           </h2>
// //           <DocumentTable
// //             documents={currentDocs}
// //             onShare={(doc) => {
// //               setSelectedFile(doc);
// //               setShowShareModal(true);
// //             }}
// //             onDelete={handleDeleteDoc}
// //           />
// //         </>
// //       )}

// //       {/* Folder Grid */}
// //       {currentFolders.length > 0 && (
// //         <FolderGrid
// //           folders={currentFolders}
// //           onFolderClick={handleFolderClick}
// //         />
// //       )}

// //       {/* Empty State */}
// //       {!isInFolder && currentFolders.length === 0 && (
// //         <div className="py-12 text-center">
// //           <Folder className="mx-auto mb-4 h-16 w-16 text-gray-400" />
// //           <h3 className="mb-2 text-lg font-medium text-gray-900">
// //             No folders yet
// //           </h3>
// //           <p className="mb-4 text-gray-500">
// //             Create your first folder to get started
// //           </p>
// //           <Button onClick={() => setShowCreateModal(true)}>
// //             <Plus className="mr-2 h-4 w-4" />
// //             Create Folder
// //           </Button>
// //         </div>
// //       )}

// //       {isInFolder &&
// //         currentDocs.length === 0 &&
// //         currentFolders.length === 0 && (
// //           <div className="py-12 text-center">
// //             <FileText className="mx-auto mb-4 h-16 w-16 text-gray-400" />
// //             <h3 className="mb-2 text-lg font-medium text-gray-900">
// //               No files yet
// //             </h3>
// //             <p className="mb-4 text-gray-500">
// //               Upload your first file or create a subfolder
// //             </p>
// //             <div className="flex justify-center gap-2">
// //               <Button onClick={() => setShowUploadModal(true)}>
// //                 <Upload className="mr-2 h-4 w-4" />
// //                 Upload File
// //               </Button>
// //               <Button
// //                 variant="outline"
// //                 onClick={() => setShowCreateModal(true)}
// //               >
// //                 <Plus className="mr-2 h-4 w-4" />
// //                 Create Folder
// //               </Button>
// //             </div>
// //           </div>
// //         )}

// //       {/* Create Folder Modal */}
// //       <DynamicModal
// //         isOpen={showCreateModal}
// //         onClose={() => setShowCreateModal(false)}
// //         title="Create Folder"
// //       >
// //         <div>
// //           <Input
// //             placeholder="Enter Folder Name"
// //             value={newFolderName}
// //             onChange={(e: ChangeEvent<HTMLInputElement>) =>
// //               setNewFolderName(e.target.value)
// //             }
// //             className="mb-4"
// //           />
// //           <div className="flex justify-end gap-2">
// //             <Button
// //               variant="outline"
// //               onClick={() => {
// //                 setShowCreateModal(false);
// //                 setNewFolderName("");
// //               }}
// //             >
// //               Cancel
// //             </Button>
// //             <Button
// //               onClick={handleCreateFolder}
// //               disabled={!newFolderName.trim()}
// //             >
// //               Create
// //             </Button>
// //           </div>
// //         </div>
// //       </DynamicModal>

// //       {/* Upload File Modal */}
// //       <DynamicModal
// //         isOpen={showUploadModal}
// //         onClose={() => setShowUploadModal(false)}
// //         title="Upload File"
// //       >
// //         <div>
// //           <div className="mb-4 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
// //             <Upload className="mx-auto mb-2 h-12 w-12 text-gray-400" />
// //             <p className="text-sm text-gray-600">
// //               Drag and drop or{" "}
// //               <label className="cursor-pointer text-blue-600 hover:underline">
// //                 browse
// //                 <input
// //                   type="file"
// //                   onChange={(e: ChangeEvent<HTMLInputElement>) =>
// //                     setUploadFile(e.target.files?.[0] || null)
// //                   }
// //                   className="hidden"
// //                 />
// //               </label>
// //             </p>
// //             {uploadFile && (
// //               <p className="mt-2 text-xs text-gray-500">{uploadFile.name}</p>
// //             )}
// //           </div>
// //           <div className="flex justify-end gap-2">
// //             <Button
// //               variant="outline"
// //               onClick={() => {
// //                 setShowUploadModal(false);
// //                 setUploadFile(null);
// //               }}
// //             >
// //               Cancel
// //             </Button>
// //             <Button onClick={handleUploadFile} disabled={!uploadFile}>
// //               Upload
// //             </Button>
// //           </div>
// //         </div>
// //       </DynamicModal>

// //       {/* Share File Modal */}
// //       <DynamicModal
// //         isOpen={showShareModal}
// //         onClose={() => setShowShareModal(false)}
// //         title="Share File"
// //       >
// //         <div>
// //           <div className="space-y-4">
// //             <div>
// //               <label className="mb-2 block text-sm font-medium">
// //                 Select Client <span className="text-red-500">*</span>
// //               </label>
// //               <Select
// //                 value={shareData.client}
// //                 onValueChange={(val: string) =>
// //                   setShareData({ ...shareData, client: val })
// //                 }
// //               >
// //                 <option value="">Select</option>
// //                 <option value="client1">Client 1</option>
// //                 <option value="client2">Client 2</option>
// //               </Select>
// //             </div>
// //             {/* <div>
// //               <label className="mb-2 block text-sm font-medium">
// //                 Select Priority <span className="text-red-500">*</span>
// //               </label>
// //               <Select
// //                 value={shareData.priority}
// //                 onValueChange={(val: string) =>
// //                   setShareData({ ...shareData, priority: val })
// //                 }
// //               >
// //                 <option value="Urgent">🔴 Urgent</option>
// //                 <option value="High">High</option>
// //                 <option value="Medium">Medium</option>
// //                 <option value="Low">Low</option>
// //               </Select>
// //             </div> */}
// //             <div>
// //               <label className="mb-2 block text-sm font-medium">
// //                 Action required
// //               </label>
// //               <Select
// //                 value={shareData.action}
// //                 onValueChange={(val: string) =>
// //                   setShareData({ ...shareData, action: val })
// //                 }
// //               >
// //                 <option value="Need Sign">Need Sign</option>
// //                 <option value="View Only">View Only</option>
// //               </Select>
// //             </div>
// //           </div>
// //           <div className="mt-4 flex justify-end gap-2">
// //             <Button
// //               variant="outline"
// //               onClick={() => {
// //                 setShowShareModal(false);
// //                 setShareData({
// //                   client: "",
// //                   priority: "Urgent",
// //                   action: "Need Sign",
// //                 });
// //               }}
// //             >
// //               Cancel
// //             </Button>
// //             <Button onClick={handleShare}>Send</Button>
// //           </div>
// //         </div>
// //       </DynamicModal>
// //     </div>
// //   );
// // };

// // export default AdminDocumentManagementPage;

// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Plus, Folder } from "lucide-react";
// import FolderGrid from "@/components/shared/dashboard/Documents/FolderGrid/FolderGrid";
// import DynamicModal from "@/components/shared/dashboard/DynamicModal/DynamicModal";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { FoldersData } from "./data/myDocuments.data";

// const AdminDocumentManagementPage = () => {
//   const router = useRouter();
//   const [folders, setFolders] = useState(
//     FoldersData.filter((f) => f.parentId === null),
//   );
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [newFolderName, setNewFolderName] = useState("");

//   const handleCreateFolder = () => {
//     const newFolder = {
//       id: Date.now(),
//       name: newFolderName,
//       slug: newFolderName.toLowerCase().replace(/\s+/g, "-"),
//       parentId: null,
//     };
//     setFolders([...folders, newFolder]);
//     setShowCreateModal(false);
//   };

//   return (
//     <div className="space-y-6 p-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">My Documents</h1>
//         <Button onClick={() => setShowCreateModal(true)}>
//           <Plus className="mr-2 h-4 w-4" /> Create Folder
//         </Button>
//       </div>

//       {folders.length > 0 ? (
//         <FolderGrid
//           folders={folders}
//           onFolderClick={(folder) =>
//             router.push(`/dashboard/admin/my-documents/${folder.slug}`)
//           }
//         />
//       ) : (
//         <div className="py-20 text-center">
//           <Folder className="mx-auto h-16 w-16 text-gray-300" />
//           <p>No folders found. Start by creating one.</p>
//         </div>
//       )}

//       <DynamicModal
//         isOpen={showCreateModal}
//         onClose={() => setShowCreateModal(false)}
//         title="Create Root Folder"
//       >
//         <Input
//           value={newFolderName}
//           onChange={(e) => setNewFolderName(e.target.value)}
//           placeholder="Folder name..."
//           className="mb-4"
//         />
//         <Button onClick={handleCreateFolder} className="w-full">
//           Create
//         </Button>
//       </DynamicModal>
//     </div>
//   );
// };


"use client";
import  { useState } from "react";
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

const AdminDocumentManagementPage = () => {
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
        onNavigate={() => router.push("/dashboard/admin/my-documents")}
      /> */}

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
          <p className="text-sm text-gray-500">Manage organizational folders</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
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
            router.push(`/dashboard/admin/my-documents/${folder.id}`)
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
          <Button onClick={handleCreateFolder} disabled={isCreating}>
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

export default AdminDocumentManagementPage;
