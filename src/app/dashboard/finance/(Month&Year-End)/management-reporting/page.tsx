import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import FinanceManagementReportingPageCntent from "./FinanceManagementReportingPageCntent/FinanceManagementReportingPageCntent";

function FinanceManagementReportingPage() {
  return (
    <section className="space-y-6">
      <SectionHeader
        title="Management Reporting"
        subTitle=" Monitor all invoices and payments at a glance for quick audit and tracking."
      />
      <FinanceManagementReportingPageCntent />
    </section>
  );
}

export default FinanceManagementReportingPage;
