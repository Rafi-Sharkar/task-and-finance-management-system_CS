"use client";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface WeeklyRevenueItem {
  [key: string]: number;
}

export const RevenueAreaChart = ({
  weeklyRevenue,
}: {
  weeklyRevenue: WeeklyRevenueItem[];
}) => {
  const dayOrder = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const chartData = weeklyRevenue
    ?.map((item) => {
      const dayKey = Object.keys(item)[0];
      if (!dayKey) return null;

      return {
        day: dayKey.charAt(0).toUpperCase() + dayKey.slice(1),
        value: item[dayKey],
      };
    })
    .filter(Boolean)
    .sort((a, b) => dayOrder.indexOf(a!.day) - dayOrder.indexOf(b!.day));

  return (
    <div className="ui-container h-full w-full rounded-xl border bg-white p-5">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
        <p className="text-sm text-[#717680]">Total Revenue This week</p>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={chartData} margin={{ left: 10, right: 10 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f0f0f0"
          />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            dy={10}
            interval={0}
          />
          <YAxis hide={true} />

          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorValue)"
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
