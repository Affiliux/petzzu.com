'use client'

import React from 'react'

import { ButtonToTop } from '@/components/button-to-top'
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

      <div className='container mx-auto py-8 mt-32'>{childen}</div>

      <Footer />
      <ButtonToTop />
    </div>
  )
}
