import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://ecomm-next.vercel.app/api/graphql'
      : 'http://localhost:3000/api/graphql',
  credentials: 'same-origin',
})

const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
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

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getCategory: {
          read(_, { args, toReference }) {
            return toReference({
              __typename: 'Category',
              id: args?.id,
            })
          },
        },
        getProduct: {
          read(_, { args, toReference }) {
            return toReference({
              __typename: 'Product',
              id: args?.id,
            })
          },
        },
      },
    },
    VariationAttribute: {
      keyFields: ['key'],
    },
  },
})

// Create Apollo Client instance for client-side usage
function createApolloClient() {
  return new ApolloClient({
    link: from([authLink, httpLink]),
    cache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  })
}

// Singleton instance for client-side
let apolloClient = null

export function getApolloClient(initialState = null) {
  // For SSR, always create a new client
  if (typeof window === 'undefined') {
    return createApolloClient()
  }

  // Create client once on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient()
  }

  // Hydrate initial state if provided
  if (initialState) {
    const existingCache = apolloClient.extract()
    apolloClient.cache.restore({ ...existingCache, ...initialState })
  }

  return apolloClient
}

// Export a function to reset the client (useful for logout)
export function resetApolloClient() {
  apolloClient = null
}
