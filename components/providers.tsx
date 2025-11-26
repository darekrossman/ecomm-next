'use client'

import React from 'react'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'emotion-theming'
import apollo from '../graphql/apollo'
import theme from '../lib/theme'
import { NotificationsProvider } from '../components/Notification'
import NotificationsContainer from '../components/NotificationsContainer'

export function Providers({ children }: { children: React.ReactNode }) {
  // Initialize Apollo client with HOC
  const ProviderComponent = apollo((props: any) => (
    <ApolloHooksProvider client={props.apolloClient}>
      <ApolloProvider client={props.apolloClient}>
        <ThemeProvider theme={theme}>
          <NotificationsProvider>
            {children}
            <NotificationsContainer />
          </NotificationsProvider>
        </ThemeProvider>
      </ApolloProvider>
    </ApolloHooksProvider>
  ))

  return <ProviderComponent />
}
