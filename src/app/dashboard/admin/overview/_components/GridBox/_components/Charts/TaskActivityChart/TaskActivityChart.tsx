/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Label, Pie, PieChart } from "recharts";
import { useMemo } from "react";
import { TaskActivityProps } from "../../../GridBox";

const chartConfig = {
  incomplete: {
    label: "Incomplete",
    color: "#DC2727",
  },
  completed: {
    label: "Complete",
    color: "#16A34A",
  },
  inProgress: {
    label: "In Progress",
    color: "#C98904",
  },
} satisfies ChartConfig;

export default function TaskActivityChart({ taskActivity }: TaskActivityProps) {
  const chartData = useMemo(
    () => [
      {
        status: "incomplete",
        value: taskActivity?.incomplete?.count || 0,
        fill: chartConfig.incomplete.color,
      },
      {
        status: "completed",
        value: taskActivity?.completed?.count || 0,
        fill: chartConfig.completed.color,
      },
      {
        status: "inProgress",
        value: taskActivity?.inProgress?.count || 0,
        fill: chartConfig.inProgress.color,
      },
    ],
    [taskActivity],
  );

  const averageActivity = taskActivity?.totalActivityAverage || 0;

  return (
    <div className="ui-container">
      <div>
        <p className="text-base text-[#9291A5]">Statistics</p>
        <h2 className="text-2xl font-semibold text-[#1E1B39]">Task Activity</h2>
      </div>

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
                        {averageActivity.toFixed(2)}%
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

      <div className="flex-col gap-2 text-sm">
        <div className="flex w-full flex-wrap justify-center gap-6">
          {Object.entries(chartConfig).map(([key, config]) => (
            <div key={key} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: config?.color }}
              />
              <span className="text-sm font-medium text-[#414651]">
                {config?.label} ({(taskActivity as any)?.[key]?.count || 0})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
