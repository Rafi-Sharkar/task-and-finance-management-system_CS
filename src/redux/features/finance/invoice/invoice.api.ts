import { apiClient } from "@/redux/apiClient/apiClient";

const financeInvoiceApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    //Create Invoice
    createInvoice: builder.mutation({
      query: (data) => {
        const result = {
          url: "/finance/invoice/create",
          method: "POST",
          body: data,
        };

        return result;

      },
      invalidatesTags: ["FINANCE_INVOICE"],
    }),

    //Get All Invoices
    getAllInvoices: builder.query({
      query: (queryParams) => {
        return {
          url: "/finance/invoices",
          method: "GET",
          params: queryParams,
        };
      },
      providesTags: ["FINANCE_INVOICE"],
    }),

    getInvoiceById: builder.query({
      query: (id) => ({
        url: `/finance/invoices/${id}`,
        method: "GET",
      }),
      providesTags: ["FINANCE_INVOICE"],
    }),

    updateInvoiceStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/finance/invoice/status-update/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["FINANCE_INVOICE"],
    }),

    sendNotification: builder.mutation({
      query: (data) => ({
        url: "/finance/notification/send",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FINANCE_INVOICE"],
    }),

    //Change Invoice Status
    changeInvoiceStatus: builder.mutation({
      query: ({ invoiceId, invoiceStatus }) => {
        return {
          url: `/finance/invoice/status-update/${invoiceId}`,
          method: "PATCH",
          body: { invoiceStatus },
        };
      },
      invalidatesTags: ["FINANCE_INVOICE"],
    }),

    uploadInvoiceFile: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/finance/invoice/file-upload/${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["FINANCE_INVOICE"], // Refresh invoices after upload
    }),
  }),
});

export const { useCreateInvoiceMutation, useGetAllInvoicesQuery, useGetInvoiceByIdQuery, useUpdateInvoiceStatusMutation, useSendNotificationMutation, useChangeInvoiceStatusMutation, useUploadInvoiceFileMutation, } = financeInvoiceApi;

