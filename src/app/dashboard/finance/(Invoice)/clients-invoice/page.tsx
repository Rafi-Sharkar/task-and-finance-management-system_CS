import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import CreateInvoices from "./_components/CreateInvoices/CreateInvoices";
import FinanceClientsInvoiceTable from "./_components/FinanceClientsInvoiceTable/FinanceClientsInvoiceTable";

function FinancePage() {
  return (
    <section className="w-full space-y-6">
      <div className="flex flex-wrap justify-between gap-3 sm:gap-4">
        <SectionHeader
          title="Invoices"
          subTitle="View, create, and manage all client invoices"
        />
        <CreateInvoices />
      </div>
      <FinanceClientsInvoiceTable />
    </section>
  );
}

export default FinancePage;
