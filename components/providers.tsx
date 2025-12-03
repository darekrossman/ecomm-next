'use client'

import React from 'react'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'emotion-theming'
import theme from '../lib/theme'
import { NotificationsProvider } from './Notification'
import apolloClient from '../graphql/apollo'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const client = apolloClient()
  
  return (
    <ApolloHooksProvider client={client}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <NotificationsProvider>
            {children}
          </NotificationsProvider>
        </ThemeProvider>
      </ApolloProvider>
    </ApolloHooksProvider>
  )
}
