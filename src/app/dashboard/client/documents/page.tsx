import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import ClientDocumentsPageContent from "./_components/ClientDocumentsPageContent/ClientDocumentsPageContent";

function ClientDocumentsPage() {
  return (
    <section className="space-y-6">
      <SectionHeader
        title="Documents"
        subTitle="Manage and review uploaded documents"
      />

      <ClientDocumentsPageContent />
    </section>
  );
}

export default ClientDocumentsPage;
