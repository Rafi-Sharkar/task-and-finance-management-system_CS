import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import FinanceRegulatoryReportingTable from "./_components/FinanceRegulatoryReportingTable/FinanceRegulatoryReportingTable";

function FinancePage() {
  return (
    <section className="w-full space-y-6">
      <SectionHeader
        title="Regulatory Reporting"
        subTitle="Mandatory regulatory reports based on your company’s jurisdiction and activities."
      />
      <FinanceRegulatoryReportingTable />
    </section>
  );
}

export default FinancePage;
