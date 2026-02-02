
import { apiClient } from "@/redux/apiClient/apiClient";

export const auditLogsApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getAuditMyLogs: builder.query({
      query: (queryParams) => ({
        url: "/audit/mylogs",
        method: "GET",
        params: queryParams,
      }),
      providesTags: ["AuditLogs"],
    }),

    getAuditManagerLogs: builder.query({
      query: (queryParams) => ({
        url: "/audit/managerlogs",
        method: "GET",
        params: queryParams,
      }),
      providesTags: ["AuditLogs"],
    }),

    getAuditAdminLogs: builder.query({
      query: (queryParams) => ({
        url: "/audit/adminlogs",
        method: "GET",
        params: queryParams,
      }),
      providesTags: ["AuditLogs"],
    }),

    UpdatePassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/update-password",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetAuditMyLogsQuery,
  useGetAuditManagerLogsQuery,
  useGetAuditAdminLogsQuery,
  useUpdatePasswordMutation,
} = auditLogsApi;
