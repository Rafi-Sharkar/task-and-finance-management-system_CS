import { apiClient } from "@/redux/apiClient/apiClient";

export const accrualDeferralApi = apiClient.injectEndpoints({
    endpoints: (builder) => ({
        /* =========================
           CREATE ACCRUAL/DEFERRAL (POST)
           ========================= */
        createAccrualDeferral: builder.mutation({
            query: (data) => ({
                url: "/finance/accrual-deferral/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["AccrualDeferral"],
        }),

        /* =========================
           GET ALL ACCRUALS/DEFERRALS
           ========================= */
        getAccrualsDeferrals: builder.query({
            query: ({
                page = 1,
                limit = 10,
                search = "",
                status = ""
            }) => ({
                url: "/finance/accrual-deferral/get",
                method: "GET",
                params: {
                    page,
                    limit,
                    search,
                    status,
                },
            }),
            providesTags: ["AccrualDeferral"],
        }),

        /* =========================
           UPDATE ACCRUAL/DEFERRAL
           ========================= */
        updateAccrualDeferral: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/finance/accrual-deferral/update/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["AccrualDeferral"],
        }),

        /* =========================
           DELETE ACCRUAL/DEFERRAL
           ========================= */
        deleteAccrualDeferral: builder.mutation({
            query: (id) => ({
                url: `/finance/accrual-deferral/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["AccrualDeferral"],
        }),

        /* =========================
           DRAFT Accruals & Deferrals SUMMARY
           ========================= */
        getDraftAccrualDeferralSummary: builder.query({
            query: () => ({
                url: "/finance/accrual-deferral/summary",
                method: "GET",
            }),
            providesTags: ["AccrualDeferral"],
        }),

    }),
});

export const {
    useGetDraftAccrualDeferralSummaryQuery,
    useCreateAccrualDeferralMutation,
    useGetAccrualsDeferralsQuery,
    useUpdateAccrualDeferralMutation,
    useDeleteAccrualDeferralMutation,
} = accrualDeferralApi;