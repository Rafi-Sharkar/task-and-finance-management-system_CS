import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

function IncomeAndExpense({
  totalIncome,
  totalExpense,
}: {
  totalIncome: number;
  totalExpense: number;
}) {
  return (
    <div className="mb-6 flex items-center gap-8">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2BC155]">
          <ArrowUpRight className="h-7 w-7 text-white" />
        </div>
        <div>
          <p className="text-base text-[#717579]">Income</p>
          <p className="mt-1 text-xl font-bold text-[#171B1E]">
            {" "}
            ${totalIncome.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFAA2B]">
          <ArrowDownLeft className="h-7 w-7 text-white" />
        </div>
        <div>
          <p className="text-base text-[#717579]">Expense</p>
          <p className="mt-1 text-xl font-bold text-[#171B1E]">
            {" "}
            ${totalExpense.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default IncomeAndExpense;
