import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import OthersDocumentsTable from "./_components/OthersDocumentsTable/OthersDocumentsTable";

function AdminOthersDocumentsPage() {
  return (
    <section className="space-y-6">
      <SectionHeader
        title="Others Documents"
        subTitle="Manage and review uploaded documents"
      />
      <OthersDocumentsTable />
    </section>
  );
}

export default AdminOthersDocumentsPage;
