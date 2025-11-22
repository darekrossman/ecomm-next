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

export const apolloClientConfig = {
  link: authLink.concat(httpLink)
}
