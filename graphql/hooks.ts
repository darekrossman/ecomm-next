import { useMemo } from 'react'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory'
import { createPersistedQueryLink } from 'apollo-link-persisted-queries'
import fetch from 'isomorphic-unfetch'

let apolloClient: ApolloClient<any>

const cache = new InMemoryCache({
  dataIdFromObject: (object: any) => {
    if (object.__typename === 'VariationAttribute') {
      return `${object.__typename}:${object.key}`
    }
    return defaultDataIdFromObject(object)
  },
  cacheRedirects: {
    Query: {
      getCategory: (_: any, args: any, { getCacheKey }: any) => {
        return getCacheKey({ __typename: 'Category', id: args.id })
      },
      getProduct: (_: any, args: any, { getCacheKey }: any) => {
        return getCacheKey({ __typename: 'Product', id: args.id })
      }
    }
  }
})

const createApolloClient = () => {
  const httpLink = new BatchHttpLink({
    uri:
      process.env.NODE_ENV === 'production'
        ? 'https://ecomm-next.now.sh/graphql'
        : 'http://localhost:3000/graphql',
    credentials: 'same-origin',
    fetch: fetch as any
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

  const client = new ApolloClient({
    connectToDevTools: typeof window !== 'undefined',
    ssrMode: typeof window === 'undefined',
    cache: cache,
    queryDeduplication: true,
    link: authLink.concat(httpLink),
    resolvers: {
      Mutation: {
        setSelectedProductId: (_root: any, variables: any, { cache }: any) => {
          cache.writeData({ data: { selectedProductId: variables.id } })
          return null
        }
      }
    }
  })

  cache.writeData({
    data: {
      selectedProductId: null
    }
  })

  return client
}

export function useApolloClient() {
  return useMemo(() => {
    if (!apolloClient) {
      apolloClient = createApolloClient()
    }
    return apolloClient
  }, [])
}
