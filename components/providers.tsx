'use client'

import React from 'react'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'emotion-theming'
import theme, { GlobalStyle } from '../lib/theme'
import { NotificationsProvider } from '../components/Notification'
import apollo from '../graphql/apollo'

interface ProvidersProps {
  children: React.ReactNode
}

function ProvidersInner({ children }: ProvidersProps) {
  return (
    <ThemeProvider theme={theme}>
      <NotificationsProvider>
        <GlobalStyle />
        {children}
      </NotificationsProvider>
    </ThemeProvider>
  )
}

function Providers({ children }: ProvidersProps) {
  const ApolloWrapper = apollo(({ children: c }: { children: React.ReactNode }) => {
    // Access apolloClient from the HOC wrapper
    return <>{c}</>
  })

  // Note: Apollo client setup needs to be adapted for App Router
  // The original apollo HOC pattern may need refactoring
  return (
    <ProvidersInner>
      {children}
    </ProvidersInner>
  )
}

export { Providers }
