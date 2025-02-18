'use client'

import React from 'react'

import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

export function Features() {
  const t = useTranslations()

  const features = [
    {
      title: t('pages.home.features.1.title'),
      description: t('pages.home.features.1.description'),
      skeleton: <SkeletonOne />,
      className: 'col-span-1 lg:col-span-4 border-b lg:border-r border-neutral-300',
    },
    {
      title: t('pages.home.features.3.title'),
      description: t('pages.home.features.3.description'),
      skeleton: <SkeletonThree />,
      className: 'col-span-1 lg:col-span-2 border-b border-neutral-300',
    },
  ]

  return (
    <div className='relative z-20 py-32 max-w-7xl mx-auto'>
      <div className='px-8'>
        <h2 className='mx-auto text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-black text-3xl lg:text-5xl font-sans py-2 relative z-20 font-bold tracking-tight'>
          {t('pages.home.features.title')}
        </h2>
        <p className='max-w-xl mx-auto text-center text-base md:text-lg text-neutral-500'>
          {t('pages.home.features.description')}
        </p>
      </div>

      <div className='relative mt-4'>
        <div className='grid grid-cols-1 lg:grid-cols-6 mt-14 xl:border rounded-md border-neutral-300'>
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
    <p className='max-w-5xl mx-auto text-left tracking-tight text-black text-xl md:text-2xl md:leading-snug'>
      {children}
    </p>
  )
}

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        'text-sm md:text-base  max-w-4xl text-left mx-auto',
        'text-center font-normal text-neutral-400',
        'text-left max-w-sm mx-0 md:text-sm my-2',
      )}
    >
      {children}
    </p>
  )
}

export const SkeletonOne = () => {
  const t = useTranslations()

  return (
    <div className='relative w-full mx-auto bg-transparent p-8 group h-full'>
      <div className='mx-auto shadow-2xl group h-full'></div>

      <div className='absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-white via-white to-transparent w-full pointer-events-none' />
      <div className='absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-white via-transparent to-transparent w-full pointer-events-none' />
    </div>
  )
}

export const SkeletonTwo = () => {
  return (
    <div className='relative w-full mx-auto bg-transparent p-8 group h-full'>
      <div className='flex flex-1 w-full h-full flex-col space-y-2 -mt-2 relative'></div>

      <div className='absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-white via-white to-transparent w-full pointer-events-none' />
      <div className='absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-white via-transparent to-transparent w-full pointer-events-none' />
    </div>
  )
}

export const SkeletonThree = () => {
  return (
    <div className='relative w-full mx-auto bg-transparent p-8 group h-full'>
      <div className='flex flex-1 w-full h-full flex-col space-y-2 -mt-2 relative'></div>

      <div className='absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-white via-white to-transparent w-full pointer-events-none' />
      <div className='absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-white via-transparent to-transparent w-full pointer-events-none' />
    </div>
  )
}

export const SkeletonFour = () => {
  return (
    <div className='relative w-full mx-auto bg-transparent p-8 group h-full'>
      <div className='flex flex-1 w-full h-full flex-col space-y-2 -mt-2 relative'></div>

      <div className='absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-white via-white to-transparent w-full pointer-events-none' />
      <div className='absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-white via-transparent to-transparent w-full pointer-events-none' />
    </div>
  )
}
