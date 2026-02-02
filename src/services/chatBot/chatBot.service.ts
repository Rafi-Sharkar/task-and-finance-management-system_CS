// types/chat.types.ts
"use server"
// services/chatBot/chatBot.types.ts

export interface ChatResponse {
  reply: string;
  uploaded_file?: string | null;
}



export interface ChatHistoryItem {
  question: string;
  reply: string;
  uploaded_file?: string | null;
  created_at: string;
}


const BASE_URL = "https://smart-solutions-ai-part.onrender.com";

export const sendChat = async (formData: FormData): Promise<ChatResponse> => {
  const res = await fetch(`${BASE_URL}/chat`, {
    method: "POST",
    body: formData,
    cache: "no-store",
  });

  return res.json();
};

// lib/api/chat.ts

export const getChatHistory = async (
  userId: string
): Promise<ChatHistoryItem[]> => {
  const res = await fetch(
    `${BASE_URL}/chat/history/${userId}`,
    {
      method: "GET",
      cache: "no-store", // or "force-cache" if you want caching
    }
  );

  return res.json();
};

