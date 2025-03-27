'use client'

import React from 'react'

import { useTranslations } from 'next-intl'

import { ButtonToTop } from '@/components/button-to-top'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // hooks
  const t = useTranslations()

  return (
    <div className='w-full min-h-screen'>
      <div className='relative py-2'>
        <Header />
      </div>

      <div className='container py-8 mt-32'>{children}</div>

      <Footer />
      <ButtonToTop />
    </div>
  )
}
