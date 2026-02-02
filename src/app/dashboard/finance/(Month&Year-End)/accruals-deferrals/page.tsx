import FinanceAccrualsAndDeferralsStats from "./_components/FinanceAccrualsAndDeferralsStats/FinanceAccrualsAndDeferralsStats";
import FinanceAccrualsDeferrals from "./_components/FinanceAccrualsDeferrals/FinanceAccrualsDeferrals";

function FinanceAccrualsAndDeferralsPage() {
  return (
    <section className="space-y-6">
      <FinanceAccrualsAndDeferralsStats />
      <FinanceAccrualsDeferrals />
    </section>
  );
}

export default FinanceAccrualsAndDeferralsPage;
