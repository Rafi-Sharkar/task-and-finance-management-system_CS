import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="relative w-full">
      <Search className="absolute top-3 left-4 h-5 w-5 text-[#414651]" />
      <Input
        type="search"
        placeholder="Search users, documents, invoices..."
        className="h-11 w-full border-[#D5D7DA] bg-transparent py-2 pl-12 text-[#414651] shadow-none placeholder:text-[#414651] sm:py-3"
      />
    </div>
  );
}

export default SearchBar;
