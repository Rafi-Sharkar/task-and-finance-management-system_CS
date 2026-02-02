import React, { ChangeEvent } from "react";
import { Upload, Loader2 } from "lucide-react";
import DynamicModal from "../../../DynamicModal/DynamicModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentName: string;
  setDocumentName: (name: string) => void;
  uploadFile: File | null;
  setUploadFile: (file: File | null) => void;
  onUpload: () => void;
  isLoading: boolean;
}

const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({
  isOpen,
  onClose,
  documentName,
  setDocumentName,
  uploadFile,
  setUploadFile,
  onUpload,
  isLoading,
}) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUploadFile(file);
  };

  return (
    <DynamicModal isOpen={isOpen} onClose={onClose} title="Upload Document">
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Document Name <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="Enter document name"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
          <Upload className="mx-auto mb-2 h-12 w-12 text-gray-400" />
          <p className="text-sm text-gray-600">
            Drag and drop or{" "}
            <label className="cursor-pointer text-blue-600 hover:underline">
              browse
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png"
              />
            </label>
          </p>
          {uploadFile && (
            <div className="mt-2 text-xs text-gray-500">
              {uploadFile.name} ({(uploadFile.size / 1024).toFixed(2)} KB)
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={onUpload}
            disabled={!uploadFile || !documentName.trim() || isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Upload"
            )}
          </Button>
        </div>
      </div>
    </DynamicModal>
  );
};

export default UploadDocumentModal;
