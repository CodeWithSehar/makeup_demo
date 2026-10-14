import React, { useState, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { useAppData } from '../../../store/useAppData';
import { AdminHeader } from '../../../components/admin/AdminHeader';
import { ConfirmDialog } from '../../../components/common/ConfirmDialog';
import { Button } from '../../../components/common/Button';
import { formatPKR } from '../../../utils/formatCurrency';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  RotateCcw,
  Copy,
  Star,
  LayoutGrid,
  List,
  CheckCircle2,
  Package,
} from 'lucide-react';
import type { Product, SpecificCategory } from '../../../types';

const CATEGORIES: ('All' | SpecificCategory)[] = [
  'All',
  'Makeup',
  'Skincare',
  'Haircare',
  'Perfumes',
  'Watches',
  'Accessories',
  'Bundles & Kits',
];

export const ProductsPage: React.FC = () => {
  const { onOpenSidebar } = useOutletContext<{ onOpenSidebar: () => void }>();
  const { products, updateProduct, createProduct, deleteProduct, resetCatalog } = useAppData();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | SpecificCategory>('All');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        (p.sku ? p.sku.toLowerCase().includes(q) : false) ||
        p.category.toLowerCase().includes(q);

      const matchesCategory =
        selectedCategory === 'All' || p.category === selectedCategory;

      const matchesStatus =
        selectedStatus === 'all' ||
        (selectedStatus === 'published' && p.status !== 'draft') ||
        (selectedStatus === 'draft' && p.status === 'draft');

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, search, selectedCategory, selectedStatus]);

  // Toggle Publish / Draft
  const handleToggleStatus = async (product: Product) => {
    const nextStatus = product.status === 'draft' ? 'published' : 'draft';
    await updateProduct(product.id, { status: nextStatus });
    showToast(
      `Product "${product.name}" is now ${nextStatus === 'published' ? 'Active on Storefront' : 'Hidden as Draft'}`
    );
  };

  // Toggle Featured
  const handleToggleFeatured = async (product: Product) => {
    await updateProduct(product.id, { isFeatured: !product.isFeatured });
    showToast(
      `"${product.name}" ${!product.isFeatured ? 'featured on Home showcase' : 'removed from featured'}`
    );
  };

  // Duplicate Product
  const handleDuplicateProduct = async (product: Product) => {
    const newSku = `GG-${Math.floor(8906000000000 + Math.random() * 99999999)}`;
    await createProduct({
      ...product,
      name: `${product.name} (Copy)`,
      sku: newSku,
      status: 'draft',
    });
    showToast(`Duplicated "${product.name}" as draft (${newSku})`);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);
    try {
      await deleteProduct(productToDelete.id);
      showToast(`Deleted "${productToDelete.name}" from catalog`);
      setProductToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleResetCatalog = async () => {
    await resetCatalog();
    setConfirmReset(false);
    showToast('Catalog restored to default luxury boutique inventory');
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb matching Reference Image 1 */}
      <div className="flex items-center justify-between text-xs text-muted-taupe font-mono">
        <div className="flex items-center gap-2">
          <Link to="/admin" className="hover:text-espresso transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-espresso font-semibold">Product list</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="text-muted-taupe hover:text-error transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      {/* Main Header matching Reference Image 1 */}
      <AdminHeader
        title={`Product list (${products.length})`}
        subtitle="View and manage all storefront products, pictures, prices, categories, and inventory"
        onOpenSidebar={onOpenSidebar}
        actions={
          <div className="flex items-center gap-2.5">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center border border-warm-border rounded-xl bg-white p-1">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-surface-soft text-mocha' : 'text-muted-taupe hover:text-espresso'
                }`}
                title="Grid Cards View"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden md:inline">Cards</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                  viewMode === 'table' ? 'bg-surface-soft text-mocha' : 'text-muted-taupe hover:text-espresso'
                }`}
                title="Table List View"
              >
                <List className="w-4 h-4" />
                <span className="hidden md:inline">Table</span>
              </button>
            </div>

            <Link to="/admin/products/new">
              <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>
                Add New Product
              </Button>
            </Link>
          </div>
        }
      />

      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-success flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Search & Category Filter Strip matching Reference Image 1 */}
      <div className="space-y-4">
        {/* Search Input Bar */}
        <div className="bg-white rounded-2xl border border-warm-border p-3.5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-muted-taupe absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Product Name, SKU & Categories..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-warm-border text-xs focus:outline-none focus:ring-2 focus:ring-antique-gold/20 focus:border-antique-gold"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {/* Status Filter */}
            <div className="flex items-center gap-1 border border-warm-border rounded-xl p-1 bg-ivory text-xs">
              <button
                type="button"
                onClick={() => setSelectedStatus('all')}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                  selectedStatus === 'all' ? 'bg-white text-espresso shadow-xs' : 'text-mocha'
                }`}
              >
                All Status
              </button>
              <button
                type="button"
                onClick={() => setSelectedStatus('published')}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                  selectedStatus === 'published' ? 'bg-success text-white shadow-xs' : 'text-mocha'
                }`}
              >
                Active
              </button>
              <button
                type="button"
                onClick={() => setSelectedStatus('draft')}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                  selectedStatus === 'draft' ? 'bg-espresso text-white shadow-xs' : 'text-mocha'
                }`}
              >
                Draft
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
          {CATEGORIES.map((cat) => {
            const count =
              cat === 'All'
                ? products.length
                : products.filter((p) => p.category === cat).length;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-espresso text-white shadow-xs shadow-espresso/20'
                    : 'bg-white text-mocha hover:bg-surface-soft border border-warm-border'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-surface-soft text-muted-taupe'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-muted-taupe font-mono">
        <span>
          Showing <strong>{filtered.length}</strong> of {products.length} products
          {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
        </span>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-dashed border-warm-border p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-surface-soft text-antique-gold flex items-center justify-center mx-auto">
            <Package className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-base font-bold text-espresso">No products found</h3>
          <p className="text-xs text-muted-taupe max-w-sm mx-auto">
            Try adjusting your search query, clearing category filters, or add a new product to the catalog.
          </p>
          <div className="pt-2">
            <Link to="/admin/products/new">
              <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>
                Add New Product
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* CARD GRID VIEW matching Reference Image 1 */}
      {viewMode === 'grid' && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((product) => {
            const isOutOfStock = product.stock === 0;
            const isLowStock = product.stock > 0 && product.stock <= 3;
            const isActive = product.status !== 'draft';

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-warm-border shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Top Section with Picture & Specs */}
                <div className="p-4 flex gap-4">
                  {/* Product Picture */}
                  <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-ivory shrink-0 border border-warm-border">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.isFeatured && (
                      <span className="absolute top-1.5 left-1.5 p-1 bg-champagne-gold text-espresso rounded-full shadow-xs" title="Featured on Home">
                        <Star className="w-3 h-3 fill-espresso" />
                      </span>
                    )}
                    {product.badge && (
                      <span className="absolute bottom-1.5 left-1.5 text-[9px] font-bold bg-antique-gold text-white px-1.5 py-0.5 rounded shadow-xs">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Info Column */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold text-mocha bg-surface-soft px-2 py-0.5 rounded-full border border-warm-border truncate">
                        {product.category}
                      </span>
                      {product.volumeOrWeight && (
                        <span className="text-[10px] text-muted-taupe font-mono">
                          {product.volumeOrWeight}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-sm font-bold text-espresso truncate leading-snug" title={product.name}>
                      {product.name}
                    </h3>

                    <p className="text-[11px] text-muted-taupe truncate">{product.brand}</p>

                    {/* Price and Strikethrough matching Reference Image 1 */}
                    <div className="flex items-baseline gap-2 pt-0.5">
                      <span className="font-mono font-bold text-sm text-espresso">
                        {formatPKR(product.price)}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="font-mono text-xs text-muted-taupe line-through">
                          {formatPKR(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* SKU Code */}
                    <p className="text-[10px] font-mono text-muted-taupe">
                      SKU: <strong className="text-mocha">{product.sku || `GG-${product.id}`}</strong>
                    </p>

                    {/* Stock status indicator */}
                    <div className="text-[11px] font-mono">
                      {isOutOfStock ? (
                        <span className="text-error font-bold">Out of stock</span>
                      ) : isLowStock ? (
                        <span className="text-warning font-semibold">Only {product.stock} left</span>
                      ) : (
                        <span className="text-muted-taupe">{product.stock} in stock</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Bar: Status Toggle & Action Icons matching Reference Image 1 */}
                <div className="px-4 py-2.5 bg-ivory/80 border-t border-warm-border/70 flex items-center justify-between">
                  {/* Status Dropdown/Toggle (• Active / • Draft) */}
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(product)}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                      isActive
                        ? 'text-success bg-emerald-100/60 hover:bg-emerald-100'
                        : 'text-mocha bg-surface-soft hover:bg-surface-secondary/60'
                    }`}
                    title="Click to toggle publish status"
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isActive ? 'bg-success' : 'bg-muted-taupe'
                      }`}
                    />
                    <span>{isActive ? 'Active' : 'Draft'}</span>
                  </button>

                  {/* Action Icons matching Reference Image 1 */}
                  <div className="flex items-center gap-1">
                    {/* Toggle Featured */}
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(product)}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        product.isFeatured
                          ? 'text-antique-gold hover:bg-surface-soft'
                          : 'text-muted-taupe hover:text-espresso hover:bg-surface-soft'
                      }`}
                      title={product.isFeatured ? 'Featured on home' : 'Mark as featured'}
                    >
                      <Star className={`w-4 h-4 ${product.isFeatured ? 'fill-champagne-gold' : ''}`} />
                    </button>

                    {/* Duplicate */}
                    <button
                      type="button"
                      onClick={() => handleDuplicateProduct(product)}
                      className="p-1.5 text-muted-taupe hover:text-espresso hover:bg-surface-soft rounded-lg transition-colors cursor-pointer"
                      title="Duplicate product"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    {/* Edit */}
                    <Link
                      to={`/admin/products/${product.id}/edit`}
                      className="p-1.5 text-muted-taupe hover:text-mocha hover:bg-surface-soft rounded-lg transition-colors"
                      title="Edit product"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Link>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => setProductToDelete(product)}
                      className="p-1.5 text-muted-taupe hover:text-error hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TABLE VIEW (Alternative compact mode) */}
      {viewMode === 'table' && filtered.length > 0 && (
        <div className="bg-white rounded-2xl border border-warm-border shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-ivory border-b border-warm-border font-mono text-[11px] text-muted-taupe">
                <tr>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">SKU</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-border/60">
                {filtered.map((product) => {
                  const isActive = product.status !== 'draft';
                  return (
                    <tr key={product.id} className="hover:bg-ivory/60 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover bg-ivory shrink-0"
                          />
                          <div>
                            <div className="font-semibold text-espresso">{product.name}</div>
                            <div className="text-[11px] text-muted-taupe">{product.brand}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[10px] font-semibold text-mocha bg-surface-soft px-2 py-0.5 rounded-full border border-warm-border">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-mocha">
                        {product.sku || `GG-${product.id}`}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-espresso">
                        {formatPKR(product.price)}
                      </td>
                      <td className="py-3 px-4 font-mono">
                        {product.stock === 0 ? (
                          <span className="text-error font-bold">Out of stock</span>
                        ) : product.stock <= 3 ? (
                          <span className="text-warning font-semibold">Only {product.stock} left</span>
                        ) : (
                          <span className="text-mocha">{product.stock} units</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(product)}
                          aria-label={`Toggle active status for ${product.name}, currently ${isActive ? 'Active' : 'Draft'}`}
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                            isActive
                              ? 'text-success bg-emerald-50'
                              : 'text-mocha bg-surface-soft'
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isActive ? 'bg-success' : 'bg-muted-taupe'
                            }`}
                          />
                          <span>{isActive ? 'Active' : 'Draft'}</span>
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            to={`/admin/products/${product.id}/edit`}
                            className="p-1.5 text-muted-taupe hover:text-mocha hover:bg-surface-soft rounded-lg transition-colors"
                            title="Edit"
                            aria-label={`Edit ${product.name}`}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => setProductToDelete(product)}
                            className="p-1.5 text-muted-taupe hover:text-error hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete"
                            aria-label={`Delete ${product.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(productToDelete)}
        title="Delete Product"
        message={`Are you sure you want to delete "${productToDelete?.name}"? This will permanently remove it from the catalog and customer storefront.`}
        confirmLabel={isDeleting ? 'Deleting...' : 'Delete Product'}
        isDestructive={true}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setProductToDelete(null)}
      />

      {/* Reset Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmReset}
        title="Restore Default Products"
        message="This will reset all product modifications, prices, and restore the original 17 seed products. Continue?"
        confirmLabel="Restore Defaults"
        isDestructive={true}
        onConfirm={handleResetCatalog}
        onCancel={() => setConfirmReset(false)}
      />
    </div>
  );
};
