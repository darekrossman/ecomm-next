'use client'

import React from 'react'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'emotion-theming'
import { useApollo } from '../graphql/apollo'
import theme from '../lib/theme'
import { NotificationsProvider } from '../components/Notification'

export function Providers({ children }: { children: React.ReactNode }) {
  const apolloClient = useApollo()

  return (
    <ApolloHooksProvider client={apolloClient}>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <NotificationsProvider>
            {children}
          </NotificationsProvider>
        </ThemeProvider>
      </ApolloProvider>
    </ApolloHooksProvider>
  )
}
