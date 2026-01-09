import CartContent from './cart-content'

/**
 * Cart Page - Server Component
 * 
 * This is the App Router cart page at /cart.
 * It's a Server Component that exports metadata and wraps the CartContent
 * Client Component.
 * 
 * Why this pattern?
 * - metadata export is only supported in Server Components
 * - useQuery hook (Apollo) requires a Client Component
 * - Separating them allows SEO metadata with client-side data fetching
 * 
 * Migrated from: pages/cart.js
 */

export const metadata = {
  title: 'Cart - ecomm-next',
  description: 'Your shopping cart',
}

export default function CartPage() {
  return <CartContent />
}
