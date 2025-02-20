'use client'

import { ReactNode } from 'react'

import ApplicationProvider from './ApplicationContext'
import CoupleProvider from './CoupleContext'
import CreateProvider from './CreateContext'
import TimelineProvider from './TimelineContext'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ApplicationProvider>
      <CreateProvider>
        <TimelineProvider>
          <CoupleProvider>{children}</CoupleProvider>
        </TimelineProvider>
      </CreateProvider>
    </ApplicationProvider>
  )
}
