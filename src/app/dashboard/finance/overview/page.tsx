import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import FinanceOverviewPageContent from "./FinanceOverviewPageContent/FinanceOverviewPageContent";

function FinanceOverviewPage() {
  return (
    <section className="w-full space-y-6">
      <SectionHeader
        title="Dashboard Overview"
        subTitle="Manage user accounts and permissions"
      />
      <FinanceOverviewPageContent />
    </section>
  );
}

export default FinanceOverviewPage;
