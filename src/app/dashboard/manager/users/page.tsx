import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import ManagerUsersStats from "./_components/ManagerUsersStats/ManagerUsersStats";
import ManagerUsersTable from "./_components/ManagerUsersTable/ManagerUsersTable";

function ManagerUsersPage() {
  return (
    <section className="space-y-6">
      <SectionHeader title="All Users" subTitle="See and monitor all users" />
      <ManagerUsersStats />
      <ManagerUsersTable />
    </section>
  );
}

export default ManagerUsersPage;
