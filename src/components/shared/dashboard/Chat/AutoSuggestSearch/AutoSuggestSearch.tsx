"use client";
import placeholderImg from "@/assets/placeholder.png";
import { useSocket } from "@/providers/SocketProvider";
import { useGetAllUsersQuery, useGetConversationIdMutation } from "@/redux/features/admin/user/user.api";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { IUser } from "@/types/userRole.types";
import { catchAsyncMutation } from "@/utils/apiReqRes.utils";
import { Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";

const AutoSuggestSearch = () => {
    const [search, setSearch] = useState("");
    const { get } = useSocket();
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [activeIndex, setActiveIndex] = useState(-1);
    const [open, setOpen] = useState(false);
    const [getConversationId] = useGetConversationIdMutation();
    const router = useRouter();
    const user = useAppSelector(useCurrentUser);

    let route: string;
    if (user?.role === "ADMIN" || user?.role === "SUPER_ADMIN") {
        route = "/dashboard/admin/support";
    } else if (user?.role === "CLIENT") {
        route = "/dashboard/client/support";
    } else if (user?.role === "EMPLOYEE") {
        route = "/dashboard/employee/support";
    } else if (user?.role === "MANAGER") {
        route = "/dashboard/manager/support";
    } else if (user?.role === "FINANCE") {
        route = "/dashboard/finance/support";
    }

    const wrapperRef = useRef<HTMLDivElement>(null);

    // ✅ Debounce input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    // ✅ API call
    const { data: userData, isLoading, isFetching } = useGetAllUsersQuery(
        debouncedSearch
            ? { search: debouncedSearch, limit: 10 }
            : { limit: 10 }
    );

    const users: IUser[] = userData?.data?.data || [];

    // ✅ Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // ✅ Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!users.length) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            setActiveIndex((prev) =>
                prev < users.length - 1 ? prev + 1 : 0
            );
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((prev) =>
                prev > 0 ? prev - 1 : users.length - 1
            );
        }

        if (e.key === "Enter") {
            e.preventDefault();
            if (activeIndex >= 0) {
                selectUser(users[activeIndex]);
            }
        }
    };

    // ✅ Select user
    const selectUser = async (user: IUser) => {
        setSearch(user.email || user.username || "");
        setOpen(false);

        console.log("✅ Selected user ID:", user.id);
        await catchAsyncMutation(
            // 1. Execute the mutation
            getConversationId(user?.id).unwrap(),
            // 2. Handle Success Case
            async (res) => {
                router.push(`${route}/${res?.conversationId}`);
                // 👉 reload conversations instantly
                const socket = await get("/pv/message");
                socket?.emit("private:load_conversations", {});
            },
        );

    };

    return (
        <div ref={wrapperRef} className="relative">
            <Search className="absolute top-2.5 left-3 h-4 w-4 text-gray-400" />

            <input
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                onKeyDown={handleKeyDown}
                placeholder="Search users by username or email..."
                className="w-full rounded-xl border bg-white py-2 pr-4 pl-10 text-sm outline-none"
            />

            {open && (
                <div className="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border bg-white shadow-md">

                    {/* ✅ Spinner */}
                    {(isLoading || isFetching) && (
                        <div className="flex items-center justify-center py-6">
                            <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
                        </div>
                    )}

                    {/* ✅ No result */}
                    {!isLoading && !isFetching && users.length === 0 && debouncedSearch && (
                        <p className="p-3 text-sm text-gray-400 text-center">
                            No user found with {debouncedSearch}
                        </p>
                    )}

                    {/* ✅ User list */}
                    {!isLoading && !isFetching &&
                        users.map((user, index) => (
                            <div
                                key={user.id}
                                onClick={() => selectUser(user)}
                                className={`flex cursor-pointer items-center gap-3 px-3 py-2 text-sm
            ${index === activeIndex
                                        ? "bg-blue-100"
                                        : "hover:bg-gray-100"
                                    }
          `}
                            >
                                <Image
                                    src={user.avatarUrl || placeholderImg}
                                    width={40}
                                    height={40}
                                    className="h-8 w-8 rounded-full object-cover"
                                    alt=""
                                />
                                <span>{user.email || user.username}</span>
                            </div>
                        ))
                    }
                </div>
            )}

        </div>
    );
};

export default AutoSuggestSearch;
