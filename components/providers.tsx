'use client'

import React from 'react'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'emotion-theming'
import theme from '../lib/theme'
import apollo from '../graphql/apollo'
import { NotificationsProvider } from './Notification'

interface ProvidersProps {
  children: React.ReactNode
}

function ProvidersInner({ children, apolloClient }: ProvidersProps & { apolloClient: any }) {
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

const ApolloWrapper = apollo(ProvidersInner)

export function Providers({ children }: ProvidersProps) {
  return <ApolloWrapper>{children}</ApolloWrapper>
}
