export interface NavigationItem {
  label: string;
  href: string;
}

export const mainNavigation: NavigationItem[] = [
  {
    label: "Shop",
    href: "/shop",
  },
  {
    label: "Wellness Goals",
    href: "/wellness-goals",
  },
  {
    label: "Ingredients",
    href: "/ingredients",
  },
  {
    label: "Our Story",
    href: "/about",
  },
];

export const footerNavigation: NavigationItem[] = [
  { label: "Contact", href: "/contact" },
  { label: "Shipping & returns", href: "/contact" },
  { label: "Privacy", href: "/contact" },
];
