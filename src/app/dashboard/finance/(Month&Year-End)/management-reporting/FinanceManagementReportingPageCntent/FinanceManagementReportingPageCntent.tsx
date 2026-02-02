"use client"

import React from 'react'
import FinanceManagementReportingStats from '../_components/FinanceManagementReportingStats/FinanceManagementReportingStats'
import FinanceManagementReportingTable from '../_components/FinanceManagementReportingTable/FinanceManagementReportingTable'
import { useGetFinanceStatisticsQuery, useGetManagementReportingBottomQuery, useGetManagementReportingTopQuery } from '@/redux/features/finance/financeDashboardOverview/financeDashboardOverview.api'
import FinanceFinanceDashboard from '../../../overview/_components/FinanceOverviewGridBox/_components/FinanceCharts/FinanceFinanceDashboard/FinanceFinanceDashboard'

const FinanceManagementReportingPageCntent: React.FC = () => {
    const { data: financeMyRecentTasks } = useGetFinanceStatisticsQuery({});
    const { data: managementReportingTop } = useGetManagementReportingTopQuery({})
    const { data: managementReportingBottom } = useGetManagementReportingBottomQuery({})

    return (
        <div className="space-y-6">
            <FinanceManagementReportingStats managementReportingTop={managementReportingTop} />
            <FinanceFinanceDashboard financeMyRecentTasks={financeMyRecentTasks} />
            <FinanceManagementReportingTable managementReportingBottom={managementReportingBottom} />
        </div>
    )
}

export default FinanceManagementReportingPageCntent