"use client";

import DynamicModal from "@/components/shared/dashboard/DynamicModal/DynamicModal";
import InputField from "@/components/shared/dashboard/Form/InputField/InputField";
import { Button } from "@/components/ui/button";
import { useUpdatePasswordMutation } from "@/redux/features/admin/auditLogs/auditLogs.api";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { catchAsyncMutation } from "@/utils/apiReqRes.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Password Validation Schema
const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[@$!%*?&#]/, "Must contain at least one special character"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function ChangePasswordSection() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const currentUser = useAppSelector(useCurrentUser);

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const onPasswordSubmit = async (data: PasswordFormValues) => {
    const payload = {
      email: currentUser?.email,
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };

    await catchAsyncMutation(updatePassword(payload).unwrap(), (res) => {
      toast.success(res?.message || "Password updated successfully!");
      setShowChangePassword(false);
      reset();
    });
  };

  return (
    <section>
      <div className="flex items-center justify-between border-t pt-10">
        <div>
          <h2 className="text-xl font-semibold text-[#181D27]">
            Change Password
          </h2>
          <p className="mt-1.5 text-sm text-[#414651]">
            Choose a secure password.
          </p>
        </div>

        <div className="text-right">
          <button
            onClick={() => setShowChangePassword(true)}
            type="button"
            className="cursor-pointer text-base font-semibold text-[#155DFC] underline-offset-4 transition-all duration-300 hover:underline"
          >
            Change Password
          </button>

          <p className="mt-1.5 text-sm text-[#414651]">
            Last changed: September 16, 2025
          </p>
        </div>
      </div>

      <DynamicModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
        title="Change Your Password"
      >
        <form
          onSubmit={handleSubmit(onPasswordSubmit)}
          className="space-y-5 py-4"
        >
          <InputField
            label="Current Password"
            name="currentPassword"
            type="password"
            placeholder="********"
            error={errors.currentPassword?.message}
            register={register}
            required
          />

          <InputField
            label="New Password"
            name="newPassword"
            type="password"
            placeholder="********"
            error={errors.newPassword?.message}
            register={register}
            required
          />

          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="********"
            error={errors.confirmPassword?.message}
            register={register}
            required
          />

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={() => {
                setShowChangePassword(false);
                reset();
              }}
              className="btn-secondary"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="btn-primary">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Updating...
                </div>
              ) : (
                "Update Password"
              )}
            </Button>
          </div>
        </form>
      </DynamicModal>
    </section>
  );
}
