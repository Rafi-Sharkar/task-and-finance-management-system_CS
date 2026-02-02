/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateProvisionMutation,
  useUpdateProvisionsMutation,
} from "@/redux/features/finance/provision/provision.api";
import { catchAsyncMutation } from "@/utils/apiReqRes.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { IProvision } from "../../FianceProvisionsList/FianceProvisionsList";

// Zod schema - React Hook Form validation
const provisionsSchema = z.object({
  name: z.string().min(1, { message: "Provision name is required" }),
  amount: z.string()
    .min(1, { message: "Amount is required" })
    .refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: "Amount must be a valid positive number",
    }),
  expectedValue: z.string()
    .min(1, { message: "Expected value is required" })
    .refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: "Expected value must be a valid positive number",
    }),
  description: z.string().min(1, { message: "Description is required" }),
  startDate: z.string().min(1, { message: "Start date is required" }),
  endDate: z.string().min(1, { message: "End date is required" }),
  probability: z.string()
    .min(1, { message: "Probability is required" })
    .refine(val => !isNaN(parseFloat(val)), {
      message: "Probability must be a valid number",
    })
    .refine(val => {
      const num = parseFloat(val);
      return num >= 0 && num <= 100;
    }, {
      message: "Probability must be between 0 and 100",
    }),
});

type ProvisionsFormValues = z.infer<typeof provisionsSchema>;

interface FormProps {
  onClose: () => void;
  selectedItem: IProvision | null;
}

const FinanceProvisionsNewProvisionFrom = ({ onClose, selectedItem }: FormProps) => {
  const [createProvision, { isLoading: isCreating }] = useCreateProvisionMutation();
  const [updateProvisions, { isLoading: isUpdating }] = useUpdateProvisionsMutation();

  // React Hook Form 
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
  } = useForm<ProvisionsFormValues>({
    resolver: zodResolver(provisionsSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      amount: "",
      expectedValue: "",
      description: "",
      startDate: "",
      endDate: "",
      probability: "",
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
        amount: selectedItem.amount ? String(selectedItem.amount) : "",
        expectedValue: selectedItem.expectedValue ? String(selectedItem.expectedValue) : "",
        description: selectedItem.description || "",
        startDate: formatDateForInput(selectedItem.startDate),
        endDate: formatDateForInput(selectedItem.endDate),
        probability: selectedItem.probability ? String(selectedItem.probability * 100) : "",
      });
    } else {
      // Reset form for new creation
      reset({
        name: "",
        amount: "",
        expectedValue: "",
        description: "",
        startDate: "",
        endDate: "",
        probability: "",
      });
    }
  }, [selectedItem, reset]);

  // Custom onChange handler for date fields
  const handleDateChange = (field: "startDate" | "endDate", value: string) => {
    setValue(field, value, { shouldValidate: true, shouldDirty: true });
  };

  // Form submit handler
  const handleFormSubmit = async (data: ProvisionsFormValues) => {
    try {
      // Parse values
      const probValue = parseFloat(data.probability);
      const amountValue = parseFloat(data.amount);
      const expectedValue = parseFloat(data.expectedValue);

      // Prepare payload
      const payload = {
        name: data.name.trim(),
        amount: amountValue,
        expectedValue: expectedValue,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
        probability: probValue,
        description: data.description.trim(),
        provisionStatus: selectedItem?.provisionStatus || "DRAFT",
      };

      if (selectedItem) {
        // UPDATE ACTION
        await catchAsyncMutation(
          updateProvisions({
            id: selectedItem.id,
            params: payload
          }).unwrap(),
          () => {
            toast.success("Provision updated successfully!");
            onClose();
          },
          (error) => {
            console.error("Update error:", error);
            toast.error(error?.message || "Failed to update provision");
          }
        );
      } else {
        // CREATE ACTION
        await catchAsyncMutation(
          createProvision(payload).unwrap(),
          (res) => {
            toast.success(res?.message || "Provision created successfully!");
            onClose();
          },
          (error) => {
            console.error("Create error:", error);
            toast.error(error?.message || "Failed to create provision");
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
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 rounded-md bg-white p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Provision Name */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-[#181D27]">
            Provision Name <span className="text-[#DC2727]">*</span>
          </Label>
          <Input
            {...register("name")}
            className={`h-auto w-full p-3 text-base! font-normal! transition-all focus-visible:ring-0 ${errors.name
              ? "border-[#DC2727] focus-visible:border-[#DC2727]"
              : "border-[#D5D7DA] focus-visible:border-[#90aded]"
              }`}
            placeholder="Enter provision name"
          />
          {errors.name && (
            <p className="text-xs font-medium text-[#DC2727]">{errors.name.message}</p>
          )}
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-[#181D27]">
            Amount <span className="text-[#DC2727]">*</span>
          </Label>
          <Input
            type="number"
            step="0.01"
            min="0"
            {...register("amount")}
            className={`h-auto w-full p-3 text-base! font-normal! transition-all focus-visible:ring-0 ${errors.amount
              ? "border-[#DC2727] focus-visible:border-[#DC2727]"
              : "border-[#D5D7DA] focus-visible:border-[#90aded]"
              }`}
            placeholder="0.00"
          />
          {errors.amount && (
            <p className="text-xs font-medium text-[#DC2727]">{errors.amount.message}</p>
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
          placeholder="Write a detailed description about this provision..."
        />
        {errors.description && (
          <p className="text-xs font-medium text-[#DC2727]">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Expected Value */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-[#181D27]">
            Expected Value <span className="text-[#DC2727]">*</span>
          </Label>
          <Input
            type="number"
            step="0.01"
            min="0"
            {...register("expectedValue")}
            className={`h-auto w-full p-3 text-base! font-normal! transition-all focus-visible:ring-0 ${errors.expectedValue
              ? "border-[#DC2727] focus-visible:border-[#DC2727]"
              : "border-[#D5D7DA] focus-visible:border-[#90aded]"
              }`}
            placeholder="0.00"
          />
          {errors.expectedValue && (
            <p className="text-xs font-medium text-[#DC2727]">{errors.expectedValue.message}</p>
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
            className={`h-auto  w-full p-3 text-base! font-normal! transition-all focus-visible:ring-0 block cursor-pointer ${errors.startDate
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

      {/* Probability */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold text-[#181D27]">
          Probability (%) <span className="text-[#DC2727]">*</span>
        </Label>
        <Input
          type="number"
          min="0"
          max="100"
          step="0.1"
          {...register("probability")}
          className={`h-auto w-full p-3 text-base! font-normal! transition-all focus-visible:ring-0 ${errors.probability
            ? "border-[#DC2727] focus-visible:border-[#DC2727]"
            : "border-[#D5D7DA] focus-visible:border-[#90aded]"
            }`}
          placeholder="0-100"
        />
        {errors.probability && (
          <p className="text-xs font-medium text-[#DC2727]">{errors.probability.message}</p>
        )}

      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="ghost"
          onClick={onClose}
          className="flex-1 btn-secondary "
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isCreating || isUpdating || !isValid}
          className="flex-1 btn-primary"
        >
          {selectedItem
            ? (isUpdating ? "Updating..." : "Update Provision")
            : (isCreating ? "Creating..." : "Create New Provision")}
        </Button>
      </div>
    </form>
  );
};

export default FinanceProvisionsNewProvisionFrom;