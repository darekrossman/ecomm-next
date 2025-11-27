'use client'

import React from 'react'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'emotion-theming'
import { NotificationsProvider } from './Notification'
import apollo from '../graphql/apollo'
import theme from '../lib/theme'

// Create Apollo client instance
const apolloClient = apollo()

export function Providers({ children }: { children: React.ReactNode }) {
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
