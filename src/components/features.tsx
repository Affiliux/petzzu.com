'use client'

import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import { Lora } from 'next/font/google'
import { useTranslations } from 'next-intl'

import { Globe } from './ui/globe'
import { LazyLoadVideo } from './lazy-video'

import { cn } from '@/lib/utils'

const lora = Lora({
  weight: ['400', '700'],
  style: 'italic',
  subsets: ['latin'],
})

export function Features() {
  // hooks
  const t = useTranslations()

  // variables
  const features = [
    {
      title: t('pages.home.features.1.title'),
      description: t('pages.home.features.1.description'),
      skeleton: <SkeletonOne />,
      className: 'col-span-1 lg:col-span-4 border-b lg:border-r border-t-neutral-200/60',
    },
    {
      title: t('pages.home.features.3.title'),
      description: t('pages.home.features.3.description'),
      skeleton: <SkeletonThree />,
      className: 'col-span-1 lg:col-span-2 border-b border-t-neutral-200/60',
    },
    {
      title: t('pages.home.features.2.title'),
      description: t('pages.home.features.2.description'),
      skeleton: <SkeletonTwo />,
      className: 'col-span-1 lg:col-span-3 lg:border-r border-t-neutral-200/60 hidden lg:block',
    },
    {
      title: t('pages.home.features.4.title'),
      description: t('pages.home.features.4.description'),
      skeleton: <SkeletonFour />,
      className: 'col-span-1 lg:col-span-3 border-b border-b-neutral-200/60 lg:border-none',
    },
  ]

  return (
    <div className='relative z-20 py-32 max-w-7xl mx-auto'>
      <div className='px-8'>
        <h2 className='mx-auto text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-black text-3xl lg:text-5xl font-sans py-2 relative z-20 font-bold tracking-tight'>
          {t('pages.home.features.title')}
        </h2>
        <p className='max-w-xl mx-auto text-center text-base md:text-lg text-muted-foreground'>
          {t('pages.home.features.description')}
        </p>
      </div>

      <div className='relative mt-4'>
        <div className='grid grid-cols-1 lg:grid-cols-6 mt-14 xl:border rounded-md border-t-neutral-200/60'>
          {features.map(feature => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className='h-full w-full'>{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  )
}

const FeatureCard = ({ children, className }: { children?: React.ReactNode; className?: string }) => {
  return <div className={cn(`px-4 py-4 sm:py-8 sm:px-8 relative overflow-hidden`, className)}>{children}</div>
}

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className='max-w-5xl mx-auto text-left tracking-tight text-neutral-900 text-xl md:text-2xl md:leading-snug'>
      {children}
    </p>
  )
}

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        'text-sm md:text-base  max-w-4xl text-left mx-auto',
        'text-center font-normal text-muted-foreground',
        'text-left max-w-sm mx-0 md:text-sm my-2',
      )}
    >
      {children}
    </p>
  )
}

