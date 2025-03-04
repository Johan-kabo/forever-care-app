
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  emoji: string;
}

const categories: Category[] = [
  { id: "all", name: "All", emoji: "🔥" },
  { id: "fever", name: "Fever", emoji: "🤒" },
  { id: "cough", name: "Cough", emoji: "😷" },
  { id: "nausea", name: "Nausea", emoji: "🤢" },
];

const CategoryTabs: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="flex gap-3 mb-6 overflow-x-auto pb-2 no-scrollbar animate-slideUp" style={{ animationDelay: "0.2s" }}>
      {categories.map((category, index) => (
        <button
          key={category.id}
          onClick={() => setActiveCategory(category.id)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300",
            activeCategory === category.id
              ? "bg-health-primary text-white"
              : "bg-health-lightGray text-gray-600"
          )}
          style={{ animationDelay: `${0.1 * index}s` }}
        >
          <span>{category.emoji}</span>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
