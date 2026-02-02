/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import DocumentTable from "../DocumentTable/DocumentTable";
import CustomPagination from "../../CustomPagination/CustomPagination";
import TableSkeletonLoader from "@/components/shared/loader/TableSkeletonLoader/TableSkeletonLoader";

interface DocumentSectionProps {
  isLoading: boolean;
  documents: any[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  onShare?: (document: any) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
  onUploadClick: () => void;
  isFolderDisabled: boolean;
}

const DocumentSection: React.FC<DocumentSectionProps> = ({
  isLoading,
  documents,
  meta,
  onShare,
  onDelete,
  onView,
  onUploadClick,
  isFolderDisabled,
}) => {
  return (
    <div className="space-y-3 pt-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-700">Documents</h2>
      </div>

      {isLoading ? (
        <TableSkeletonLoader />
      ) : documents.length > 0 ? (
        <>
          <DocumentTable
            documents={documents}
            onShare={onShare}
            onDelete={onDelete}
            onView={onView}
          />
          {meta.totalPages > 1 && <CustomPagination meta={meta} />}
        </>
      ) : (
        <div className="rounded-xl border-2 border-dashed py-12 text-center">
          <FileText className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-2 text-gray-500">No documents found.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={onUploadClick}
            disabled={isFolderDisabled}
          >
            <Upload className="mr-2 h-4 w-4" /> Upload your first document
          </Button>
        </div>
      )}
    </div>
  );
};

export default DocumentSection;
