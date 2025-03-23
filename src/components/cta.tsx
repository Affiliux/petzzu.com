'use client'

import React from 'react'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { FloatingBubbles } from './ui/bubbles'

export const CTA = () => {
  // hooks
  const t = useTranslations('pages.home')

  return (
    <div className='relative w-[calc(100%-4rem)] mx-auto rounded-md h-[30rem] overflow-hidden'>
      <FloatingBubbles />

      <div className='flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full'>
        <h2 className='text-neutral-900 text-3xl md:text-5xl font-bold text-center mx-auto max-w-2xl'>
          {t('cta.title')}
        </h2>
        <div className='flex flex-col sm:flex-row items-center gap-4 mt-6'>
          <Link
            href='/#start'
            className='px-5 py-3 bg-theme-600 hover:bg-theme-700 transition duration-200 rounded-lg font-medium text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]'
          >
            {t('cta.button')}
          </Link>
        </div>
      </div>
    </div>
  )
}
