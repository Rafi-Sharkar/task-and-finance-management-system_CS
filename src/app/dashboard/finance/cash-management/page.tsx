import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import FinanceCashManagementTable from "./_components/FinanceCashManagementTable/FinanceCashManagementTable";
import FinanceCreateCash from "./_components/FinanceCreateCash/FinanceCreateCash";

function FinanceCashManagementPage() {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap justify-between gap-3 sm:gap-4">
        <SectionHeader
          title="Cash Management"
          subTitle="Manage tasks and assign tasks"
        />
        <FinanceCreateCash />
      </div>

      <FinanceCashManagementTable />
    </section>
  );
}

export default FinanceCashManagementPage;
