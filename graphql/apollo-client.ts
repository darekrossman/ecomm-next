import { ApolloClient, InMemoryCache, defaultDataIdFromObject } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    if (object.__typename === 'VariationAttribute') {
      return `${object.__typename}:${(object as any).key}`
    }
    return defaultDataIdFromObject(object)
  },
  cacheRedirects: {
    Query: {
      getCategory: (_, args, { getCacheKey }) => {
        return getCacheKey({ __typename: 'Category', id: (args as any).id })
      },
      getProduct: (_, args, { getCacheKey }) => {
        return getCacheKey({ __typename: 'Product', id: (args as any).id })
      }
    }
  }
})

const httpLink = new createHttpLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://ecomm-next.now.sh/graphql'
      : 'http://localhost:3000/graphql',
  credentials: 'same-origin',
  fetch: typeof window === 'undefined' ? require('isomorphic-unfetch').default : fetch
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

export const apolloClient = new ApolloClient({
  connectToDevTools: typeof window !== 'undefined',
  ssrMode: typeof window === 'undefined',
  cache,
  link: authLink.concat(httpLink),
  queryDeduplication: true
})
