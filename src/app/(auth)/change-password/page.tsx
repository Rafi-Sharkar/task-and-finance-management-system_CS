"use client";

import { Suspense } from "react";
import ChangePasswordForm from "./_components/ChangePasswordForm/ChangePasswordForm";




const ChangePasswordPage = () => {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center p-10 min-h-100">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
        }>
            <ChangePasswordForm />
        </Suspense>
    );
}

export default ChangePasswordPage;