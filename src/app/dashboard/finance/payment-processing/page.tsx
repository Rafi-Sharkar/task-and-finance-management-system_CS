import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import FinanceAddPayment from "./_components/FinanceAddPayment/FinanceAddPayment";
import FinancePaymentProcessingTable from "./_components/FinancePaymentProcessingTable/FinancePaymentProcessingTable";

function FinancePaymentProcessingPage() {
  return (
    <section className="w-full space-y-6">
      <div className="flex flex-wrap justify-between gap-3 sm:gap-4">
        <SectionHeader
          title="Payment Processing"
          subTitle="Manage tasks and assign tasks"
        />
        <FinanceAddPayment />
      </div>

      <FinancePaymentProcessingTable />
    </section>
  );
}

export default FinancePaymentProcessingPage;
