import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import FinanceAccountsReceivableTable from "./_components/FinanceAccountsReceivableTable/FinanceAccountsReceivableTable";

function FinanceAccountsReceivablePage() {
  return (
    <section className="space-y-6">
      <SectionHeader
        title="Accounts Receivable"
        subTitle="Manage accounts receivable"
      />
      <FinanceAccountsReceivableTable />
    </section>
  );
}

export default FinanceAccountsReceivablePage;
