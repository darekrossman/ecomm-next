'use client'

import React, { useMemo } from 'react'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'emotion-theming'
import theme, { GlobalStyle } from '../lib/theme'
import { NotificationsProvider } from '../components/Notification'
import initApollo from '../graphql/util/init-apollo'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { setContext } from 'apollo-link-context'

// Apollo link configuration (extracted from graphql/apollo.js)
const httpLink = new BatchHttpLink({
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

const apolloClientConfig = {
  link: authLink.concat(httpLink)
}

export function Providers({ children }: { children: React.ReactNode }) {
  const apolloClient = useMemo(() => initApollo(apolloClientConfig), [])

  return (
    <ApolloHooksProvider client={apolloClient}>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <NotificationsProvider>
            <GlobalStyle />
            {children}
          </NotificationsProvider>
        </ThemeProvider>
      </ApolloProvider>
    </ApolloHooksProvider>
  )
}
