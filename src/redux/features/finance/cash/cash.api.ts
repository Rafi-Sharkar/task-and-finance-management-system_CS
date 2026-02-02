import { apiClient } from "@/redux/apiClient/apiClient";

export const cashApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({

    /* =========================
       CREATE CASH (POST)
       ========================= */
    createCash: builder.mutation({
      query: (formData) => {
        return {
          url: "/finance/cash/create",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Cash"],
    }),

    /* =========================
       GET ALL CASHS (WITH SEARCH & FILTER)
       ========================= */
    getCashs: builder.query({
      query: (queryParams) => ({
        url: "/finance/cashs",
        method: "GET",
        params: queryParams
      }),
      providesTags: ["Cash"],
    }),

    /* =========================
       UPDATE CASH
       ========================= */
    updateCash: builder.mutation({
      query: ({ id, cashIn, cashOut, totalbalance }) => ({
        url: `/finance/cash/${id}/update`,
        method: "PATCH",
        body: { cashIn, cashOut, totalbalance },
      }),
      invalidatesTags: ["Cash"],
    }),
  }),
});

export const {
  useCreateCashMutation,
  useGetCashsQuery,
  useUpdateCashMutation,
} = cashApi;
