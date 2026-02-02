"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

import { useLogout } from "@/hooks/useLogout";
import { ChevronDown, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { sidebarConfig, TSidebarConfigRole } from "./routers";

export function AppSidebar({
  role = "admin",
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  role?: TSidebarConfigRole;
}) {
  const pathname = usePathname();
  const { setOpenMobile, isMobile } = useSidebar();
  const navSections = sidebarConfig[role];

  const [openDropdowns, setOpenDropdowns] = React.useState<{
    [key: string]: boolean;
  }>({});

  const toggleDropdown = (itemTitle: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [itemTitle]: !prev[itemTitle],
    }));
  };

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };
  // Logout Handler
  const handleLogOut = useLogout();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="py-6">
        <div className="flex justify-center">
          <h1 className="text-3xl font-bold text-[#1E293B]">Logo</h1>
        </div>
      </SidebarHeader>

      <SidebarContent className="scrollbar-hide no-scrollbar px-3">
        <SidebarMenu className="gap-3">
          {navSections?.map((section) =>
            section.items?.map((item) => {
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const isOpen = openDropdowns[item.title];
              const isActiveParent =
                pathname.startsWith(item.url) && item.url !== "/";
              const Icon = item.icon;

              return (
                <SidebarMenuItem key={item.title}>
                  {hasSubItems ? (
                    <div className="flex flex-col">
                      <SidebarMenuButton
                        onClick={() => toggleDropdown(item.title)}
                        className={`flex w-full items-center justify-between rounded-xl px-4 transition-all ${isActiveParent
                          ? "bg-[#F5F5F5] text-[#181D27]"
                          : "text-[#181D27] hover:bg-gray-50"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          {Icon && <Icon size={20} />}
                          <span className="text-sm font-medium text-[#414651]">
                            {item.title}
                          </span>
                        </div>
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </SidebarMenuButton>

                      {isOpen && (
                        <div className="mt-2 ml-6 flex flex-col border-l border-gray-200">
                          {item.subItems?.map((subItem) => {
                            const isSubActive = pathname === subItem?.url;
                            return (
                              <Link
                                key={subItem.title}
                                href={subItem.url}
                                onClick={handleLinkClick}
                                className={`relative flex h-10 items-center pr-4 pl-6 text-sm font-medium transition-all ${isSubActive
                                  ? "text-[#181D27] before:absolute before:-left-px before:h-full before:w-0.5 before:bg-[#181D27]"
                                  : "text-[#414651] hover:text-[#181D27]"
                                  }`}
                              >
                                {subItem.title}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      className={`h-12 rounded-xl px-4 transition-all ${pathname === item.url
                        ? "border-r-4! border-[#181D27] bg-[#F5F5F5] text-[#181D27]"
                        : "text-[#414651] hover:bg-[#F5F5F5]"
                        }`}
                    >
                      <Link
                        href={item.url}
                        onClick={handleLinkClick}
                        className="flex items-center gap-2"
                      >
                        {Icon && <Icon size={20} color="#181D27" />}
                        <span className="text-sm font-medium">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              );
            }),
          )}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <button onClick={handleLogOut} className="flex cursor-pointer items-center justify-center gap-3 px-4 py-3 text-[#DC2727] w-full rounded-xl bg-slate-100! hover:bg-red-50! text-center">
          <LogOut size={20} />
          <span className="text-sm font-semibold">Logout</span>
        </button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
