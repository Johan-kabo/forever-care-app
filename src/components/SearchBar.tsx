
import React from "react";
import { Search } from "lucide-react";

const SearchBar: React.FC = () => {
  return (
    <div className="relative mb-6 animate-slideUp" style={{ animationDelay: "0.1s" }}>
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search size={20} className="text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search Doctor..."
        className="w-full bg-white/80 backdrop-blur-sm text-gray-600 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-health-primary/20 transition-all duration-300"
      />
    </div>
  );
};

export default SearchBar;
