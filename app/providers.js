'use client'

import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { ThemeProvider } from '@emotion/react'
import { useMemo } from 'react'
import theme, { GlobalStyle } from '../lib/theme'
import { NotificationsProvider } from '../components/Notification'

function makeClient() {
  const httpLink = new HttpLink({
    uri:
      process.env.NODE_ENV === 'production'
        ? 'https://ecomm-next.now.sh/graphql'
        : 'http://localhost:3000/graphql',
    credentials: 'same-origin',
  })

  const authLink = setContext((_, { headers }) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('ae_token')
      return {
        headers: {
          ...headers,
          authorization: token || '',
        },
      }
    }
    return { headers }
  })

  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        VariationAttribute: {
          keyFields: ['key'],
        },
      },
    }),
    link: from([authLink, httpLink]),
  })
}

export function Providers({ children }) {
  const client = useMemo(() => makeClient(), [])

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <NotificationsProvider>
          <GlobalStyle />
          {children}
        </NotificationsProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}
