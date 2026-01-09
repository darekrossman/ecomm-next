import { ApolloClient, InMemoryCache, gql, makeVar } from '@apollo/client'
import fetch from 'isomorphic-unfetch'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (typeof window === 'undefined') {
  global.fetch = fetch
}

// Reactive variable for selected product
export const selectedProductIdVar = makeVar(null)

function createCache() {
  return new InMemoryCache({
    typePolicies: {
      VariationAttribute: {
        keyFields: ['key']
      },
      Query: {
        fields: {
          selectedProductId: {
            read() {
              return selectedProductIdVar()
            }
          }
        }
      }
    }
  })
}

function create(config = {}, initialState) {
  const cache = createCache()
  
  const client = new ApolloClient({
    connectToDevTools: typeof window !== 'undefined',
    ssrMode: typeof window === 'undefined',
    cache: cache.restore(initialState || {}),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network'
      }
    },
    ...config
  })

  return client
}

export default function initApollo(clientConfig, initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return create(clientConfig, initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(clientConfig, initialState)
  }

  return apolloClient
}
