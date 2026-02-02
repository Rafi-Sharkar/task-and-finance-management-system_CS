
import { apiClient } from "@/redux/apiClient/apiClient";

export const vatReturnApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ Create VAT return (POST)
    createVatReturn: builder.mutation({
      query: (data) => ({
        url: "/finance/vat-return/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["VatReturn"],
    }),

    // ✅ Get all VAT returns with filter & pagination (GET)
    getVatReturns: builder.query({
      query: (params) => ({
        url: "/finance/vat-return",
        method: "GET",
        params,
      }),
      providesTags: ["VatReturn"],
    }),

    getVatReturnById: builder.query({
      query: (id) => ({
        url: `/finance/vat-return/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "VatReturn", id }],
    }),

    updateVatReturnStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/finance/vat-return/${id}`,  
        method: "PATCH",
        body: { vatStatus: status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "VatReturn", id },  
        "VatReturn",                
      ],
    }),

    // ✅ Update VAT regulatory report (PATCH)
    updateVatRegulatoryReport: builder.mutation({
      query: ({ id, data }) => ({
        url: `/finance/vat-return/regulatory-reporting/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["VatReturn"],
    }),

  }),
});

export const {
  useCreateVatReturnMutation,
  useGetVatReturnsQuery,
  useGetVatReturnByIdQuery,
  useUpdateVatRegulatoryReportMutation,
  useUpdateVatReturnStatusMutation,
} = vatReturnApi;
