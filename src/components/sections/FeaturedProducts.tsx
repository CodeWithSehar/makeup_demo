import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import type { Product } from '../../types';
import { ProductCard } from './ProductCard';

export interface FeaturedProductsProps {
  products: Product[];
  onViewDetails: (product: Product) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  onViewDetails,
}) => {
  const featuredList = products.filter((p) => p.isFeatured).slice(0, 8);

  return (
    <section className="py-16 md:py-24 bg-white border-b border-rose-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/80 text-xs font-semibold text-primary uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Editor&apos;s Luxury Selection</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
              Featured Products
            </h2>
            <p className="text-sm sm:text-base text-stone-600">
              Hand-picked bestsellers across makeup, skincare, fragrances, and watches — certified authentic.
            </p>
          </div>

          <a
            href="#shop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark group"
          >
            <span>View Full Shop ({products.length} Items)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 6–8 Featured Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuredList.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

