"use client";

import { Button } from "@/components/ui/button";
import { useUploadInvoiceFileMutation } from "@/redux/features/finance/invoice/invoice.api";
import { catchAsyncMutation } from "@/utils/apiReqRes.utils";
import { Upload } from "lucide-react";
import React, { ChangeEvent, useState } from "react";
import { toast } from "sonner";

interface FinanceAccountUploadReceiptFormProps {
  onClose: () => void;
  invoiceId: string;
}

const FinanceAccountUploadReceiptForm: React.FC<FinanceAccountUploadReceiptFormProps> = ({ invoiceId, onClose }) => {
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadReceipt, { isLoading: isUploading }] = useUploadInvoiceFileMutation();

  const handleUploadSubmit = async () => {
    if (!uploadFile) return;

    const formData = new FormData();
    formData.append("file", uploadFile); // Only append the file
    await catchAsyncMutation(
      uploadReceipt({
        id: invoiceId, // pass invoice ID separately
        formData: formData,
      }).unwrap(),
      (res) => {
        // Success callback
        toast.success(res.message || "Receipt uploaded successfully!");
        onClose?.();
      },
    );
  };

  return (
    <div>
      {/* Upload Area */}
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
              disabled={isUploading}
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </label>
        </p>
        {uploadFile && (
          <p className="mt-2 text-xs font-medium text-[#155DFC]">
            Selected: {uploadFile.name}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => {
            setUploadFile(null);
            onClose();
          }}
          disabled={isUploading}
        >
          Cancel
        </Button>
        <Button
          onClick={handleUploadSubmit}
          disabled={!uploadFile || isUploading}
          className="bg-[#155DFC] hover:bg-blue-700"
        >
          {isUploading ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </div>
  );
};

export default FinanceAccountUploadReceiptForm;