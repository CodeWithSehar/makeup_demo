import React, { useState } from 'react';
import { useNavigate, useParams, useOutletContext, Link } from 'react-router-dom';
import { useAppData } from '../../../store/useAppData';
import { AdminHeader } from '../../../components/admin/AdminHeader';
import { ProductForm } from '../../../components/admin/ProductForm';
import type { ProductInput } from '../../../types';
import { ArrowLeft } from 'lucide-react';

export const ProductEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { onOpenSidebar } = useOutletContext<{ onOpenSidebar: () => void }>();
  const { products, updateProduct } = useAppData();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const numericId = parseInt(id || '', 10);
  const product = products.find((p) => p.id === numericId);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h3 className="font-serif text-xl font-bold text-stone-900">Product Not Found</h3>
        <p className="text-xs text-stone-500">
          The requested product ID does not exist in the catalog.
        </p>
        <Link
          to="/admin/products"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-900 text-white text-xs font-semibold"
        >
          &larr; Back to Products
        </Link>
      </div>
    );
  }

  const handleSubmit = async (input: ProductInput) => {
    setIsSubmitting(true);
    try {
      await updateProduct(product.id, input);
      navigate('/admin/products');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <AdminHeader
        title={`Edit: ${product.name}`}
        subtitle={`Updating catalog ID #${product.id}`}
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
          initialValues={product}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/admin/products')}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};
