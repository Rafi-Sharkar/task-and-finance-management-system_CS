import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountTab from "./_components/AccountTab/AccountTab";
import NotificationsTab from "./_components/NotificationsTab/NotificationsTab";
import SecurityTab from "./_components/SecurityTab/SecurityTab";

export default function SettingsPage() {
  return (
    <Tabs defaultValue="account" className="w-full">
      {/* Tabs Header */}
      <TabsList className="no-scrollbar shadow-0 flex w-full justify-start gap-6 overflow-x-auto overflow-y-hidden rounded-none border-b border-gray-300 bg-transparent p-0 sm:w-fit md:gap-10">
        {[
          { value: "account", label: "Account Settings" },
          { value: "security", label: "Security" },
          { value: "notifications", label: "Notifications" },
        ].map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="cursor-pointer flex-wrap rounded-none border-0 border-b-2 border-transparent bg-transparent pb-2 text-base font-medium text-[#414651] data-[state=active]:border-[#155DFC] data-[state=active]:text-[#155DFC] data-[state=active]:shadow-none"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="pt-6">
        <TabsContent value="account">
          <AccountTab />
        </TabsContent>

        <TabsContent value="security">
          <SecurityTab />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationsTab />
        </TabsContent>
      </div>
    </Tabs>
  );
}
