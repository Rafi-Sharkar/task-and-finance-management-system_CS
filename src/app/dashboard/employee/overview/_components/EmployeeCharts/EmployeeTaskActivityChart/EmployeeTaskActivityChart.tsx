"use client";
import { useMemo } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Label, Pie, PieChart } from "recharts";
import { TaskActivityProps } from "@/app/dashboard/admin/overview/_components/GridBox/GridBox";

interface MyTaskActivityProps {
  myTaskActivity: TaskActivityProps["taskActivity"];
}

const chartConfig = {
  incomplete: {
    label: "Incomplete",
    color: "#DC2727",
  },
  complete: {
    label: "Complete",
    color: "#16A34A",
  },
  inProgress: {
    label: "In Progress",
    color: "#C98904",
  },
} satisfies ChartConfig;

export default function EmployeeTaskActivityChart({
  myTaskActivity,
}: MyTaskActivityProps) {
  const chartData = useMemo(
    () => [
      {
        status: "incomplete",
        value: myTaskActivity?.incomplete?.percentage || 0,
        fill: chartConfig.incomplete.color,
      },
      {
        status: "complete",
        value: myTaskActivity?.completed?.percentage || 0,
        fill: chartConfig.complete.color,
      },
      {
        status: "inProgress",
        value: myTaskActivity?.inProgress?.percentage || 0,
        fill: chartConfig.inProgress.color,
      },
    ],
    [myTaskActivity],
  );

  // 2. Display the average activity in the center
  const totalActivity = myTaskActivity?.totalActivityAverage || 0;

  return (
    <div className="ui-container">
      {/* Header */}
      <div>
        <p className="text-base text-[#9291A5]">Statistics</p>
        <h2 className="text-2xl font-semibold text-[#1E1B39]">Task Activity</h2>
      </div>

      {/* Charts */}
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-w-96"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="status"
            innerRadius={100}
            outerRadius={140}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-[32px] font-bold text-[#181D27]"
                      >
                        {totalActivity.toFixed(1)}%
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 32}
                        className="fill-muted-foreground text-base text-[#414651]"
                      >
                        Total Activity
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>

      {/* Footer / Legend */}
      <div className="flex-col gap-2 text-sm">
        <div className="flex w-full flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#DC2727]" />
            <span className="text-sm font-medium text-[#414651]">
              Incomplete ({myTaskActivity?.incomplete?.count})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#16A34A]" />
            <span className="text-sm font-medium text-[#414651]">
              Complete ({myTaskActivity?.completed?.count})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#C98904]" />
            <span className="text-sm font-medium text-[#414651]">
              In Progress ({myTaskActivity?.inProgress?.count})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
