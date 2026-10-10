import React from 'react';
import type { Category } from '../../types';

export interface CategoryBarProps {
  categories: Category[];
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  categoryCounts: Record<Category, number>;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-none" role="tablist" aria-label="Product Categories">
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-max">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          const count = categoryCounts[cat] || 0;

          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isSelected}
              onClick={() => onSelectCategory(cat)}
              className={`group flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 select-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none cursor-pointer ${
                isSelected
                  ? 'bg-primary text-white shadow-md shadow-rose-300/40 ring-1 ring-primary'
                  : 'bg-white text-stone-700 hover:bg-rose-50/70 hover:text-primary border border-rose-100 shadow-sm'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold transition-colors ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-rose-50 text-stone-500 group-hover:bg-rose-100 group-hover:text-primary'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
