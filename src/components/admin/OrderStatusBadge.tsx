import React from 'react';
import type { OrderStatus } from '../../types/order';

export const OrderStatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
  const styles: Record<OrderStatus, { bg: string; text: string; dot: string; label: string }> = {
    pending: {
      bg: 'bg-amber-50 border-amber-200',
      text: 'text-amber-800',
      dot: 'bg-amber-500',
      label: 'Pending',
    },
    confirmed: {
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-800',
      dot: 'bg-blue-500',
      label: 'Confirmed',
    },
    dispatched: {
      bg: 'bg-purple-50 border-purple-200',
      text: 'text-purple-800',
      dot: 'bg-purple-500',
      label: 'Dispatched',
    },
    delivered: {
      bg: 'bg-emerald-50 border-emerald-200',
      text: 'text-emerald-800',
      dot: 'bg-emerald-500',
      label: 'Delivered',
    },
    cancelled: {
      bg: 'bg-rose-50 border-rose-200',
      text: 'text-rose-800',
      dot: 'bg-rose-500',
      label: 'Cancelled',
    },
  };

  const current = styles[status] || styles.pending;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${current.bg} ${current.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
      <span>{current.label}</span>
    </span>
  );
};

