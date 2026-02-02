"use client"
import { useGetFinanceSummaryBottomQuery } from "@/redux/features/finance/financialStatements/financialStatements.api";
import React from "react";

interface ProfitLossItemProps {
  label: string;
  amount: string;
}

const ProfitLossItem: React.FC<ProfitLossItemProps> = ({ label, amount }) => (
  <div className="flex items-center justify-between rounded-md border bg-white px-5 py-4">
    <span className="text-[15px] font-medium text-[#101828]">{label}</span>
    <span className="text-[15px] font-semibold text-[#101828]">{amount}</span>
  </div>
);

const FinanceProfitLossPreview = () => {
  const { data: getFinanceSummaryBottom } = useGetFinanceSummaryBottomQuery({});

  const financialData = [
    { label: "Revenue", amount: `$${getFinanceSummaryBottom?.revenue || "0"}` },
    { label: "Operating Expenses", amount: `$${getFinanceSummaryBottom?.expenses || "0"}` },
    { label: "Net Profit", amount: `$${getFinanceSummaryBottom?.netProfit || "0"}` },
  ];

  return (
    <div className="w-full space-y-4">
      <h3 className="text-lg font-semibold">Draft Profit & Loss Preview</h3>

      {/* Financial Items List */}
      <div className="space-y-2.5">
        {financialData.map((item, index) => (
          <ProfitLossItem key={index} label={item.label} amount={item.amount} />
        ))}
      </div>

      {/* Action Buttons */}
      {/* <div className="flex flex-wrap gap-4 pt-2">
        <Button className="flex-1 gap-2 rounded-md bg-[#155DFC] py-6 font-semibold text-white hover:bg-blue-700 sm:flex-none sm:px-10">
          <Check size={18} />
          Mark as Ready for Financial Statements
        </Button>

        <Button
          variant="outline"
          className="flex-1 gap-2 rounded-md border-[#D5D7DA] bg-[#F9FAFB] py-6 font-semibold text-[#344054] hover:bg-gray-100 sm:flex-none sm:px-10"
        >
          <Download size={18} />
          Export for Tax Advisor
        </Button>
      </div> */}
    </div>
  );
};

export default FinanceProfitLossPreview;
