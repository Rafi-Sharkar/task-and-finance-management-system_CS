/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import placeholderImg from "@/assets/placeholder.png";
import { ChatMessage } from "@/components/shared/dashboard/Chat/ChatMessage/ChatMessage";
import { useSocket } from "@/providers/SocketProvider";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const DynamicChatPage = () => {
    const user = useAppSelector(useCurrentUser);
    const [inputValue, setInputValue] = useState("");
    const params = useParams();
    const { get } = useSocket();

    const [messages, setMessages] = useState<any[]>([]);
    const [conversationInfo, setConversationInfo] = useState<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const socketRef = useRef<any>(null);

    // Socket setup
    useEffect(() => {
        const initSocket = async () => {
            const socket = await get("/pv/message");
            socketRef.current = socket;

            console.log("socket from socket page=========>", socket);

            // Load conversation
            socket.emit("private:load_single_conversation", {
                conversationId: params.chatId,
            });

            // Listen for conversation data
            socket.on("private:new_conversation", (data: any) => {
                console.log("Data from conversation============>", data);
                const recieverInfo = data?.participants?.find((p: any) => {
                    console.log(p?.id, "***************");
                    console.log(user?.id, "***************")
                    if (p.id !== user?.id) {
                        console.log("===========> true =========>",)
                        return p;
                    }
                });
                console.log("Receiver Info*********", recieverInfo);
                setConversationInfo(recieverInfo);
                setMessages(data.messages || []);
            });

            //receive new message
            // socket.on("private:new_message", (msg: any) => {
            //     console.log("<================== Trigger recieve message ==========>", msg);
            //     if (msg.conversationId === params.chatId) {
            //         setMessages((prev) => [...prev, msg]);
            //     }
            // });
            socket.on("private:new_message", (msg: any) => {
                if (msg.conversationId === params.chatId) {
                    setMessages((prev) => {
                        // prevent duplicate
                        if (prev.find((m) => m.id === msg.id)) return prev;
                        return [...prev, msg];
                    });
                }
            });

            // Listen for errors
            socket.on("private:error", (err: any) => {
                console.error("Socket Error:", err.message || err);
            });

            // On reconnect, reload the conversation
            socket.on("connect", () => {
                if (params.chatId) {
                    socket.emit("private:load_single_conversation", {
                        conversationId: params.chatId,
                    });
                }
            });
        };

        if (params.chatId && user?.id) {
            initSocket();
        }

        return () => {
            const socket = socketRef.current;
            socket?.off("private:new_conversation");
            socket?.off("private:new_message");
            socket?.off("private:error");
            socket?.off("connect");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.chatId, user?.id]);

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Send message
    const handleSendMessage = () => {
        if (!inputValue.trim()) return;
        const socket = socketRef.current;
        console.log("socket from handleSendMessage=========>", socket);
        console.log("Receiver id", conversationInfo?.id);
        // Emit message
        socket.emit("private:send_message", {
            recipientId: conversationInfo?.id,
            content: inputValue,
        });
        // socket.emit("private:load_conversations", {});
        setInputValue("");
    };

    return (
        <div className="ui-container flex flex-1 flex-col overflow-hidden p-0 rounded-2xl">
            {/* Header */}
            <div className="flex items-center gap-3 border-b p-4">
                <Image
                    src={conversationInfo?.avatarUrl || placeholderImg}
                    alt={"user name"}
                    width={32}
                    height={32}
                    className="w-10 h-10 rounded-full shrink-0 object-fill"
                />
                <div>
                    <h4 className="text-sm font-bold">{conversationInfo?.fullName || conversationInfo?.username || conversationInfo?.email || "User"}</h4>
                    <p className="text-[10px] text-gray-400">{/* status if available */}</p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-white p-6 ">
                {messages.map((msg: any, idx: number) => {
                    const isSender = user?.id === msg.sender?.id;
                    const prevMsg = messages[idx - 1];
                    const nextMsg = messages[idx + 1];
                    const isFirstInBlock = !prevMsg || prevMsg.sender?.id !== msg.sender?.id;
                    const isLastInBlock = !nextMsg || nextMsg.sender?.id !== msg.sender?.id;

                    return (
                        <ChatMessage
                            key={msg.id}
                            text={msg.content}
                            isSender={isSender}
                            time={new Date(msg.createdAt).toLocaleTimeString()}
                            sender={msg.sender}
                            isFirstInBlock={isFirstInBlock}
                            isLastInBlock={isLastInBlock}
                        />
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t p-4">
                <div className="flex items-center gap-2 rounded-xl border bg-gray-50 p-2">
                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        type="text"
                        placeholder="Start Typing..."
                        className="flex-1 bg-transparent px-3 py-2 text-sm outline-none"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="flex items-center gap-2 rounded-lg bg-blue-600 p-2 px-4 text-white transition-colors hover:bg-blue-700"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DynamicChatPage;
