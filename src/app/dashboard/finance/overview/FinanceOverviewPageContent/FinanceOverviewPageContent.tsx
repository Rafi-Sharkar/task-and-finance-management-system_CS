"use client";
import { useGetFinanceMidDashboardQuery, useGetFinanceStatisticsQuery, useGetFinanceTopOverviewQuery } from '@/redux/features/finance/financeDashboardOverview/financeDashboardOverview.api';
import React from 'react';
import FinanceOverviewGridBox from '../_components/FinanceOverviewGridBox/FinanceOverviewGridBox';
import FinanceOverviewStats from '../_components/FinanceOverviewStats/FinanceOverviewStats';

const FinanceOverviewPageContent: React.FC = () => {
    const { data: financeTopOverview } = useGetFinanceTopOverviewQuery({});
    const { data: financeMidDashboard } = useGetFinanceMidDashboardQuery({});
    const { data: financeMyRecentTasks } = useGetFinanceStatisticsQuery({});

    return (
        <div className="space-y-6">
            <FinanceOverviewStats financeTopOverview={financeTopOverview} />
            <FinanceOverviewGridBox financeMidDashboard={financeMidDashboard} financeMyRecentTasks={financeMyRecentTasks} />
            {/* <FinanceMyRecentTasksTable /> */}
        </div>
    )
}

export default FinanceOverviewPageContent