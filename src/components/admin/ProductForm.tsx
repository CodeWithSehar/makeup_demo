import React, { useState, useRef } from 'react';
import type { Product, ProductInput, SpecificCategory } from '../../types';
import { Button } from '../common/Button';
import {
  Save,
  X,
  Upload,
  Image as ImageIcon,
  Sparkles,
  DollarSign,
  FileText,
  Trash2,
  Eye,
  RefreshCw,
  Palette,
} from 'lucide-react';
import { formatPKR } from '../../utils/formatCurrency';

export interface ProductFormProps {
  initialValues?: Product;
  onSubmit: (input: ProductInput) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const CATEGORIES: SpecificCategory[] = [
  'Makeup',
  'Skincare',
  'Haircare',
  'Perfumes',
  'Watches',
  'Accessories',
  'Bundles & Kits',
];

export const ProductForm: React.FC<ProductFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const shadeFileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<'basic' | 'pricing' | 'images' | 'specs'>('basic');

  // Form Fields
  const [name, setName] = useState(initialValues?.name || '');
  const [brand, setBrand] = useState(initialValues?.brand || 'Glow & Grace Signature');
  const [category, setCategory] = useState<SpecificCategory>(initialValues?.category || 'Makeup');
  const [sku, setSku] = useState(
    () => initialValues?.sku || `GG-${Math.floor(8906000000000 + Math.random() * 99999999)}`
  );
  const [price, setPrice] = useState<number>(initialValues?.price || 2500);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(initialValues?.originalPrice);
  const [discountPercentage, setDiscountPercentage] = useState<number | undefined>(
    initialValues?.discountPercentage
  );
  const [stock, setStock] = useState<number>(initialValues?.stock ?? 15);
  const [description, setDescription] = useState(initialValues?.description || '');
  const [image, setImage] = useState(
    initialValues?.image ||
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'
  );
  const [images, setImages] = useState<string[]>(initialValues?.images || []);
  const [shadeImage, setShadeImage] = useState<string | undefined>(initialValues?.shadeImage);
  const [status, setStatus] = useState<'published' | 'draft'>(initialValues?.status || 'published');
  const [volumeOrWeight, setVolumeOrWeight] = useState(initialValues?.volumeOrWeight || '');
  const [shade, setShade] = useState(initialValues?.shade || '');
  const [ingredients, setIngredients] = useState(initialValues?.ingredients || '');
  const [fragranceNotes, setFragranceNotes] = useState(initialValues?.fragranceNotes || '');
  const [badge, setBadge] = useState(initialValues?.badge || '');
  const [isFeatured, setIsFeatured] = useState(initialValues?.isFeatured ?? false);
  const [isNewArrival, setIsNewArrival] = useState(initialValues?.isNewArrival ?? true);
  const [isBundle, setIsBundle] = useState(
    initialValues?.isBundle ?? category === 'Bundles & Kits'
  );
  const [featuresStr, setFeaturesStr] = useState(
    initialValues?.features?.join(', ') || 'Dermatologist tested, Cruelty free, 100% Authentic'
  );

  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Auto-calculate discount percentage when original price or selling price changes
  const handlePriceChange = (val: number) => {
    setPrice(val);
    if (originalPrice && originalPrice > val) {
      setDiscountPercentage(Math.round(((originalPrice - val) / originalPrice) * 100));
    }
  };

  const handleOriginalPriceChange = (val: number | undefined) => {
    setOriginalPrice(val);
    if (val && val > price) {
      setDiscountPercentage(Math.round(((val - price) / val) * 100));
    } else {
      setDiscountPercentage(undefined);
    }
  };

  const generateNewSku = () => {
    setSku(`GG-${Math.floor(8906000000000 + Math.random() * 99999999)}`);
  };

