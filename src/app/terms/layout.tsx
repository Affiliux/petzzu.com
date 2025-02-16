'use client'

import React from 'react'

import { useTranslations } from 'next-intl'

import { CTA } from '@/components/cta'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const t = useTranslations()

  return (
    <div>
      <Header />

      <div className='w-full bg-transparent bg-dot-blue-300/40 relative flex items-center justify-center'>
        {children}
      </div>

      <CTA />
      <Footer />
    </div>
  )
}
