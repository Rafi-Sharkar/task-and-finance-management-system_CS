import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import FinanceProfitLossPreview from "./_components/FinanceProfitLossPreview/FinanceProfitLossPreview";
import FinancialStatementsStats from "./_components/FinancialStatementsStats/FinancialStatementsStats";

function FinancePage() {
  return (
    <section className="space-y-6">
      <SectionHeader
        title="Preparation for Financial Statements"
        subTitle="Ensure data is ready for tax advisors and auditors"
      />
      <FinancialStatementsStats />
      {/* <FinanceStatementsTable /> */}
      <FinanceProfitLossPreview />
    </section>
  );
}

export default FinancePage;
