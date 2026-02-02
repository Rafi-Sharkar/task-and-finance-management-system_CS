import { Button } from '@/components/ui/button'
import { ArrowRight, FileX } from 'lucide-react'
import React from 'react'

const TransactonsNoDataFound = () => {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-16 px-6">
            <div className="mb-4 rounded-full bg-gray-100 p-6">
                <FileX className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">No Transactions Found</h3>
            <p className="mb-6 text-center text-gray-500 max-w-md">
                There are no transactions available at the moment. Start by creating your first transaction.
            </p>
            <Button className="gap-2 bg-[#155DFC] hover:bg-[#0351f8]">
                Add Transaction <ArrowRight size={16} />
            </Button>
        </div>
    )
}

export default TransactonsNoDataFound;


