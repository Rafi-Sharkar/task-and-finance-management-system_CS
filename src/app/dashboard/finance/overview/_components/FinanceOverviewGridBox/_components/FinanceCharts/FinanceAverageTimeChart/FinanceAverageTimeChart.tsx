"use client";

import { useMemo } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts";

const chartConfig = {
  hours: {
    label: "Hours",
  },
} satisfies ChartConfig;

interface ActivityData {
  day: string;
  durationSec: number;
  durationFormatted: string;
  isToday: boolean;
}

interface ActivityDashboardProps {
  activityDashboard: {
    averageTimeSpent: string;
    weeklyData: ActivityData[];
  };
}

export default function FinanceAverageTimeChart({
  activityDashboard,
}: ActivityDashboardProps) {
  // 1. Transform API data for Recharts
  const chartData = useMemo(() => {
    return (activityDashboard?.weeklyData || []).map((item) => ({
      day: item.day,
      // Convert seconds to decimal hours for bar height (e.g., 3600s = 1hr)
      hours: Number((item.durationSec / 3600).toFixed(2)),
      formatted: item.durationFormatted,
      isToday: item.isToday,
    }));
  }, [activityDashboard]);

  // 2. Find max hours to adjust Y-Axis scale if needed
  const maxHours = Math.max(...chartData.map((d) => d.hours), 8);

  return (
    <div className="ui-container rounded-xl border bg-white p-6">
      {/* Header */}
      <div>
        <p className="text-base text-[#9291A5]">Average time spent</p>
        <h2 className="text-2xl font-semibold text-[#1E1B39]">
          {activityDashboard?.averageTimeSpent || "0h 0m"}
        </h2>
      </div>

      {/* Charts */}
      <ChartContainer config={chartConfig} className="mt-6 h-80 w-full">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
        >
          <CartesianGrid
            strokeDasharray="6 6"
            vertical={false}
            stroke="#D5D7DA"
          />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            className="text-sm text-[#615E83]"
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            domain={[0, Math.ceil(maxHours)]}
            ticks={[0, 2, 4, 6, 8]}
            tickFormatter={(value) => `${value} hr`}
            className="text-sm text-[#615E83]"
          />
          <ChartTooltip
            cursor={{ fill: "transparent" }}
            content={
              <ChartTooltipContent
                hideLabel
                formatter={(_, __, props) => {
                  // Use the pre-formatted string from our data mapping
                  return props.payload.formatted;
                }}
              />
            }
          />
          <Bar dataKey="hours" radius={[4, 4, 0, 0]} maxBarSize={40}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                // Blue if isToday is true, otherwise Light Gray
                fill={entry.isToday ? "#155DFC" : "#E9EAEB"}
              />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
}