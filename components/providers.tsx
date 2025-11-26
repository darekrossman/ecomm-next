'use client'

import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import theme, { GlobalStyle } from '../lib/theme'
import { NotificationsProvider } from '../components/Notification'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider theme={theme}>
      <NotificationsProvider>
        <GlobalStyle />
        {children}
      </NotificationsProvider>
    </ThemeProvider>
  )
}
