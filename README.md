# Rootly

A Next.js 16 storefront scaffold for Rootly, with typed mock data today and a
clear boundary for a future Shopify Storefront API connection.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `src/app` contains route files, layouts, loading UI, and the global 404.
- `src/components/ui` contains small reusable primitives.
- `src/components/layout` contains the announcement bar, header, navigation,
  and footer.
- `src/features` contains storefront-specific sections grouped by domain.
- `src/config` contains navigation and brand-level settings.
- `src/mocks` is the temporary catalog used before Shopify is connected.
- `src/types` contains shared commerce types.
- `src/lib/shopify` isolates Storefront API queries, mutations, fragments, and
  the request client.
- `public` contains fonts, icons, brand assets, products, and lifestyle media.

## Shopify setup

Copy the blank values from `.env.example` into `.env.local` and add:

```bash
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token
```

The current pages intentionally read from `src/mocks`; moving them to Shopify
only requires replacing that data access at the route or feature boundary.

## Checks

```bash
npm run lint
npm run build
```
