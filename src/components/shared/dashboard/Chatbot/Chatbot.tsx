"use client";

import placeholderImg from "@/assets/placeholder.png";
import { ArrowUp, FileIcon, FileText, Upload, X } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { Icons } from "../../Icons/Icons";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import { getChatHistory, sendChat } from "@/services/chatBot/chatBot.service";


interface Message {
  id: string;
  text?: string;
  file?: {
    name: string;
    url: string;
    type: string;
  };
  sender: "ai" | "user";
  timestamp: Date;
}

export function Chatbot() {
  const user = useAppSelector(useCurrentUser);
  console.log(user,'user')
  const userId = user?.id;


  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState<{
    file: File;
    url: string;
  } | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // random Summaries List
  const summaries = [
    "Generate a quick summary of my last month's expenses.",
    "Can you summarize the total VAT I paid this year?",
    "Give me a brief overview of my pending invoices.",
    "Summarize my project-wise income for the current quarter.",
    "Provide a summary of my top 5 suppliers by spending.",
  ];

  const handleGetSummary = () => {
    const randomIndex = Math.floor(Math.random() * summaries.length);
    setInputValue(summaries[randomIndex]);
  };

  // Helper function to check if a string is a valid URL
  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch (err) {
      console.log(err)
      return false;
    }
  };

  // Load chat history when chatbot opens
  useEffect(() => {
    const loadChatHistory = async () => {
      if (!userId || !isOpen) return;

      setIsLoadingHistory(true);
      try {
        const history = await getChatHistory(userId);
        
        if (history && history.length > 0) {
          const historyMessages: Message[] = history.flatMap((item) => {
            const messages: Message[] = [
              {
                id: `user-${item.created_at}`,
                text: item.question,
                file: item.uploaded_file && isValidUrl(item.uploaded_file)
                  ? {
                      name: item.uploaded_file.split("/").pop() || "file",
                      url: item.uploaded_file,
                      type: item.uploaded_file.match(/\.(jpg|jpeg|png|gif|webp)$/i)
                        ? "image/jpeg"
                        : "application/octet-stream",
                    }
                  : undefined,
                sender: "user" as const,
                timestamp: new Date(item.created_at),
              },
              {
                id: `ai-${item.created_at}`,
                text: item.reply,
                sender: "ai" as const,
                timestamp: new Date(item.created_at),
              },
            ];
            return messages;
          });

          setMessages([...historyMessages]);
        } else {
          // No history, show welcome message
          setMessages([
            {
              id: "welcome",
              text: "Hey! How Can I Help You?",
              sender: "ai",
              timestamp: new Date(),
            },
          ]);
        }
      } catch (error) {
        console.error("Failed to load chat history:", error);
        toast.error("Failed to load chat history");
        // Show welcome message even if history fails
      } finally {
        setIsLoadingHistory(false);
      }
    };

    loadChatHistory();
  }, [isOpen, userId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatWindowRef.current &&
        !chatWindowRef.current.contains(event.target as Node) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    // Validation: Must have either text or file
    if (!inputValue.trim() && !selectedFile) {
      toast.warning("Please write a message or upload a file");
      return;
    }

    if (!userId) {
      toast.error("User ID not found. Please log in.");
      return;
    }

    // If only file is selected without message, ask for context
    if (!inputValue.trim() && selectedFile) {
      toast.warning("Please add a message about the file. For example: 'What is this image?', 'Analyze this', etc.");
      return;
    }

    // Create user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue || undefined,
      file: selectedFile
        ? {
            name: selectedFile.file.name,
            url: selectedFile.url,
            type: selectedFile.file.type,
          }
        : undefined,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    const currentFile = selectedFile;
    setInputValue("");
    setSelectedFile(null);
    setIsSending(true);

    try {
      // Prepare FormData
      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("message", currentInput || "");
      
      if (currentFile) {
        formData.append("uploaded_file", currentFile.file);
      }

      // Send to API
      const response = await sendChat(formData);

      // console.log(response, "response");

      // Add AI response
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          text: response.reply || "Sorry, no response received.",
          file: response.uploaded_file && isValidUrl(response.uploaded_file)
            ? {
                name: response.uploaded_file.split("/").pop() || "file",
                url: response.uploaded_file,
                type: response.uploaded_file.match(/\.(jpg|jpeg|png|gif|webp)$/i)
                  ? "image/jpeg"
                  : "application/octet-stream",
              }
            : undefined,
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-error-${Date.now()}`,
          text: "Sorry, I couldn't process your request. Please try again.",
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        toast.error("File size cannot exceed 10 MB");
        return;
      }

      const url = URL.createObjectURL(file);
      setSelectedFile({ file, url });
      if (fileInputRef.current) fileInputRef.current.value = "";
      
      // Show success message
      toast.success(`${file.name} selected successfully`);
    }
  };

  const removeSelectedFile = () => {
    if (selectedFile) {
      URL.revokeObjectURL(selectedFile.url);
      setSelectedFile(null);
      toast.info("File removed");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed right-2.5 bottom-6 z-50 flex flex-col items-end font-sans md:right-6">
      {isOpen && (
        <div
          ref={chatWindowRef}
          className="mb-2 flex h-[550px] w-[350px] origin-bottom-right transform flex-col overflow-hidden rounded-2xl rounded-br-none border border-gray-100 bg-white shadow-2xl transition-all duration-300 ease-in-out md:mb-4 md:w-[400px]"
        >
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between border-b bg-white p-4">
            <div className="flex items-center gap-2">
              <Icons.AlAssist />
              <h2 className="text-xl font-bold text-gray-800">Al Assist</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="cursor-pointer text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat Area */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-4 overflow-y-auto scroll-smooth bg-gray-50/30 p-5"
          >
            {isLoadingHistory ? (
              <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
                  <p className="text-sm text-gray-500">Loading chat history...</p>
                </div>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-gray-500">No messages yet. Start a conversation!</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full ${msg.sender === "ai" ? "bg-gradient-to-tr from-blue-400 to-emerald-400 text-white" : ""}`}
                  >
                    {msg.sender === "ai" ? (
                      <Icons.CharBot size={20} />
                    ) : (
                      <Image
                        src={placeholderImg}
                        alt="user"
                        className="h-8 w-8 object-cover"
                      />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 text-sm shadow-sm ${msg.sender === "ai" ? "rounded-tl-none bg-[#4a4e5a] text-white" : "rounded-tr-none bg-[#0089b3] text-white"}`}
                  >
                    {msg.file && (
                      <div className="mb-2 rounded border border-white/20 bg-white/10 p-2">
                        {msg.file.type.startsWith("image/") ? (
                          <Image
                            src={msg.file.url}
                            height={100}
                            width={100}
                            alt="file"
                            className="h-auto w-full max-w-40 rounded"
                          />
                        ) : (
                          <div className="flex items-center gap-2 text-white">
                            <FileIcon size={16} />
                            <span className="w-32 truncate">{msg.file.name}</span>
                          </div>
                        )}
                      </div>
                    )}
                    {msg.text && <p className="whitespace-pre-wrap break-words">{msg.text}</p>}
                  </div>
                </div>
              ))
            )}
            {isSending && (
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-tr from-blue-400 to-emerald-400 text-white">
                  <Icons.CharBot size={20} />
                </div>
                <div className="max-w-[80%] rounded-lg rounded-tl-none bg-[#4a4e5a] p-3 text-sm text-white shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.3s]"></span>
                      <span className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.15s]"></span>
                      <span className="h-2 w-2 animate-bounce rounded-full bg-white"></span>
                    </div>
                    <p>Typing...</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t bg-white p-4">
            <div className="relative rounded-xl border border-gray-200 bg-white p-3 focus-within:border-blue-400">
              {selectedFile && (
                <div className="mb-2 flex max-w-[80%] items-center justify-between rounded-lg bg-gray-100 p-2">
                  <div className="flex items-center gap-2 overflow-hidden">
                    {selectedFile.file.type.startsWith("image/") ? (
                      <Image
                        src={selectedFile.url}
                        width={50}
                        height={50}
                        className="h-10 w-10 rounded object-cover"
                        alt="preview"
                      />
                    ) : (
                      <FileIcon size={20} className="text-gray-500" />
                    )}
                    <span className="max-w-3/4 truncate text-xs text-gray-600">
                      {selectedFile.file.name}
                    </span>
                  </div>
                  <button
                    onClick={removeSelectedFile}
                    disabled={isSending}
                    className="cursor-pointer text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask something..."
                className="min-h-10 w-full resize-none pr-10 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
                rows={1}
                disabled={isSending}
              />

              <div className="mt-2 flex items-center gap-4 text-xs text-gray-400">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={isSending}
                  accept="image/*,.pdf,.doc,.docx,.txt"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isSending}
                  className="flex cursor-pointer items-center gap-1 transition-colors hover:text-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Upload size={14} /> Upload File
                </button>
                <button
                  onClick={handleGetSummary}
                  disabled={isSending}
                  className="flex cursor-pointer items-center gap-1 transition-colors hover:text-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FileText size={14} /> Get Summary
                </button>
              </div>

              <button
                onClick={handleSendMessage}
                disabled={(!inputValue.trim() && !selectedFile) || isSending}
                className={`absolute top-3 right-3 cursor-pointer rounded-full p-2.5 transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
                  (inputValue.trim() || selectedFile) && !isSending
                    ? "bg-blue-500 text-white shadow-md hover:bg-blue-600"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                <ArrowUp size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        ref={toggleButtonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full shadow-lg transition-all active:scale-95 sm:h-16 sm:w-16"
        style={{
          background: "linear-gradient(135deg, #6EE7B7 0%, #3B82F6 100%)",
        }}
      >
        {isOpen ? (
          <X size={30} className="text-white" />
        ) : (
          <Icons.CharBot size={34} />
        )}
      </button>
    </div>
  );
}