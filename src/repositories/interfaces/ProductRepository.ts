import type { Product, ProductInput } from '../../types/product';

export interface ProductRepository {
  getAll(): Promise<Product[]>;
  getPublished(): Promise<Product[]>;
  getById(id: number): Promise<Product | null>;
  create(input: ProductInput): Promise<Product>;
  update(id: number, input: Partial<Product>): Promise<Product>;
  delete(id: number): Promise<boolean>;
  resetToSeed(): Promise<Product[]>;
}

