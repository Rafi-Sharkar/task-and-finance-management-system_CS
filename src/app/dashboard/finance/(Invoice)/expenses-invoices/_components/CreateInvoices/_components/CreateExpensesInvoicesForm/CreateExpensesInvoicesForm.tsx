"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import InputField from "@/components/shared/dashboard/Form/InputField/InputField";
import TextAreaField from "@/components/shared/dashboard/Form/TextAreaField/TextAreaField";
import { Button } from "@/components/ui/button";
import { useCreateInvoiceMutation } from "@/redux/features/finance/invoice/invoice.api";
import { catchAsyncMutation } from "@/utils/apiReqRes.utils";
import { toISODate } from "@/utils/convertDateIntoIsoFormat";
import { toast } from "sonner";

// Schema for Expenses Invoice

// --- Schema Definition ---
const createExpensesSchema = z.object({
  supplierName: z.string().min(1, "Supplier name is required"),
  amount: z.string().min(1, "Amount is required"),
  vat: z.string().min(1, "VAT rate is required"),
  invoiceDate: z.string().min(1, "Invoice date is required"),
  description: z.string().min(1, "Description is required"),
});




// TypeScript type inference
type TCreateExpensesFormValues = z.infer<typeof createExpensesSchema>;

const CreateExpensesInvoicesForm = ({ handleClose }: { handleClose: () => void }) => {
  // Assuming useCreateInvoiceMutation is from RTK Query or similar
  const [createInvoice] = useCreateInvoiceMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<TCreateExpensesFormValues>({
    resolver: zodResolver(createExpensesSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: TCreateExpensesFormValues) => {

    console.log(data);

    const modifiedData = { ...data, invoiceType: "EXPENSE", invoiceDate: toISODate(data.invoiceDate), amount: Number(data.amount), vat: Number(data.vat) };
    await catchAsyncMutation(
      // 1. Execute the mutation
      createInvoice(modifiedData).unwrap(),
      // 2. Handle Success Case
      (res) => {
        toast.success(
          res?.message || "Expenses Invoice created successfully!",
        );
        reset();
        handleClose();
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Supplier Name Field */}
      <InputField
        label="Supplier Name"
        name="supplierName"
        placeholder="Enter Supplier Name"
        error={errors.supplierName?.message}
        register={register}
        required
      />

      {/* Amount and VAT Rate Row */}
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Amount"
          name="amount"
          type="number"
          placeholder="Enter amount"
          error={errors.amount?.message}
          register={register}
          required
        />
        <InputField
          label="VAT Rate"
          type="number"
          name="vat"
          placeholder="10%"
          error={errors.vat?.message}
          register={register}
        />
      </div>

      {/* Invoice Date Field */}
      <InputField
        label="Invoice Date"
        name="invoiceDate"
        type="date"
        placeholder="Enter Date"
        error={errors.invoiceDate?.message}
        register={register}
        required
      />

      {/* Note Field (Custom TextArea) */}
      <TextAreaField
        label="Note"
        name="description"
        placeholder="Write a note"
        error={errors.description?.message}
        register={register}
        rows={6}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting || !isValid}
        className={`flex flex-1 items-center justify-center gap-2 rounded-md bg-[#155DFC] py-6 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50`}
      >
        {isSubmitting ? "Craeting..." : "Create Invoice"}
      </Button>
    </form>
  );
};

export default CreateExpensesInvoicesForm;
