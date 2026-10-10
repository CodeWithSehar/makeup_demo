import React from 'react';
import type { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { PackageSearch } from 'lucide-react';
import { Button } from '../common/Button';

export interface ProductListProps {
  products: Product[];
  onResetFilters: () => void;
  onViewDetails?: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  onResetFilters,
  onViewDetails,
}) => {
  if (products.length === 0) {
    return (
      <div className="w-full py-20 px-4 text-center rounded-3xl bg-white border border-rose-100 shadow-sm max-w-xl mx-auto my-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
          <PackageSearch className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">No Products Found</h3>
        <p className="text-sm text-stone-500 max-w-sm mx-auto mb-6">
          We couldn&apos;t find any beauty items matching your search or filter criteria. Try adjusting your query.
        </p>
        <Button variant="outline" size="md" onClick={onResetFilters}>
          Clear All Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </div>
  );
};
