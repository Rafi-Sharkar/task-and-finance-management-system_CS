import { apiClient } from "@/redux/apiClient/apiClient";

export const provisionApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({

    /* =========================
       CREATE PROVISION (POST)
       ========================= */
    createProvision: builder.mutation({
      query: (data) => ({
        url: "/finance/provision/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Provision"],
    }),

    /* =========================
       GET ALL PROVISIONS
       ========================= */
    getProvisions: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/finance/provisions",
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["Provision"],
    }),

    /* =========================
       UPDATE  PROVISIONS
       ========================= */
    updateProvisions: builder.mutation({
      query: ({ id, params }) => ({
        url: `/finance/provisions/update/${id}`,
        method: 'PATCH',
        params: params,
      }),
      invalidatesTags: ['Provision'],
    }),


    /* =========================
     DELETE PROVISIONS
     ========================= */
    deleteProvisions: builder.mutation({
      query: ({ id }) => ({
        url: `/finance/provision/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Provision"],
    }),

    /* =========================
       SEARCH & FILTER PROVISIONS
       ========================= */
    searchProvisions: builder.query({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        status = "",
        fromDate = "",
        toDate = "",
      }) => ({
        url: "/finance/provisions/search",
        method: "GET",
        params: {
          page,
          limit,
          search,
          status,
          fromDate,
          toDate,
        },
      }),
      providesTags: ["Provision"],
    }),



    /* =========================
       DRAFT PROVISION SUMMARY
       ========================= */
    getDraftProvisionSummary: builder.query({
      query: () => ({
        url: "/finance/provisions/draft/summary",
        method: "GET",
      }),
      providesTags: ["Provision"],
    }),

  }),
});

export const {
  useCreateProvisionMutation,
  useGetProvisionsQuery,
  useUpdateProvisionsMutation,
  useDeleteProvisionsMutation,
  useSearchProvisionsQuery,
  useGetDraftProvisionSummaryQuery,
} = provisionApi;
