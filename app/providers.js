'use client'

import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { ThemeProvider } from '@emotion/react'
import theme, { GlobalStyle } from '../lib/theme'
import { NotificationsProvider } from '../components/Notification'

// Client-side Apollo Client initialization
// For App Router, we initialize Apollo on the client only
function makeClient() {
  return new ApolloClient({
    uri:
      typeof window !== 'undefined'
        ? window.location.origin + '/graphql'
        : process.env.NODE_ENV === 'production'
          ? 'https://ecomm-next.now.sh/graphql'
          : 'http://localhost:3000/graphql',
    cache: new InMemoryCache({
      typePolicies: {
        VariationAttribute: {
          keyFields: ['key'],
        },
        Query: {
          fields: {
            getCategory: {
              read(_, { args, toReference }) {
                return toReference({
                  __typename: 'Category',
                  id: args?.id,
                })
              },
            },
            getProduct: {
              read(_, { args, toReference }) {
                return toReference({
                  __typename: 'Product',
                  id: args?.id,
                })
              },
            },
          },
        },
      },
    }),
    credentials: 'same-origin',
  })
}

// Singleton pattern for client-side Apollo client
let apolloClient = null

function getApolloClient() {
  if (typeof window === 'undefined') {
    // Server-side: always create a new client
    return makeClient()
  }
  // Client-side: reuse singleton
  if (!apolloClient) {
    apolloClient = makeClient()
  }
  return apolloClient
}

export function Providers({ children }) {
  const client = getApolloClient()

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <NotificationsProvider>
          <GlobalStyle />
          {children}
        </NotificationsProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}
