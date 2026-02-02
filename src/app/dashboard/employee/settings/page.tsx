import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import SettingsPage from "@/components/shared/SettingsPage/SettingsPage";

function EmployeeSettingsPage() {
  return (
    <section className="w-full space-y-5">
      <SectionHeader
        title="Settings"
        subTitle="Manage organization and system settings"
      />

      <SettingsPage />
    </section>
  );
}

export default EmployeeSettingsPage;
