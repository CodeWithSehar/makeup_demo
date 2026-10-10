export * from './category';
export * from './product';
export * from './inventory';
export * from './order';
export * from './promotion';
export * from './shopSettings';

import type { Category } from './category';
import type { Product } from './product';
import type { HeroSettings } from './shopSettings';

export type HeroConfig = HeroSettings;

export interface CartItem {
  product: Product;
  quantity: number;
}

export type SortOption = 'popularity' | 'price-asc' | 'price-desc' | 'newest';
export type AvailabilityFilter = 'all' | 'in-stock' | 'low-stock' | 'out-of-stock';

export interface FilterState {
  searchQuery: string;
  category: Category;
  selectedBrands: string[];
  minPrice: number;
  maxPrice: number;
  availability: AvailabilityFilter;
  onlyDiscounted: boolean;
  onlyBundles: boolean;
  sortBy: SortOption;
}
