"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { TrendingDown, TrendingUp } from "lucide-react";
import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const chartConfig = {
  income: {
    label: "Income",
    color: "#155DFC",
  },
  expense: {
    label: "Expense",
    color: "#C98904",
  },
} satisfies ChartConfig;

interface FinanceFinanceDashboardProps {
  financeMyRecentTasks: {
    month: string;
    income: number;
    expense: number;
  }[];
}

export default function FinanceFinanceDashboard({
  financeMyRecentTasks = [],
}: FinanceFinanceDashboardProps) {
  const { totalIncome, totalExpense } = useMemo(() => {
    return financeMyRecentTasks.reduce(
      (acc, curr) => ({
        totalIncome: acc.totalIncome + curr.income,
        totalExpense: acc.totalExpense + curr.expense,
      }),
      { totalIncome: 0, totalExpense: 0 }
    );
  }, [financeMyRecentTasks]);

  const maxVal = useMemo(() => {
    if (financeMyRecentTasks.length === 0) return 100000;
    const values = financeMyRecentTasks.flatMap((d) => [d.income, d.expense]);
    return Math.max(...values);
  }, [financeMyRecentTasks]);

  return (
    <div className="ui-container rounded-xl border bg-white p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-base text-[#9291A5]">Statistics</p>
          <h2 className="text-2xl font-semibold text-[#1E1B39]">
            Total Income & Expense
          </h2>
        </div>

        <div className="flex gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#155DFC]">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-base text-[#9291A5]">Income</div>
              <div className="text-2xl font-semibold text-[#1E1B39]">
                ${totalIncome.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C98904]">
              <TrendingDown className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-base text-[#9291A5]">Expense</div>
              <div className="text-2xl font-semibold text-[#1E1B39]">
                ${totalExpense.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="mt-6 h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={financeMyRecentTasks}>
            <CartesianGrid
              strokeDasharray="6 6"
              vertical={false}
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={15}
              className="text-sm text-[#615E83]"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={20}
              tickFormatter={(value) =>
                value >= 1000 ? `${value / 1000}k` : value
              }
              domain={[0, Math.ceil(maxVal * 1.1)]}
              className="text-sm text-[#615E83]"
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => `$${Number(value).toLocaleString()}`}
                />
              }
            />

            <Line
              type="monotone"
              dataKey="income"
              stroke="var(--color-income)"
              strokeWidth={4}
              dot={false}
              activeDot={{ r: 6, fill: "#155DFC", strokeWidth: 2, stroke: "#fff" }}
            />

            <Line
              type="monotone"
              dataKey="expense"
              stroke="var(--color-expense)"
              strokeWidth={4}
              dot={false}
              activeDot={{ r: 6, fill: "#C98904", strokeWidth: 2, stroke: "#fff" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}