'use client'

import React from 'react'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { ApolloProvider } from 'react-apollo'

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

function createApolloClient() {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })
}

let apolloClient: ApolloClient<any> | null = null

function getApolloClient() {
  if (typeof window === 'undefined') {
    return createApolloClient()
  }
  if (!apolloClient) {
    apolloClient = createApolloClient()
  }
  return apolloClient
}

interface ApolloWrapperProps {
  children: React.ReactNode
}

export function ApolloWrapper({ children }: ApolloWrapperProps) {
  const client = getApolloClient()

  return (
    <ApolloHooksProvider client={client}>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </ApolloHooksProvider>
  )
}
