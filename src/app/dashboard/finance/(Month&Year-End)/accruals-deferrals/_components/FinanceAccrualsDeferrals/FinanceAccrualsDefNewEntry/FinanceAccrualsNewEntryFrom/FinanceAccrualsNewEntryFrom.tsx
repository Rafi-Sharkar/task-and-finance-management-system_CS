/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateAccrualDeferralMutation,
  useUpdateAccrualDeferralMutation,
} from "@/redux/features/finance/accrualsAndDeferrals/accrualsAndDeferrals.api";
import { catchAsyncMutation } from "@/utils/apiReqRes.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { IAccrualDeferral } from "../../FinanceAccrualsDeferrals";

// Zod schema - Provisions form এর মতো
const accrualDeferralSchema = z.object({
  name: z.string().min(1, { message: "Account name is required" }),
  type: z.string().min(1, { message: "Type is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  amount: z.string()
    .min(1, { message: "Amount is required" })
    .refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: "Amount must be a valid positive number",
    }),
  startDate: z.string().min(1, { message: "Start date is required" }),
  endDate: z.string().min(1, { message: "End date is required" }),
});

type AccrualDeferralFormValues = z.infer<typeof accrualDeferralSchema>;

interface FormProps {
  onClose: () => void;
  selectedItem: IAccrualDeferral | null;
}

