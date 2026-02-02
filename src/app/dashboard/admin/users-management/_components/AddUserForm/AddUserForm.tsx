"use client";
import InputField from "@/components/shared/dashboard/Form/InputField/InputField";
import SelectField from "@/components/shared/dashboard/Form/SelectField/SelectField";
import { Button } from "@/components/ui/button";
import { userRole } from "@/constants/userRole.constant";
import { useCreateUserMutation } from "@/redux/features/admin/user/user.api";

import { catchAsyncMutation } from "@/utils/apiReqRes.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Form Schema using Zod
const userFormSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(2, "Username must be at least 2 characters"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  role: z.string().min(1, "Please select a role"),
});

type UserFormValues = z.infer<typeof userFormSchema>;

interface AddUserFormProps {
  onClose?: () => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onClose }) => {
  //create user hook
  const [createUser] = useCreateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    control,
  } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    mode: "onChange",
  });

  const roleOptions = [
    { value: userRole.ADMIN, label: "Admin" },
    { value: userRole.MANAGER, label: "Manager" },
    { value: userRole.CLIENT, label: "Client" },
    { value: userRole.EMPLOYEE, label: "Employee" },
    { value: userRole.FINANCE, label: "Finance" },
  ];

  const handleCancel = () => {
    reset();
    if (onClose) onClose();
  };

  //Handle form submit
  const handleFormSubmit = async (data: UserFormValues) => {
    await catchAsyncMutation(
      // 1. Execute the mutation
      createUser(data).unwrap(),
      // 2. Handle Success Case
      (res) => {
        toast.success(
          res?.message || "User account has been created successfully!",
        );
        reset();
        if (onClose) onClose();
      },
    );
  };

  return (
    <div className="space-y-5">
      <InputField
        label="Username"
        name="username"
        placeholder="Sarah John"
        error={errors.username?.message}
        register={register}
        required
      />

      <InputField
        label="Email"
        name="email"
        type="email"
        placeholder="sarah@gmail.com"
        error={errors.email?.message}
        register={register}
        required
      />

      <InputField
        label="Password"
        name="password"
        type="password"
        placeholder="********"
        error={errors.password?.message}
        register={register}
        required
      />

      <SelectField
        label="Select Role"
        name="role"
        options={roleOptions}
        error={errors.role?.message}
        control={control}
        required
        placeholder="Choose a role"
      />

      <div className="flex gap-4">
        <Button
          type="button"
          variant="ghost"
          onClick={handleCancel}
          className="btn-secondary"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          onClick={handleSubmit(handleFormSubmit)}
          disabled={isSubmitting || !isValid}
          className={`btn-primary`}
        >
          {isSubmitting ? "Adding..." : "Add User"}
        </Button>
      </div>
    </div>
  );
};

export default AddUserForm;
