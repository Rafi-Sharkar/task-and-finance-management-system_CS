import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import ManagerOverviewPageContent from "./_components/ManagerOverviewPageContent/ManagerOverviewPageContent";

function ManagerOverviewPage() {
  return (
    <section>
      <SectionHeader
        title="Dashboard Overview"
        subTitle="Manage user accounts and permissions"
      />
      <ManagerOverviewPageContent />
    </section>
  );
}

export default ManagerOverviewPage;
