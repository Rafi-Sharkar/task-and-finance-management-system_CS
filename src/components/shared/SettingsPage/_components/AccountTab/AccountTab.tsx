"use client";

import fallbackImage from "@/assets/fallback-image/user-avatar.jpg";
import InputField from "@/components/shared/dashboard/Form/InputField/InputField";
import InputPhoneField from "@/components/shared/dashboard/Form/InputPhoneField/InputPhoneField";
import { Button } from "@/components/ui/button";
import {
  useGetSingleUserQuery,
  useUpdateUserAvatarMutation,
  useUpdateUserMutation,
} from "@/redux/features/admin/user/user.api";
import { catchAsyncMutation } from "@/utils/apiReqRes.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import ChangePasswordSection from "./ChangePasswordSection";

const accountSchema = z.object({
  organization: z.string().min(1, "Organization name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
});

type AccountFormValues = z.infer<typeof accountSchema>;

export default function AccountTab() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch User Data
  const { data: userData, isLoading: isUserLoading } =
    useGetSingleUserQuery(undefined);

  // Mutations
  const [updateAvatar, { isLoading: isUpdatingAvatar }] =
    useUpdateUserAvatarMutation();
  const [updateUser] = useUpdateUserMutation();

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
  });

  // Populate form with user data
  useEffect(() => {
    if (userData?.data) {
      reset({
        organization: userData.data.username || "",
        email: userData.data.email || "",
        phone: userData.data.phone || "",
      });
    }
  }, [userData, reset]);

  // Handle Image Change
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      await catchAsyncMutation(updateAvatar(formData).unwrap(), (res) => {
        toast.success(res?.message || "Profile picture updated!");
        if (fileInputRef.current) fileInputRef.current.value = "";
      });
    }
  };

  // Handle Form Submission
  const onSubmit = async (data: AccountFormValues) => {
    await catchAsyncMutation(
      updateUser({ id: userData?.data?.id, data }).unwrap(),
      (res) => toast.success(res?.message || "Profile updated successfully!"),
    );
  };

  // Loading State
  if (isUserLoading)
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" />
      </div>
    );

  // Determine current image
  const currentImage = userData?.data?.avatarUrl || fallbackImage;
  // Determine active status
  const isActive = userData?.data?.isActive;

  return (
    <div className="w-full max-w-4xl space-y-10">
      <section>
        <h2 className="text-xl font-semibold text-[#181D27]">
          Profile Information
        </h2>
        <p className="mt-1.5 text-sm text-[#444]">
          Manage your personal details and keep your contact info up to date.
        </p>

        <div className="mt-10 flex items-center gap-6">
          <div className="relative h-24 w-24 rounded-full border-2 border-white">
            <Image
              src={currentImage}
              width={100}
              height={100}
              alt="User Profile"
              className="h-full w-full rounded-full border object-cover"
            />

            {isUpdatingAvatar && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
                <Loader2 className="h-6 w-6 animate-spin text-white" />
              </div>
            )}

            {isActive && (
              <div className="absolute top-1 right-0.5 h-5 w-5 rounded-full border-2 bg-[#16A34A]"></div>
            )}
          </div>

          <div className="flex gap-3">
            <input
              type="file"
              hidden
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
            />
            {/* <Button
              type="button"
              variant="outline"
              className="border-[#DC2727] px-6 py-5 text-[#DC2727] hover:bg-red-50 hover:text-red-600"
            >
              Delete
            </Button> */}

            <Button
              type="button"
              disabled={isUpdatingAvatar}
              onClick={() => fileInputRef.current?.click()}
              className="cursor-pointer bg-[#155DFC] px-6 py-5 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUpdatingAvatar ? "Uploading..." : "Update"}
            </Button>
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4">
          <InputField
            label="Organization Name"
            name="organization"
            placeholder="Please Enter Your Organization Name"
            error={errors.organization?.message}
            register={register}
            required
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter Your Valid Email"
            error={errors.email?.message}
            register={register}
            required
          />

          <InputPhoneField
            label="Phone Number"
            name="phone"
            register={register}
            error={errors.phone?.message}
            required
            placeholder="Enter your phone number"
          />

          <Button type="submit" className="btn-primary w-fit px-12 py-6!">
            Save
          </Button>
        </div>
      </form>

      <ChangePasswordSection />
    </div>
  );
}
