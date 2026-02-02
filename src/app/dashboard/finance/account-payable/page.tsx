import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import FinanceAccountPayableTable from "./_components/FinanceAccountPayableTable/FinanceAccountPayableTable";

function FinanceAccountsPayablePage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Accounts Payable"
        subTitle="Manage accounts payable"
      />
      <FinanceAccountPayableTable />
    </div>
  );
}

export default FinanceAccountsPayablePage;
