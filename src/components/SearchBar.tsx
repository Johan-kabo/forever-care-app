
import React from "react";
import { Search } from "lucide-react";

const SearchBar: React.FC = () => {
  return (
    <div className="relative animate-slideUp" style={{ animationDelay: "0.1s" }}>
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search size={20} className="text-health-primary/70" />
      </div>
      <input
        type="text"
        placeholder="Search Doctor..."
        className="w-full bg-white/20 backdrop-blur-sm text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none placeholder-white/70 border border-white/20"
      />
    </div>
  );
};

export default SearchBar;
