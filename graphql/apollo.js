import { HttpLink, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import withApolloClient from './util/with-apollo-client'

// Apollo Client 3.x: Use HttpLink instead of BatchHttpLink
// Batching can be added separately if needed with @apollo/client/link/batch-http
const httpLink = new HttpLink({
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
  link: from([authLink, httpLink])
}

export default App => withApolloClient(App, apolloClientConfig)
