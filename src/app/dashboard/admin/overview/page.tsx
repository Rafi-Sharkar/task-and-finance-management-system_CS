import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import AdminOverviewPageContent from "./_components/AdminOverviewPageContent/AdminOverviewPageContent";

function AdminOverviewPage() {
  return (
    <section className="space-y-6">
      <SectionHeader
        title="Dashboard Overview"
        subTitle="Manage user accounts and permissions"
      />

      <AdminOverviewPageContent />
    </section>
  );
}

export default AdminOverviewPage;
