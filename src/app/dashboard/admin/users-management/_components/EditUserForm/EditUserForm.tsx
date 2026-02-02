"use client";
import InputField from "@/components/shared/dashboard/Form/InputField/InputField";
import SelectField from "@/components/shared/dashboard/Form/SelectField/SelectField";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Form Schema using Zod
const userFormSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(2, "Username must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  role: z.string().min(1, "Please select a role"),
});

type UserFormValues = z.infer<typeof userFormSchema>;

interface EditUserFormProps {
  onClose?: () => void;
  userData: {
    id: string | number;
    username: string;
    email: string;
    password: string;
    role: string;
  };
}

const EditUserForm: React.FC<EditUserFormProps> = ({ onClose, userData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    mode: "onChange",
    defaultValues: {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      role: userData.role,
    },
  });

  const roleOptions = [
    { value: "manager", label: "Manager" },
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
    { value: "client", label: "Client" },
    { value: "accountant", label: "Accountant" },
  ];

  const handleFormSubmit = (data: UserFormValues) => {
    console.log("User updated:", { ...data, id: userData.id });
    alert("User updated successfully!");
    reset();
    if (onClose) onClose();
  };

  const handleCancel = () => {
    reset();
    if (onClose) onClose();
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
          className="flex-1 rounded-md border border-[#D5D7DA] py-6 font-bold text-[#0A0D12] transition-colors hover:bg-gray-50"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          onClick={handleSubmit(handleFormSubmit)}
          disabled={isSubmitting}
          className="flex-1 rounded-md bg-[#155DFC] py-6 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          {isSubmitting ? "Updating..." : "Update User"}
        </Button>
      </div>
    </div>
  );
};

export default EditUserForm;
