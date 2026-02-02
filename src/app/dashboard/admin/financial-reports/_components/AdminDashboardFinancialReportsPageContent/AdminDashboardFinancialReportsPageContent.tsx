"use client";
import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import React from "react";
import Stats from "../Stats/Stats";
import { FinanceBarChart } from "../FinanceBarChart/FinanceBarChart";
import { RevenueAreaChart } from "../RevenueAreaChart/RevenueAreaChart";
import TransactionsTable from "../TransactionTable/TransactionTable";
import { useGetManagementReportingTopQuery, useGetWeeklyFinanceSummaryQuery, useGetWeeklyRevenueQuery } from "@/redux/features/finance/financeDashboardOverview/financeDashboardOverview.api";

const AdminDashboardFinancialReportsPageContent: React.FC = () => {
  const { data: weeklyRevenue } = useGetWeeklyRevenueQuery({});
  const { data: weeklyFinanceSummary } = useGetWeeklyFinanceSummaryQuery({});
  const { data: managementReportingTop } = useGetManagementReportingTopQuery({});

  return (
    <div className="space-y-6">
      {/*Section Header */}
      <SectionHeader
        title="Financial Reports"
        subTitle="Monitor all invoices and payments at a glance."
      />
      <Stats managementReportingTop={managementReportingTop} />

      {/* Charts */}
      <SectionHeader
        title="Weekly Finance Summary"
        subTitle="Track weekly Summary"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <FinanceBarChart weeklyFinanceSummary={weeklyFinanceSummary}  />
        <RevenueAreaChart weeklyRevenue={weeklyRevenue} />
      </div>

      {/* Table Section */}
      <TransactionsTable />
    </div>
  );
};

export default AdminDashboardFinancialReportsPageContent;
