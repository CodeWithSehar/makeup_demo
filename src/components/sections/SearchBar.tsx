import React from 'react';
import { Search, X } from 'lucide-react';

export interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalFound: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  totalFound,
}) => {
  return (
    <div className="relative w-full max-w-md">
      <div className="relative flex items-center">
        <label htmlFor="search-products" className="sr-only">
          Search products by name or description
        </label>
        <Search className="absolute left-4 w-4 h-4 text-stone-400 pointer-events-none" />
        <input
          id="search-products"
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search lipstick, serum, fragrance..."
          className="w-full pl-11 pr-10 py-2.5 bg-white border border-rose-200/90 rounded-full text-sm text-stone-900 placeholder-stone-400 focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none focus:border-primary shadow-sm transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            aria-label="Clear search query"
            className="absolute right-3 p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      {searchQuery && (
        <p className="absolute -bottom-5 left-4 text-[11px] text-stone-500 font-mono">
          Found {totalFound} item{totalFound === 1 ? '' : 's'} matching &ldquo;{searchQuery}&rdquo;
        </p>
      )}
    </div>
  );
};

