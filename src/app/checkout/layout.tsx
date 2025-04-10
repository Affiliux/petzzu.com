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

      <div className='container mx-auto px-4 md:px-6 py-8 mt-32'>
        <div className='grid gap-10 lg:grid-cols-2'>{childen}</div>
      </div>

      <Footer />
      <ButtonToTop />
    </div>
  )
}
