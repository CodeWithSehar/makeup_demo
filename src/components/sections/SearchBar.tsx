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
        <Search className="absolute left-4 w-4 h-4 text-muted-taupe pointer-events-none" />
        <input
          id="search-products"
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search lipstick, serum, fragrance..."
          className="w-full pl-11 pr-10 py-2.5 bg-white border border-warm-border rounded-full text-sm text-espresso placeholder-muted-taupe/70 focus-visible:ring-2 focus-visible:ring-antique-gold focus-visible:outline-none focus:border-antique-gold shadow-sm transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            aria-label="Clear search query"
            className="absolute right-3 p-1 rounded-full text-muted-taupe hover:text-espresso hover:bg-surface-soft transition-colors focus-visible:ring-2 focus-visible:ring-antique-gold focus-visible:outline-none"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      {searchQuery && (
        <p className="absolute -bottom-5 left-4 text-[11px] text-muted-taupe font-mono">
          Found {totalFound} item{totalFound === 1 ? '' : 's'} matching &ldquo;{searchQuery}&rdquo;
        </p>
      )}
    </div>
  );
};

