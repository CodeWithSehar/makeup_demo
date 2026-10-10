export interface CategoryConfigItem {
  id: string;
  name: string;
  tagline: string;
  image: string;
  featured: boolean;
}

export const categoryConfig: CategoryConfigItem[] = [
  {
    id: 'makeup',
    name: 'Makeup',
    tagline: 'Silky foundations, velvety lips & vibrant palettes',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    featured: true,
  },
  {
    id: 'skincare',
    name: 'Skincare',
    tagline: 'Hydrating serums, barrier creams & pure botanical oils',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    featured: true,
  },
  {
    id: 'haircare',
    name: 'Haircare',
    tagline: 'Restorative keratin masks & thermal argan elixirs',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80',
    featured: true,
  },
  {
    id: 'perfumes',
    name: 'Perfumes',
    tagline: 'Artisanal French & Arabian royal oud extraits',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
    featured: true,
  },
  {
    id: 'watches',
    name: 'Watches',
    tagline: 'Prestige mother-of-pearl & sapphire crystal timepieces',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80',
    featured: true,
  },
  {
    id: 'accessories',
    name: 'Accessories',
    tagline: 'Baroque freshwater pearls & plush velvet vanity bags',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
    featured: true,
  },
  {
    id: 'bundles',
    name: 'Bundles & Kits',
    tagline: 'Curated beauty gift boxes and multi-step routines',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    featured: true,
  },
];

