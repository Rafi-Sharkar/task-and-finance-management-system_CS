"use client"
import DynamicStatsCard from "@/components/shared/dashboard/DynamicStatsCard/DynamicStatsCard";
import { useGetTaskSummaryQuery } from "@/redux/features/admin/tasks/tasks.api";

// task type
type TaskManagementStatsDataType = {
  id: number;
  title: string;
  value: number;
  color: string
};

function Stats() {
  const { data: getTaskSummary } = useGetTaskSummaryQuery({})

  const TaskManagementStatsData: TaskManagementStatsDataType[] = [
    {
      id: 1,
      title: "Total Tasks",
      value: getTaskSummary?.data.totalTasks || 0,
      color: "#2563EB",
    },
    {
      id: 2,
      title: "In Progress",
      value: getTaskSummary?.data.pendingTasks || 0,
      color: "#C98904",
    },
    {
      id: 3,
      title: "Completed",
      value: getTaskSummary?.data.completedTasks || 0,
      color: "#16A34A",
    },
    {
      id: 4,
      title: "Not Completed",
      value: getTaskSummary?.data.notcompletedTasks || 0,
      color: "#DC2727",
    },
  ];




  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
      {TaskManagementStatsData.map((stat) => {

        return (
          <DynamicStatsCard
            key={stat?.id}
            title={stat?.title}
            value={stat?.value}
            color={stat?.color}
          />
        );
      })}
    </div>
  );
}

export default Stats;
