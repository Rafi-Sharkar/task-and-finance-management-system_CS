"use client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { TrendingDown, TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Dot,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

const chartData = [
  { month: "Jan", income: 200000, expense: 65000 },
  { month: "Feb", income: 150000, expense: 95000 },
  { month: "Mar", income: 180000, expense: 15000 },
  { month: "Apr", income: 60000, expense: 68000 },
  { month: "May", income: 55000, expense: 52000 },
  { month: "Jun", income: 135000, expense: 50000 },
  { month: "Jul", income: 485000, expense: 52000 },
  { month: "Aug", income: 475000, expense: 70000 },
  { month: "Sep", income: 320000, expense: 75000 },
  { month: "Oct", income: 180000, expense: 72000 },
  { month: "Nov", income: 100000, expense: 68000 },
  { month: "Dec", income: 65000, expense: 50000 },
];

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

export default function IncomeExpenseChart() {
  return (
    <div className="ui-container">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-base text-[#9291A5]">Statistics</p>
          <h2 className="text-2xl font-semibold text-[#1E1B39]">
            Total Profit & Loss
          </h2>
        </div>
        <div className="flex gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#155DFC]">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-base text-[#9291A5]">Income</div>
              <div className="text-2xl font-semibold text-[#1E1B39]">$5000</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C98904]">
              <TrendingDown className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-base text-[#9291A5]">Expense</div>
              <div className="text-2xl font-semibold text-[#1E1B39]">$5000</div>
            </div>
          </div>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="mt-6 h-96 w-full">
        <LineChart data={chartData}>
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
            ticks={[0, 50000, 100000, 500000]}
            domain={[0, 500000]}
            className="text-sm text-[#615E83]"
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value) => `$${(value as number).toLocaleString()}`}
              />
            }
          />
          <ReferenceLine x="Jul" stroke="#D1D5DB" strokeDasharray="6 6" />
          <Line
            type="monotone"
            dataKey="income"
            stroke="var(--color-income)"
            strokeWidth={4}
            dot={false}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            activeDot={(props: any) => {
              if (props.payload.month === "Jul") {
                return (
                  <Dot
                    {...props}
                    r={6}
                    fill="var(--color-income)"
                    stroke="var(--color-income)"
                    strokeWidth={4}
                  />
                );
              }
              return <Dot {...props} r={0} />;
            }}
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
