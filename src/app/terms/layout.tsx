'use client'

import React from 'react'

import { ButtonToTop } from '@/components/button-to-top'
import { Cookies } from '@/components/cookies'
import { CTA } from '@/components/cta'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='w-full min-h-screen'>
      <div className='relative py-2'>
        <Header />
      </div>

      <div className='w-full bg-transparent bg-dot-neutral-700/10 relative flex items-center justify-center'>
        {children}
      </div>

      <CTA />
      <Footer />

      <Cookies />
      <ButtonToTop />
    </div>
  )
}
