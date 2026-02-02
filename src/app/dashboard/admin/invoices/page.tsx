import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import InvoicesTable from "./_components/InvoicesTable/InvoicesTable";

function AdminDashboardInvoicesPage() {
  return (
    <section className="w-full space-y-5">
      <SectionHeader
        title="Invoices"
        subTitle="Manage and review uploaded documents"
      />

      <InvoicesTable />
    </section>
  );
}

export default AdminDashboardInvoicesPage;
