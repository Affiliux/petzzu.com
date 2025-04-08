'use client'

import React from 'react'

import { ButtonToTop } from '@/components/button-to-top'
import { CTA } from '@/components/cta'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export default function Layout({
  childen,
}: Readonly<{
  childen: React.ReactNode
}>) {
  return (
    <div className='w-full min-h-screen'>
      <div className='relative py-2'>
        <Header />
      </div>

      <div className='w-full bg-transparent bg-dot-red-200/10 relative flex items-center justify-center mt-16'>
        {childen}
      </div>

      <CTA />
      <Footer />
      <ButtonToTop />
    </div>
  )
}
