import { SidebarTrigger } from "@/components/ui/sidebar";
import RightSection from "./_components/RightSection/RightSection";
// import SearchBar from "./_components/SearchBar";

export default function NavigationBar() {
  return (
    <header className="sticky top-0 z-50 flex h-18 shrink-0 items-center justify-between gap-10 border-b bg-[#FDFDFD] px-2 sm:px-4 lg:px-6">
      {/* Left Section */}
      <div className="flex w-full max-w-175 items-center gap-4 md:gap-6">
        {/* Sidebar Trigger */}
        <SidebarTrigger className="text-primary cursor-pointer sm:-ml-4" />
        {/* Search Bar */}
        {/* <SearchBar /> */}
      </div>
      {/* Right Section */}
      <RightSection />
    </header>
  );
}
