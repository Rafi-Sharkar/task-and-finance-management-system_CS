import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import AddUser from "./_components/AddUser/AddUser";
import Stats from "./_components/stats/Stats";
import UserManagementTable from "./_components/UserManagementTable/UserManagementTable";

function AdminUserManagementPage() {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap justify-between gap-3 sm:gap-4">
        <SectionHeader
          title="User Management"
          subTitle="Manage user accounts and permissions"
        />
        <AddUser />
      </div>

      <Stats />
      <UserManagementTable />
    </section>
  );
}

export default AdminUserManagementPage;
