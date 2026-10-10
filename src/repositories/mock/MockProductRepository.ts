import type { Product, ProductInput } from '../../types/product';
import type { ProductRepository } from '../interfaces/ProductRepository';
import { seedProducts } from '../../data/seedProducts';

const STORAGE_KEY = 'gg_mock_products_v3';

export class MockProductRepository implements ProductRepository {
  private load(): Product[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed: Product[] = JSON.parse(data);
        return parsed.map((p, idx) => ({
          ...p,
          sku: p.sku || `GG-${8906095880000 + (p.id || idx + 1)}`,
        }));
      }
    } catch (e) {
      console.warn('Failed to read products from localStorage:', e);
    }
    const withSku = seedProducts.map((p, idx) => ({
      ...p,
      sku: p.sku || `GG-${8906095880000 + (p.id || idx + 1)}`,
    }));
    this.save(withSku);
    return withSku;
  }

  private save(products: Product[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e: unknown) {
      console.error('Failed to save products to localStorage:', e);
      if (
        e instanceof DOMException &&
        (e.name === 'QuotaExceededError' ||
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
          e.code === 22 ||
          e.code === 1014)
      ) {
        throw new Error(
          'Browser storage quota exceeded. The uploaded image(s) may be too large to save in localStorage. Please use smaller images or an external image URL.'
        );
      }
      throw new Error('Failed to save product data to browser storage.');
    }
  }

  async getAll(): Promise<Product[]> {
    return this.load();
  }

  async getPublished(): Promise<Product[]> {
    const list = this.load();
    return list.filter((p) => p.status !== 'draft');
  }

  async getById(id: number): Promise<Product | null> {
    const list = this.load();
    return list.find((p) => p.id === id) || null;
  }

  async create(input: ProductInput): Promise<Product> {
    const list = this.load();
    const newId = list.length > 0 ? Math.max(...list.map((p) => p.id)) + 1 : 1;
    const newProduct: Product = {
      ...input,
      id: newId,
      sku: input.sku?.trim() || `GG-${8906095880000 + newId}`,
      status: input.status || 'published',
      inStock: input.stock > 0,
      createdAt: new Date().toISOString().split('T')[0],
      popularity: input.popularity || 50,
    };
    const updated = [newProduct, ...list];
    this.save(updated);
    return newProduct;
  }

  async update(id: number, input: Partial<Product>): Promise<Product> {
    const list = this.load();
    const index = list.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Product with ID ${id} not found.`);
    }
    const current = list[index];
    const updatedProduct: Product = {
      ...current,
      ...input,
      inStock: input.stock !== undefined ? input.stock > 0 : current.stock > 0,
    };
    list[index] = updatedProduct;
    this.save(list);
    return updatedProduct;
  }

  async delete(id: number): Promise<boolean> {
    const list = this.load();
    const filtered = list.filter((p) => p.id !== id);
    if (filtered.length === list.length) {
      return false;
    }
    this.save(filtered);
    return true;
  }

  async resetToSeed(): Promise<Product[]> {
    this.save(seedProducts);
    return seedProducts;
  }
}

export const mockProductRepository = new MockProductRepository();

