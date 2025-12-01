'use client'

import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from '@emotion/react'
import { getApolloClient } from '@/lib/apollo-client'
import theme from '@/lib/theme'
import { NotificationsProvider, useNotifications } from '@/components/Notification'
import { useTransition, animated } from 'react-spring'
import { createPortal } from 'react-dom'
import { Box } from '@64labs/ui'
import Notification from '@/components/Notification'

// Notifications container component - renders notifications in a portal
function NotificationsContainer() {
  const [isBrowser, setIsBrowser] = React.useState(false)
  const [notifications] = useNotifications()

  const transitions = useTransition(notifications || [], {
    keys: (item: any) => item.id,
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
      {transitions((props, item) => (
        <animated.div key={item.id} style={props}>
          <Notification>{item.content}</Notification>
        </animated.div>
      ))}
    </Box>,
    document.body
  )
}

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const apolloClient = getApolloClient()

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <NotificationsProvider>
          {children}
          <NotificationsContainer />
        </NotificationsProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}
