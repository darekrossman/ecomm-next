'use client'

import React, { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'emotion-theming'
import { useTransition, animated } from 'react-spring'
import { Box } from '@64labs/ui'
import { NotificationsProvider, useNotifications } from './Notification'
import theme, { GlobalStyle } from '../lib/theme'

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

  if (!isBrowser) {
    return null
  }

  return createPortal(
    <Box ess={{ position: 'fixed', top: 0, width: '100%', zIndex: 99 }}>
      {transitions.map(({ item, props, key }: any) => (
        <animated.div key={key} style={props}>
          {item.content}
        </animated.div>
      ))}
    </Box>,
    document.body
  )
}

export function Providers({ children, apolloClient }: { children: ReactNode; apolloClient: any }) {
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
