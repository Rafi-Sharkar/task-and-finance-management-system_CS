import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import ClientInvoicesTable from "./_components/ClientInvoicesTable/ClientInvoicesTable";
import ClientRecentDocumentsTable from "./_components/ClientRecentDocumentsTable/ClientRecentDocumentsTable";

function ClientOverviewPage() {
  return (
    <section className="space-y-6">
      <SectionHeader
        title="Dashboard"
        subTitle="Overview of shared documents and invoices"
      />
      {/* <ClientOverviewNotifications /> */}
      <ClientRecentDocumentsTable />
      <ClientInvoicesTable />
    </section>
  );
}

export default ClientOverviewPage;
