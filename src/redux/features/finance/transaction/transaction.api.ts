
import { apiClient } from "@/redux/apiClient/apiClient";

export const transactionApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({

    /* =========================
       CREATE TRANSACTION (POST)
       ========================= */

    createTransaction: builder.mutation({
      query: (formData) => {
        return {
          url: "/finance/transactions/create",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Transaction"],
    }),

    /* =========================
       GET ALL TRANSACTIONS
       ========================= */
    getTransactions: builder.query({
      query: (queryParams) => ({
        url: "/finance/transactions",
        method: "GET",
        params: queryParams
      }),
      providesTags: ["Transaction"],
    }),

    /* =========================
       UPDATE TRANSACTION
       ========================= */
    updateTransaction: builder.mutation({
      query: ({ id, amount }) => ({
        url: `/finance/transaction/${id}/update`,
        method: "PATCH",
        body: { amount },
      }),
      invalidatesTags: ["Transaction"],
    }),
  }),
});

export const {
  useCreateTransactionMutation,
  useGetTransactionsQuery,
  useUpdateTransactionMutation,
} = transactionApi;
