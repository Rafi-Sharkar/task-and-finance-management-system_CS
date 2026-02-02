// "use client";

// import { Button } from "@/components/ui/button";
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
// } from "@/components/ui/dialog";
// import { setSessionExpired } from "@/redux/features/auth/authSlice";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";

// import { AlertCircle } from "lucide-react";
// import { useRouter } from "next/navigation";

// export default function SessionExpiredModal() {
//     const isExpired = useAppSelector((state) => state.auth.isSessionExpired);
//     const dispatch = useAppDispatch();
//     const router = useRouter();

//     const handleLoginAgain = () => {
//         dispatch(setSessionExpired(false));
//         router.push("/login");
//     };

//     return (
//         <Dialog open={isExpired} onOpenChange={() => { }}>
//             <DialogContent className="sm:max-w-[425px] text-center [&>button]:hidden">

//                 <DialogHeader className="flex flex-col items-center gap-2">
//                     <div className="bg-destructive/10 p-3 rounded-full">
//                         <AlertCircle className="h-8 w-8 text-destructive" />
//                     </div>
//                     <DialogTitle className="text-2xl font-bold text-destructive">
//                         Session Expired
//                     </DialogTitle>
//                     <DialogDescription className="text-base">
//                         Your session has expired. Please login again.
//                     </DialogDescription>
//                 </DialogHeader>

//                 <DialogFooter className="mt-4">
//                     <Button
//                         onClick={handleLoginAgain}
//                         className="w-full bg-primary hover:bg-primary/90"
//                     >
//                         Login Again
//                     </Button>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>
//     );
// }



"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { setSessionExpired } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AlertCircle, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SessionExpiredModal() {
    const isExpired = useAppSelector((state) => state.auth.isSessionExpired);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLoginAgain = () => {
        dispatch(setSessionExpired(false));
        router.push("/login");
    };

    return (
        <Dialog open={isExpired} onOpenChange={() => { }}>
            <DialogContent
                className="sm:max-w-100 text-center [&>button]:hidden"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader className="flex flex-col items-center gap-2">
                    <div className="bg-destructive/10 p-4 rounded-full mb-2">
                        <AlertCircle className="h-10 w-10 text-destructive" />
                    </div>
                    <DialogTitle className="text-2xl font-bold text-gray-900">
                        Session Expired
                    </DialogTitle>
                    <DialogDescription className="text-gray-500 text-base">
                        Your session has expired. Please login again.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="mt-6 sm:justify-center">
                    <Button
                        onClick={handleLoginAgain}
                        className="w-full flex gap-2 items-center justify-center bg-primary hover:bg-primary/90 py-6 text-lg"
                    >
                        <LogIn className="h-5 w-5" />
                        Login Again
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}