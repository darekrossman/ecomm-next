'use client'

import React, { useMemo } from 'react'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'emotion-theming'
import theme, { GlobalStyle } from '../lib/theme'
import initApollo from '../graphql/util/init-apollo'
import { NotificationsProvider } from './Notification'

// Apollo client config matching graphql/apollo.js
import { BatchHttpLink } from 'apollo-link-batch-http'
import { setContext } from 'apollo-link-context'

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

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const client = useMemo(() => initApollo(apolloClientConfig), [])
  
  return (
    <ApolloHooksProvider client={client}>
      <ApolloProvider client={client}>
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
