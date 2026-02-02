/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import DynamicModal from "@/components/shared/dashboard/DynamicModal/DynamicModal";
import InputField from "@/components/shared/dashboard/Form/InputField/InputField";
import SearchableSelect from "@/components/shared/dashboard/Form/SearchableSelect/SearchableSelect";
import SelectField from "@/components/shared/dashboard/Form/SelectField/SelectField";
import { Button } from "@/components/ui/button";
import { useCreateTaskMutation } from "@/redux/features/admin/tasks/tasks.api";
import { useGetAllUsersQuery } from "@/redux/features/admin/user/user.api";
import { catchAsyncMutation } from "@/utils/apiReqRes.utils";
import { toast } from "sonner";

const createTaskSchema = z.object({
  title: z.string().min(1, "Task name is required"),
  employeeIds: z.array(z.string()).min(1, "Please assign at least one member"),
  priority: z.string().min(1, "Please select priority"),
  deadline: z.string().min(1, "Deadline is required"),
});

type CreateTaskValues = z.infer<typeof createTaskSchema>;

interface CreateTaskFormProps {
  onClose: () => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onClose }) => {
  const [, setUserSearchTerm] = useState("");
  const [createTask] = useCreateTaskMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateTaskValues>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      employeeIds: [],
      priority: "LOW",
      deadline: "",
    },
  });

  const priorityOptions = [
    { value: "LOW", label: "Low" },
    { value: "MEDIUM", label: "Medium" },
    { value: "HIGH", label: "High" },
  ];

  const { data: clientsResponse } = useGetAllUsersQuery(undefined);


  const memberOptions =
    clientsResponse?.data?.data
      ?.filter(
        (user: any) =>
          user.role === "MANAGER" || user.role === "EMPLOYEE"
      )
      ?.map((user: any) => {
        const displayName = user.fullName || user.username || user.email;
        const roleTag = user.role === "MANAGER" ? "Manager" : "Employee";

        return {
          label: (
            <div className="flex items-center w-full">
              <span>{displayName}</span>
              <span className="text-xs text-gray-500 ml-2">({roleTag})</span>
            </div>
          ),
          value: user.id,
          searchText: displayName,
        };
      }) || [];

  const onSubmit = async (data: CreateTaskValues) => {
    const finalData = {
      ...data,
      status: "IN_PROGRESS",
    };

    await catchAsyncMutation(createTask(finalData).unwrap(), (res) => {
      toast.success(res?.message || "Task has been created successfully!");
      reset();
      if (onClose) onClose();
    });
  };

  return (
    <div className="space-y-5">
      <InputField
        label="Task Name"
        name="title"
        placeholder="Enter task title"
        error={errors.title?.message}
        register={register}
        required
      />

      <SearchableSelect
        label="Assign Members"
        name="employeeIds"
        placeholder="Search and select member"
        options={memberOptions}
        control={control}
        error={errors.employeeIds?.message}
        onSearchChange={setUserSearchTerm}
        required
      />

      <SelectField
        label="Priority"
        name="priority"
        placeholder="Select Priority"
        options={priorityOptions}
        error={errors.priority?.message}
        control={control}
        required
      />

      <InputField
        label="Task Deadline"
        name="deadline"
        type="date"
        error={errors.deadline?.message}
        register={register}
        required
      />

      <div className="flex gap-4 pt-2">
        <Button
          type="button"
          variant="ghost"
          onClick={onClose}
          className="flex-1 rounded-md border border-[#D5D7DA] py-6 font-bold text-[#0A0D12] transition-colors hover:bg-gray-50"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="flex-1 rounded-md bg-[#155DFC] py-6 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          {isSubmitting ? "Creating..." : "Create Task"}
        </Button>
      </div>
    </div>
  );
};

const CreateNewTask = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-[#155DFC] hover:bg-[#0351f8]"
      >
        <Plus size={20} className="mr-2" strokeWidth={1.5} />
        Create New Task
      </Button>

      <DynamicModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create New Task"
      >
        <CreateTaskForm onClose={() => setIsOpen(false)} />
      </DynamicModal>
    </>
  );
};

export default CreateNewTask;