export const SkeletonOne = () => {
  const t = useTranslations()

  const [years, setYears] = useState<number>(0)
  const [months, setMonths] = useState<number>(0)
  const [days, setDays] = useState<number>(0)
  const [hours, setHours] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(0)
  const [seconds, setSeconds] = useState<number>(0)

  function countUpFromTime() {
    const inputDate = new Date('2025-03-24')
    const now = new Date()

    const diffInSeconds = Math.floor((now.getTime() - inputDate.getTime()) / 1000)

    const years = Math.floor(diffInSeconds / (365 * 24 * 60 * 60))
    const months = Math.floor((diffInSeconds % (365 * 24 * 60 * 60)) / (30 * 24 * 60 * 60)) % 12
    const days = Math.floor((diffInSeconds % (30 * 24 * 60 * 60)) / (24 * 60 * 60)) % 31
    const hours = Math.floor((diffInSeconds % (24 * 60 * 60)) / 3600)
    const minutes = Math.floor((diffInSeconds % 3600) / 60)
    const seconds = diffInSeconds % 60

    setYears(years)
    setMonths(months)
    setDays(days)
    setHours(hours)
    setMinutes(minutes)
    setSeconds(seconds)
  }

  useEffect(() => {
    setTimeout(function () {
      countUpFromTime()
    }, 1000)
  }, [seconds])

  return (
    <div className='relative flex p-4 px-2 gap-10 h-full bg-transparent'>
      <div className='mx-auto shadow-2xl group h-full bg-transparent'>
        <div className='flex h-full flex-col space-y-2 bg-transparent'>
          {/* TODO */}
          <div className='grid grid-cols-2 lg:grid-cols-3 gap-2 mt-8 bg-transparent'>
            <div className='group/card w-full lg:min-w-[8rem] h-[8rem] hover:shadow-2xl hover:shadow--neutral-500/[0.1] flex flex-col bg-theme-200 backdrop-blur-xl items-center justify-center rounded-xl p-4'>
              <h1 className={`${lora.className} text-2xl text-center font-bold text-white`}>
                {years < 10 ? 0 : ''}
                {years}
              </h1>
              <p className={`${lora.className} text-lg text-center text-theme-500`}>{t('themes.default.years')}</p>
            </div>
            <div className='group/card w-full lg:min-w-[8rem] h-[8rem] hover:shadow-2xl hover:shadow--neutral-500/[0.1] flex flex-col bg-theme-200 backdrop-blur-xl items-center justify-center rounded-xl p-4'>
              <h1 className={`${lora.className} text-2xl text-center font-bold text-white`}>
                {months < 10 ? 0 : ''}
                {months}
              </h1>
              <p className={`${lora.className} text-lg text-center text-theme-500`}>{t('themes.default.months')}</p>
            </div>
            <div className='group/card w-full lg:min-w-[8rem] h-[8rem] hover:shadow-2xl hover:shadow--neutral-500/[0.1] flex flex-col bg-theme-200 backdrop-blur-xl items-center justify-center rounded-xl p-4'>
              <h1 className={`${lora.className} text-2xl text-center font-bold text-white`}>
                {days < 10 ? 0 : ''}
                {days}
              </h1>
              <p className={`${lora.className} text-lg text-center text-theme-500`}>{t('themes.default.days')}</p>
            </div>
            <div className='group/card w-full lg:min-w-[8rem] h-[8rem] hover:shadow-2xl hover:shadow--neutral-500/[0.1] flex flex-col bg-theme-200 backdrop-blur-xl items-center justify-center rounded-xl p-4'>
              <h1 className={`${lora.className} text-2xl text-center font-bold text-white`}>
                {hours < 10 ? 0 : ''}
                {hours}
              </h1>
              <p className={`${lora.className} text-lg text-center text-theme-500`}>{t('themes.default.hours')}</p>
            </div>
            <div className='group/card w-full lg:min-w-[8rem] h-[8rem] hover:shadow-2xl hover:shadow--neutral-500/[0.1] flex flex-col bg-theme-200 backdrop-blur-xl items-center justify-center rounded-xl p-4'>
              <h1 className={`${lora.className} text-2xl text-center font-bold text-white`}>
                {minutes < 10 ? 0 : ''}
                {minutes}
              </h1>
              <p className={`${lora.className} text-lg text-center text-theme-500`}>{t('themes.default.minutes')}</p>
            </div>
            <div className='group/card w-full lg:min-w-[8rem] h-[8rem] hover:shadow-2xl hover:shadow--neutral-500/[0.1] flex flex-col bg-theme-200 backdrop-blur-xl items-center justify-center rounded-xl p-4'>
              <h1 className={`${lora.className} text-2xl text-center font-bold text-white`}>
                {seconds < 10 ? 0 : ''}
                {seconds}
              </h1>
              <p className={`${lora.className} text-lg text-center text-theme-500`}>{t('themes.default.seconds')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className='absolute bottom-0 z-40 inset-x-0 h-40 bg-gradient-to-t from-white via-white to-transparent w-full pointer-events-none' />
      <div className='absolute top-0 z-40 inset-x-0 h-52 bg-gradient-to-b from-white via-transparent to-transparent w-full pointer-events-none' />
    </div>
  )
}

export const SkeletonThree = () => {
  return (
    <div className='relative w-full mx-auto bg-transparent group h-full'>
      <div className='flex flex-1 w-full h-full flex-col space-y-2 -mt-2 relative'>
        <LazyLoadVideo src='/videos/features/music.webm' type='video/webm' classNames='w-full h-full' />
      </div>

      <div className='absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-white via-white to-transparent w-full pointer-events-none' />
      <div className='absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-white via-transparent to-transparent w-full pointer-events-none' />
    </div>
  )
}

export const SkeletonTwo = () => {
  const animations1 = [
    '/videos/features/emojis-animation.webm',
    '/videos/features/meteors-animation.webm',
    '/videos/features/aurora-animation.webm',
  ]

  const animationVariants = {
    whileHover: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
    whileTap: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
  }

  return (
    <div className='relative flex flex-col items-start p-8 gap-10 h-full overflow-hidden'>
      {/* TODO */}
      <div className='flex flex-row -ml-4'>
        {animations1.map((animation, idx) => (
          <motion.div
            variants={animationVariants}
            key={'animations-first' + idx}
            style={{
              rotate: Math.random() * 10 - 10,
            }}
            whileHover='whileHover'
            whileTap='whileTap'
            className='rounded-xl h-40 w-48 md:h-52 md:w-48 -mr-4 mt-4 p-1 border-t-neutral-200/60 border flex-shrink-0 overflow-hidden'
          >
            <LazyLoadVideo
              src={animation}
              type='video/webm'
              classNames='absolute inset-0 rounded-lg flex-shrink-0 h-full w-full brightness-125 object-cover'
            />
          </motion.div>
        ))}
      </div>

      <div className='absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-white to-transparent  h-full pointer-events-none' />
      <div className='absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-white to-transparent h-full pointer-events-none' />
    </div>
  )
}

export const SkeletonFour = () => {
  return (
    <div className='flex flex-col w-full h-80 mt-6 lg:h-full items-center relative bg-transparent'>
      <Globe className='absolute -right-10 md:-right-48 -bottom-64 md:-bottom-40' />
    </div>
  )
}
