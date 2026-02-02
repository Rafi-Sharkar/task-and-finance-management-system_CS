"use client";

import { updateTemporaryPassword } from "@/services/auth/auth.service";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react"; // Added Eye icons
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react"; // Added useState
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// 1. Define the validation schema
const schema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    currentPassword: z.string().min(1, "Temp Password is required"),
    newPassword: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Must contain an uppercase letter")
        .regex(/[0-9]/, "Must contain a number")
        .regex(/[^A-Za-z0-9]/, "Must contain a special character"),
});

type FormData = z.infer<typeof schema>;

const UpdatePasswordPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showPassword, setShowPassword] = useState(false); // Toggle state

    const email = searchParams.get('email');
    const tempPassword = searchParams.get('tempPassword');

    // 2. Setup React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    // 3. Form Submit Handler
    const onSubmit = async (data: FormData) => {
        try {
            const res = (await updateTemporaryPassword(data)) as any;
            if (res?.success) {
                toast.success(
                    "Password reset Successfully! Login with your new password."
                );
                router.push(`/`);
            } else {
                if (Array.isArray(res.data.message)) {
                    res.data.message.forEach((msg: string) => {
                        console.log("Field Error:", msg);
                    });
                }
            }
        } catch (err: any) {
            console.error("Unexpected System Error:", err);
        }
    };

    return (
        <section className="flex h-screen w-full items-center justify-center">

            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm">
                {/* <button
                    onClick={() => router.back()}
                    aria-label="back"
                    className="absolute left-4 top-4 p-2 rounded-full border border-slate-100 bg-white cursor-pointer hover:text-primary transition-colors"
                >
                    <ArrowLeft size={18} />
                </button> */}

                <div className="text-center space-y-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Update Password</h1>
                    <p className="text-sm sm:text-base text-gray-600">Enter the temporary password sent to your email to set a new one.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm text-slate-600 mb-2">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            defaultValue={email || ""}
                            {...register("email")}
                            className={`w-full bg-slate-100 rounded-xl px-5 py-3 outline-none border transition-all border-transparent focus:ring-2 focus:ring-[#90aded]`}
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                    </div>

                    {/* Temporary Password Field */}
                    <div>
                        <label htmlFor="otp" className="block text-sm text-slate-600 mb-2">Temporary Password</label>
                        <input
                            id="otp"
                            type="text"
                            placeholder="Enter your temporary password"
                            defaultValue={tempPassword || ""}
                            {...register("currentPassword")}
                            className={`w-full bg-slate-100 rounded-xl px-5 py-3 outline-none border transition-all border-transparent focus:ring-2 focus:ring-[#90aded]`}
                        />
                        {errors.currentPassword && <p className="mt-1 text-xs text-red-500">{errors.currentPassword.message}</p>}
                    </div>

                    {/* Password Field with Toggle */}
                    <div>
                        <label htmlFor="password" className="block text-sm text-slate-600 mb-2">New Password</label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                {...register("newPassword")}
                                className={`w-full bg-slate-100 rounded-xl px-5 py-3 pr-12 outline-none border transition-all border-transparent focus:ring-2 focus:ring-[#90aded]`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.newPassword && <p className="mt-1 text-xs text-red-500">{errors.newPassword.message}</p>}
                    </div>

                    <div className="mt-8">
                        <button
                            type="submit"
                            disabled={!isValid || isSubmitting}
                            className={`w-full bg-[#155DFC] text-white py-3 rounded-lg shadow-md transition-colors cursor-pointer font-medium active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                        >
                            {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Update Password"}
                        </button>
                    </div>
                </form>
            </div>

        </section>
    );
};


export default UpdatePasswordPage;