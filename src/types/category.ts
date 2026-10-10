export type Category = 
  | 'All' 
  | 'Makeup' 
  | 'Skincare' 
  | 'Haircare' 
  | 'Perfumes' 
  | 'Watches' 
  | 'Accessories'
  | 'Bundles & Kits';

export type SpecificCategory = Exclude<Category, 'All'>;

