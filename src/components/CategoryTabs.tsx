
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  emoji: string;
}

const categories: Category[] = [
  { id: "all", name: "Tous", emoji: "👥" },
  { id: "urgent", name: "Urgent", emoji: "⚡" },
  { id: "specialists", name: "Spécialistes", emoji: "👨‍⚕️" },
  { id: "general", name: "Généraliste", emoji: "🏥" },
];

const CategoryTabs: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="flex gap-3 mb-6 overflow-x-auto pb-2 no-scrollbar">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setActiveCategory(category.id)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300",
            activeCategory === category.id
              ? "bg-health-primary text-white"
              : "bg-health-lightGray text-gray-600"
          )}
        >
          <span>{category.emoji}</span>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
