import type { SpecificCategory } from './category';

export type ProductStatus = 'published' | 'draft';

export interface Product {
  id: number;
  name: string;
  brand: string;
  category: SpecificCategory;
  sku?: string;
  price: number; // in PKR
  originalPrice?: number;
  discountPercentage?: number;
  description: string;
  image: string;
  images?: string[];
  shadeImage?: string;
  stock: number;
  inStock?: boolean;
  status?: ProductStatus; // defaults to 'published'
  rating?: number;
  reviewsCount?: number;
  badge?: string;
  volumeOrWeight?: string;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBundle?: boolean;
  shade?: string;
  ingredients?: string;
  fragranceNotes?: string;
  features?: string[];
  createdAt: string;
  popularity: number;
}

export type ProductInput = Omit<Product, 'id' | 'createdAt' | 'popularity'> & {
  id?: number;
  popularity?: number;
};

