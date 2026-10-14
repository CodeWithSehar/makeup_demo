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
              className={`group flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 select-none focus-visible:ring-2 focus-visible:ring-antique-gold focus-visible:outline-none cursor-pointer ${
                isSelected
                  ? 'bg-espresso text-white shadow-md shadow-stone-900/15 ring-1 ring-espresso'
                  : 'bg-white text-mocha hover:bg-surface-soft hover:text-espresso border border-warm-border shadow-sm'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold transition-colors ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-surface-soft text-muted-taupe group-hover:bg-surface-secondary/50 group-hover:text-espresso'
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
