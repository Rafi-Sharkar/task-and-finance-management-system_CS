"use client";
import { useMemo } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ActivityDashboardProps } from "@/app/dashboard/admin/overview/_components/GridBox/GridBox";

interface EmployeeAverageTimeChartProps {
  activityDashboard: ActivityDashboardProps["activityDashboard"];
}

const chartConfig = {
  hours: {
    label: "Hours",
  },
} satisfies ChartConfig;

export default function EmployeeAverageTimeChart({
  activityDashboard,
}: EmployeeAverageTimeChartProps) {
  const chartData = useMemo(() => {
    return (
      activityDashboard?.weeklyData?.map((item) => ({
        day: item.day,
        hours: item.durationSec / 3600,
        formatted: item.durationFormatted,
        fill: item.isToday ? "#155DFC" : "#E9EAEB",
      })) || []
    );
  }, [activityDashboard]);

  return (
    <div className="ui-container">
      {/* Header */}
      <div>
        <p className="text-base text-[#9291A5]">Average time spent</p>
        <h2 className="text-2xl font-semibold text-[#1E1B39]">
          {activityDashboard?.averageTimeSpent || "0m"}
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
            ticks={[0, 2, 4, 6, 8]}
            tickFormatter={(value) => `${value} hr`}
            className="text-sm text-[#615E83]"
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                hideLabel
                formatter={(value, name, props) => {
                  return props.payload.formatted;
                }}
              />
            }
            cursor={{ fill: "transparent" }}
          />
          <Bar
            dataKey="hours"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
            fill="currentColor"
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
