'use client'

import React from 'react'
import { createPortal } from 'react-dom'
import { useTransition, animated } from 'react-spring'
import { Box } from '@64labs/ui'
import Notification, { useNotifications } from './Notification'

export function NotificationsContainer() {
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
          <Notification>{item.content}</Notification>
        </animated.div>
      ))}
    </Box>,
    document.body
  )
}
