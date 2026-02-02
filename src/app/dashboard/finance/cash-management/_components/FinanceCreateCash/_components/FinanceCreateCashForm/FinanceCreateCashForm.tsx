/* eslint-disable react-hooks/incompatible-library */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Image as ImageIcon, Upload, X } from "lucide-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SelectDatePicker } from "@/components/shared/dashboard/Form/CustomDateSelect/CustomDateSelect";
import InputField from "@/components/shared/dashboard/Form/InputField/InputField";
import SelectField from "@/components/shared/dashboard/Form/SelectField/SelectField";
import TextAreaField from "@/components/shared/dashboard/Form/TextAreaField/TextAreaField";
import { Button } from "@/components/ui/button";
import { useCreateCashMutation } from "@/redux/features/finance/cash/cash.api";
import { catchAsyncMutation } from "@/utils/apiReqRes.utils";
import Image from "next/image";
import { Controller } from "react-hook-form";
import { toast } from "sonner";

interface FileWithPreview extends File {
  preview?: string;
}

interface FinanceCreateCashFormProps {
  onClose?: () => void;
  onSuccess?: () => void;
}

// Define Zod schema
const cashFormSchema = z
  .object({
    cashDate: z.date({
      message: "Date is required",
    }),
    invoiceId: z
      .string()
      .min(1, "Invoice ID is required")
      .max(100, "Invoice ID is too long"),
    cashType: z.enum(["CASH_IN", "CASH_OUT"], {
      message: "Transaction type is required",
    }),
    cashIn: z.string().optional(),
    cashOut: z.string().optional(),
    description: z.string().max(500, "Description is too long").optional(),
  })
  .refine(
    (data) => {
      // Custom validation for amounts based on transaction type
      const cashInNum = parseFloat(data.cashIn || "0");
      const cashOutNum = parseFloat(data.cashOut || "0");

      if (data.cashType === "CASH_IN") {
        return cashInNum > 0 && cashOutNum === 0;
      } else if (data.cashType === "CASH_OUT") {
        return cashOutNum > 0 && cashInNum === 0;
      }
      return false;
    },
    {
      message:
        "Amount must be greater than 0 for the selected transaction type",
      path: ["cashType"], // Attach error to cashType field
    },
  )
  .superRefine((data, ctx) => {
    // Additional custom validation with specific error messages
    const cashInNum = parseFloat(data.cashIn || "0");
    const cashOutNum = parseFloat(data.cashOut || "0");

    if (data.cashType === "CASH_IN") {
      if (cashInNum <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter a valid Cash In amount",
          path: ["cashIn"],
        });
      }
      if (cashOutNum !== 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Cash Out must be 0 for Cash In transactions",
          path: ["cashOut"],
        });
      }
    } else if (data.cashType === "CASH_OUT") {
      if (cashOutNum <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter a valid Cash Out amount",
          path: ["cashOut"],
        });
      }
      if (cashInNum !== 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Cash In must be 0 for Cash Out transactions",
          path: ["cashIn"],
        });
      }
    }
  });

type CashFormValues = z.infer<typeof cashFormSchema>;

