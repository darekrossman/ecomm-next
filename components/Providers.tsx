'use client'

import React, { ReactNode } from 'react'
import { ThemeProvider } from 'emotion-theming'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { ApolloProvider } from 'react-apollo'
import { NotificationsProvider } from './Notification'
import theme, { GlobalStyle } from '../lib/theme'

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
            <>
              <GlobalStyle />
              {children}
            </>
          </NotificationsProvider>
        </ThemeProvider>
      </ApolloProvider>
    </ApolloHooksProvider>
  )
}
