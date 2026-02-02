"use client";
import { useMemo } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { UserStats } from "@/app/dashboard/admin/overview/_components/GridBox/GridBox";

const chartConfig = {
  pending: {
    label: "Pending",
    color: "#C98904",
  },
  active: {
    label: "Active",
    color: "#16A34A",
  },
  inactive: {
    label: "Inactive",
    color: "#D5D7DA",
  },
} satisfies ChartConfig;

export default function ManagerTotalUsersChart({ userStats }: UserStats) {
  const chartData = useMemo(
    () => [
      {
        name: "users",
        pending: userStats?.pending || 0,
        active: userStats?.active || 0,
        inactive: userStats?.inactive || 0,
      },
    ],
    [userStats],
  );

  const totalUsers = userStats?.total || 0;

  return (
    <div className="ui-container">
      {/* Header */}
      <div className="items-center pb-0">
        <p className="text-base text-[#9291A5]">Statistics</p>
        <h2 className="text-2xl font-semibold text-[#1E1B39]">Total Users</h2>
      </div>

      {/* Charts */}
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square w-full max-w-80"
      >
        <RadialBarChart
          data={chartData}
          endAngle={180}
          innerRadius={100}
          outerRadius={190}
        >
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) - 20}
                        className="fill-muted-foreground text-base text-[#414651]"
                      >
                        Total Count
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 15}
                        className="fill-foreground text-[32px] font-bold text-[#181D27]"
                      >
                        {totalUsers.toLocaleString()}
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
            fill="var(--color-pending)"
            className="stroke-transparent stroke-2"
          />
          <RadialBar
            dataKey="active"
            fill="var(--color-active)"
            stackId="a"
            cornerRadius={5}
            className="stroke-transparent stroke-2"
          />
          <RadialBar
            dataKey="inactive"
            fill="var(--color-inactive)"
            stackId="a"
            cornerRadius={5}
            className="stroke-transparent stroke-2"
          />
        </RadialBarChart>
      </ChartContainer>

      {/* Footer / Legend */}
      <div className="flex-col gap-2 pt-4 text-sm">
        <div className="flex flex-wrap w-full justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-[#C98904]" />
            <span className="text-sm font-medium text-[#414651]">
              Pending ({userStats?.pending})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-[#16A34A]" />
            <span className="text-sm font-medium text-[#414651]">
              Active ({userStats?.active})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-[#D5D7DA]" />
            <span className="text-sm font-medium text-[#414651]">
              Inactive ({userStats?.inactive})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