const FinanceAccrualsNewEntryFrom = ({ onClose, selectedItem }: FormProps) => {
  const [createAccrualDeferral, { isLoading: isCreating }] = useCreateAccrualDeferralMutation();
  const [updateAccrualDeferral, { isLoading: isUpdating }] = useUpdateAccrualDeferralMutation();

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
  } = useForm<AccrualDeferralFormValues>({
    resolver: zodResolver(accrualDeferralSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      type: "ACCRUAL",
      description: "",
      amount: "",
      startDate: "",
      endDate: "",
    },
  });

  // Watch form values
  // eslint-disable-next-line react-hooks/incompatible-library
  const formValues = watch();

  // Format date for input (YYYY-MM-DD)
  const formatDateForInput = (dateString: string | undefined): string => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
      return date.toISOString().split("T")[0];
    } catch {
      return "";
    }
  };

  // Initialize form when selectedItem changes
  useEffect(() => {
    if (selectedItem) {
      // Set form values for editing
      reset({
        name: selectedItem.name || "",
        type: selectedItem.type || "ACCRUAL",
        description: selectedItem.description || "",
        amount: selectedItem.amount ? String(selectedItem.amount) : "",
        startDate: formatDateForInput(selectedItem.startDate),
        endDate: formatDateForInput(selectedItem.endDate),
      });
    } else {
      // Reset form for new creation
      reset({
        name: "",
        type: "ACCRUAL",
        description: "",
        amount: "",
        startDate: "",
        endDate: "",
      });
    }
  }, [selectedItem, reset]);

  // Custom onChange handler for date fields
  const handleDateChange = (field: "startDate" | "endDate", value: string) => {
    setValue(field, value, { shouldValidate: true, shouldDirty: true });
  };

  // Form submit handler
  const handleFormSubmit = async (data: AccrualDeferralFormValues) => {
    try {
      // Parse values
      const amountValue = parseFloat(data.amount);

      // Prepare payload - API documentation 
      const payload = {
        name: data.name.trim(),
        type: data.type,
        description: data.description.trim(),
        amount: amountValue,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
        status: selectedItem?.status || "DRAFT",
      };

      console.log("Payload to backend:", payload);

      if (selectedItem) {
        // UPDATE ACTION
        await catchAsyncMutation(
          updateAccrualDeferral({
            id: selectedItem.id,
            ...payload
          }).unwrap(),
          () => {
            toast.success("Accrual/Deferral updated successfully!");
            onClose();
          },
          (error) => {
            console.error("Update error:", error);
            toast.error(error?.message || "Failed to update entry");
          }
        );
      } else {
        // CREATE ACTION
        await catchAsyncMutation(
          createAccrualDeferral(payload).unwrap(),
          (res) => {
            toast.success(res?.message || "New entry created successfully!");
            onClose();
          },
          (error) => {
            console.error("Create error:", error);
            toast.error(error?.message || "Failed to create entry");
          }
        );
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error?.data?.message || "Something went wrong.");
    }
  };

  // Get today's date for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 bg-white p-6 rounded-md">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Account Name */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-[#181D27]">
            Account Name <span className="text-[#DC2727]">*</span>
          </Label>
          <Input
            {...register("name")}
            className={`h-auto w-full p-3 text-base font-normal transition-all focus-visible:ring-0 ${errors.name
              ? "border-[#DC2727] focus-visible:border-[#DC2727]"
              : "border-[#D5D7DA] focus-visible:border-[#90aded]"
              }`}
            placeholder="Enter account name"
          />
          {errors.name && (
            <p className="text-xs font-medium text-[#DC2727]">{errors.name.message}</p>
          )}
        </div>

        {/* Type - Select Dropdown */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-[#181D27]">
            Type <span className="text-[#DC2727]">*</span>
          </Label>
          <Select
            value={formValues.type}
            onValueChange={(value) => setValue("type", value, { shouldValidate: true })}
          >
            <SelectTrigger
              className={`focus-visible:birder-[#155DFC] h-auto w-full cursor-pointer p-3 py-6 transition-all focus-visible:ring-0 ${errors.type
                ? "border-[#DC2727] focus:border-[#DC2727]"
                : "border-[#D5D7DA] focus:border-[#90aded]"
                }`}
            >
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ACCRUAL">Accrual</SelectItem>
              <SelectItem value="DEFERRAL">Deferral</SelectItem>
            </SelectContent>
          </Select>
          {errors?.type && (
            <p className="text-xs font-medium text-[#DC2727]">{errors?.type?.message}</p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold text-[#181D27]">
          Description <span className="text-[#DC2727]">*</span>
        </Label>
        <Textarea
          rows={4}
          {...register("description")}
          className={`w-full resize-none p-3 transition-all focus-visible:border-[#155DFC] focus-visible:ring-0 ${errors.description
            ? "border-[#DC2727] focus-visible:border-[#DC2727]"
            : "border-[#D5D7DA]"
            }`}
          placeholder="Write a detailed description..."
        />
        {errors.description && (
          <p className="text-xs font-medium text-[#DC2727]">{errors?.description?.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Amount */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-[#181D27]">
            Amount <span className="text-[#DC2727]">*</span>
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <Input
              type="number"
              step="0.01"
              min="0"
              {...register("amount")}
              className={`h-auto w-full p-3 pl-8 text-base! font-normal! transition-all focus-visible:ring-0 ${errors.amount
                ? "border-[#DC2727] focus-visible:border-[#DC2727]"
                : "border-[#D5D7DA] focus-visible:border-[#90aded]"
                }`}
              placeholder="0.00"
            />
          </div>
          {errors.amount && (
            <p className="text-xs font-medium text-[#DC2727]">{errors.amount.message}</p>
          )}
        </div>

        {/* Start Date */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-[#181D27]">
            Start Date <span className="text-[#DC2727]">*</span>
          </Label>
          <Input
            type="date"
            min={today}
            {...register("startDate")}
            onChange={(e) => handleDateChange("startDate", e.target.value)}
            className={`h-auto w-full p-3 text-base! font-normal! transition-all focus-visible:ring-0 block cursor-pointer ${errors.startDate
              ? "border-[#DC2727] focus-visible:border-[#DC2727]"
              : "border-[#D5D7DA] focus-visible:border-[#90aded]"
              }`}
          />
          {errors.startDate && (
            <p className="text-xs font-medium text-[#DC2727]">{errors.startDate.message}</p>
          )}
        </div>

        {/* End Date */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-[#181D27]">
            End Date <span className="text-[#DC2727]">*</span>
          </Label>
          <Input
            type="date"
            min={formValues.startDate || today}
            {...register("endDate")}
            onChange={(e) => handleDateChange("endDate", e.target.value)}
            className={`h-auto w-full p-3 text-base! font-normal! transition-all focus-visible:ring-0 block cursor-pointer ${errors.endDate
              ? "border-[#DC2727] focus-visible:border-[#DC2727]"
              : "border-[#D5D7DA] focus-visible:border-[#90aded]"
              }`}
          />
          {errors.endDate && (
            <p className="text-xs font-medium text-[#DC2727]">{errors.endDate.message}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <Button
          type="button"
          variant="ghost"
          onClick={onClose}
          className="flex-1 rounded-md border border-[#D5D7DA] py-6 font-bold text-[#0A0D12] hover:bg-gray-50"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isCreating || isUpdating || !isValid}
          className={`flex-1 ${!isValid ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} py-6 font-semibold text-white`}
        >
          {selectedItem
            ? (isUpdating ? "Updating..." : "Update Entry")
            : (isCreating ? "Creating..." : "Create New Entry")}
        </Button>
      </div>
    </form>
  );
};

export default FinanceAccrualsNewEntryFrom;