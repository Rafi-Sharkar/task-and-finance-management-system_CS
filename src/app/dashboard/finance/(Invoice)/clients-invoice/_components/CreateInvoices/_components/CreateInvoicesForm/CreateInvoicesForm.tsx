"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import InputField from "@/components/shared/dashboard/Form/InputField/InputField";
import TextAreaField from "@/components/shared/dashboard/Form/TextAreaField/TextAreaField";
import { Button } from "@/components/ui/button";
import { useGetAllUsersQuery } from "@/redux/features/admin/user/user.api";
import SelectField from "@/components/shared/dashboard/Form/SelectField/SelectField";
import { toISODate } from "@/utils/convertDateIntoIsoFormat";
import { catchAsyncMutation } from "@/utils/apiReqRes.utils";
import { useCreateInvoiceMutation } from "@/redux/features/finance/invoice/invoice.api";
import { toast } from "sonner";
import { SelectDatePicker } from "@/components/shared/dashboard/Form/CustomDateSelect/CustomDateSelect";
import { format } from "date-fns";

interface Client {
  id: string;
  username: string;
}
// Form Validation Schema based on image fields
const createInvoiceSchema = z.object({
  clientId: z.string().uuid("Client is required"),
  orgName: z.string().min(1, "Organization name is required"),
  amount: z.string().min(1, "Amount is required"),
  vat: z.string().optional(),
  invoiceDate: z.string().min(1, "Invoice date is required"),
  description: z.string().optional(),
});
interface ClientInvoicceFormProps {
  onClose?: () => void;
}

type CreateInvoiceFormValues = z.infer<typeof createInvoiceSchema>;

const CreateInvoicesForm: React.FC<ClientInvoicceFormProps> = ({onClose}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm<CreateInvoiceFormValues>({
    resolver: zodResolver(createInvoiceSchema),
    defaultValues: {
      clientId: "",
      orgName: "",
      amount: "",
      vat: "",
      invoiceDate: "",
      description: "",
    },
  });
  const [createClientInvoice] = useCreateInvoiceMutation();

  const onSubmit = async (data: CreateInvoiceFormValues) => {
    const payload = {
      ...data,
      invoiceType: "SELLS",
      invoiceDate: toISODate(data.invoiceDate), // now real Date object
    };

    await catchAsyncMutation(
      createClientInvoice(payload).unwrap(),
      (res) => {
        toast.success(res?.message || "Invoice created successfully!");
        reset();
        onClose?.();
        
      }
    );
  
  };




  const { data: client } = useGetAllUsersQuery({ role: 'CLIENT' });
  console.log(client, 'client')
  const clientOptions =
    client?.data?.data?.map((item: Client) => ({
      value: item.id,
      label: item.username,
    })) || [];


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Organization/Client Name */}
      <InputField
        label="Organization"
        name="orgName"
        placeholder="Enter organization name"
        error={errors.orgName?.message}
        register={register}
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
        />
        <InputField
          label="VAT Rate"
          name="vat"
          type="number"
          placeholder="10%"
          error={errors.vat?.message}
          register={register}
        />
      </div>

      <SelectField
        label="Client Id"
        name="clientId"
        options={clientOptions}
        error={errors.clientId?.message}
        control={control}
        required
        placeholder="Select Client"
      />

      <div className="space-y-1">
        <label className="text-sm font-semibold text-[#344054]">
          Invoice Date
        </label>

        <Controller
          control={control}
          name="invoiceDate"
          render={({ field }) => (
            <SelectDatePicker
              selected={field.value ? new Date(field.value) : undefined}
              onSelect={(date) => {
                field.onChange(date ? format(date, "yyyy-MM-dd") : "");
              }}
              placeholder="Pick a date"
              error={errors.invoiceDate?.message}
            />
          )}
        />

        {errors.invoiceDate && (
          <p className="text-xs text-red-500">
            {errors.invoiceDate.message}
          </p>
        )}
      </div>



      {/* description Section */}
      <TextAreaField
        label="Description"
        name="description"
        placeholder="Write a description"
        error={errors.description?.message}
        register={register}
        rows={6}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-[#155DFC] py-6 font-semibold cursor-pointer text-white hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isSubmitting ? "Creating..." : "Create Invoices"}
      </Button>
    </form>
  );
};

export default CreateInvoicesForm;
