import FianceProvision from "./_components/FianceProvision/FianceProvision";
import FinanceProvisionsStats from "./_components/FinanceProvisionsStats/FinanceProvisionsStats";


function FinanceProvisionsPage() {
  return (
    <section className="space-y-6">
      <FinanceProvisionsStats />
      <FianceProvision />
    </section>
  );
}

export default FinanceProvisionsPage;
