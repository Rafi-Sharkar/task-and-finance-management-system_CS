import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import CreateExpensesInvoices from "./_components/CreateInvoices/CreateExpensesInvoices";
import FinanceExpensesInvoicesTable from "./_components/FinanceExpensesInvoicesTable/FinanceExpensesInvoicesTable ";

function FinancePage() {
  return (
    <section className="w-full space-y-6">
      <div className="flex flex-wrap justify-between gap-3 sm:gap-4">
        <SectionHeader
          title="Expenses Invoices "
          subTitle="View, create, and manage all expenses invoices"
        />
        <CreateExpensesInvoices />
      </div>
      <FinanceExpensesInvoicesTable />
    </section>
  );
}

export default FinancePage;
