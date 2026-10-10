import React, { useState, useEffect } from 'react';
import { X, Star, Check, Tag, ShoppingCart, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import type { Product } from '../../types';
import { formatPKR } from '../../utils/formatCurrency';
import { QuantityInput } from './QuantityInput';
import { Badge } from './Badge';
import { useStore } from '../../context/useStore';

export interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductDetailsModalContent: React.FC<{ product: Product; onClose: () => void }> = ({
  product,
  onClose,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [imageError, setImageError] = useState<boolean>(false);
  const [addedToast, setAddedToast] = useState<boolean>(false);

  const { addToCart, setIsCartOpen } = useStore();

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 3;

  const galleryImages = product.images && product.images.length > 0
    ? product.images
    : [product.image];

  const currentDisplayImage = galleryImages[activeImageIndex] || product.image;

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent background scroll while modal is mounted
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const totalPrice = product.price * quantity;
  const fallbackImage =
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80';

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    const res = addToCart(product, quantity);
    if (res.success) {
      setAddedToast(true);
      setTimeout(() => setAddedToast(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden z-10 my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs text-stone-500 hover:text-stone-900 hover:bg-stone-100 flex items-center justify-center transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          
          {/* Left Column: Large Product Image & Gallery Thumbnails */}
          <div className="md:col-span-6 relative bg-rose-50/50 p-6 sm:p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-rose-100/80 space-y-4">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg bg-white">
              <img
                src={imageError ? fallbackImage : currentDisplayImage}
                alt={product.name}
                width={600}
                height={600}
                className={`w-full h-full object-cover object-center ${
                  isOutOfStock ? 'filter grayscale opacity-60' : ''
                }`}
                onError={() => setImageError(true)}
              />

              {/* Badges Overlay */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                <Badge variant="blush">{product.category}</Badge>
                {product.discountPercentage && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-600 text-white text-xs font-bold shadow-xs">
                    <Tag className="w-3 h-3" />
                    <span>{product.discountPercentage}% OFF</span>
                  </span>
                )}
              </div>

              {/* Stock Status Badge */}
              <div className="absolute bottom-3 left-3 z-10">
                {isOutOfStock ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-900 text-white text-xs font-bold shadow-sm">
                    <XCircle className="w-3.5 h-3.5 text-rose-300" />
                    <span>Out of Stock</span>
                  </span>
                ) : isLowStock ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500 text-white text-xs font-bold shadow-sm">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Only {product.stock} units left!</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-emerald-700 text-xs font-medium border border-emerald-200 shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>In Stock ({product.stock} units)</span>
                  </span>
                )}
              </div>
            </div>

            {/* Gallery Thumbnails Strip */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto py-1">
                {galleryImages.map((img, idx) => (
                  <button
                    key={`${img.slice(0, 20)}-${idx}`}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-primary ring-2 ring-rose-200'
                        : 'border-stone-200 hover:border-stone-400 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Details & WhatsApp Ordering */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              {/* Brand & Category */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                  {product.brand}
                </span>
                {product.rating && (
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-800">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{product.rating.toFixed(1)} / 5.0 ({product.reviewsCount || 45} reviews)</span>
                  </div>
                )}
              </div>

              {/* Title */}
              <h2 id="modal-product-title" className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                {product.name}
              </h2>

              {/* Shade / Fragrance Notes */}
              {product.shade && (
                <div className="px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-100 text-xs text-rose-900 font-medium inline-block">
                  <strong>Shade:</strong> {product.shade}
                </div>
              )}

              {product.fragranceNotes && (
                <div className="px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-700 space-y-0.5">
                  <p className="font-mono uppercase font-bold text-[10px] text-primary">Fragrance Pyramid:</p>
                  <p className="leading-relaxed">{product.fragranceNotes}</p>
                </div>
              )}

              {/* Price & Discount */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-primary">
                  {formatPKR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-stone-400 line-through font-mono">
                    {formatPKR(product.originalPrice)}
                  </span>
                )}
                {product.discountPercentage && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Save {product.discountPercentage}%
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-stone-600 leading-relaxed">
                {product.description}
              </p>

              {/* Ingredients */}
              {product.ingredients && (
                <div className="text-xs text-stone-500 pt-1 border-t border-rose-100/60">
                  <strong className="text-stone-800 font-mono uppercase text-[10px] block mb-0.5">Key Ingredients:</strong>
                  <span>{product.ingredients}</span>
                </div>
              )}

              {/* Features / Highlights */}
              {product.features && product.features.length > 0 && (
                <div className="pt-2 border-t border-rose-100/80 space-y-1.5">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 font-mono">
                    Formula Highlights
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Quantity Stepper & Dual Checkout Actions */}
            <div className="pt-4 border-t border-rose-100 space-y-4">
              {!isOutOfStock ? (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-medium text-stone-700 block">Select Quantity</span>
                      <span className="text-[11px] text-stone-500">
                        Max {Math.min(20, product.stock)} units available
                      </span>
                    </div>
                    <QuantityInput
                      quantity={quantity}
                      onChange={setQuantity}
                      min={1}
                      max={Math.min(20, product.stock)}
                      size="md"
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm py-1 font-mono">
                    <span className="text-stone-500">Order Subtotal:</span>
                    <span className="font-bold text-stone-900 text-base text-primary">
                      {formatPKR(totalPrice)}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className={`w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-semibold text-sm transition-all shadow-md cursor-pointer ${
                        addedToast
                          ? 'bg-emerald-600 text-white'
                          : 'bg-primary hover:bg-primary-dark text-white shadow-rose-900/15 hover:shadow-lg'
                      }`}
                    >
                      {addedToast ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Added to Cart ({quantity} {quantity === 1 ? 'item' : 'items'})</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add to Cart &bull; {formatPKR(totalPrice)}</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        setIsCartOpen(true);
                      }}
                      className="w-full text-center text-xs font-semibold text-stone-600 hover:text-primary transition-colors py-1 cursor-pointer"
                    >
                      View Cart &amp; Checkout &rarr;
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-center space-y-2">
                  <p className="text-sm font-semibold text-rose-800">
                    This product is currently out of stock.
                  </p>
                  <p className="text-xs text-stone-600">
                    Restock arriving this week. Feel free to contact our store concierge to reserve an item.
                  </p>
                  <a
                    href="#contact"
                    onClick={onClose}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline cursor-pointer"
                  >
                    <span>Contact Store Concierge &rarr;</span>
                  </a>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, onClose }) => {
  if (!product) return null;
  return <ProductDetailsModalContent key={product.id} product={product} onClose={onClose} />;
};
