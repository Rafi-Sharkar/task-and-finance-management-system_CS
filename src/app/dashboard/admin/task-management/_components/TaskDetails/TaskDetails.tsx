/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import InputField from "@/components/shared/dashboard/Form/InputField/InputField";
import SearchableSelect from "@/components/shared/dashboard/Form/SearchableSelect/SearchableSelect";
import { Label } from "@/components/ui/label";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

interface TaskDetailsProps {
  taskData: any;
}

function TaskDetails({ taskData }: TaskDetailsProps) {
  const { register, control, reset } = useForm({
    defaultValues: {
      title: "",
      employeeIds: [],
      deadline: "",
    },
  });

  const memberOptions = useMemo(() => {
    return (
      taskData?.assignments?.map((assign: any) => ({
        value: assign.employeeId,
        label:
          assign.employee?.fullName ||
          assign.employee?.username ||
          "Unknown Employee",
      })) || []
    );
  }, [taskData]);

  useEffect(() => {
    if (taskData) {
      reset({
        title: taskData.title,
        employeeIds: taskData.assignments?.map((a: any) => a.employeeId) || [],
        deadline: taskData.deadline ? taskData.deadline.split("T")[0] : "",
      });
    }
  }, [taskData, reset]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-[#F04438]";
      case "MEDIUM":
        return "bg-[#F79009]";
      case "LOW":
        return "bg-[#17B26A]";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="space-y-5">
      <InputField label="Task Name" name="title" register={register} readOnly />

      <SearchableSelect
        label="Assigned Members"
        name="employeeIds"
        options={memberOptions}
        control={control}
        disabled={true}
      />

      <div className="space-y-2">
        <Label className="text-sm font-semibold text-[#181D27]">Priority</Label>
        <div className="flex h-12 w-full items-center gap-2 rounded-md border border-[#D5D7DA] bg-gray-50 px-3">
          <span
            className={`h-2.5 w-2.5 rounded-full ${getPriorityColor(taskData?.priority)}`}
          />
          <span className="text-sm font-medium">
            {taskData?.priority || "N/A"}
          </span>
        </div>
      </div>

      <InputField
        label="Task Deadline"
        name="deadline"
        register={register}
        readOnly
      />

      <div className="space-y-2">
        <Label className="text-sm font-semibold text-[#181D27]">
          Current Status
        </Label>
        <div className="flex h-12 items-center rounded-md border bg-gray-50 px-3 text-sm">
          {taskData?.status?.replace("_", " ")}
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
