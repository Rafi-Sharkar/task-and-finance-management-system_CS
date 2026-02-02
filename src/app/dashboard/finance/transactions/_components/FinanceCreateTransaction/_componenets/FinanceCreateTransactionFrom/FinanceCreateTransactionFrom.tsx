"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, X, FileText, Image as ImageIcon } from "lucide-react";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import InputField from "@/components/shared/dashboard/Form/InputField/InputField";
import SelectField from "@/components/shared/dashboard/Form/SelectField/SelectField";
import { Button } from "@/components/ui/button";
import { useCreateTransactionMutation } from "@/redux/features/finance/transaction/transaction.api";
import { toast } from "sonner";
import { catchAsyncMutation } from "@/utils/apiReqRes.utils";
import { SelectDatePicker } from "@/components/shared/dashboard/Form/CustomDateSelect/CustomDateSelect";
import TextAreaField from "@/components/shared/dashboard/Form/TextAreaField/TextAreaField";
import { Controller } from "react-hook-form"; // Import Controller
import Image from "next/image";

// Form Validation Schema - FIXED: Make date required
const transactionSchema = z.object({
  transactionDate: z.date({
    message: "Date is required",
  }),
  invoiceId: z.string().min(1, "Invoice ID is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
  transactionType: z.string().min(1, "Type is required"),
  amount: z.string().min(1, "Amount is required"),
  description: z.string().optional(),
});

type TransactionFormValues = z.infer<typeof transactionSchema>;

interface FileWithPreview extends File {
  preview?: string;
}

interface FinanceCreateTransactionFormProps {
  onClose: () => void;
}

const FinanceCreateTransactionForm: React.FC<
  FinanceCreateTransactionFormProps
> = ({ onClose }) => {
  const [uploadFiles, setUploadFiles] = useState<FileWithPreview[]>([]);
  const [createTransaction] = useCreateTransactionMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      transactionDate: undefined,
      invoiceId: "",
      amount: "",
      paymentMethod: "",
      transactionType: "",
      description: "",
    },
    mode: "onChange", // Change to onChange for immediate feedback
  });

  const paymentOptions = [
    { value: "BANK", label: "Bank" },
    { value: "CASH", label: "Cash" },
    { value: "CARD", label: "Card" },
  ];

  const typeOptions = [
    { value: "INCOME", label: "Income" },
    { value: "EXPENSE", label: "Expense" },
  ];


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);

      // Create preview URLs for image files
      const filesWithPreviews = newFiles.map(file => {
        const fileWithPreview: FileWithPreview = file;
        if (file.type.startsWith('image/')) {
          fileWithPreview.preview = URL.createObjectURL(file);
        }
        return fileWithPreview;
      });

      setUploadFiles((prev) => [...prev, ...filesWithPreviews]);
    }
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    // Revoke the object URL to avoid memory leaks
    if (uploadFiles[index]?.preview) {
      URL.revokeObjectURL(uploadFiles[index].preview!);
    }
    setUploadFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="h-4 w-4 text-blue-600" />;
    }
    return <FileText className="h-4 w-4 text-gray-600" />;
  };

  const getFileTypeColor = (file: File) => {
    if (file.type.startsWith("image/")) {
      return "bg-blue-50 text-blue-600";
    }
    return "bg-gray-50 text-gray-600";
  };

  const handleFormSubmit = async (data: TransactionFormValues) => {
    console.log("Form Data:", data);
    console.log("Uploaded Files:", uploadFiles);
    // Create FormData
    const formData = new FormData();

    // Append all required fields
    formData.append("transactionDate", data.transactionDate.toISOString());
    formData.append("invoiceId", data.invoiceId);
    formData.append("paymentMethod", data.paymentMethod);
    formData.append("transactionType", data.transactionType);
    formData.append("amount", data.amount);

    // Append description if it exists
    if (data.description && data.description.trim() !== "") {
      formData.append("description", data.description);
    }

    // Append files (without preview property)
    if (uploadFiles.length > 0) {
      uploadFiles.forEach((file) => {
        formData.append("files", file);
      });
    }

    await catchAsyncMutation(
      createTransaction(formData).unwrap(),
      () => {
        toast.success("Transaction created successfully!");
        // Clean up preview URLs
        uploadFiles.forEach(file => {
          if (file.preview) {
            URL.revokeObjectURL(file.preview);
          }
        });
        reset();
        setUploadFiles([]);
        onClose();
      },
      (err) => {
        console.error("Transaction creation failed:", err);
        // toast.error(err?.data?.message || "Failed to create transaction");
      }
    );
  };

  // Clean up preview URLs on unmount
  React.useEffect(() => {
    return () => {
      uploadFiles.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [uploadFiles]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex max-h-[calc(100vh-200px)] flex-col">
      {/* Scrollable Form Content */}
      <div className="flex-1 space-y-4 overflow-y-auto pr-2 no-scrollbar">
        {/* Date Picker with Controller for better validation */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#344054]">
            Date <span className="text-red-500">*</span>
          </label>
          <Controller
            name="transactionDate"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <SelectDatePicker
                  selected={field.value}
                  onSelect={(date) => {
                    field.onChange(date);
                  }}
                  placeholder="Select a date"
                  error={errors.transactionDate?.message}
                />
                {fieldState.error && (
                  <p className="text-xs text-red-500 mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <InputField
          label="Invoice ID"
          name="invoiceId"
          placeholder="CV-30123"
          error={errors.invoiceId?.message}
          register={register}
          required
        />

        <SelectField
          label="Payment Method"
          name="paymentMethod"
          options={paymentOptions}
          error={errors.paymentMethod?.message}
          control={control}
          required
          placeholder="Select Payment Method"
        />

        <SelectField
          label="Type"
          name="transactionType"
          options={typeOptions}
          error={errors.transactionType?.message}
          control={control}
          required
          placeholder="Select Type"
        />

        <InputField
          label="Amount"
          name="amount"
          type="number"
          placeholder="$100"
          error={errors.amount?.message}
          register={register}
          required
        />

        {/* Description Field - Optional */}
        <TextAreaField
          label="Note"
          name="description"
          placeholder="Add a description for this transaction"
          error={errors.description?.message}
          register={register}
          rows={5}
        />

        {/* Drag and Drop File Upload Section */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-[#344054]">
            Attachments
          </label>
          <label className="cursor-pointer">
            <div className="rounded-lg border border-gray-300 bg-[#F9FAFB] p-8 text-center transition-colors hover:border-gray-400 hover:bg-gray-50 mt-1">
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200">
                  <Upload className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Drop files here or click to upload
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Support for images, PDFs, and documents
                  </p>
                </div>
                <span className="rounded-md bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
                  Browse files
                </span>
              </div>
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
                accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
              />
            </div>
          </label>

          {/* Display Selected Files with Image Previews */}
          {uploadFiles.length > 0 && (
            <div className="space-y-3 max-w-sm">
              <p className="text-sm font-medium text-gray-700">
                Selected files ({uploadFiles.length})
              </p>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2 ">
                {uploadFiles.map((file, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 bg-white p-3 transition-colors hover:bg-gray-50"
                  >
                    {/* Image Preview for image files */}
                    {file.type.startsWith("image/") && file.preview && (
                      <div className="mb-3">
                        <div className="relative h-32 w-full overflow-hidden rounded-md bg-gray-100">
                          <Image
                            width={400}
                            height={400}
                            src={file.preview}
                            alt={file.name}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      </div>
                    )}

                    {/* File Details */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${getFileTypeColor(file)}`}>
                          {getFileIcon(file)}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-gray-700">
                            {file.name?.slice(0, 35)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024).toFixed(1)} KB • {file.type}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="ml-2 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-red-500"
                        aria-label="Remove file"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Footer Buttons */}
      <div className="flex gap-4 pt-4 mt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={isSubmitting}
          className="flex-1 rounded-md cursor-pointer py-6 font-bold text-[#0A0D12] hover:bg-gray-50"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 rounded-md bg-[#155DFC] cursor-pointer py-6 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Create Transaction"}
        </Button>
      </div>
    </form>
  );
};

export default FinanceCreateTransactionForm;