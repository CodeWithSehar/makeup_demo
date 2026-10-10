import { useState, useMemo } from 'react';
import type { Product } from '../types/product';
import type { FilterState, Category } from '../types';

export const initialFilterState: FilterState = {
  searchQuery: '',
  category: 'All',
  selectedBrands: [],
  minPrice: 0,
  maxPrice: 25000,
  availability: 'all',
  onlyDiscounted: false,
  onlyBundles: false,
  sortBy: 'popularity',
};

export const useProductFilters = (products: Product[]) => {
  const [filterState, setFilterState] = useState<FilterState>(initialFilterState);

  const availableBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    products.forEach((p) => {
      if (p.brand) brandsSet.add(p.brand);
    });
    return Array.from(brandsSet).sort();
  }, [products]);

  const categoryCounts = useMemo(() => {
    const counts: Record<Category, number> = {
      All: products.length,
      Makeup: 0,
      Skincare: 0,
      Haircare: 0,
      Perfumes: 0,
      Watches: 0,
      Accessories: 0,
      'Bundles & Kits': 0,
    };
    products.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      }
    });
    return counts;
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      // 1. Category
      if (filterState.category !== 'All' && product.category !== filterState.category) {
        return false;
      }

      // 2. Search
      if (filterState.searchQuery.trim() !== '') {
        const query = filterState.searchQuery.trim().toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesShade = product.shade ? product.shade.toLowerCase().includes(query) : false;
        if (!matchesName && !matchesBrand && !matchesDesc && !matchesCat && !matchesShade) {
          return false;
        }
      }

      // 3. Brands
      if (
        filterState.selectedBrands.length > 0 &&
        !filterState.selectedBrands.includes(product.brand)
      ) {
        return false;
      }

      // 4. Price
      if (product.price < filterState.minPrice || product.price > filterState.maxPrice) {
        return false;
      }

      // 5. Stock availability
      if (filterState.availability === 'in-stock' && product.stock <= 0) {
        return false;
      }
      if (filterState.availability === 'low-stock' && (product.stock <= 0 || product.stock > 3)) {
        return false;
      }
      if (filterState.availability === 'out-of-stock' && product.stock > 0) {
        return false;
      }

      // 6. Discount
      if (filterState.onlyDiscounted && (!product.discountPercentage || product.discountPercentage <= 0)) {
        return false;
      }

      // 7. Bundles
      if (filterState.onlyBundles && !product.isBundle) {
        return false;
      }

      return true;
    });

    // Sort
    switch (filterState.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popularity':
      default:
        result.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
    }

    return result;
  }, [products, filterState]);

  const resetFilters = () => setFilterState(initialFilterState);

  return {
    filterState,
    setFilterState,
    resetFilters,
    availableBrands,
    categoryCounts,
    filteredProducts,
  };
};