const FinanceCreateCashForm: React.FC<FinanceCreateCashFormProps> = ({
  onClose,
  onSuccess,
}) => {
  const [uploadFiles, setUploadFiles] = useState<FileWithPreview[]>([]);
  const [createCash, { isLoading }] = useCreateCashMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    reset,
    watch,
    setValue,
    trigger,
  } = useForm<CashFormValues>({
    resolver: zodResolver(cashFormSchema),
    defaultValues: {
      cashDate: undefined,
      invoiceId: "",
      cashType: undefined,
      cashIn: "",
      cashOut: "",
      description: "",
    },
    mode: "onChange",
  });

  const typeOptions = [
    { value: "CASH_IN", label: "Cash In" },
    { value: "CASH_OUT", label: "Cash Out" },
  ];

  const selectedType = watch("cashType");

  // Handle transaction type change effect
  useEffect(() => {
    if (selectedType === "CASH_IN") {
      setValue("cashOut", "0", { shouldValidate: true });
      setValue("cashIn", "", { shouldValidate: true });
      // Trigger validation after setting values
      setTimeout(() => {
        trigger(["cashIn", "cashOut"]);
      }, 0);
    } else if (selectedType === "CASH_OUT") {
      setValue("cashIn", "0", { shouldValidate: true });
      setValue("cashOut", "", { shouldValidate: true });
      // Trigger validation after setting values
      setTimeout(() => {
        trigger(["cashIn", "cashOut"]);
      }, 0);
    }
  }, [selectedType, setValue, trigger]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);

      const filesWithPreviews = newFiles.map((file) => {
        const fileWithPreview: FileWithPreview = file;
        if (file.type.startsWith("image/")) {
          fileWithPreview.preview = URL.createObjectURL(file);
        }
        return fileWithPreview;
      });

      setUploadFiles((prev) => [...prev, ...filesWithPreviews]);
    }
    e.target.value = "";
  };

  const removeFile = (index: number) => {
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

  const handleFormSubmit = async (data: CashFormValues) => {
    const cashInNum = parseFloat(data.cashIn || "0");
    const cashOutNum = parseFloat(data.cashOut || "0");

    const formData = new FormData();

    if (data.cashDate) {
      formData.append("cashDate", data.cashDate.toISOString());
    }
    formData.append("invoiceId", data.invoiceId);
    if (data.cashType) {
      formData.append("cashType", data.cashType);
    }

    // Append amount based on transaction type
    if (selectedType === "CASH_IN" && cashInNum > 0) {
      formData.append("cashIn", cashInNum.toString());
      formData.append("cashOut", "0");
    } else if (selectedType === "CASH_OUT" && cashOutNum > 0) {
      formData.append("cashOut", cashOutNum.toString());
      formData.append("cashIn", "0");
    }

    if (data.description && data.description.trim() !== "") {
      formData.append("description", data.description);
    }

    if (uploadFiles.length > 0) {
      uploadFiles.forEach((file) => {
        formData.append("files", file);
      });
    }

    await catchAsyncMutation(createCash(formData).unwrap(), (res) => {
      toast.success(res.message);
      uploadFiles.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });

      reset();
      setUploadFiles([]);

      if (onSuccess) onSuccess();
      if (onClose) onClose();
    });
  };

  useEffect(() => {
    return () => {
      uploadFiles.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [uploadFiles]);

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex max-h-[calc(100vh-200px)] flex-col"
    >
      <div className="no-scrollbar flex-1 space-y-4 overflow-y-auto pr-2">
        {/* Date Picker */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#344054]">
            Date <span className="text-red-500">*</span>
          </label>
          <Controller
            name="cashDate"
            control={control}
            render={({ field }) => (
              <>
                <SelectDatePicker
                  selected={field.value}
                  onSelect={(date: Date | undefined) => {
                    field.onChange(date);
                  }}
                  // error={errors.cashDate.message}
                  placeholder="Select date"
                  error={errors.cashDate?.message}
                />
                {errors.cashDate && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.cashDate.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        {/* Invoice ID */}
        <InputField
          label="Invoice ID"
          name="invoiceId"
          placeholder="INV-30123"
          error={errors.invoiceId?.message}
          register={register}
          required
        />

        {/* Cash Type */}
        <SelectField
          label="Transaction Type"
          name="cashType"
          options={typeOptions}
          error={errors.cashType?.message}
          control={control}
          required
          placeholder="Select Type"
        />

        {/* Conditional Amount Fields */}
        {selectedType === "CASH_IN" && (
          <InputField
            label="Cash In Amount"
            name="cashIn"
            type="number"
            placeholder="$100"
            error={errors.cashIn?.message}
            register={register}
            required
          />
        )}

        {selectedType === "CASH_OUT" && (
          <InputField
            label="Cash Out Amount"
            name="cashOut"
            type="number"
            placeholder="$100"
            error={errors.cashOut?.message}
            register={register}
            required
          />
        )}

        {/* Description Field */}
        <TextAreaField
          label="Note"
          name="description"
          placeholder="Add a description for this Cash"
          register={register}
          rows={5}
          error={errors.description?.message}
        />

        {/* File Upload Section */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-[#344054]">
            Attachments
          </label>
          <label className="cursor-pointer">
            <div className="mt-1 rounded-lg border border-gray-300 bg-[#F9FAFB] p-8 text-center transition-colors hover:border-gray-400 hover:bg-gray-50">
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

          {/* Display Selected Files */}
          {uploadFiles.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">
                Selected files ({uploadFiles.length})
              </p>
              <div className="max-h-60 space-y-3 overflow-y-auto pr-2">
                {uploadFiles.map((file, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 bg-white p-3 transition-colors hover:bg-gray-50"
                  >
                    {file.type.startsWith("image/") && file.preview && (
                      <div className="mb-3">
                        <div className="relative h-32 w-full overflow-hidden rounded-md bg-gray-100">
                          <Image
                            src={file.preview}
                            alt={file.name}
                            width={300}
                            height={200}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${getFileTypeColor(file)}`}
                        >
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

      {/* Action Buttons */}
      <div className="mt-4 flex gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={isSubmitting || isLoading}
          className="flex-1 cursor-pointer rounded-md py-6 font-bold text-[#0A0D12] hover:bg-gray-50"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="flex-1 cursor-pointer rounded-md bg-[#155DFC] py-6 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting || isLoading ? "Creating..." : "Create Cash"}
        </Button>
      </div>
    </form>
  );
};

export default FinanceCreateCashForm;
