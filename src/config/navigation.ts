export interface NavigationItem {
  readonly label: string;
  readonly href: string;
}

export const storefrontRoutes = {
  home: "/",
  shop: "/shop",
  wellnessGoals: "/wellness-goals",
  ingredients: "/ingredients",
  about: "/about",
  contact: "/contact",
  search: "/search",
  account: "/account",
  cart: "/cart",
  findYourFormula: "/find-your-formula",
  shippingReturns: "/shipping-returns",
  privacy: "/privacy",
  terms: "/terms",
} as const;

export const productRoute = (handle: string) =>
  `/products/${encodeURIComponent(handle)}`;

export const collectionRoute = (handle: string) =>
  `/collections/${encodeURIComponent(handle)}`;

export const wellnessGoalRoute = (handle: string) =>
  `${storefrontRoutes.wellnessGoals}/${encodeURIComponent(handle)}`;

export const primaryNavigation = [
  { label: "Home", href: storefrontRoutes.home },
  { label: "Shop", href: storefrontRoutes.shop },
  { label: "Wellness Goals", href: storefrontRoutes.wellnessGoals },
  { label: "About", href: storefrontRoutes.about },
  { label: "Contact", href: storefrontRoutes.contact },
] as const satisfies readonly NavigationItem[];

export const footerNavigationGroups = [
  {
    label: "Explore",
    items: [
      { label: "Home", href: storefrontRoutes.home },
      { label: "Shop", href: storefrontRoutes.shop },
      { label: "Wellness Goals", href: storefrontRoutes.wellnessGoals },
      { label: "Ingredients", href: storefrontRoutes.ingredients },
      { label: "About", href: storefrontRoutes.about },
    ],
  },
  {
    label: "Help",
    items: [
      { label: "Contact", href: storefrontRoutes.contact },
      { label: "Search", href: storefrontRoutes.search },
      { label: "Account", href: storefrontRoutes.account },
      { label: "Cart", href: storefrontRoutes.cart },
    ],
  },
  {
    label: "Policies",
    items: [
      {
        label: "Shipping and Returns",
        href: storefrontRoutes.shippingReturns,
      },
      { label: "Privacy Policy", href: storefrontRoutes.privacy },
      { label: "Terms and Conditions", href: storefrontRoutes.terms },
    ],
  },
] as const satisfies readonly {
  readonly label: string;
  readonly items: readonly NavigationItem[];
}[];

function isPathWithin(pathname: string, route: string) {
  return pathname === route || pathname.startsWith(`${route}/`);
}

export function isPrimaryNavigationItemActive(
  href: string,
  pathname: string,
) {
  if (href === storefrontRoutes.home) {
    return pathname === storefrontRoutes.home;
  }

  if (href === storefrontRoutes.shop) {
    return (
      isPathWithin(pathname, storefrontRoutes.shop) ||
      pathname.startsWith("/products/") ||
      pathname.startsWith("/collections/")
    );
  }

  if (href === storefrontRoutes.wellnessGoals) {
    return isPathWithin(pathname, storefrontRoutes.wellnessGoals);
  }

  return pathname === href;
}
