'use client'

import { ReactNode } from 'react'

import ApplicationProvider from './ApplicationContext'
import ChildProvider from './CoupleContext'
import CreateProvider from './CreateContext'
import TimelineProvider from './TimelineContext'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ApplicationProvider>
      <TimelineProvider>
        <CreateProvider>
          <ChildProvider>{children}</ChildProvider>
        </CreateProvider>
      </TimelineProvider>
    </ApplicationProvider>
  )
}
