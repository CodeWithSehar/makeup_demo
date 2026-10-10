export interface NavLinkItem {
  label: string;
  path: string;
}

export const storefrontNavLinks: NavLinkItem[] = [
  { label: 'Home', path: '/#home' },
  { label: 'Shop', path: '/#shop' },
  { label: 'About Us', path: '/#about' },
  { label: 'Contact', path: '/#contact' },
];

export const adminNavLinks: NavLinkItem[] = [
  { label: 'Dashboard', path: '/admin' },
  { label: 'Products', path: '/admin/products' },
  { label: 'Inventory', path: '/admin/inventory' },
  { label: 'Orders', path: '/admin/orders' },
  { label: 'Promotions', path: '/admin/promotions' },
  { label: 'Settings', path: '/admin/settings' },
];

