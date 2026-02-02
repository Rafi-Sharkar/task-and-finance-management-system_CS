import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import ClientMyInvoicesTable from "./_components/ClientMyInvoicesTable/ClientMyInvoicesTable";

function ClientMyInvoicesPage() {
  return (
    <section className="w-full space-y-6">
      <SectionHeader
        title="Invoices"
        subTitle="Your invoices and payment history"
      />

      <ClientMyInvoicesTable />
    </section>
  );
}

export default ClientMyInvoicesPage;
