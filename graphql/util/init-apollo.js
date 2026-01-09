import { ApolloClient, InMemoryCache } from '@apollo/client'

let apolloClient = null

// In Apollo Client 3.x, dataIdFromObject is replaced with typePolicies
// and cacheRedirects are replaced with field policies using read functions
const cache = new InMemoryCache({
  typePolicies: {
    VariationAttribute: {
      keyFields: ['key']
    },
    Query: {
      fields: {
        getCategory: {
          read(_, { args, toReference }) {
            return toReference({
              __typename: 'Category',
              id: args?.id
            })
          }
        },
        getProduct: {
          read(_, { args, toReference }) {
            return toReference({
              __typename: 'Product',
              id: args?.id
            })
          }
        }
      }
    }
  }
})

function create(config = {}, initialState) {
  // In Apollo Client 3.x, we use makeVar for reactive variables instead of writeData
  // For simple local state, we can use cache policies or reactive variables
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
