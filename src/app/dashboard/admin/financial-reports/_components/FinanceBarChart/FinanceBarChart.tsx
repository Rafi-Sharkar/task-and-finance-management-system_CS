"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Define the shape of your API data
interface FinanceSummary {
  revenue: number;
  expense: number;
  overdueAmount: number;
  profit: number;
}

export const FinanceBarChart = ({
  weeklyFinanceSummary,
}: {
  weeklyFinanceSummary: FinanceSummary;
}) => {
  // 1. Map the object data to Recharts array format
  const chartData = [
    {
      name: "Revenue",
      value: weeklyFinanceSummary?.revenue || 0,
      color: "#3b82f6",
    },
    {
      name: "Expense",
      value: weeklyFinanceSummary?.expense || 0,
      color: "#60a5fa",
    },
    {
      name: "Overdue",
      value: weeklyFinanceSummary?.overdueAmount || 0,
      color: "#93c5fd",
    },
    {
      name: "Profit",
      value: weeklyFinanceSummary?.profit || 0,
      color: "#bfdbfe",
    },
  ];

  return (
    <div className="ui-container h-full w-full rounded-xl border bg-white p-5">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Finance Overview
        </h3>
        <p className="text-sm text-[#717680]">
          Company financial summary This Week
        </p>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f0f0f0"
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            // Formatter handles both small and large numbers
            tickFormatter={(value) =>
              value >= 1000 ? `$${value / 1000}k` : `$${value}`
            }
          />
          <Tooltip
            cursor={{ fill: "#f8fafc" }}
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
          <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={40}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
