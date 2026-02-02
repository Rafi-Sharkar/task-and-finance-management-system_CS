import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import FinanceBankReconciliationTable from "./_components/FinanceBankReconciliationTable/FinanceBankReconciliationTable";

function FinanceBankReconciliationPage() {
  return (
    <section className="w-full space-y-6">
      <SectionHeader
        title="Bank Reconciliation"
        subTitle="Manage Bank Reconciliation"
      />

      <FinanceBankReconciliationTable />
    </section>
  );
}

export default FinanceBankReconciliationPage;
