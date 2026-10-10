import React, { useState } from 'react';
import { useNavigate, useOutletContext, Link } from 'react-router-dom';
import { useAppData } from '../../../store/useAppData';
import { AdminHeader } from '../../../components/admin/AdminHeader';
import { ProductForm } from '../../../components/admin/ProductForm';
import type { ProductInput } from '../../../types';
import { ArrowLeft } from 'lucide-react';

export const ProductCreatePage: React.FC = () => {
  const { onOpenSidebar } = useOutletContext<{ onOpenSidebar: () => void }>();
  const { createProduct } = useAppData();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (input: ProductInput) => {
    setIsSubmitting(true);
    try {
      await createProduct(input);
      navigate('/admin/products');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <AdminHeader
        title="Add New Cosmetic Product"
        subtitle="Create a new item in your boutique catalog"
        onOpenSidebar={onOpenSidebar}
        actions={
          <Link
            to="/admin/products"
            className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </Link>
        }
      />

      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs">
        <ProductForm
          onSubmit={handleSubmit}
          onCancel={() => navigate('/admin/products')}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};
