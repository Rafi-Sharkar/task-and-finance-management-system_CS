/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import { useSocket } from "@/providers/SocketProvider";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AutoSuggestSearch from "../../../../components/shared/dashboard/Chat/AutoSuggestSearch/AutoSuggestSearch";
import { ChatUserItem } from "../../../../components/shared/dashboard/Chat/ChatUserItem/ChatUserItem";

const SupportChatLayout = ({ children }: { children: React.ReactNode }) => {
    const params = useParams();
    console.log(params);
    const { get } = useSocket();
    const [conversations, setConversations] = useState<any[]>([]);
    useEffect(() => {
        let socket: any;

        const init = async () => {
            socket = await get("/pv/message");

            console.log("Socket from socketLayout============>", socket);

            // ✅ Always request conversations when page opens
            // socket.emit("private:load_conversations", {});

            // socket.on("private:conversation_list", (data: any[]) => {
            //     console.log("triggerd conversation list=========>")
            //     setConversations(data);
            // });
            socket.emit("private:load_conversations", {});

            socket
                .off("private:conversation_list")
                .on("private:conversation_list", (data: any[]) => {
                    setConversations(data);
                });
        };

        init();

        return () => {
            socket?.off("private:conversation_list");
        };
    }, [get]);

    console.log("conversation=======>", conversations);

    return (
        <div className="w-full space-y-6 pb-20">
            <SectionHeader
                title="Support Chat"
                subTitle="Manage user problems and resolve issues"
            />

            <div className="flex h-[75vh] gap-6">
                {/* Sidebar */}
                <div className="ui-container flex w-1/4 flex-col gap-4 rounded-xl">
                    <AutoSuggestSearch />
                    <div className="scrollbar flex flex-col gap-2 overflow-y-auto">
                        <p className="px-2 text-[10px] font-bold text-gray-400 uppercase">
                            My Chats
                        </p>
                        {conversations.map((chat) => (
                            <Link key={chat.chatId} href={`/dashboard/manager/support/${chat.chatId}`}>
                                <ChatUserItem

                                    user={{
                                        id: chat.chatId,
                                        name: chat.participant.fullName,
                                        avatarUrl: chat.participant.avatarUrl,
                                        email: chat.participant.email,
                                        username: chat.participant.username,
                                        lastMessage: chat.lastMessage?.content,
                                        status: ""
                                    }}
                                    isActive={params?.chatId === chat.chatId}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
                {children}
            </div>

        </div>
    )
}

export default SupportChatLayout;