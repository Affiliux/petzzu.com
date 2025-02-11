'use client'

import React from 'react'

import { CTA } from '@/components/cta'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <Header />

      <div className='w-full bg-transparent bg-dot-red-200/10 relative flex items-center justify-center'>
        {children}
      </div>

      <CTA />
      <Footer />
    </div>
  )
}
