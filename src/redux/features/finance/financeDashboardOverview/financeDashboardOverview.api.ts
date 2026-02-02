
import { apiClient } from "@/redux/apiClient/apiClient";

export const financeDashboardOverviewApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({

    // 🔹 Top Overview (profit/loss, management reporting)
    getFinanceTopOverview: builder.query({
      query: () => ({
        url: "/finance-dashboard/top-overview",
        method: "GET",
      }),
      providesTags: ["financeDashboardOverview"],
    }),

    // 🔹 Statistics
    getFinanceStatistics: builder.query({
      query: () => ({
        url: "/finance-dashboard/statistics",
        method: "GET",
      }),
      providesTags: ["financeDashboardOverview"],
    }),

    // 🔹 Management Reporting Top Metrics
    getManagementReportingTop: builder.query({
      query: () => ({
        url: "/finance-dashboard/management-reporting-top",
        method: "GET",
      }),
      providesTags: ["financeDashboardOverview"],
    }),

    // 🔹 Management Reporting Bottom (Monthly profit/loss)
    getManagementReportingBottom: builder.query({
      query: () => ({
        url: "/finance-dashboard/management-reporting-bottom",
        method: "GET",
      }),
      providesTags: ["financeDashboardOverview"],
    }),

    // 🔹 Mid Dashboard
    getFinanceMidDashboard: builder.query({
      query: () => ({
        url: "/finance-dashboard/mid-dashboard",
        method: "GET",
      }),
      providesTags: ["financeDashboardOverview"],
    }),

    // 🔹 Recent Finance Tasks
    getRecentFinanceTasksDashboard: builder.query({
      query: () => ({
        url: "/finance-dashboard/recent-tasks-dashboard",
        method: "GET",
      }),
      providesTags: ["financeDashboardOverview"],
    }),

    // 🔹 Finance Statements Top
    getFinanceStatementsTop: builder.query({
      query: () => ({
        url: "/finance-dashboard/finance-statements-top",
        method: "GET",
      }),
      providesTags: ["financeDashboardOverview"],
    }),

    // 🔹 Finance Statements Bottom (detailed)
    getFinanceStatementsBottom: builder.query({
      query: () => ({
        url: "/finance-dashboard/finance-statements-bottom",
        method: "GET",
      }),
      providesTags: ["financeDashboardOverview"],
    }),

    // 🔹 Weekly Finance Summary
    getWeeklyFinanceSummary: builder.query({
      query: () => ({
        url: "/finance-dashboard/weekly-finance-summary",
        method: "GET",
      }),
      providesTags: ["financeDashboardOverview"],
    }),

    getWeeklyRevenue: builder.query({
      query: () => ({
        url: "/finance-dashboard/weekly-revenue",
        method: "GET",
      }),
      providesTags: ["financeDashboardOverview"],
    }),
  }),
});

export const {
  useGetFinanceTopOverviewQuery,
  useGetFinanceStatisticsQuery,
  useGetManagementReportingTopQuery,
  useGetManagementReportingBottomQuery,
  useGetFinanceMidDashboardQuery,
  useGetRecentFinanceTasksDashboardQuery,
  useGetFinanceStatementsTopQuery,
  useGetFinanceStatementsBottomQuery,
  useGetWeeklyFinanceSummaryQuery,
  useGetWeeklyRevenueQuery
} = financeDashboardOverviewApi;
