/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Label, Pie, PieChart, Cell } from "recharts";

const chartConfig = {
  incomplete: { label: "Incomplete", color: "#DC2727" },
  complete: { label: "Complete", color: "#16A34A" },
  inProgress: { label: "In Progress", color: "#C98904" },
} satisfies ChartConfig;

interface FinanceTaskActivityChartProps {
  taskActivityChart: {
    incomplete: number;
    complete: number;
    inProgress: number;
  };
}

export default function FinanceTaskActivityChart({ taskActivityChart }: FinanceTaskActivityChartProps) {
  const chartData = [
    { status: "incomplete", value: taskActivityChart?.incomplete || 0 },
    { status: "complete", value: taskActivityChart?.complete || 0 },
    { status: "inProgress", value: taskActivityChart?.inProgress || 0 },
  ];

  const totalRaw = chartData.reduce((acc, curr) => acc + curr.value, 0);
  const activityPercentage = totalRaw > 0
    ? Math.round(((taskActivityChart?.complete + taskActivityChart?.inProgress) / totalRaw) * 100)
    : 0;

  return (
    <div className="ui-container bg-white rounded-xl p-6 border">
      <div>
        <p className="text-base text-[#9291A5]">Statistics</p>
        <h2 className="text-2xl font-semibold text-[#1E1B39]">Task Activity</h2>
      </div>

      <ChartContainer config={chartConfig} className="mx-auto aspect-square max-w-80">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="status"
            innerRadius={80}
            outerRadius={110}
            strokeWidth={0}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={(chartConfig as any)[entry.status].color} />
            ))}
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                        {activityPercentage}%
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground text-sm">
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

      <div className="flex justify-center gap-4 mt-4">
        {Object.entries(chartConfig).map(([key, config]) => (
          <div key={key} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: config.color }} />
            <span className="text-xs font-medium text-gray-600">{config.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}