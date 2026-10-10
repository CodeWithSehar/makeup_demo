import React, { useState, useMemo, useCallback } from 'react';
import type { Category, Product, FilterState } from '../../../types';
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { Hero } from '../../../components/sections/Hero';
import { SpecialOffer } from '../../../components/sections/SpecialOffer';
import { CategoryBar } from '../../../components/sections/CategoryBar';
import { SearchBar } from '../../../components/sections/SearchBar';
import { FiltersBar } from '../../../components/sections/FiltersBar';
import { ProductList } from '../../../components/sections/ProductList';
import { PolicyFAQ } from '../../../components/sections/PolicyFAQ';
import { About } from '../../../components/sections/About';
import { Contact } from '../../../components/sections/Contact';
import { ProductDetailsModal } from '../../../components/common/ProductDetailsModal';
import { CartDrawer } from '../../../components/cart/CartDrawer';
import { AdminDrawer } from '../../../components/admin/AdminDrawer';
import { Sparkles, FilterX, ShoppingCart } from 'lucide-react';
import { useStore } from '../../../context/useStore';
import { formatPKR } from '../../../utils/formatCurrency';

const ALL_CATEGORIES: Category[] = [
  'All',
  'Makeup',
  'Skincare',
  'Haircare',
  'Perfumes',
  'Watches',
  'Accessories',
  'Bundles & Kits',
];

const INITIAL_FILTER_STATE: FilterState = {
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

export const HomePage: React.FC = () => {
  const { products, cartCount, totalPayable, setIsCartOpen } = useStore();

  const [filterState, setFilterState] = useState<FilterState>(INITIAL_FILTER_STATE);
  const [activeProductForDetails, setActiveProductForDetails] = useState<Product | null>(null);

  // Dynamic available brands list from current catalog
  const availableBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    products.forEach((p) => {
      if (p.brand) brandsSet.add(p.brand);
    });
    return Array.from(brandsSet).sort();
  }, [products]);

  // Dynamic category counts calculation
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

  // Handle category tab change
  const handleSelectCategory = useCallback((category: Category) => {
    setFilterState((prev) => ({
      ...prev,
      category,
      onlyBundles: category === 'Bundles & Kits',
    }));
  }, []);

  // Reset all filters
  const handleResetFilters = useCallback(() => {
    setFilterState(INITIAL_FILTER_STATE);
  }, []);

  // Filtered and Sorted products computation
  const processedProducts = useMemo(() => {
    const result = products.filter((product) => {
      // 1. Category filter
      if (filterState.category !== 'All' && product.category !== filterState.category) {
        return false;
      }

      // 2. Search query (matches name, brand, description, category, shade)
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

      // 3. Brand filter
      if (
        filterState.selectedBrands.length > 0 &&
        !filterState.selectedBrands.includes(product.brand)
      ) {
        return false;
      }

      // 4. Price range
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

      // 6. Discount filter
      if (filterState.onlyDiscounted && (!product.discountPercentage || product.discountPercentage <= 0)) {
        return false;
      }

      // 7. Bundles only filter
      if (filterState.onlyBundles && !product.isBundle) {
        return false;
      }

      return true;
    });

    // Sort result
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

  return (
    <div className="min-h-screen flex flex-col bg-stone-50/50 text-text-main">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Home - Configurable Hero Banner */}
        <Hero />

        {/* 2. Shop - Complete Boutique Catalog & Category Discovery */}
        <section id="shop" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Shop Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-rose-100 pb-8">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/80 text-xs font-semibold text-primary uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Complete Luxury Boutique Catalog</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
                Shop All Collections
              </h2>
              <p className="text-sm sm:text-base text-stone-600">
                Search by name, brand, or formula. Refine by category, price, brand, or discount.
              </p>
            </div>

            {/* Live Debounce / Immediate Search Bar */}
            <div className="w-full md:w-auto">
              <SearchBar
                searchQuery={filterState.searchQuery}
                onSearchChange={(query) => setFilterState((prev) => ({ ...prev, searchQuery: query }))}
                totalFound={processedProducts.length}
              />
            </div>
          </div>

          {/* Category Filter Pills & Reset Status */}
          <div id="categories" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CategoryBar
              categories={ALL_CATEGORIES}
              selectedCategory={filterState.category}
              onSelectCategory={handleSelectCategory}
              categoryCounts={categoryCounts}
            />

            {(filterState.category !== 'All' || filterState.searchQuery !== '') && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-primary hover:bg-rose-50 rounded-full border border-stone-200/80 transition-colors shrink-0 cursor-pointer"
              >
                <FilterX className="w-3.5 h-3.5" />
                <span>Reset All</span>
              </button>
            )}
          </div>

          {/* Advanced Filters & Sorting Panel */}
          <FiltersBar
            filterState={filterState}
            onFilterChange={setFilterState}
            onResetFilters={handleResetFilters}
            availableBrands={availableBrands}
            totalResults={processedProducts.length}
          />

          {/* Results Counter Banner */}
          <div className="flex items-center justify-between text-xs text-stone-500 font-mono pt-1">
            <span>
              Showing <strong className="text-stone-900">{processedProducts.length}</strong> of{' '}
              {products.length} products
              {filterState.category !== 'All' ? ` in ${filterState.category}` : ''}
            </span>
            <span className="hidden sm:inline">Prices displayed in Pakistani Rupee (PKR)</span>
          </div>

          {/* Product Grid */}
          <ProductList
            products={processedProducts}
            onResetFilters={handleResetFilters}
            onViewDetails={setActiveProductForDetails}
          />
        </section>

        {/* 3. Special Offer Banner */}
        <SpecialOffer />

        {/* 6. Transparency, Authenticity & Customer Policies FAQ */}
        <PolicyFAQ />

        {/* 7. About Us - Story & Physical Store Location / Photo */}
        <About />

        {/* 8. Contact - WhatsApp, Phone, Location, & Social Media */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Details Modal (Opens when user clicks 'View Details') */}
      <ProductDetailsModal
        product={activeProductForDetails}
        onClose={() => setActiveProductForDetails(null)}
      />

      {/* Shopping Cart Slide-out Drawer */}
      <CartDrawer />

      {/* Admin Storefront Manager Drawer (Live stock, zero redeploy) */}
      <AdminDrawer />

      {/* Floating Sticky Cart Access (When items added) */}
      {cartCount > 0 && (
        <aside aria-label="Customer cart access" className="fixed bottom-6 right-6 z-30">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label="Open Shopping Cart"
            className="flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-stone-900 hover:bg-black text-white shadow-xl shadow-stone-950/25 hover:scale-105 transition-all text-xs sm:text-sm font-semibold cursor-pointer border border-stone-800"
          >
            <ShoppingCart className="w-4 h-4 text-rose-300" />
            <span>Cart ({cartCount}) &bull; {formatPKR(totalPayable)}</span>
          </button>
        </aside>
      )}
    </div>
  );
};

