/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import InputField from "@/components/shared/dashboard/Form/InputField/InputField";
import SearchableSelect from "@/components/shared/dashboard/Form/SearchableSelect/SearchableSelect";
import SelectField from "@/components/shared/dashboard/Form/SelectField/SelectField";
import { Button } from "@/components/ui/button";
import { useUpdateTaskMutation } from "@/redux/features/admin/tasks/tasks.api";
import { useGetAllUsersAndEmployeesQuery } from "@/redux/features/admin/usersAndEmployees/usersAndEmployees.api";
import { catchAsyncMutation } from "@/utils/apiReqRes.utils";
import { formatDate } from "@/utils/formatDateTime";
import { toast } from "sonner";

const editTaskSchema = z.object({
  title: z.string().min(1, "Task name is required"),
  employeeIds: z.array(z.string()).min(1, "Please assign at least one member"),
  priority: z.string().min(1, "Please select priority"),
  deadline: z.string().min(1, "Deadline is required"),
});

type EditTaskValues = z.infer<typeof editTaskSchema>;

const EditTaskForm = ({
  onClose,
  taskData,
}: {
  onClose: () => void;
  taskData: any;
}) => {
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const { data: clientsResponse } = useGetAllUsersAndEmployeesQuery(undefined);

  const memberOptions =
    clientsResponse?.data?.map((user: any) => ({
      label: user.fullName || user.username || user.email,
      value: user.id,
    })) || [];

  const priorityOptions = [
    { value: "LOW", label: "Low" },
    { value: "MEDIUM", label: "Medium" },
    { value: "HIGH", label: "High" },
  ];

  // Format deadline for input[type="date"] (YYYY-MM-DD)
  const formattedDeadlineForInput = taskData?.deadline
    ? new Date(taskData.deadline).toISOString().split("T")[0]
    : "";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EditTaskValues>({
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      title: taskData?.title || "",
      employeeIds: taskData?.assignments?.map((a: any) => a.employeeId) || [],
      priority: taskData?.priority || "LOW",
      deadline: formattedDeadlineForInput,
    },
  });

  const onSubmit = async (values: EditTaskValues) => {
    if (values.title.trim() === "") {
      toast.error("Task name cannot be empty");
      return;
    }

    const payload = {
      taskId: taskData.id,
      title: values.title,
      employeeIds: values.employeeIds,
      priority: values.priority,
      deadline: new Date(values.deadline).toISOString(),
    };

    await catchAsyncMutation(updateTask(payload).unwrap(), (res) => {
      toast.success(res?.message || "Task updated successfully!");
      onClose();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <InputField
        label="Task Name"
        name="title"
        placeholder="Enter task title"
        register={register}
        required
        error={errors.title?.message}
      />

      <SearchableSelect
        label="Assign Members"
        name="employeeIds"
        placeholder="Search and select members"
        options={memberOptions}
        control={control}
        required
        error={errors.employeeIds?.message}
      />

      <SelectField
        label="Priority"
        name="priority"
        placeholder="Select Priority"
        options={priorityOptions}
        control={control}
        required
        error={errors.priority?.message}
      />

      <div className="space-y-2">
        <InputField
          label="Task Deadline"
          name="deadline"
          type="date"
          register={register}
          required
          error={errors.deadline?.message}
        />
        {taskData?.deadline && (
          <p className="text-xs text-[#667085]">
            Current: {formatDate(taskData.deadline)}
          </p>
        )}
      </div>

      <div className="flex gap-4 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="h-12 flex-1 font-bold"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || isUpdating}
          className="h-12 flex-1 bg-[#155DFC] text-white"
        >
          {isSubmitting || isUpdating ? "Updating..." : "Update Task"}
        </Button>
      </div>
    </form>
  );
};

export default EditTaskForm;
