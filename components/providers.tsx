'use client'

import React, { ReactNode, useMemo } from 'react'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'emotion-theming'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory'
import theme from '../lib/theme'
import { NotificationsProvider } from './Notification'

interface ProvidersProps {
  children: ReactNode
}

function createApolloClient() {
  const httpLink = createHttpLink({
    uri:
      process.env.NODE_ENV === 'production'
        ? 'https://ecomm-next.now.sh/graphql'
        : 'http://localhost:3000/graphql',
    credentials: 'same-origin',
  })

  const authLink = setContext((_, { headers }) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('ae_token')
      return {
        headers: {
          ...headers,
          authorization: token || '',
        },
      }
    }

    return { headers }
  })

  const cache = new InMemoryCache({
    dataIdFromObject: (object: any) => {
      if (object.__typename === 'VariationAttribute') {
        return `${object.__typename}:${object.key}`
      }
      return defaultDataIdFromObject(object)
    },
  })

  return new ApolloClient({
    connectToDevTools: true,
    ssrMode: false,
    link: authLink.concat(httpLink),
    cache,
    queryDeduplication: true,
    resolvers: {
      Mutation: {
        setSelectedProductId: (_root: any, variables: any, { cache }: any) => {
          cache.writeData({ data: { selectedProductId: variables.id } })
          return null
        },
      },
    },
  })
}

export function Providers({ children }: ProvidersProps) {
  const client = useMemo(() => createApolloClient(), [])

  return (
    <ApolloHooksProvider client={client}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <NotificationsProvider>{children}</NotificationsProvider>
        </ThemeProvider>
      </ApolloProvider>
    </ApolloHooksProvider>
  )
}
