'use client'

import React from 'react'

import { ButtonToTop } from '@/components/button-to-top'
import { Cookies } from '@/components/cookies'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='dark min-h-screen bg-background'>
      <div className='relative py-2 border-b border-neutral-800'>
        <Header />
      </div>

      <div className='container mx-auto px-4 md:px-6 py-8 mt-24'>
        <div className='grid gap-10 lg:grid-cols-2'>{children}</div>
      </div>

      <Footer />

      <Cookies />
      <ButtonToTop />
    </div>
  )
}
