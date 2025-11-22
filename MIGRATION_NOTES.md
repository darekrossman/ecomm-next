# Next.js Pages Router → App Router Migration

## Summary of Changes

### Files Created
- `app/layout.tsx` - Root layout replacing _app.js and _document.js
- `app/page.tsx` - Home page (/), converted from pages/index.js
- `app/products/page.tsx` - Products page (/products), converted from pages/products.js
- `app/product/page.tsx` - Product detail page (/product), converted from pages/product.js
- `app/cart/page.tsx` - Cart page (/cart), converted from pages/cart.js
- `app/providers.tsx` - Client-side providers (Apollo, Theme, Notifications)
- `app/error.tsx` - Error boundary for segment-level error handling
- `app/not-found.tsx` - 404 Not Found page
- `app/loading.tsx` - Root loading skeleton

### Key Migration Points

#### 1. Provider Extraction (_app.js → providers.tsx)
- Extracted all client-side providers into `app/providers.tsx` marked with 'use client'
- Includes: Apollo Provider, Theme Provider, Notifications Provider
- Root layout now uses providers for clean separation of concerns

#### 2. Router API Changes
**Pages Router → App Router:**
- `withRouter()` HOC removed (no longer needed)
- `useRouter()` from 'next/router' → 'next/navigation'
- `router.query` → `useSearchParams()` hook
- `router.asPath` → Available via pathname patterns
- `Router.push()` → `router.push()` from useRouter hook

**Examples in migrated pages:**
- `products/page.tsx`: Uses `useRouter()` and `useSearchParams()` for modal state
- `product/page.tsx`: Uses `useSearchParams()` to get product ID

#### 3. Metadata API
- Removed `<Head>` component usage
- Created `metadata` export in root layout
- Viewport meta tag moved to metadata object

#### 4. Client Components
- Pages using hooks, state, or event handlers marked with 'use client'
- Products page: 'use client' (useState, useRouter)
- Product detail page: 'use client' (useSearchParams)
- Cart page: 'use client' (useQuery hook)
- Home page: Server component (no 'use client' needed)

#### 5. Apollo Client Setup
**NOTE: REQUIRES MANUAL SETUP**
- The current Apollo client setup uses a legacy `withApolloClient` HOC pattern
- Root layout has placeholder for apolloClient initialization
- **Action Required:**
  1. Refactor `graphql/apollo.js` to export a client instance directly
  2. Or create an Apollo client hook for client components
  3. Pass the client instance to `RootProviders` in layout.tsx
  4. See: https://www.apollographql.com/docs/react/v3/api/core/ApolloClient/

#### 6. User Auth Query (_app.js)
**NOTE: REQUIRES MANUAL IMPLEMENTATION**
- The USER_AUTH_QUERY and related auth logic from _app.js needs a new home
- **Options:**
  1. Create a new client component wrapper (e.g., app/RootWrapper.tsx)
  2. Move auth logic to a custom hook
  3. Implement as a Suspense boundary with fallback UI
  4. Consider moving to middleware or layout server component

#### 7. Breaking Changes from Pages Router
- `withRouter()` - Removed; use `useRouter()` hook instead
- `Container` from 'next/app' - Not used in App Router
- `App.getInitialProps()` - Not available; use Server Components or middleware
- Shallow routing - Not directly supported; use URL search params pattern
- `_document.js` - Merged into root layout

### Files Preserved (No Changes Needed)
- `lib/` - All utilities, hooks, fragments work as-is
- `graphql/` - Logic preserved (setup refactoring needed)
- `components/` - All components work as-is
- `pages/` - Can be deleted once migration verified

### Next Steps

1. **Apollo Client Refactoring** (Priority: High)
   - Update `graphql/apollo.js` to export client instance
   - Update `app/layout.tsx` to pass client to providers
   - Test GraphQL queries in client components

2. **Auth Logic Migration** (Priority: High)
   - Move USER_AUTH_QUERY logic from _app.js
   - Implement in RootWrapper or layout-level server component
   - Ensure localStorage token handling works in client components

3. **Testing** (Priority: High)
   - Test page rendering and navigation
   - Test GraphQL queries/mutations
   - Test modal state and routing (products page)
   - Test error boundary

4. **TypeScript Enhancement** (Optional)
   - Add proper types for Apollo client
   - Type all hook parameters
   - Create type files for custom hooks

5. **Cleanup**
   - Delete `pages/` directory once verified
   - Update `next.config.js` if needed (pageExtensions, etc.)
   - Remove deprecated packages from package.json

### Known Issues & Workarounds

1. **Apollo Client Initialization**
   - Current setup requires refactoring
   - Temporary: apolloClient prop is null
   - Use App Router Apollo integration guide

2. **Shallow Routing**
   - Old pattern: `Router.push(..., ..., { shallow: true })`
   - New pattern: URL search params with `useSearchParams()`
   - Implemented in products/page.tsx

3. **SSR/SSG**
   - No getStaticProps/getServerSideProps needed for client-side queries
   - If implementing server-side rendering, use Server Components
   - Current implementation remains CSR (client-side rendering)

### Version Notes
- Previous: Next.js 8.0.3 (ancient, many deprecations)
- Target: Next.js 16+ (modern App Router)
- React: Updated patterns for React 18+
- Breaking changes across 8+ major versions

### Useful References
- [Next.js App Router Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
- [next/navigation vs next/router](https://nextjs.org/docs/app/api-reference/functions/use-router)
- [Apollo Client with Next.js](https://www.apollographql.com/docs/react/nextjs)
