import { apiClient } from "@/redux/apiClient/apiClient";

export const paymentApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({

    
    //  Create Payment with file upload (POST)
    createPayment: builder.mutation({
      query: (formData) => ({
        url: `/finance/payment/create`,
        method: "POST",
        body: formData, // FormData for file upload
      }),
      invalidatesTags: ["Payments"],
    }),

    //  Get all payments with search & filters (GET)
    getPayments: builder.query({
      query: (params) => ({
        url: `/finance/payments`,
        method: "GET",
        params, // { search, status, page, limit }
      }),
      providesTags: ["Payments"],
    }),

    // Update payment status (PATCH)
    updatePaymentStatus: builder.mutation({
      query: ({ id, paymentStatus }) => ({
        url: `/finance/payment/update-status/${id}`,
        method: "PATCH",
        body: { paymentStatus }, // COMPLETED or PENDING
      }),
      invalidatesTags: ["Payments"],
    }),

  }),
});

export const {
  useCreatePaymentMutation,
  useGetPaymentsQuery,
  useUpdatePaymentStatusMutation,
} = paymentApi;
