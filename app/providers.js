'use client'

import React, { useMemo } from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { ThemeProvider } from '@emotion/react'
import theme, { GlobalStyle } from '../lib/theme'
import { NotificationsProvider } from '../components/Notification'

/**
 * Create Apollo Client for client-side only usage in App Router.
 * Unlike the Pages Router pattern, we don't need SSR hydration here
 * since App Router handles server rendering differently.
 */
function createApolloClient() {
  const httpLink = new HttpLink({
    uri:
      process.env.NODE_ENV === 'production'
        ? 'https://ecomm-next.now.sh/graphql'
        : 'http://localhost:3000/graphql',
    credentials: 'same-origin'
  })

  const authLink = setContext((_, { headers }) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('ae_token')
      return {
        headers: {
          ...headers,
          authorization: token || ''
        }
      }
    }
    return { headers }
  })

  // Apollo Client 3.x cache configuration with type policies
  const cache = new InMemoryCache({
    typePolicies: {
      VariationAttribute: {
        keyFields: ['key']
      },
      Query: {
        fields: {
          getCategory: {
            read(_, { args, toReference }) {
              return toReference({
                __typename: 'Category',
                id: args?.id
              })
            }
          },
          getProduct: {
            read(_, { args, toReference }) {
              return toReference({
                __typename: 'Product',
                id: args?.id
              })
            }
          }
        }
      }
    }
  })

  return new ApolloClient({
    link: from([authLink, httpLink]),
    cache,
    connectToDevTools: true,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network'
      }
    }
  })
}

/**
 * Providers component wraps all context providers needed for the app.
 * This is a Client Component because context providers require client-side features.
 * 
 * Includes:
 * - ApolloProvider for GraphQL data fetching
 * - ThemeProvider for Emotion styling
 * - NotificationsProvider for toast notifications
 * - GlobalStyle for global CSS reset
 */
export function Providers({ children }) {
  // Create Apollo client only once on the client side
  // useMemo ensures the client is stable across re-renders
  const apolloClient = useMemo(() => createApolloClient(), [])

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <NotificationsProvider>
          <GlobalStyle />
          {children}
        </NotificationsProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default Providers
