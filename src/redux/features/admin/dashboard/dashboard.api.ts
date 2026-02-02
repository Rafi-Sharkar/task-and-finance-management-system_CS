import { apiClient } from "@/redux/apiClient/apiClient";

export const auditLogsApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboard: builder.query({
      query: (queryParams) => ({
        url: "/dashboard/admin",
        method: "GET",
        params: queryParams,
      }),
      providesTags: ["Dashboard"],
    }),

    getManagerDashboard: builder.query({
      query: (queryParams) => ({
        url: "/dashboard/manager",
        method: "GET",
        params: queryParams,
      }),
      providesTags: ["Dashboard"],
    }),

    getUserDashboard: builder.query({
      query: (queryParams) => ({
        url: "/dashboard/user",
        method: "GET",
        params: queryParams,
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetAdminDashboardQuery,
  useGetManagerDashboardQuery,
  useGetUserDashboardQuery,
} = auditLogsApi;
