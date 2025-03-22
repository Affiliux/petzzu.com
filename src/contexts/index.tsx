'use client'

import { ReactNode } from 'react'

import AccountProvider from './AccountContext'
import ApplicationProvider from './ApplicationContext'
import ChildProvider from './ChildContext'
import CreateProvider from './CreateContext'
import TimelineProvider from './TimelineContext'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ApplicationProvider>
      <TimelineProvider>
        <CreateProvider>
          <AccountProvider>
            <ChildProvider>{children}</ChildProvider>
          </AccountProvider>
        </CreateProvider>
      </TimelineProvider>
    </ApplicationProvider>
  )
}
