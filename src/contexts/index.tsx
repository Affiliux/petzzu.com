'use client'

import { ReactNode } from 'react'

import AccountProvider from './AccountContext'
import ApplicationProvider from './ApplicationContext'
import CreateProvider from './CreateContext'
import PetProvider from './PetContext'
import TimelineProvider from './TimelineContext'

export function Providers({ children }: { children: ReactNode }) {
  return typeof window !== 'undefined' ? (
    <ApplicationProvider>
      <TimelineProvider>
        <CreateProvider>
          <AccountProvider>
            <PetProvider>{children}</PetProvider>
          </AccountProvider>
        </CreateProvider>
      </TimelineProvider>
    </ApplicationProvider>
  ) : (
    <>{children}</>
  )
}
