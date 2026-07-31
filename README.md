# Rootly

A Next.js 16 storefront for Rootly, powered by the Shopify Storefront API.

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
- `src/types` contains shared commerce types.
- `src/lib/shopify` isolates Storefront API queries, mutations, fragments, and
  the request client.
- `public` contains fonts, icons, brand assets, products, and lifestyle media.

## Shopify setup

Copy the blank values from `.env.example` into `.env.local` and add:

```bash
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_PRIVATE_TOKEN=your-private-token
SHOPIFY_STOREFRONT_API_VERSION=2026-07
```

Product catalogue data is requested on the server and revalidated every five
minutes. Keep the private token in `.env.local`; never expose it through a
`NEXT_PUBLIC_` variable.

## Checks

```bash
npm run lint
npm run build
```
