import React, { useState } from 'react';
import { Star, Eye, Tag, ShoppingCart, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import type { Product } from '../../types';
import { formatPKR } from '../../utils/formatCurrency';
import { QuantityInput } from '../common/QuantityInput';
import { Badge } from '../common/Badge';
import { useStore } from '../../context/useStore';

export interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [imageError, setImageError] = useState<boolean>(false);
  const [addedToast, setAddedToast] = useState<boolean>(false);

  const { addToCart } = useStore();

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 3;

  const totalPrice = product.price * quantity;

  const fallbackImage =
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    const res = addToCart(product, quantity);
    if (res.success) {
      setAddedToast(true);
      setTimeout(() => setAddedToast(false), 2000);
    }
  };

  return (
    <article
      className="group relative flex flex-col bg-white rounded-2xl border border-rose-100/90 shadow-sm hover:shadow-xl hover:shadow-rose-950/5 transition-all duration-300 overflow-hidden"
    >
      {/* Aspect-ratio Image Container to eliminate Cumulative Layout Shift (CLS) */}
      <div className="relative aspect-square w-full overflow-hidden bg-rose-50/50">
        <img
          src={imageError ? fallbackImage : product.image}
          alt={product.name}
          width={400}
          height={400}
          loading="lazy"
          decoding="async"
          onError={() => setImageError(true)}
          className={`h-full w-full object-cover object-center transition-transform duration-700 ease-out ${
            !isOutOfStock ? 'group-hover:scale-108' : ''
          } ${isOutOfStock ? 'filter grayscale opacity-60' : ''}`}
        />

        {/* Top Badges & Discount */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <div className="flex flex-wrap gap-1">
            <Badge variant="blush">{product.category}</Badge>
            {product.badge && (
              <Badge variant="gold" className="shadow-xs">
                {product.badge}
              </Badge>
            )}
          </div>
          {product.discountPercentage && (
            <span className="self-start inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-bold tracking-wide shadow-xs">
              <Tag className="w-2.5 h-2.5" />
              <span>{product.discountPercentage}% OFF</span>
            </span>
          )}
        </div>

        {/* Quick View Button on Image Hover */}
        {onViewDetails && (
          <button
            type="button"
            onClick={() => onViewDetails(product)}
            aria-label={`View details for ${product.name}`}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-stone-700 hover:text-primary hover:bg-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-sm focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-rose-500 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}

        {/* Stock Visibility Pill */}
        <div className="absolute bottom-3 left-3 z-10">
          {isOutOfStock ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-900/85 backdrop-blur-xs text-[11px] font-bold text-white shadow-xs">
              <XCircle className="w-3 h-3 text-rose-300" />
              <span>Out of stock</span>
            </span>
          ) : isLowStock ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/95 backdrop-blur-xs text-[11px] font-bold text-white shadow-xs animate-pulse">
              <AlertTriangle className="w-3 h-3" />
              <span>Only {product.stock} left</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[11px] font-medium text-emerald-700 shadow-xs border border-emerald-100">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              <span>In stock</span>
            </span>
          )}
        </div>

        {/* Rating Overlay */}
        {product.rating && (
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-semibold text-stone-800 shadow-xs border border-stone-100">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Card Content & Details */}
      <div className="flex flex-col flex-1 p-5 space-y-3">
        {/* Brand & Title */}
        <div className="space-y-1 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary font-mono truncate">
              {product.brand}
            </span>
            {product.volumeOrWeight && (
              <span className="text-[10px] font-mono text-stone-400 shrink-0">
                {product.volumeOrWeight}
              </span>
            )}
          </div>

          <h3 className="font-serif text-base sm:text-lg font-semibold text-stone-900 group-hover:text-primary transition-colors leading-snug line-clamp-1">
            {product.name}
          </h3>

          {product.shade && (
            <p className="text-[11px] text-rose-800/80 font-medium truncate">
              Shade: {product.shade}
            </p>
          )}

          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Discount Info */}
        <div className="pt-2 border-t border-rose-100/60 flex items-baseline justify-between">
          <div className="space-y-0.5">
            <div className="flex items-baseline gap-2">
              <p className="font-serif text-lg sm:text-xl font-bold text-primary">
                {formatPKR(product.price)}
              </p>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through font-mono">
                  {formatPKR(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          {quantity > 1 && !isOutOfStock && (
            <div className="text-right">
              <span className="text-[10px] text-stone-500 font-mono uppercase tracking-wider">Subtotal:</span>
              <p className="font-mono text-xs font-semibold text-stone-700">
                {formatPKR(totalPrice)}
              </p>
            </div>
          )}
        </div>

        {/* Quantity Stepper (Only active if in stock) */}
        {!isOutOfStock ? (
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-medium text-stone-700">Quantity</span>
            <QuantityInput
              quantity={quantity}
              onChange={setQuantity}
              min={1}
              max={Math.min(20, product.stock)}
              size="sm"
            />
          </div>
        ) : (
          <div className="py-1 text-center">
            <span className="text-xs text-stone-400 font-mono italic">
              Item temporarily unavailable
            </span>
          </div>
        )}

        {/* Action Button: Add to Cart */}
        <div className="pt-1">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer shadow-xs ${
              isOutOfStock
                ? 'bg-stone-100 border border-stone-200 text-stone-400 cursor-not-allowed'
                : addedToast
                ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                : 'bg-primary hover:bg-primary-dark text-white shadow-rose-900/10 hover:shadow-md'
            }`}
          >
            {addedToast ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Added to Cart!</span>
              </>
            ) : isOutOfStock ? (
              <>
                <XCircle className="w-4 h-4 text-stone-400" />
                <span>Out of Stock</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>

        {/* View Details Text link */}
        {onViewDetails && (
          <button
            type="button"
            onClick={() => onViewDetails(product)}
            className="w-full text-center text-[11px] text-stone-500 hover:text-primary transition-colors pt-1 cursor-pointer"
          >
            View full formula &amp; specifications &rarr;
          </button>
        )}
      </div>
    </article>
  );
};
