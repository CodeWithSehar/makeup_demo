import React from 'react';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import type { Category } from '../../types';

export interface FeaturedCategoriesProps {
  onSelectCategory: (category: Category) => void;
  categoryCounts: Record<Category, number>;
  selectedCategory?: Category;
}

export const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({
  onSelectCategory,
  categoryCounts,
  selectedCategory,
}) => {
  const categoryCards = [
    {
      name: 'Makeup' as const,
      tagline: 'Silky foundations, velvety lips & vibrant palettes',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Skincare' as const,
      tagline: 'Hydrating serums, barrier creams & pure botanical oils',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Haircare' as const,
      tagline: 'Restorative keratin masks & thermal argan elixirs',
      image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Perfumes' as const,
      tagline: 'Artisanal French & Arabian royal oud extraits',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Watches' as const,
      tagline: 'Prestige mother-of-pearl & sapphire crystal timepieces',
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Accessories' as const,
      tagline: 'Baroque freshwater pearls & plush velvet vanity bags',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const handleCategoryClick = (cat: Category) => {
    if (selectedCategory === cat) {
      onSelectCategory('All');
    } else {
      onSelectCategory(cat);
    }
    const catalogElement = document.getElementById('catalog-grid');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <div id="categories" className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-warm-border text-xs font-semibold text-antique-gold uppercase tracking-wider shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Shop by Category</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-espresso">
          Explore Our Collections
        </h2>
        <p className="text-sm sm:text-base text-muted-taupe">
          Select a luxury department to filter products, or browse all collections below.
        </p>
      </div>

      {/* 6 Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryCards.map((card) => {
          const count = categoryCounts[card.name] || 0;
          const isSelected = selectedCategory === card.name;

          return (
            <button
              type="button"
              key={card.name}
              onClick={() => handleCategoryClick(card.name)}
              className={`group relative rounded-3xl overflow-hidden aspect-[4/3] bg-espresso cursor-pointer transition-all duration-300 text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-antique-gold focus-visible:ring-offset-2 ${
                isSelected
                  ? 'ring-3 ring-antique-gold shadow-xl scale-[1.01]'
                  : 'shadow-md hover:shadow-xl hover:-translate-y-0.5'
              }`}
              aria-label={`Browse ${card.name} category`}
              aria-pressed={isSelected}
            >
              {/* Background Image */}
              <img
                src={card.image}
                alt={`${card.name} Department`}
                width={500}
                height={375}
                loading="lazy"
                decoding="async"
                className={`w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ${
                  isSelected ? 'opacity-90 scale-105' : 'opacity-80 group-hover:opacity-90'
                }`}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/35 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-mono font-medium border border-white/20">
                      {count} Items
                    </span>
                    {isSelected && (
                      <span className="px-2.5 py-1 rounded-full bg-antique-gold text-white text-xs font-semibold flex items-center gap-1 shadow-sm">
                        <Check className="w-3.5 h-3.5" />
                        <span>Selected</span>
                      </span>
                    )}
                  </div>
                  <div
                    className={`w-9 h-9 rounded-full backdrop-blur-md text-white flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-antique-gold ring-2 ring-white/60'
                        : 'bg-white/20 group-hover:bg-antique-gold group-hover:scale-110'
                    }`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3
                    className={`font-serif text-2xl font-bold transition-colors ${
                      isSelected ? 'text-surface-secondary' : 'text-white group-hover:text-surface-secondary'
                    }`}
                  >
                    {card.name}
                  </h3>
                  <p className="text-xs text-surface-soft/80 line-clamp-1">
                    {card.tagline}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

