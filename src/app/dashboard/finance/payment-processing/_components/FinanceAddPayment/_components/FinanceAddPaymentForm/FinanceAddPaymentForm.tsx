"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import React, { ChangeEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import InputField from "@/components/shared/dashboard/Form/InputField/InputField";
import SelectField from "@/components/shared/dashboard/Form/SelectField/SelectField";
import { Button } from "@/components/ui/button";
import { useCreatePaymentMutation } from "@/redux/features/finance/paymentprocessing/paymentprocessing.api";
import { catchAsyncMutation } from "@/utils/apiReqRes.utils";
import { toast } from "sonner";
import { SelectDatePicker } from "@/components/shared/dashboard/Form/CustomDateSelect/CustomDateSelect";

// Form Validation Schema
const addPaymentSchema = z.object({
  vendor: z.string().min(1, "Vendor is required"),
  paymentDate: z.string().min(1, "Payment date is required"),
  invoiceId: z.string().min(1, "Reference number is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
  amount: z.string().min(1, "Amount is required"),
  paymentStatus: z.string().min(1, "paymentStatus is required"),
});

type AddPaymentFormValues = z.infer<typeof addPaymentSchema>;

interface FinanceAddPaymentFormProps {
  onClose?: () => void;
}

const FinanceAddPaymentForm: React.FC<FinanceAddPaymentFormProps> = ({
  onClose,
}) => {
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [createPayment] = useCreatePaymentMutation();


  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddPaymentFormValues>({
    resolver: zodResolver(addPaymentSchema),
    defaultValues: {
      vendor: "",
      paymentDate: "",
      invoiceId: "",
      amount: "",
      paymentStatus: "",
    },
  });

  const paymentMethodOptions = [
    { value: "BANK", label: "Bank" },
    { value: "CASH", label: "Cash" },
    { value: "CARD", label: "Card" },
  ];

  const paymentStatusOptions = [
    { value: "PENDING", label: "Pending" },
    { value: "COMPLETED", label: "Completed" },
  ];

  const handleFormSubmit = async (data: AddPaymentFormValues) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    uploadFiles.forEach((file) => {
      formData.append("files", file);
    });

    await catchAsyncMutation(
      createPayment(formData).unwrap(),
      (res) => {
        toast.success(res.message || "Payment created successfully!");
        reset();
        setUploadFiles([]);
        onClose?.();
      },
    );
  };


  return (
    <div className="space-y-4 flex max-h-[calc(100vh-200px)] flex-col">
      <div className="flex-1 space-y-4 overflow-y-auto pr-2 no-scrollbar">
        <InputField
          label="Vendor"
          name="vendor"
          placeholder="Office Supplier"
          error={errors.vendor?.message}
          register={register}
          required
        />
        <div className="space-y-1">
          <label className="text-sm font-semibold text-[#344054]">
            Payment Date
          </label>

          <Controller
            control={control}
            name="paymentDate"
            render={({ field }) => (
              <SelectDatePicker
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => {
                  field.onChange(date ? date.toISOString().split("T")[0] : "");
                }}
                placeholder="Pick a date"
                error={errors.paymentDate?.message}
              />
            )}
          />

          {errors.paymentDate && (
            <p className="text-xs text-red-500">
              {errors.paymentDate.message}
            </p>
          )}
        </div>

        <InputField
          label="Reference No"
          name="invoiceId"
          placeholder="CV-30123"
          error={errors.invoiceId?.message}
          register={register}
          required
        />

        <SelectField
          label="Payment Method"
          name="paymentMethod"
          options={paymentMethodOptions}
          error={errors.paymentMethod?.message}
          control={control}
          required
          placeholder="Select Method"
        />

        <InputField
          label="Amount"
          name="amount"
          type="number"
          placeholder="$500"
          error={errors.amount?.message}
          register={register}
          required
        />

        <SelectField
          label="Status"
          name="paymentStatus"
          options={paymentStatusOptions}
          error={errors.paymentStatus?.message}
          control={control}
          required
          placeholder="Select paymentStatus"
        />

        {/* Upload Invoice Section */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#344054]">
            Upload Invoices
          </label>

          <div className="rounded-lg mt-1 border border-[#D5D7DA] bg-[#F9FAFB] p-10 text-center">
            <div className="flex flex-col items-center justify-center space-y-2">
              <Upload className="h-10 w-10 text-gray-400" />

              <p className="text-sm text-gray-600">
                Drag and drop or{" "}
                <label className="cursor-pointer font-semibold text-[#155DFC] hover:underline">
                  browse
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files) {
                        setUploadFiles(Array.from(e.target.files));
                      }
                    }}
                  />
                </label>
              </p>

              {uploadFiles.length > 0 && (
                <div className="mt-2 space-y-1">
                  {uploadFiles.map((file, index) => (
                    <p
                      key={index}
                      className="truncate text-xs font-medium text-green-600"
                    >
                      {file.name}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>


        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 rounded-md border-[#D5D7DA] py-6 font-bold text-[#0A0D12]"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit(handleFormSubmit)}
            disabled={isSubmitting}
            className="flex-1 rounded-md bg-[#155DFC] py-6 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isSubmitting ? "Adding..." : "Add Payment"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FinanceAddPaymentForm;
