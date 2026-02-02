"use client";
import { useMemo } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Label, Pie, PieChart } from "recharts";

// 1. Defining the local interface if not imported
interface TaskActivityData {
  completed: { count: number; percentage: number };
  incomplete: { count: number; percentage: number };
  inProgress: { count: number; percentage: number };
  totalTasks: number;
  totalActivityAverage: number;
}

interface ManagerTaskActivityChartProps {
  taskActivity: TaskActivityData;
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

export default function ManagerTaskActivityChart({
  taskActivity,
}: ManagerTaskActivityChartProps) {
  // 2. Transform the API data for the Pie Chart
  const chartData = useMemo(
    () => [
      {
        status: "incomplete",
        value: taskActivity?.incomplete?.count || 0,
        fill: chartConfig.incomplete.color,
      },
      {
        status: "complete",
        value: taskActivity?.completed?.count || 0,
        fill: chartConfig.complete.color,
      },
      {
        status: "inProgress",
        value: taskActivity?.inProgress?.count || 0,
        fill: chartConfig.inProgress.color,
      },
    ],
    [taskActivity],
  );

  // 3. Get the average activity percentage for the center label
  const totalActivityAverage = taskActivity?.totalActivityAverage || 0;

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
            outerRadius={140} // Slightly adjusted for better fit
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
                        {totalActivityAverage.toFixed(2)}%
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
        <div className="flex flex-wrap w-full justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#DC2727]" />
            <span className="text-sm font-medium text-[#414651]">
              Incomplete ({taskActivity?.incomplete?.count})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#16A34A]" />
            <span className="text-sm font-medium text-[#414651]">
              Complete ({taskActivity?.completed?.count})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#C98904]" />
            <span className="text-sm font-medium text-[#414651]">
              In Progress ({taskActivity?.inProgress?.count})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
