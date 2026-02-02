import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import { FinanceGenerateVATReport } from "./_components/FinanceGenerateVATReport/FinanceGenerateVATReport";
import FinanceVATReturnsTable from "./_components/FinanceVATReturnsTable/FinanceVATReturnsTable";

function FinanceVATReturnsPage() {
  return (
    <section className="space-y-6">
      <SectionHeader
        title="VAT Returns"
        subTitle="View, create, and manage all client invoices"
      />
      <FinanceGenerateVATReport />
      <FinanceVATReturnsTable />
    </section>
  );
}

export default FinanceVATReturnsPage;
