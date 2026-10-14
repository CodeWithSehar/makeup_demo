import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useAppData } from '../../../store/useAppData';
import { AdminHeader } from '../../../components/admin/AdminHeader';
import { StockAdjustmentForm } from '../../../components/admin/StockAdjustmentForm';
import { AdminStatCard } from '../../../components/admin/AdminStatCard';
import { formatPKR } from '../../../utils/formatCurrency';
import {
  Boxes,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  History,
  XCircle,
} from 'lucide-react';
import type { Product } from '../../../types';

export const InventoryPage: React.FC = () => {
  const { onOpenSidebar } = useOutletContext<{ onOpenSidebar: () => void }>();
  const { products, stockMovements, adjustStock } = useAppData();

  const [selectedProductForAdjust, setSelectedProductForAdjust] = useState<Product | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'low-stock' | 'out-of-stock'>('all');

  const totalStockUnits = products.reduce((acc, p) => acc + p.stock, 0);
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= 3).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;

  const filteredProducts = products.filter((p) => {
    if (filterType === 'low-stock') return p.stock > 0 && p.stock <= 3;
    if (filterType === 'out-of-stock') return p.stock === 0;
    return true;
  });

  const handleAdjust = async (productId: number, change: number, reason: string) => {
    await adjustStock(productId, change, reason);
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Inventory &amp; Stock Control"
        subtitle="Track stock levels, low-stock warnings, and historical stock movements"
        onOpenSidebar={onOpenSidebar}
      />

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <AdminStatCard
          label="Total Units In Stock"
          value={totalStockUnits.toLocaleString()}
          icon={Boxes}
          variant="primary"
        />

        <AdminStatCard
          label="Low Stock Alerts (≤3 Units)"
          value={lowStockCount}
          icon={AlertTriangle}
          variant="amber"
        />

        <AdminStatCard
          label="Out of Stock Items"
          value={outOfStockCount}
          icon={XCircle}
          variant="stone"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-warm-border pb-3 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setFilterType('all')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            filterType === 'all' ? 'bg-espresso text-white' : 'text-mocha hover:bg-surface-soft'
          }`}
        >
          All Items ({products.length})
        </button>

        <button
          type="button"
          onClick={() => setFilterType('low-stock')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
            filterType === 'low-stock'
              ? 'bg-warning text-white'
              : 'text-warning bg-amber-50 hover:bg-amber-100'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Low Stock ({lowStockCount})</span>
        </button>

        <button
          type="button"
          onClick={() => setFilterType('out-of-stock')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
            filterType === 'out-of-stock'
              ? 'bg-error text-white'
              : 'text-error bg-red-50 hover:bg-red-100'
          }`}
        >
          <XCircle className="w-3.5 h-3.5" />
          <span>Out of Stock ({outOfStockCount})</span>
        </button>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl border border-warm-border overflow-hidden shadow-xs">
        <div className="p-4 border-b border-warm-border flex items-center justify-between">
          <h3 className="font-serif text-sm font-bold text-espresso">Current Stock Inventory</h3>
          <span className="text-[11px] text-muted-taupe font-mono">
            Updated in real-time across storefront
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-ivory/80 text-muted-taupe font-mono text-[11px] border-b border-warm-border">
              <tr>
                <th className="py-3 px-4">Item &amp; ID</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Unit Price</th>
                <th className="py-3 px-4">Available Units</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Adjustment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-border/60">
              {filteredProducts.map((p) => {
                const isOutOfStock = p.stock === 0;
                const isLowStock = p.stock > 0 && p.stock <= 3;

                return (
                  <tr key={p.id} className="hover:bg-ivory/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-lg object-cover bg-ivory shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="font-semibold text-espresso block truncate">{p.name}</span>
                          <span className="text-[10px] text-muted-taupe font-mono block">
                            ID: #{p.id} &bull; {p.brand}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="inline-flex px-2 py-0.5 rounded-full bg-surface-soft text-mocha font-mono text-[11px]">
                        {p.category}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono font-medium text-espresso">
                      {formatPKR(p.price)}
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-espresso text-sm">
                      <div className="flex items-center gap-1.5">
                        <span>{p.stock}</span>
                        <div className="flex items-center gap-0.5 ml-2">
                          <button
                            type="button"
                            disabled={p.stock <= 0}
                            onClick={() => adjustStock(p.id, -1, 'Quick stock decrement')}
                            className="w-5 h-5 rounded border border-warm-border hover:border-antique-gold bg-ivory flex items-center justify-center text-mocha disabled:opacity-30 disabled:pointer-events-none cursor-pointer text-xs"
                            title="Decrement 1 unit"
                            aria-label={`Decrement stock for ${p.name}`}
                          >
                            -
                          </button>
                          <button
                            type="button"
                            onClick={() => adjustStock(p.id, 1, 'Quick stock increment')}
                            className="w-5 h-5 rounded border border-warm-border hover:border-antique-gold bg-ivory flex items-center justify-center text-mocha cursor-pointer text-xs"
                            title="Increment 1 unit"
                            aria-label={`Increment stock for ${p.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      {isOutOfStock ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-error bg-red-50 px-2 py-0.5 rounded-full">
                          <XCircle className="w-3 h-3" />
                          <span>Out of stock</span>
                        </span>
                      ) : isLowStock ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-warning bg-amber-50 px-2 py-0.5 rounded-full animate-pulse">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Only {p.stock} left</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-success bg-emerald-50 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>In Stock</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {!isOutOfStock && (
                          <button
                            type="button"
                            onClick={() => adjustStock(p.id, -p.stock, 'Marked out of stock')}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-error hover:text-red-800 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Zero out stock units"
                          >
                            Mark 0
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setSelectedProductForAdjust(p)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-warm-border hover:border-antique-gold text-mocha hover:text-espresso hover:bg-surface-soft text-xs font-semibold transition-all cursor-pointer"
                        >
                          <Sliders className="w-3.5 h-3.5" />
                          <span>Adjust</span>
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

      {/* Stock Movement History Log */}
      <div className="bg-white rounded-2xl border border-warm-border overflow-hidden shadow-xs space-y-3 p-5">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-antique-gold" />
          <h3 className="font-serif text-base font-bold text-espresso">
            Recent Stock Movement Audit Trail
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-ivory text-muted-taupe font-mono text-[11px] border-b border-warm-border/70">
              <tr>
                <th className="py-2.5 px-3">Date / Time</th>
                <th className="py-2.5 px-3">Product</th>
                <th className="py-2.5 px-3">Quantity Change</th>
                <th className="py-2.5 px-3">New Balance</th>
                <th className="py-2.5 px-3">Audit Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-border/60 font-mono">
              {stockMovements.slice(0, 8).map((mov) => {
                const isPositive = mov.quantityChange > 0;
                return (
                  <tr key={mov.id} className="hover:bg-ivory/60">
                    <td className="py-2.5 px-3 text-muted-taupe text-[11px]">
                      {new Date(mov.timestamp).toLocaleDateString()} {new Date(mov.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-2.5 px-3 font-sans font-semibold text-espresso">
                      {mov.productName}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`font-bold ${
                          isPositive ? 'text-success' : 'text-error'
                        }`}
                      >
                        {isPositive ? `+${mov.quantityChange}` : mov.quantityChange} units
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-bold text-mocha">{mov.newStock}</td>
                    <td className="py-2.5 px-3 font-sans text-muted-taupe">{mov.reason}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock Adjustment Modal */}
      <StockAdjustmentForm
        product={selectedProductForAdjust}
        isOpen={Boolean(selectedProductForAdjust)}
        onClose={() => setSelectedProductForAdjust(null)}
        onAdjust={handleAdjust}
      />
    </div>
  );
};
