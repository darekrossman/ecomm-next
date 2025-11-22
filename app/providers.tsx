'use client'

import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { ApolloProvider } from 'react-apollo'
import { NotificationsProvider } from '../components/Notification'
import theme from '../lib/theme'
import { useApolloClient } from '../graphql/hooks'

export function Providers({ children }: { children: React.ReactNode }) {
  const apolloClient = useApolloClient()

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
