import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import FinanceCreateTransaction from "./_components/FinanceCreateTransaction/FinanceCreateTransaction";
import FinanceTransactionsTable from "./_components/FinanceTransactionsTable/FinanceTransactionsTable";


 const FinanceTransactionsPage = async() => {

  return (
    <section className="w-full space-y-6">
      <div className="flex flex-wrap justify-between gap-3 sm:gap-4">
        <SectionHeader
          title="Transactions"
          subTitle="Manage tasks and assign tasks"
        />
        <FinanceCreateTransaction />
      </div>

      <FinanceTransactionsTable />
    </section>
  );
}

export default FinanceTransactionsPage;
