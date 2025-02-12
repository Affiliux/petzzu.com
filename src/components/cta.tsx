'use client'

import React from 'react'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Vortex } from './ui/vortex'

export const CTA = () => {
  const t = useTranslations('pages.home')

  return (
    <div className='w-[calc(100%-4rem)] mx-auto rounded-md  h-[30rem] overflow-hidden'>
      <Vortex
        backgroundColor='white'
        particleCount={200}
        baseHue={300}
        baseSpeed={0.01}
        rangeSpeed={0.2}
        rangeY={450}
        className='flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full'
      >
        <h2 className='text-black text-3xl md:text-5xl font-bold text-center mx-auto max-w-2xl'>{t('cta.title')}</h2>
        <div className='flex flex-col sm:flex-row items-center gap-4 mt-6'>
          <Link
            href='/#start'
            className='px-5 py-3 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-black shadow-[0px_2px_0px_0px_#FFFFFF40_inset]'
          >
            {t('cta.button')}
          </Link>
        </div>
      </Vortex>
    </div>
  )
}
