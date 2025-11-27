'use client'

import 'intersection-observer'
import React from 'react'
import { createPortal } from 'react-dom'
import gql from 'graphql-tag'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'emotion-theming'
import { useTransition, animated } from 'react-spring'
import { Box } from '@64labs/ui'
import { useQuery } from '../lib/gql'
import theme, { GlobalStyle } from '../lib/theme'
import Notification, { NotificationsProvider, useNotifications } from './Notification'
import { RootCategoryFragment } from '../lib/fragments'
import initApollo from '../graphql/util/init-apollo'
import { apolloClientConfig } from '../graphql/apollo'

const USER_AUTH_QUERY = gql`
  query UserQuery {
    user {
      id
      type
      locale
      token
      cart {
        id
        items {
          id
        }
      }
    }
  }
`

const CATEGORY_PRODUCT_LIST_QUERY = gql`
  query category($id: String!) {
    category: getCategory(id: $id) {
      ...RootCategoryFragment
    }
  }
  ${RootCategoryFragment}
`

const Root = ({ children }: { children: React.ReactNode }) => {
  const { data, error, refetch } = useQuery(USER_AUTH_QUERY, { ssr: false })
  const rootCategoryQuery = useQuery(CATEGORY_PRODUCT_LIST_QUERY, { variables: { id: 'root' } })

  React.useEffect(() => {
    if (data && data.user) {
      localStorage.setItem('ae_token', data.user.token)
    }

    if (error && error.graphQLErrors && error.graphQLErrors.length > 0) {
      const graphQLError = error.graphQLErrors[0]
      if (graphQLError.extensions && graphQLError.extensions.code === 'UNAUTHENTICATED') {
        localStorage.removeItem('ae_token')
        refetch()
      }
    }
  }, [data, error, refetch])

  if (!rootCategoryQuery.data || !rootCategoryQuery.data.category) {
    return null
  }

  return <>{children}</>
}

const NotificationsContainer = () => {
  const [isBrowser, setIsBrowser] = React.useState(false)
  const [notifications] = useNotifications()

  const transitions = useTransition(notifications, (item: any) => item.id, {
    from: { height: 0, opacity: 0.01, overflow: 'hidden' },
    enter: { height: 48, opacity: 0.99 },
    leave: [{ height: 48, opacity: 0.01 }],
    config: { tension: 454, friction: 40 }
  })

  React.useEffect(() => {
    setIsBrowser(true)
  }, [])

  if (!isBrowser || typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <Box ess={{ position: 'fixed', top: 0, width: '100%', zIndex: 99 }}>
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <Notification>{item.content}</Notification>
        </animated.div>
      ))}
    </Box>,
    document.body
  )
}

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const apolloClient = React.useMemo(() => initApollo(apolloClientConfig), [])

  return (
    <ApolloHooksProvider client={apolloClient}>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <NotificationsProvider>
            <>
              <GlobalStyle />
              <Root>{children}</Root>
              <NotificationsContainer />
            </>
          </NotificationsProvider>
        </ThemeProvider>
      </ApolloProvider>
    </ApolloHooksProvider>
  )
}
