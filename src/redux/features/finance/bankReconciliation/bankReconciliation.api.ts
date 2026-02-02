// redux/features/bankReconciliation/bankReconciliation.api.js (or .ts without types)

import { apiClient } from "@/redux/apiClient/apiClient";



export const bankReconciliationApi = apiClient.injectEndpoints({
    endpoints: (builder) => ({

        /* ===============================
           GET BANK RECONCILIATIONS
           =============================== */
        getBankReconciliations: builder.query({
            query: (params) => ({
                url: "/finance/bank-reconciliations",
                method: "GET",
                params, // page, limit, invoiceId, status
            }),
            providesTags: ["BankReconciliation"],
        }),

        /* ===============================
           UPDATE RECONCILIATION STATUS
           =============================== */
        updateBankReconciliationStatus: builder.mutation({
            query: ({ id, reconciliationStatus }) => ({
                url: `/finance/bank-reconciliation/update/${id}`,
                method: "PATCH",
                body: { reconciliationStatus },
            }),
            invalidatesTags: ["BankReconciliation"],
        }),


    }),
});

export const {
    useGetBankReconciliationsQuery,
    useUpdateBankReconciliationStatusMutation,
} = bankReconciliationApi;
