"use client";

import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import React, { ChangeEvent, useState } from "react";

interface ClientMyInvoicesUploadReceiptFormProps {
  onClose: () => void;
  onUpload: (file: File) => void;
}

const ClientMyInvoicesUploadReceiptForm: React.FC<
  ClientMyInvoicesUploadReceiptFormProps
> = ({ onClose, onUpload }) => {
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const handleUploadSubmit = () => {
    if (uploadFile) {
      onUpload(uploadFile);
    }
  };

  return (
    <div>
      <div className="mb-4 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
        <Upload className="mx-auto mb-2 h-12 w-12 text-gray-400" />
        <p className="text-sm text-gray-600">
          Drag and drop or{" "}
          <label className="cursor-pointer text-blue-600 hover:underline">
            browse
            <input
              type="file"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUploadFile(e.target.files?.[0] || null)
              }
              className="hidden"
            />
          </label>
        </p>
        {uploadFile && (
          <p className="mt-2 text-xs font-medium text-[#155DFC]">
            {uploadFile.name}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => {
            setUploadFile(null);
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleUploadSubmit}
          disabled={!uploadFile}
          className="bg-[#155DFC] hover:bg-blue-700"
        >
          Upload
        </Button>
      </div>
    </div>
  );
};

export default ClientMyInvoicesUploadReceiptForm;
