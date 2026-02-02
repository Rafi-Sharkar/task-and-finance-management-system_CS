import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import EmployeeCharts from "./_components/EmployeeCharts/EmployeeCharts";
import EmployeeMyTaskTable from "./_components/EmployeeMyTaskTable/EmployeeMyTaskTable";

function EmployeeDashboardPage() {
  return (
    <section className="w-full space-y-6">
      <SectionHeader title="Dashboard" subTitle="Your daily work overview" />
      <EmployeeCharts />
      <EmployeeMyTaskTable />
    </section>
  );
}

export default EmployeeDashboardPage;
