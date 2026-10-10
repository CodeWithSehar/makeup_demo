import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { useAppData } from '../../../store/useAppData';
import { AdminHeader } from '../../../components/admin/AdminHeader';
import { AdminStatCard } from '../../../components/admin/AdminStatCard';
import { OrderStatusBadge } from '../../../components/admin/OrderStatusBadge';
import { formatPKR } from '../../../utils/formatCurrency';
import {
  Package,
  Boxes,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  Plus,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Button } from '../../../components/common/Button';

export const DashboardPage: React.FC = () => {
  const { onOpenSidebar } = useOutletContext<{ onOpenSidebar: () => void }>();
  const { products, orders } = useAppData();

  const totalProducts = products.length;
  const publishedProducts = products.filter((p) => p.status === 'published').length;
  const inStockCount = products.filter((p) => p.stock > 0).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= 3).length;
  const totalStockUnits = products.reduce((acc, p) => acc + p.stock, 0);

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const totalOrders = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;
  const confirmedOrdersCount = orders.filter((o) => o.status === 'confirmed').length;

  // Sample 7-day Sales Overview Data
  const salesOverview = [
    { day: 'Mon', revenue: 14200, orders: 4, height: '40%' },
    { day: 'Tue', revenue: 21500, orders: 6, height: '60%' },
    { day: 'Wed', revenue: 18900, orders: 5, height: '52%' },
    { day: 'Thu', revenue: 32400, orders: 9, height: '90%' },
    { day: 'Fri', revenue: 28100, orders: 7, height: '78%' },
    { day: 'Sat', revenue: 36500, orders: 11, height: '100%' },
    { day: 'Sun', revenue: 24700, orders: 7, height: '68%' },
  ];

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Storefront Dashboard"
        subtitle="Catalog overview, stock visibility, order tracking, and sales analytics"
        onOpenSidebar={onOpenSidebar}
        actions={
          <div className="flex items-center gap-2">
            <Link to="/admin/products/new">
              <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>
                Add Product
              </Button>
            </Link>
          </div>
        }
      />

      {/* Low Stock & Out of Stock Warning Strip */}
      {(lowStockCount > 0 || outOfStockCount > 0) && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-amber-900">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>
              <strong>Inventory Notice:</strong> {outOfStockCount} product(s) out of stock, and{' '}
              {lowStockCount} product(s) on low stock (&le;3 units).
            </span>
          </div>
          <Link
            to="/admin/inventory"
            className="text-amber-800 font-bold hover:underline shrink-0 flex items-center gap-1"
          >
            <span>Review &amp; Restock</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Primary KPI Grid (6 Cards covering all requirements) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* 1. Total Products */}
        <AdminStatCard
          label="Total Products"
          value={totalProducts}
          change={`${publishedProducts} active on store`}
          icon={Package}
          variant="primary"
        />

        {/* 2. Products In Stock */}
        <AdminStatCard
          label="In Stock Products"
          value={inStockCount}
          change={`${totalStockUnits} total units`}
          icon={CheckCircle2}
          variant="emerald"
        />

        {/* 3. Out of Stock */}
        <AdminStatCard
          label="Out of Stock"
          value={outOfStockCount}
          change={outOfStockCount > 0 ? 'Ordering disabled' : 'All available'}
          icon={XCircle}
          variant="rose"
        />

        {/* 4. Low-Stock Alerts */}
        <AdminStatCard
          label="Low Stock (≤3)"
          value={lowStockCount}
          change={`${lowStockCount} need reorder`}
          icon={AlertTriangle}
          variant="amber"
        />

        {/* 5. Total Orders */}
        <AdminStatCard
          label="Total Orders"
          value={totalOrders}
          change={`${pendingOrdersCount} pending`}
          icon={ShoppingBag}
          variant="stone"
        />

        {/* 6. Gross Sales Overview */}
        <AdminStatCard
          label="Gross Revenue"
          value={formatPKR(totalRevenue)}
          change={`${confirmedOrdersCount} confirmed`}
          icon={TrendingUp}
          variant="primary"
        />
      </div>

      {/* Sales Overview & Quick Action Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Sales Overview Chart (Sample 7-Day Performance) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
            <div>
              <h3 className="font-serif text-base font-bold text-stone-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span>Weekly Sales Overview</span>
              </h3>
              <p className="text-xs text-stone-500 font-mono">
                Recent 7-day revenue trend &amp; order performance
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-stone-900 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                Rs. 176,300 This Week
              </span>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="pt-4">
            <div className="h-44 flex items-end justify-between gap-3 px-2 border-b border-stone-100 pb-2">
              {salesOverview.map((item) => (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="text-[10px] font-mono text-stone-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    Rs. {(item.revenue / 1000).toFixed(1)}k
                  </div>
                  <div className="w-full max-w-[38px] bg-stone-100 rounded-t-lg h-32 flex items-end justify-center p-1">
                    <div
                      style={{ height: item.height }}
                      className="w-full bg-gradient-to-t from-primary to-rose-400 rounded-t transition-all group-hover:scale-105"
                    />
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-stone-700">{item.day}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 text-xs text-stone-500">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span>Revenue in PKR</span>
              </span>
              <span className="font-mono text-[11px]">Average order value: Rs. 3,650</span>
            </div>
          </div>
        </div>

        {/* Quick Actions Hub */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
            <h3 className="font-serif text-base font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Quick Actions</span>
            </h3>
            <div className="space-y-2 text-xs">
              <Link
                to="/admin/products/new"
                className="flex items-center justify-between p-3 rounded-xl bg-stone-50 hover:bg-rose-50 text-stone-800 hover:text-primary transition-colors border border-stone-100 group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-rose-100/70 text-primary flex items-center justify-center">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block">Add New Product</span>
                    <span className="text-[10px] text-stone-500 block">Upload pictures, prices &amp; SKU</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                to="/admin/inventory"
                className="flex items-center justify-between p-3 rounded-xl bg-stone-50 hover:bg-amber-50 text-stone-800 hover:text-amber-800 transition-colors border border-stone-100 group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Boxes className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block">Manage Inventory</span>
                    <span className="text-[10px] text-stone-500 block">Adjust stock &amp; low stock alerts</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                to="/admin/orders"
                className="flex items-center justify-between p-3 rounded-xl bg-stone-50 hover:bg-emerald-50 text-stone-800 hover:text-emerald-800 transition-colors border border-stone-100 group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block">Pending Orders ({pendingOrdersCount})</span>
                    <span className="text-[10px] text-stone-500 block">Confirm customer WhatsApp orders</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                to="/admin/settings"
                className="flex items-center justify-between p-3 rounded-xl bg-stone-50 hover:bg-rose-50 text-stone-800 hover:text-primary transition-colors border border-stone-100 group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block">Store Settings</span>
                    <span className="text-[10px] text-stone-500 block">Hero copy, WhatsApp &amp; socials</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-tr from-stone-900 to-stone-800 text-white p-5 rounded-2xl shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-rose-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Real-Time Sync Active</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Edits made to products, prices, and stock reflect instantly on the customer storefront with zero redeployments.
            </p>
          </div>
        </div>

      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-base font-bold text-stone-900">Recent Customer Orders</h3>
            <p className="text-xs text-stone-500 font-mono">Consolidated orders via WhatsApp</p>
          </div>
          <Link
            to="/admin/orders"
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            <span>View all orders ({orders.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50/80 text-stone-500 font-mono text-[11px] border-b border-stone-100">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">City</th>
                <th className="py-3 px-4">Total (PKR)</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-stone-900">{order.id}</td>
                  <td className="py-3 px-4 text-stone-800 font-medium">{order.customer.name}</td>
                  <td className="py-3 px-4 text-stone-500">{order.customer.city}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-stone-900">
                    {formatPKR(order.total)}
                  </td>
                  <td className="py-3 px-4">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      to="/admin/orders"
                      className="text-primary hover:underline font-semibold text-[11px]"
                    >
                      Details &rarr;
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
