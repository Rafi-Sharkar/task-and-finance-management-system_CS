/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import InputField from "@/components/shared/dashboard/Form/InputField/InputField";
import { Button } from "@/components/ui/button";
import { setAuth } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { loginUser } from "@/services/auth/auth.service";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

// Login Validation Schema
const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
});

type LoginFormValues = z.infer<typeof loginSchema>;

function DashboardLoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const router = useRouter();
  const dispatch = useAppDispatch();

  const onLoginSubmit = async (data: LoginFormValues) => {
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      const res = (await loginUser(userInfo)) as any;

      if (res?.success) {
        if (res?.data?.user?.changePasswordRequired) {
          toast.success(res?.message || 'Need to change password');
          router.push(`/update-password`);
        } else {
          const user = {
            id: res?.data?.user?.id,
            email: res?.data?.user?.email,
            username: res?.data?.user?.username,
            fullName: res?.data?.user?.fullName,
            role: res?.data?.user?.role,
            profilePicture: res?.data?.user?.avatarUrl,
            phone: res?.data?.user?.phone,
            accountStatus: res?.data?.user?.accountStatus,
          };

          dispatch(setAuth({ user }));

          toast.success(res?.message || 'Login successful');
          router.push("/login");

          // Role based routing
          // const role = res?.data?.user?.role;
          // console.log("user role:", role);
          // if (role === userRole.SUPER_ADMIN || role === userRole.ADMIN) {
          //   router.push(`/dashboard/admin/overview`);
          // } else if (role === userRole.MANAGER) {
          //   router.push(`/dashboard/manager/overview`);
          // } else if (role === userRole.EMPLOYEE) {
          //   router.push(`/dashboard/employee/overview`);
          // } else if (role === userRole.FINANCE) {
          //   router.push(`/dashboard/finance/overview`);
          // } else if (role === userRole.CLIENT) {
          //   router.push(`/dashboard/client/overview`);
          // }
        }
      } else {
        const errorMessage = res?.data?.message || 'Login failed';
        toast.error(typeof errorMessage === 'string' ? errorMessage : 'Login failed');
      }
    } catch (err: any) {
      console.log(err);
      toast.error('An error occurred during login');
    }
  };


  return (
    <section className="flex h-screen w-full items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm">
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-sm sm:text-base text-gray-600">Sign in to access your dashboard</p>
        </div>
        <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-6 mt-10">
          {/* Email Field */}
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter Email"
            error={errors.email?.message}
            register={register}
            required
            className={`w-full bg-slate-100 rounded-xl px-5 py-3 outline-none border transition-all border-transparent focus:ring-2 focus:ring-[#90aded] disabled:text-slate-600`}
          />

          {/* Password Field */}
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter Password"
            error={errors.password?.message}
            register={register}
            required
            className={`w-full bg-slate-100 rounded-xl px-5 py-3 outline-none border transition-all border-transparent focus:ring-2 focus:ring-[#90aded] disabled:text-slate-600`}
          />

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link href="/forget-password" className="text-sm text-[#155DFC] hover:underline">Forgot Password?</Link>
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`w-full bg-[#155DFC] text-white rounded-lg shadow-md transition-colors cursor-pointer font-medium active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-4 h-11`}
          >
            {isSubmitting ? <span className="flex items-center justify-center"><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Signing In...</span> : "Sign In"}
          </Button>
        </form>
      </div>
    </section>
  );
}

export default DashboardLoginPage;
