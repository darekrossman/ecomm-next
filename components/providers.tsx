'use client'

import React, { ReactNode } from 'react'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'emotion-theming'
import theme from '../lib/theme'
import { NotificationsProvider } from './Notification'

interface ProvidersProps {
  children: ReactNode
  apolloClient: any
}

export function Providers({ children, apolloClient }: ProvidersProps) {
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