  // Image Upload via FileReader (Supports Drag & Drop and File Input)
  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (PNG, JPG, WEBP).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image file size must be less than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setImage(dataUrl);
        // Also append to gallery if not present
        if (!images.includes(dataUrl)) {
          setImages((prev) => [...prev, dataUrl]);
        }
        setError(null);
      }
    };
    reader.readAsDataURL(file);
  };

  // Shade Image Upload via FileReader
  const handleShadeFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setShadeImage(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveGalleryImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please provide a valid product title.');
      setActiveTab('basic');
      return;
    }
    if (price <= 0) {
      setError('Product price must be greater than Rs. 0.');
      setActiveTab('pricing');
      return;
    }
    if (!image.trim()) {
      setError('Please upload or provide at least one product image.');
      setActiveTab('images');
      return;
    }

    const features = featuresStr
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean);

    try {
      await onSubmit({
        name,
        brand,
        category,
        sku,
        price,
        originalPrice: originalPrice && originalPrice > price ? originalPrice : undefined,
        discountPercentage: discountPercentage || undefined,
        stock,
        inStock: stock > 0,
        description,
        image,
        images: images.length > 0 ? images : [image],
        shadeImage: shadeImage || undefined,
        status,
        volumeOrWeight,
        shade: shade || undefined,
        ingredients: ingredients || undefined,
        fragranceNotes: fragranceNotes || undefined,
        badge: badge || undefined,
        isFeatured,
        isNewArrival,
        isBundle: category === 'Bundles & Kits' || isBundle,
        features,
        rating: initialValues?.rating || 4.9,
        reviewsCount: initialValues?.reviewsCount || 12,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred while saving the product.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-error flex items-center justify-between">
          <span>{error}</span>
          <button type="button" onClick={() => setError(null)} className="text-error hover:text-red-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation Tabs matching Reference Image 2 */}
      <div className="border-b border-warm-border flex items-center gap-1 sm:gap-4 overflow-x-auto text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('basic')}
          className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'basic'
              ? 'border-antique-gold text-mocha font-bold'
              : 'border-transparent text-muted-taupe hover:text-espresso'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Basic Information</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('pricing')}
          className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'pricing'
              ? 'border-antique-gold text-mocha font-bold'
              : 'border-transparent text-muted-taupe hover:text-espresso'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Pricing &amp; Inventory</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('images')}
          className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'images'
              ? 'border-antique-gold text-mocha font-bold'
              : 'border-transparent text-muted-taupe hover:text-espresso'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Upload Images</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('specs')}
          className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'specs'
              ? 'border-antique-gold text-mocha font-bold'
              : 'border-transparent text-muted-taupe hover:text-espresso'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Formula &amp; Details</span>
        </button>
      </div>

      {/* TAB 1: BASIC INFORMATION */}
      {activeTab === 'basic' && (
        <div className="bg-white rounded-2xl border border-warm-border p-6 shadow-xs space-y-5 animate-in fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="productName" className="block text-xs font-semibold text-mocha mb-1">
                Product Title *
              </label>
              <input
                id="productName"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Total Makeover FF Cream or Glow Shimmer Powder"
                className="w-full px-3.5 py-2.5 rounded-xl border border-warm-border text-xs focus:outline-none focus:ring-2 focus:ring-antique-gold/20 focus:border-antique-gold font-serif font-bold text-espresso"
              />
            </div>

            <div>
              <label htmlFor="brandName" className="block text-xs font-semibold text-mocha mb-1">
                Brand / Collection Name *
              </label>
              <input
                id="brandName"
                type="text"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Glow & Grace / Charlotte Luxe / Huda Beauty"
                className="w-full px-3.5 py-2 rounded-xl border border-warm-border text-xs focus:outline-none focus:ring-2 focus:ring-antique-gold/20 focus:border-antique-gold"
              />
            </div>

            <div>
              <label htmlFor="categorySelect" className="block text-xs font-semibold text-mocha mb-1">
                Category / Department *
              </label>
              <select
                id="categorySelect"
                value={category}
                onChange={(e) => {
                  const val = e.target.value as SpecificCategory;
                  setCategory(val);
                  if (val === 'Bundles & Kits') setIsBundle(true);
                }}
                className="w-full px-3.5 py-2 rounded-xl border border-warm-border text-xs bg-white focus:outline-none focus:ring-2 focus:ring-antique-gold/20 focus:border-antique-gold cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="skuCode" className="block text-xs font-semibold text-mocha mb-1">
                SKU / Barcode Code
              </label>
              <div className="flex gap-2">
                <input
                  id="skuCode"
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="e.g. GG-8906095882250"
                  className="flex-1 px-3.5 py-2 rounded-xl border border-warm-border text-xs font-mono font-semibold text-espresso focus:outline-none focus:ring-2 focus:ring-antique-gold/20 focus:border-antique-gold"
                />
                <button
                  type="button"
                  onClick={generateNewSku}
                  className="p-2 border border-warm-border hover:bg-ivory rounded-xl text-mocha transition-colors"
                  title="Generate new SKU"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="badgeText" className="block text-xs font-semibold text-mocha mb-1">
                Promotional Pill Badge (Optional)
              </label>
              <input
                id="badgeText"
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. Bestseller / New / Award Winner / Limited Edition"
                className="w-full px-3.5 py-2 rounded-xl border border-warm-border text-xs focus:outline-none focus:ring-2 focus:ring-antique-gold/20 focus:border-antique-gold"
              />
            </div>

            <div className="md:col-span-2 pt-2">
              <label htmlFor="productDesc" className="block text-xs font-semibold text-mocha mb-1">
                Product Description *
              </label>
              <textarea
                id="productDesc"
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe texture, skin feel, key pigment coverage, botanical extracts, and application method..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-warm-border text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-antique-gold/20 focus:border-antique-gold"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRICING & INVENTORY */}
      {activeTab === 'pricing' && (
        <div className="bg-white rounded-2xl border border-warm-border p-6 shadow-xs space-y-6 animate-in fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="sellingPrice" className="block text-xs font-semibold text-mocha mb-1">
                Selling Price (PKR) *
              </label>
              <input
                id="sellingPrice"
                type="number"
                required
                min={1}
                step="50"
                value={price}
                onChange={(e) => handlePriceChange(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-warm-border text-xs font-mono font-bold text-espresso focus:outline-none focus:ring-2 focus:ring-antique-gold/20 focus:border-antique-gold"
              />
              <p className="text-[11px] text-muted-taupe mt-1">Customer checkout price: {formatPKR(price)}</p>
            </div>

            <div>
              <label htmlFor="origPrice" className="block text-xs font-semibold text-mocha mb-1">
                Original Price (Strikethrough)
              </label>
              <input
                id="origPrice"
                type="number"
                min={0}
                step="50"
                value={originalPrice || ''}
                onChange={(e) => handleOriginalPriceChange(Number(e.target.value) || undefined)}
                placeholder="e.g. 3500"
                className="w-full px-3.5 py-2 rounded-xl border border-warm-border text-xs font-mono text-mocha focus:outline-none focus:ring-2 focus:ring-antique-gold/20 focus:border-antique-gold"
              />
              <p className="text-[11px] text-muted-taupe mt-1">Shows before-discount comparison</p>
            </div>

            <div>
              <label htmlFor="discountPct" className="block text-xs font-semibold text-mocha mb-1">
                Discount Percentage (% Off)
              </label>
              <input
                id="discountPct"
                type="number"
                min={0}
                max={99}
                value={discountPercentage || ''}
                onChange={(e) => setDiscountPercentage(Number(e.target.value) || undefined)}
                placeholder="Auto-calculated"
                className="w-full px-3.5 py-2 rounded-xl border border-warm-border text-xs font-mono text-mocha focus:outline-none focus:ring-2 focus:ring-antique-gold/20 focus:border-antique-gold"
              />
              <p className="text-[11px] text-antique-gold font-semibold mt-1">
                {discountPercentage ? `${discountPercentage}% OFF badge on storefront` : 'No discount applied'}
              </p>
            </div>

            <div>
              <label htmlFor="stockUnits" className="block text-xs font-semibold text-mocha mb-1">
                Available Stock Units *
              </label>
              <input
                id="stockUnits"
                type="number"
                required
                min={0}
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-warm-border text-xs font-mono font-bold text-espresso focus:outline-none focus:ring-2 focus:ring-antique-gold/20 focus:border-antique-gold"
              />
              <p className="text-[11px] text-muted-taupe mt-1">
                {stock === 0 ? 'Out of Stock' : stock <= 3 ? `Only ${stock} left alert` : 'In Stock'}
              </p>
            </div>
          </div>

          {/* Visibility & Merchandising Options */}
          <div className="pt-4 border-t border-warm-border/70 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-ivory border border-warm-border flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-espresso">Storefront Publication Status</h4>
                <p className="text-[11px] text-muted-taupe">
                  {status === 'published' ? 'Visible immediately to customers' : 'Hidden as draft catalog item'}
                </p>
              </div>
              <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-warm-border">
                <button
                  type="button"
                  onClick={() => setStatus('published')}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                    status === 'published' ? 'bg-success text-white' : 'text-mocha hover:text-espresso'
                  }`}
                >
                  Published
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('draft')}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                    status === 'draft' ? 'bg-espresso text-white' : 'text-mocha hover:text-espresso'
                  }`}
                >
                  Draft
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-ivory border border-warm-border flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-espresso">Featured On Home Showcase</h4>
                <p className="text-[11px] text-muted-taupe">Highlight in top bestseller carousel</p>
              </div>
              <label aria-label="Featured on Home Showcase" className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-warm-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-warm-border after:border after:rounded-full after:h-5 after:width-5 after:transition-all peer-checked:bg-antique-gold" />
              </label>
            </div>

            <div className="p-4 rounded-xl bg-ivory border border-warm-border flex items-center justify-between md:col-span-2">
              <div>
                <h4 className="text-xs font-bold text-espresso">New Arrival Badge</h4>
                <p className="text-[11px] text-muted-taupe">Display &ldquo;New Arrival&rdquo; tag on storefront catalog</p>
              </div>
              <label aria-label="New Arrival Badge" className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isNewArrival}
                  onChange={(e) => setIsNewArrival(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-warm-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-warm-border after:border after:rounded-full after:h-5 after:width-5 after:transition-all peer-checked:bg-success" />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: UPLOAD IMAGES (Matching Reference Image 2) */}
      {activeTab === 'images' && (
        <div className="bg-white rounded-2xl border border-warm-border p-6 shadow-xs space-y-6 animate-in fade-in">
          <div>
            <h3 className="text-sm font-bold text-espresso">Upload Product Images</h3>
            <p className="text-xs text-muted-taupe">
              Select or drag image files from your computer. Immediate local preview is enabled.
            </p>
          </div>

          {/* Drag & Drop File Upload Area */}
          <label
            htmlFor="product-file-upload"
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              handleFileUpload(e.dataTransfer.files);
            }}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
              isDragging
                ? 'border-antique-gold bg-surface-soft/50 scale-[1.01]'
                : 'border-warm-border hover:border-antique-gold hover:bg-surface-soft/20'
            }`}
          >
            <input
              id="product-file-upload"
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/jpg"
              className="sr-only"
              onChange={(e) => handleFileUpload(e.target.files)}
            />
            <div className="w-12 h-12 rounded-full bg-surface-soft text-antique-gold flex items-center justify-center shadow-xs">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-espresso">Upload or drag product picture</p>
              <p className="text-[11px] text-muted-taupe">PNG, JPG, WEBP &bull; Max file size 5MB</p>
            </div>
            <span
              className="px-4 py-1.5 rounded-full bg-espresso text-white text-xs font-semibold hover:bg-mocha transition-all inline-block pointer-events-none"
            >
              Browse Files
            </span>
          </label>

          {/* Image Previews Grid matching Reference Image 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-espresso flex items-center gap-2">
              <Eye className="w-4 h-4 text-antique-gold" />
              <span>Image Previews (Active Catalog Images)</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {/* Primary Active Image */}
              <div className="relative group rounded-xl border-2 border-antique-gold overflow-hidden aspect-square bg-ivory shadow-sm">
                <img
                  src={image}
                  alt="Product main"
                  className="w-full h-full object-cover object-center"
                />
                <span className="absolute top-1.5 left-1.5 text-[9px] font-mono font-bold bg-antique-gold text-white px-1.5 py-0.5 rounded shadow-xs">
                  Main Cover
                </span>
              </div>

              {/* Gallery Images */}
              {images.map((imgUrl, idx) => (
                <div
                  key={`${imgUrl.slice(0, 30)}-${idx}`}
                  className="relative group rounded-xl border border-warm-border overflow-hidden aspect-square bg-ivory"
                >
                  <img
                    src={imgUrl}
                    alt={`Product gallery ${idx + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-espresso/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                    <button
                      type="button"
                      onClick={() => setImage(imgUrl)}
                      className="p-1 bg-white rounded-md text-[10px] font-semibold text-espresso hover:bg-surface-soft"
                      title="Set as Main"
                    >
                      Cover
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(idx)}
                      className="p-1 bg-error rounded-md text-white hover:bg-red-800"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Colour / Shade Swatch Image Upload (Reference Image 2 Feature) */}
          <div className="pt-4 border-t border-warm-border/70 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-espresso flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-antique-gold" />
                  <span>Colour / Shade Swatch Image (Optional)</span>
                </h4>
                <p className="text-[11px] text-muted-taupe">
                  Upload a cosmetic shade swatch photo or pigment swatch
                </p>
              </div>

              {shadeImage && (
                <button
                  type="button"
                  onClick={() => setShadeImage(undefined)}
                  className="text-xs text-error hover:underline"
                >
                  Remove Swatch
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              <input
                ref={shadeFileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleShadeFileUpload(e.target.files)}
              />

              <button
                type="button"
                onClick={() => shadeFileInputRef.current?.click()}
                className="px-4 py-2 rounded-xl border border-warm-border hover:border-antique-gold text-xs font-semibold text-mocha hover:text-espresso transition-colors cursor-pointer flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Swatch Photo</span>
              </button>

              {shadeImage && (
                <div className="w-12 h-12 rounded-xl border border-warm-border overflow-hidden shadow-xs">
                  <img
                    src={shadeImage}
                    alt="Shade Swatch"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              )}
            </div>
          </div>

          {/* External URL alternative */}
          <div className="pt-4 border-t border-warm-border/70">
            <label htmlFor="imageUrlInput" className="block text-xs font-semibold text-mocha mb-1">
              Or Paste External Image URL
            </label>
            <div className="flex gap-2">
              <input
                id="imageUrlInput"
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 px-3.5 py-2 rounded-xl border border-warm-border text-xs font-mono focus:outline-none focus:ring-2 focus:ring-antique-gold/20 focus:border-antique-gold"
              />
              <a
                href={image}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 border border-warm-border rounded-xl hover:bg-ivory text-xs font-semibold text-mocha flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Test Link</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SPECIFICATIONS & FORMULA */}
      {activeTab === 'specs' && (
        <div className="bg-white rounded-2xl border border-warm-border p-6 shadow-xs space-y-4 animate-in fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="volumeInput" className="block text-xs font-semibold text-mocha mb-1">
                Volume / Weight / Size
              </label>
              <input
                id="volumeInput"
                type="text"
                value={volumeOrWeight}
                onChange={(e) => setVolumeOrWeight(e.target.value)}
                placeholder="e.g. 30ml / 50g / 100ml EDP"
                className="w-full px-3.5 py-2 rounded-xl border border-warm-border text-xs focus:outline-none focus:ring-2 focus:ring-antique-gold/20 focus:border-antique-gold"
              />
            </div>

            <div>
              <label htmlFor="shadeNameInput" className="block text-xs font-semibold text-mocha mb-1">
                Shade / Tone Name
              </label>
              <input
                id="shadeNameInput"
                type="text"
                value={shade}
                onChange={(e) => setShade(e.target.value)}
                placeholder="e.g. Velvet Rose 04 / Warm Beige"
                className="w-full px-3.5 py-2 rounded-xl border border-warm-border text-xs focus:outline-none focus:ring-2 focus:ring-antique-gold/20 focus:border-antique-gold"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="ingredientsInput" className="block text-xs font-semibold text-mocha mb-1">
                Key Active Ingredients
              </label>
              <input
                id="ingredientsInput"
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="e.g. Hyaluronic Acid, Niacinamide, Rosehip Oil, Squalane"
                className="w-full px-3.5 py-2 rounded-xl border border-warm-border text-xs focus:outline-none focus:ring-2 focus:ring-antique-gold/20 focus:border-antique-gold"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="fragranceNotesInput" className="block text-xs font-semibold text-mocha mb-1">
                Fragrance Notes (For Perfumes &amp; Mists)
              </label>
              <input
                id="fragranceNotesInput"
                type="text"
                value={fragranceNotes}
                onChange={(e) => setFragranceNotes(e.target.value)}
                placeholder="e.g. Top: Bergamot; Heart: Turkish Rose; Base: White Oud & Amber"
                className="w-full px-3.5 py-2 rounded-xl border border-warm-border text-xs focus:outline-none focus:ring-2 focus:ring-antique-gold/20 focus:border-antique-gold"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="featuresInput" className="block text-xs font-semibold text-mocha mb-1">
                Benefit Tags (Comma-separated)
              </label>
              <input
                id="featuresInput"
                type="text"
                value={featuresStr}
                onChange={(e) => setFeaturesStr(e.target.value)}
                placeholder="Dermatologist tested, Cruelty free, 24h wear, Alcohol free"
                className="w-full px-3.5 py-2 rounded-xl border border-warm-border text-xs focus:outline-none focus:ring-2 focus:ring-antique-gold/20 focus:border-antique-gold"
              />
            </div>
          </div>
        </div>
      )}

      {/* Action Footer Bar matching Reference Image 2 */}
      <div className="bg-white rounded-2xl border border-warm-border p-4 shadow-xs flex items-center justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="text-xs font-semibold text-muted-taupe hover:text-espresso px-4 py-2 cursor-pointer"
        >
          Cancel
        </button>

        <div className="flex items-center gap-3">
          {activeTab !== 'basic' && (
            <button
              type="button"
              onClick={() => {
                if (activeTab === 'specs') setActiveTab('images');
                else if (activeTab === 'images') setActiveTab('pricing');
                else if (activeTab === 'pricing') setActiveTab('basic');
              }}
              className="px-4 py-2 rounded-full border border-warm-border text-xs font-semibold text-mocha hover:bg-ivory transition-colors"
            >
              Previous
            </button>
          )}

          {activeTab !== 'specs' ? (
            <button
              type="button"
              onClick={() => {
                if (activeTab === 'basic') setActiveTab('pricing');
                else if (activeTab === 'pricing') setActiveTab('images');
                else if (activeTab === 'images') setActiveTab('specs');
              }}
              className="px-5 py-2 rounded-full bg-espresso hover:bg-mocha text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Continue &rarr;
            </button>
          ) : null}

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isSubmitting}
            icon={<Save className="w-4 h-4" />}
          >
            {isSubmitting ? 'Saving Product...' : initialValues ? 'Update Product' : 'Save & Publish Product'}
          </Button>
        </div>
      </div>
    </form>
  );
};
