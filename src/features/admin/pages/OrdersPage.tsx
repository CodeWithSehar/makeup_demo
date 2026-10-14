import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useAppData } from '../../../store/useAppData';
import { AdminHeader } from '../../../components/admin/AdminHeader';
import { OrderStatusBadge } from '../../../components/admin/OrderStatusBadge';
import { Modal } from '../../../components/common/Modal';
import { formatPKR } from '../../../utils/formatCurrency';
import { Eye, Phone, MapPin, MessageCircle } from 'lucide-react';
import type { Order, OrderStatus } from '../../../types';

export const OrdersPage: React.FC = () => {
  const { onOpenSidebar } = useOutletContext<{ onOpenSidebar: () => void }>();
  const { orders, updateOrderStatus } = useAppData();

  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeOrderModal, setActiveOrderModal] = useState<Order | null>(null);

  const filteredOrders = orders.filter((o) => {
    if (selectedStatus === 'all') return true;
    return o.status === selectedStatus;
  });

  const handleStatusChange = async (orderId: string, nextStatus: OrderStatus) => {
    await updateOrderStatus(orderId, nextStatus);
    if (activeOrderModal && activeOrderModal.id === orderId) {
      setActiveOrderModal({ ...activeOrderModal, status: nextStatus });
    }
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="WhatsApp &amp; Store Orders"
        subtitle="Manage customer order confirmations, packaging, and dispatch tracking"
        onOpenSidebar={onOpenSidebar}
      />

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-warm-border pb-3 text-xs font-semibold">
        {['all', 'pending', 'confirmed', 'dispatched', 'delivered', 'cancelled'].map((st) => (
          <button
            key={st}
            type="button"
            onClick={() => setSelectedStatus(st)}
            className={`px-3 py-1.5 rounded-lg capitalize transition-colors cursor-pointer ${
              selectedStatus === st
                ? 'bg-espresso text-white'
                : 'text-mocha hover:bg-surface-soft'
            }`}
          >
            {st} ({orders.filter((o) => (st === 'all' ? true : o.status === st)).length})
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-warm-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-ivory/80 text-muted-taupe font-mono text-[11px] border-b border-warm-border">
              <tr>
                <th className="py-3 px-4">Order ID &amp; Date</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">City</th>
                <th className="py-3 px-4">Items Count</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-border/60">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted-taupe text-xs">
                    No orders match the selected status filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-ivory/60 transition-colors">
                    <td className="py-3 px-4 font-mono">
                      <span className="font-bold text-espresso block">{order.id}</span>
                      <span className="text-[10px] text-muted-taupe">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-semibold text-espresso block">
                        {order.customer.name}
                      </span>
                      <span className="text-[11px] text-muted-taupe font-mono">
                        {order.customer.phone}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-mocha">{order.customer.city}</td>

                    <td className="py-3 px-4 font-mono">
                      {order.items.reduce((acc, i) => acc + i.quantity, 0)} items
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-espresso">
                      {formatPKR(order.total)}
                    </td>

                    <td className="py-3 px-4">
                      <select
                        aria-label={`Update status for order #${order.id}`}
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value as OrderStatus)
                        }
                        className="px-2.5 py-1 rounded-lg border border-warm-border bg-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-antique-gold cursor-pointer"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => setActiveOrderModal(order)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-warm-border hover:border-antique-gold text-mocha hover:text-espresso hover:bg-surface-soft text-xs font-semibold transition-all cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {activeOrderModal && (
        <Modal
          isOpen={Boolean(activeOrderModal)}
          onClose={() => setActiveOrderModal(null)}
          title={`Order Summary: ${activeOrderModal.id}`}
          maxWidth="lg"
        >
          <div className="space-y-6">
            {/* Customer & Shipping info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-ivory border border-warm-border text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-muted-taupe font-bold">Customer</span>
                <p className="font-semibold text-espresso text-sm">{activeOrderModal.customer.name}</p>
                <p className="flex items-center gap-1.5 text-mocha font-mono">
                  <Phone className="w-3.5 h-3.5 text-antique-gold" />
                  <span>{activeOrderModal.customer.phone}</span>
                </p>
                <a
                  href={`https://wa.me/${activeOrderModal.customer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hello ${activeOrderModal.customer.name}, Glow & Grace concierge team here regarding your order #${activeOrderModal.id}.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-whatsapp hover:bg-[#08885D] text-white text-[11px] font-semibold transition-colors mt-2"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white/20" />
                  <span>Chat with Customer</span>
                </a>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-muted-taupe font-bold">Shipping Destination</span>
                <p className="flex items-start gap-1.5 text-mocha">
                  <MapPin className="w-3.5 h-3.5 text-antique-gold shrink-0 mt-0.5" />
                  <span>
                    {activeOrderModal.customer.address
                      ? `${activeOrderModal.customer.address}, ${activeOrderModal.customer.city}`
                      : activeOrderModal.customer.city}
                  </span>
                </p>
                {activeOrderModal.customer.note && (
                  <p className="text-[11px] text-muted-taupe italic">
                    Note: &ldquo;{activeOrderModal.customer.note}&rdquo;
                  </p>
                )}
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase font-bold text-mocha">
                Products in this order
              </h4>
              <div className="space-y-2">
                {activeOrderModal.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl border border-warm-border text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <span className="font-semibold text-espresso block">{item.product.name}</span>
                        <span className="text-[11px] text-muted-taupe font-mono">
                          {item.quantity} x {formatPKR(item.product.price)}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-espresso">
                      {formatPKR(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Breakdown */}
            <div className="p-4 rounded-2xl bg-ivory border border-warm-border space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-mocha">
                <span>Subtotal:</span>
                <span>{formatPKR(activeOrderModal.subtotal)}</span>
              </div>
              {activeOrderModal.discount > 0 && (
                <div className="flex justify-between text-success font-bold">
                  <span>Coupon Discount ({activeOrderModal.couponCode}):</span>
                  <span>-{formatPKR(activeOrderModal.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-mocha">
                <span>Nationwide Shipping:</span>
                <span>{activeOrderModal.deliveryFee === 0 ? 'FREE' : formatPKR(activeOrderModal.deliveryFee)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-warm-border text-sm font-bold text-espresso">
                <span>Total Amount Payable:</span>
                <span className="text-mocha font-serif">{formatPKR(activeOrderModal.total)}</span>
              </div>
            </div>

            {/* Status change actions */}
            <div className="flex items-center justify-between pt-3 border-t border-warm-border/70">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-taupe">Current status:</span>
                <OrderStatusBadge status={activeOrderModal.status} />
              </div>

              <a
                href={`https://wa.me/${activeOrderModal.customer.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(activeOrderModal.customer.name)},%20this%20is%20Glow%20%26%20Grace%20regarding%20your%20order%20${activeOrderModal.id}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-whatsapp hover:bg-[#08885D] text-white text-xs font-semibold transition-all inline-flex items-center gap-1.5"
              >
                <span>WhatsApp Customer</span>
              </a>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
