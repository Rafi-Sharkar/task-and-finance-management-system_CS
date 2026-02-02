import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* =======================
   Types
======================= */

export interface ChatRequest {
  user_id: string;
  message: string;
  uploaded_file?: File | null;
}

export interface ChatResponse {
  success: boolean;
  data: {
    reply: string;
    uploaded_file?: string | null;
  };
  message?: string;
}

export interface ChatHistoryItem {
  question: string;
  reply: string;
  uploaded_file?: string | null;
  created_at: string; // ISO date string
}

/* =======================
   API
======================= */

export const chatbotApi = createApi({
  reducerPath: "chatbotApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://smart-solutions-ai-part.onrender.com",
  }),
  tagTypes: ["ChatHistory"],
  endpoints: (builder) => ({
    // POST /chat
    sendChat: builder.mutation<ChatResponse, FormData>({
      query: (formData) => ({
        url: "/chat",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["ChatHistory"],
    }),

    // GET /chat/history/{user_id}
    getChatHistory: builder.query<ChatHistoryItem[], string>({
      query: (userId) => `/chat/history/${userId}`,
      providesTags: ["ChatHistory"],
    }),
  }),
});

export const {
  useSendChatMutation,
  useGetChatHistoryQuery,
} = chatbotApi;
