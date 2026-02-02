"use client";
import React, { useMemo } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { TrendingDown, TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { MonthlyStat } from "../../../GridBox";

interface FinanceDashboardProps {
  data: MonthlyStat[];
}

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

export default function FinanceDashboard({ data = [] }: FinanceDashboardProps) {
  const totals = useMemo(() => {
    return data.reduce(
      (acc, curr) => {
        acc.totalIncome += curr.income;
        acc.totalExpense += curr.expense;
        return acc;
      },
      { totalIncome: 0, totalExpense: 0 },
    );
  }, [data]);

  return (
    <div className="ui-container">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-base text-[#9291A5]">Statistics</p>
          <h2 className="text-2xl font-semibold text-[#1E1B39]">
            Total income & Expense
          </h2>
        </div>
        <div className="flex flex-wrap gap-6">
          {/* Total Income Display */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#155DFC]">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-base text-[#9291A5]">Income</div>
              <div className="text-2xl font-semibold text-[#1E1B39]">
                ${totals.totalIncome.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Total Expense Display */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C98904]">
              <TrendingDown className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-base text-[#9291A5]">Expense</div>
              <div className="text-2xl font-semibold text-[#1E1B39]">
                ${totals.totalExpense.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="mt-6 h-96 w-full">
        {/* 2. Use the dynamic data for the chart */}
        <LineChart data={data}>
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
            tickFormatter={(value) => {
              if (value >= 1000) return `${value / 1000}k`;
              return value.toString();
            }}
            // Removed static ticks to allow Recharts to auto-scale based on your API data
            className="text-sm text-[#615E83]"
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value) => `$${(value as number).toLocaleString()}`}
              />
            }
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="var(--color-income)"
            strokeWidth={4}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="var(--color-expense)"
            strokeWidth={4}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
