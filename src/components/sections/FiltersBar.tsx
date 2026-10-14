import React, { useState } from 'react';
import { SlidersHorizontal, ArrowUpDown, X, Tag, Sparkles } from 'lucide-react';
import type { FilterState, SortOption, AvailabilityFilter } from '../../types';

export interface FiltersBarProps {
  filterState: FilterState;
  onFilterChange: (updater: (prev: FilterState) => FilterState) => void;
  onResetFilters: () => void;
  availableBrands: string[];
  totalResults: number;
}

export const FiltersBar: React.FC<FiltersBarProps> = ({
  filterState,
  onFilterChange,
  onResetFilters,
  availableBrands,
  totalResults,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const sortOptions: { label: string; value: SortOption }[] = [
    { label: 'Most Popular', value: 'popularity' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Newest Arrivals', value: 'newest' },
  ];

  const availabilityOptions: { label: string; value: AvailabilityFilter }[] = [
    { label: 'All Items', value: 'all' },
    { label: 'In Stock Only', value: 'in-stock' },
    { label: 'Low Stock (<4 left)', value: 'low-stock' },
  ];

  const handleBrandToggle = (brand: string) => {
    onFilterChange((prev) => {
      const exists = prev.selectedBrands.includes(brand);
      const updated = exists
        ? prev.selectedBrands.filter((b) => b !== brand)
        : [...prev.selectedBrands, brand];
      return { ...prev, selectedBrands: updated };
    });
  };

  const hasActiveFilters =
    filterState.selectedBrands.length > 0 ||
    filterState.minPrice > 0 ||
    filterState.maxPrice < 25000 ||
    filterState.availability !== 'all' ||
    filterState.onlyDiscounted ||
    filterState.onlyBundles ||
    filterState.searchQuery !== '';

  return (
    <div className="w-full bg-white rounded-2xl border border-warm-border p-4 sm:p-5 shadow-xs space-y-4">
      {/* Top Bar: Sort dropdown, Filter Toggle, and Total Count */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
              isExpanded || hasActiveFilters
                ? 'bg-surface-soft text-espresso border-champagne-gold'
                : 'bg-ivory text-mocha border-warm-border hover:bg-surface-soft'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters &amp; Brand Discovery</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-antique-gold" />
            )}
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 text-xs text-muted-taupe hover:text-error transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear filters</span>
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-xs text-muted-taupe flex items-center gap-1">
            <ArrowUpDown className="w-3 h-3" />
            <span>Sort by:</span>
          </label>
          <select
            id="sort-select"
            value={filterState.sortBy}
            onChange={(e) =>
              onFilterChange((prev) => ({ ...prev, sortBy: e.target.value as SortOption }))
            }
            className="px-3 py-1.5 rounded-xl border border-warm-border bg-white text-xs font-medium text-mocha focus:outline-none focus:ring-1 focus:ring-antique-gold cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Expanded Filter Panel */}
      {isExpanded && (
        <div className="pt-4 border-t border-warm-border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs animate-in fade-in duration-200">
          
          {/* 1. Brand Filter */}
          <div className="space-y-2">
            <h4 className="font-semibold text-espresso font-mono uppercase tracking-wider text-[11px]">
              Brand Collection ({availableBrands.length})
            </h4>
            <div className="max-h-36 overflow-y-auto space-y-1.5 pr-2">
              {availableBrands.map((brand) => {
                const checked = filterState.selectedBrands.includes(brand);
                return (
                  <label
                    key={brand}
                    className="flex items-center gap-2 text-mocha hover:text-espresso cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleBrandToggle(brand)}
                      className="rounded border-warm-border text-antique-gold focus:ring-antique-gold"
                    />
                    <span className="truncate">{brand}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 2. Price Range */}
          <div className="space-y-2">
            <h4 className="font-semibold text-espresso font-mono uppercase tracking-wider text-[11px]">
              Price Range (PKR)
            </h4>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filterState.minPrice || ''}
                onChange={(e) =>
                  onFilterChange((prev) => ({ ...prev, minPrice: Number(e.target.value) || 0 }))
                }
                className="w-full px-2.5 py-1.5 rounded-lg border border-warm-border text-xs font-mono"
              />
              <span className="text-muted-taupe">&ndash;</span>
              <input
                type="number"
                placeholder="Max"
                value={filterState.maxPrice || ''}
                onChange={(e) =>
                  onFilterChange((prev) => ({
                    ...prev,
                    maxPrice: Number(e.target.value) || 25000,
                  }))
                }
                className="w-full px-2.5 py-1.5 rounded-lg border border-warm-border text-xs font-mono"
              />
            </div>
            <p className="text-[10px] text-muted-taupe">
              Rs. {filterState.minPrice.toLocaleString()} to Rs. {filterState.maxPrice.toLocaleString()}
            </p>
          </div>

          {/* 3. Stock Availability */}
          <div className="space-y-2">
            <h4 className="font-semibold text-espresso font-mono uppercase tracking-wider text-[11px]">
              Availability
            </h4>
            <div className="flex flex-col gap-1.5">
              {availabilityOptions.map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center gap-2 text-mocha hover:text-espresso cursor-pointer"
                >
                  <input
                    type="radio"
                    name="availability"
                    checked={filterState.availability === opt.value}
                    onChange={() =>
                      onFilterChange((prev) => ({ ...prev, availability: opt.value }))
                    }
                    className="text-antique-gold focus:ring-antique-gold"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 4. Special Merchandising: Discounts & Bundles */}
          <div className="space-y-2">
            <h4 className="font-semibold text-espresso font-mono uppercase tracking-wider text-[11px]">
              Promotions &amp; Bundles
            </h4>
            <div className="space-y-2 pt-0.5">
              <label className="flex items-center gap-2 text-mocha hover:text-espresso cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterState.onlyDiscounted}
                  onChange={(e) =>
                    onFilterChange((prev) => ({ ...prev, onlyDiscounted: e.target.checked }))
                  }
                  className="rounded border-warm-border text-antique-gold focus:ring-antique-gold"
                />
                <span className="flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-antique-gold" />
                  <span>On Sale / Discounted only</span>
                </span>
              </label>

              <label className="flex items-center gap-2 text-mocha hover:text-espresso cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterState.onlyBundles}
                  onChange={(e) =>
                    onFilterChange((prev) => ({ ...prev, onlyBundles: e.target.checked }))
                  }
                  className="rounded border-warm-border text-antique-gold focus:ring-antique-gold"
                />
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-champagne-gold" />
                  <span>Kits &amp; Gift Bundles only</span>
                </span>
              </label>
            </div>
          </div>

        </div>
      )}

      {/* Active Filter Pills Bar */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-warm-border/60 text-[11px]">
          <span className="text-muted-taupe font-mono mr-1">Active:</span>

          {filterState.selectedBrands.map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-soft text-mocha border border-warm-border"
            >
              <span>{b}</span>
              <button
                type="button"
                onClick={() => handleBrandToggle(b)}
                className="hover:text-espresso"
              >
                &times;
              </button>
            </span>
          ))}

          {filterState.onlyDiscounted && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-soft text-antique-gold border border-champagne-gold/60">
              <span>Sale items only</span>
              <button
                type="button"
                onClick={() => onFilterChange((prev) => ({ ...prev, onlyDiscounted: false }))}
              >
                &times;
              </button>
            </span>
          )}

          {filterState.onlyBundles && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-soft text-warning border border-champagne-gold/60">
              <span>Bundles only</span>
              <button
                type="button"
                onClick={() => onFilterChange((prev) => ({ ...prev, onlyBundles: false }))}
              >
                &times;
              </button>
            </span>
          )}

          {filterState.availability !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-ivory text-mocha">
              <span>Stock: {filterState.availability}</span>
              <button
                type="button"
                onClick={() => onFilterChange((prev) => ({ ...prev, availability: 'all' }))}
              >
                &times;
              </button>
            </span>
          )}

          <span className="ml-auto text-muted-taupe font-mono">
            {totalResults} {totalResults === 1 ? 'match' : 'matches'}
          </span>
        </div>
      )}
    </div>
  );
};
