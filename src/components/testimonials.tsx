'use client'

import React from 'react'

import { useTranslations } from 'next-intl'

import { InfiniteMovingCards } from './ui/infinite-moving-cards'

export function Testimonials() {
  const t = useTranslations('pages.home')

  const testimonials1 = [
    {
      quote: t('testimonials.1.message'),
      name: t('testimonials.1.name'),
      title: t('testimonials.1.time'),
    },
    {
      quote: t('testimonials.2.message'),
      name: t('testimonials.2.name'),
      title: t('testimonials.2.time'),
    },
    {
      quote: t('testimonials.3.message'),
      name: t('testimonials.3.name'),
      title: t('testimonials.3.time'),
    },
    {
      quote: t('testimonials.4.message'),
      name: t('testimonials.4.name'),
      title: t('testimonials.4.time'),
    },
    {
      quote: t('testimonials.5.message'),
      name: t('testimonials.5.name'),
      title: t('testimonials.5.time'),
    },
  ]

  const testimonials2 = [
    {
      quote: t('testimonials.6.message'),
      name: t('testimonials.6.name'),
      title: t('testimonials.6.time'),
    },
    {
      quote: t('testimonials.7.message'),
      name: t('testimonials.7.name'),
      title: t('testimonials.7.time'),
    },
    {
      quote: t('testimonials.8.message'),
      name: t('testimonials.8.name'),
      title: t('testimonials.8.time'),
    },
    {
      quote: t('testimonials.9.message'),
      name: t('testimonials.9.name'),
      title: t('testimonials.9.time'),
    },
  ]

  return (
    <div className='py-12 bg-white bg-dot-red-200/[0.05]'>
      <div className='container flex flex-col items-center justify-center'>
        <h2 className='bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-800 to-black text-3xl lg:text-5xl font-sans py-2 relative z-20 font-bold tracking-tight'>
          {t('testimonials.title')}
        </h2>
        <p className='max-w-xl text-center text-base md:text-lg text-neutral-700 mb-4x'>
          {t('testimonials.description')}
        </p>

        <div className='h-[40rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden'>
          <InfiniteMovingCards items={testimonials1} direction='right' speed='slow' />
          <InfiniteMovingCards items={testimonials2} direction='left' speed='normal' />
        </div>
      </div>
    </div>
  )
}
