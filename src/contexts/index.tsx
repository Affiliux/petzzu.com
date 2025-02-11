'use client'

import { ReactNode } from 'react'

import ApplicationProvider from './ApplicationContext'
import CoupleProvider from './CoupleContext'
import CreateProvider from './CreateContext'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ApplicationProvider>
      <CreateProvider>
        <CoupleProvider>{children}</CoupleProvider>
      </CreateProvider>
    </ApplicationProvider>
  )
}
