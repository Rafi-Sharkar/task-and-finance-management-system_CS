/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { forgetPassword } from '@/services/auth/auth.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

// 1. Define the schema
const schema = z.object({
    email: z
        .email("Please enter a valid email address")
        .min(1, "Email is required")
});

// Infer the type from the schema
type FormData = z.infer<typeof schema>;

export default function ForgetPasswordPage() {
    const router = useRouter();

    // 2. Initialize the form
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
        },
        mode: "onChange",
    });

    // 3. Handle Submit
    const onSubmit = async (data: FormData) => {
        try {
            const userInfo = {
                email: data.email,
            };
            console.log(userInfo, 'userInfo')
            const res = (await forgetPassword(userInfo)) as any;
            console.log(res, "res")
            if (res?.success) {
                toast.success(
                    "Password reset OTP sent to your email."
                );
                router.push(`/change-password?email=${data.email}`);
            } else {
                console.log("Validation Errors:", res.data.message);

                // Handle the array of messages
                if (Array.isArray(res.data.message)) {
                    res.data.message.forEach((msg: string) => {
                        // You can use a toast here
                        console.log("Field Error:", msg);
                    });
                }
            }
        } catch (err: any) {
            console.log("Unexpected System Error:", err);
        }
    };

    return (
        <section className="flex h-screen w-full items-center justify-center">

            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm relative">
                <button
                    onClick={() => router.back()}
                    aria-label="back"
                    className="absolute left-4 top-4 p-2 rounded-full border border-slate-100 bg-white cursor-pointer hover:text-primary"
                >
                    <ArrowLeft size={18} />
                </button>

                <div className="text-center space-y-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Forget Password</h1>
                    <p className="text-sm sm:text-base text-gray-600">Enter your email to reset your password</p>
                </div>

                {/* 4. Connect handleSubmit */}
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                    <label htmlFor="email" className="block text-sm text-slate-600 mb-2">Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        {...register("email")} // 5. Register the field
                        className={`w-full bg-slate-100 rounded-xl px-5 py-3 outline-none border transition-all border-transparent focus:ring-2 focus:ring-[#90aded] disabled:text-slate-600`}
                    />

                    {/* 6. Display the error message */}
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}

                    <div className="mt-8">
                        <button
                            type="submit"
                            disabled={!isValid || isSubmitting}
                            className={`w-full bg-[#155DFC] text-white py-3 rounded-lg shadow-md transition-colors cursor-pointer font-medium active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                        >
                            {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Send Code"}
                        </button>
                    </div>
                </form>
            </div>

        </section>

    );
}