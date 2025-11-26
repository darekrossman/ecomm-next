'use client'

import React from 'react'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'emotion-theming'
import { useTransition, animated } from 'react-spring'
import { Box, createPortal } from '@64labs/ui'
import theme, { GlobalStyle } from '../lib/theme'
import Notification, { NotificationsProvider, useNotifications } from './Notification'
import { useInitializeAuth } from '../lib/hooks/useInitializeAuth'
import apollo from '../graphql/apollo'

const NotificationsContainer = () => {
  const [isBrowser, setIsBrowser] = React.useState(false)

  const [notifications] = useNotifications()

  const transitions = useTransition(notifications, item => item.id, {
    from: { height: 0, opacity: 0.01, overflow: 'hidden' },
    enter: { height: 48, opacity: 0.99 },
    leave: [{ height: 48, opacity: 0.01 }],
    config: { tension: 454, friction: 40 }
  })

  React.useEffect(() => {
    setIsBrowser(true)
  }, [])

  if (!isBrowser) {
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

export function Providers({ children }: { children: React.ReactNode }) {
  const apolloClient = apollo
  
  return (
    <ApolloHooksProvider client={apolloClient}>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <NotificationsProvider>
            <>
              <GlobalStyle />
              {children}
              <NotificationsContainer />
            </>
          </NotificationsProvider>
        </ThemeProvider>
      </ApolloProvider>
    </ApolloHooksProvider>
  )
}
