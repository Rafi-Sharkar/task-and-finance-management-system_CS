"use client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

const chartConfig = {
  pending: { label: "Pending", color: "#C98904" },
  overdue: { label: "Overdue", color: "#DC2727" },
} satisfies ChartConfig;

interface TotalUsersChartProps {
  totalUsersChart: {
    pending: number;
    overdue: number;
  };
}

export default function FinanceTotalUsersChart({ totalUsersChart }: TotalUsersChartProps) {
  const data = [
    {
      name: "Invoices",
      pending: totalUsersChart?.pending || 0,
      overdue: totalUsersChart?.overdue || 0,
    },
  ];

  const totalCount = (totalUsersChart?.pending || 0) + (totalUsersChart?.overdue || 0);

  return (
    <div className="ui-container bg-white rounded-xl p-6 border">
      <div className="pb-0">
        <p className="text-base text-[#9291A5]">Statistics</p>
        <h2 className="text-2xl font-semibold text-[#1E1B39]">Invoice Status</h2>
      </div>

      <ChartContainer config={chartConfig} className="mx-auto aspect-square w-full max-w-80">
        <RadialBarChart data={data} endAngle={180} innerRadius={90} outerRadius={140}>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) - 15} className="fill-muted-foreground text-sm">
                        Total Invoices
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 20} className="fill-foreground text-3xl font-bold">
                        {totalCount.toLocaleString()}
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
          <RadialBar
            dataKey="pending"
            stackId="a"
            cornerRadius={5}
            fill={chartConfig.pending.color}
          />
          <RadialBar
            dataKey="overdue"
            fill={chartConfig.overdue.color}
            stackId="a"
            cornerRadius={5}
          />
        </RadialBarChart>
      </ChartContainer>

      <div className="flex justify-center gap-6 mt-2">
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