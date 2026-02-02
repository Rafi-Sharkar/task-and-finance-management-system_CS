/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import SelectField from "@/components/shared/dashboard/Form/SelectField/SelectField";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCcw } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useCreateVatReturnMutation } from "@/redux/features/finance/vatReturn/vatReturn.api";
import { useEffect } from "react";

// Zod Schema Definition
const vatReportSchema = z.object({
  periodType: z.string().min(1, "Period Type is required"),
  year: z.string().min(1, "Year is required"),
  period: z.string().min(1, "Period is required"),
});

type VATReportFormValues = z.infer<typeof vatReportSchema>;

export const FinanceGenerateVATReport = () => {

  const [createVatReturn, { isLoading }] = useCreateVatReturnMutation();


  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VATReportFormValues>({
    resolver: zodResolver(vatReportSchema),
    mode: "onChange",
    defaultValues: {
      periodType: "",
      year: "",
      period: "",
    },
  });

  const onSubmit = async (data: VATReportFormValues) => {
    try {
      const payload = {
        periodType: data.periodType,
        period: data.period,
        years: Number(data.year), // API expects "years" as a number
      };

      await createVatReturn(payload).unwrap();
      toast.success("VAT Report generated successfully!");
    } catch (error: any) {

      const errorMessage = Array.isArray(error?.data?.message)
        ? error.data.message[0]
        : error?.data?.message || "Failed to generate VAT report";

      toast.error(errorMessage);
      console.error("Mutation Error:", error);
    }
  };

  // Watch the periodType to change Period options dynamically
  const selectedPeriodType = useWatch({ control, name: "periodType" });

  useEffect(() => {
    setValue("period", "");
  }, [selectedPeriodType, setValue]);

  const years = Array.from({ length: 36 }, (_, i) => ({
    value: (2024 + i).toString(),
    label: (2024 + i).toString(),
  }));

  const months = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ].map(m => ({ value: m, label: m }));

  const quarters = [
    { value: "Q1", label: "Q1 (Jan-Mar)" },
    { value: "Q2", label: "Q2 (Apr-Jun)" },
    { value: "Q3", label: "Q3 (Jul-Sep)" },
    { value: "Q4", label: "Q4 (Oct-Dec)" },
  ];

  // Logic to determine which options to show
  const periodOptions = selectedPeriodType === "MONTHLY" ? months : selectedPeriodType === "QUARTERLY" ? quarters : [];

  return (
    <div className="ui-container flex flex-wrap items-start gap-6">
      {/* Period Type Select */}
      <div className="min-w-52 flex-1">
        <SelectField
          label="Period Type"
          name="periodType"
          placeholder="Select Period Type"
          options={[
            { value: "MONTHLY", label: "Monthly" },
            { value: "QUARTERLY", label: "Quarterly" }
          ]}
          control={control}
          error={errors.periodType?.message}
          required
        />
      </div>

      {/* Year Select */}
      <div className="min-w-52 flex-1">
        <SelectField
          label="Year"
          name="year"
          placeholder="Select Year"
          options={years} // Using the years array created above
          control={control}
          error={errors.year?.message}
          required
          maxHeight="200px"
        />
      </div>

      {/* Period Select */}
      <div className="min-w-52 flex-1">
        <SelectField
          label="Period"
          name="period"
          placeholder="Select Period"
          options={periodOptions}
          control={control}
          error={errors.period?.message}
          required
        />
      </div>

      {/* Generate Button */}
      <div className="flex-none sm:pt-7">
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading} // Disable while loading
          className="flex items-center gap-2 bg-[#155DFC] px-8 py-6 font-semibold transition-all hover:bg-blue-700"
        >
          <RefreshCcw size={18} className={isLoading ? "animate-spin" : ""} />
          {isLoading ? "Generating..." : "Generate VAT Report"}
        </Button>
      </div>
    </div>
  );
};
