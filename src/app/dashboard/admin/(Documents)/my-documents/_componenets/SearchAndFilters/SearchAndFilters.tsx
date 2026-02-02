import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

function SearchAndFilters() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-md bg-white p-4">
      <div className="relative w-full max-w-md">
        <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#667085]" />
        <Input
          type="search"
          placeholder="Search users, documents, invoices..."
          className="h-11 w-full border-[#D5D7DA] pl-12 shadow-none focus-visible:ring-1"
        />
      </div>
    </div>
  );
}

export default SearchAndFilters;
