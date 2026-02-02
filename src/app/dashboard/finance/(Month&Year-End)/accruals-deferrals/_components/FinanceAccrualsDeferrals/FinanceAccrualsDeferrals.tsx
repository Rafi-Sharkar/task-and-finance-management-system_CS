"use client"

import { useState } from "react";

import { useGetAccrualsDeferralsQuery } from "@/redux/features/finance/accrualsAndDeferrals/accrualsAndDeferrals.api";
import FinanceAccrualsDeferralsTable from "./FinanceAccrualsDeferralsTable/FinanceAccrualsDeferralsTable";
import FinanceAccrualsNewEntry from "./FinanceAccrualsDefNewEntry/FinanceAccrualsNewEntry";


export interface IAccrualDeferral {
    id: string;
    period: string;
    type: "ACCRUAL" | "DEFERRAL";
    name: string,
    description: string;
    amount: number;
    status: "DRAFT" | "POSTED";
    startDate?: string;
    endDate?: string;
    createdAt: string;
    updatedAt: string;
}

function FinanceAccrualsDeferrals() {
    const [selectedItem, setSelectedItem] = useState<IAccrualDeferral | null>(null);
    const [showForm, setShowForm] = useState(false);

    // API call - API documentation 
    const { data, isLoading, isFetching } = useGetAccrualsDeferralsQuery({
        page: 1,
        limit: 10,
        search: "",
        status: ""
    });

    const handleEdit = (item: IAccrualDeferral) => {
        setSelectedItem(item);
        setShowForm(true);
    };

    const handleClose = () => {
        setShowForm(false);
        setSelectedItem(null);
    };

    return (
        <section className="space-y-5">
            <FinanceAccrualsNewEntry
                showForm={showForm}
                setShowForm={setShowForm}
                selectedItem={selectedItem}
                onClose={handleClose}
            />
            <FinanceAccrualsDeferralsTable
                onEdit={handleEdit}
                data={data?.data}
                isLoading={isLoading}
                isFetching={isFetching}
            />
        </section>
    )
}

export default FinanceAccrualsDeferrals