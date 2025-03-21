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
    <div className='w-full dark min-h-screen bg-background'>
      <div className='relative py-2'>
        <Header />
      </div>

      <div className='container mx-auto py-8 mt-24'>{children}</div>

      <Footer />
      <ButtonToTop />
    </div>
  )
}
