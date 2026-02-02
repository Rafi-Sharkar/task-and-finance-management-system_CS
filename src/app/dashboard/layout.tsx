"use client";

import { AppSidebar } from "@/components/shared/dashboard/AppSidebar/AppSidebar";
import { TSidebarConfigRole } from "@/components/shared/dashboard/AppSidebar/routers";
import { Chatbot } from "@/components/shared/dashboard/Chatbot/Chatbot";
import NavigationBar from "@/components/shared/dashboard/navigationBar/NavigationBar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  let userRole: TSidebarConfigRole = "admin";
  if (pathname.startsWith("/dashboard/admin")) {
    userRole = "admin";
  } else if (pathname.startsWith("/dashboard/manager")) {
    userRole = "manager";
  } else if (pathname.startsWith("/dashboard/finance")) {
    userRole = "finance";
  } else if (pathname.startsWith("/dashboard/employee")) {
    userRole = "employee";
  } else if (pathname.startsWith("/dashboard/client")) {
    userRole = "client";
  }

  return (
    <SidebarProvider>
      {/* Sidebar */}
      <AppSidebar role={userRole} />
      {/* Main Content */}
      <SidebarInset>
        {/* Navbar */}
        <NavigationBar />
        {/* Page Content */}
        <main className="h-full w-full bg-[#E9EAEB] p-4 lg:p-6">
          {children}
        </main>
      </SidebarInset>
      <Chatbot />
    </SidebarProvider>
  );
};

export default DashboardLayout;
