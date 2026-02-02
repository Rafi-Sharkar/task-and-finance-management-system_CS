import { apiClient } from "@/redux/apiClient/apiClient";

export const financialStatementsApi = apiClient.injectEndpoints({
    endpoints: (builder) => ({
        //  Get Finance Summary Top
        getFinanceSummaryTop: builder.query({
            query: () => ({
                url: "/finance-dashboard/finance-statements-top",
                method: "GET",
            }),
            providesTags: ["FinanceSummary"],
        }),
        //  Get Finance Summary Bottom
        getFinanceSummaryBottom: builder.query({
            query: () => ({
                url: "/finance-dashboard/finance-statements-bottom",
                method: "GET",
            }),
            providesTags: ["FinanceSummary"],
        }),

    }),
});

export const {
    useGetFinanceSummaryTopQuery,
    useGetFinanceSummaryBottomQuery,
} = financialStatementsApi;