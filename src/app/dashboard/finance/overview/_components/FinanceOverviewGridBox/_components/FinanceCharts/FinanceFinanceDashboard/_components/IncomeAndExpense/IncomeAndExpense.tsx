import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

function IncomeAndExpense({
  totalIncome,
  totalExpense,
}: {
  totalIncome: number;
  totalExpense: number;
}) {
  return (
    <div className="flex items-center gap-8 mb-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-[#2BC155] rounded-full flex items-center justify-center">
          <ArrowUpRight className="w-7 h-7 text-white" />
        </div>
        <div>
          <p className="text-base text-[#717579]">Income</p>
          <p className="text-xl font-bold text-[#171B1E] mt-1">
            {" "}
            ${totalIncome.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-[#FFAA2B] rounded-full flex items-center justify-center">
          <ArrowDownLeft className="w-7 h-7 text-white" />
        </div>
        <div>
          <p className="text-base text-[#717579]">Expense</p>
          <p className="text-xl font-bold text-[#171B1E] mt-1">
            {" "}
            ${totalExpense.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default IncomeAndExpense;
