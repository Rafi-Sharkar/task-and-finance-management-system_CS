import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import ProjectsClientsOverviewTable from "./_components/ProjectsClientsOverviewTable/ProjectsClientsOverviewTable";

function AdminDashboardProjectsClientsOverviewPage() {
  return (
    <section className="space-y-6">
      <SectionHeader
        title="Projects & Clients Overview"
        subTitle="Manage Project and client"
        showBtn
        btnText="Create New Project"
        btnLink="/dashboard/admin/projects-clients-overview/create-project"
      />

      <ProjectsClientsOverviewTable />
    </section>
  );
}

export default AdminDashboardProjectsClientsOverviewPage;
