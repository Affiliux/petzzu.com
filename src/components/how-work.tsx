'use client'

import React from 'react'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { IconCoin, IconHearts, IconListNumbers, IconQrcode } from '@tabler/icons-react'

import { useApplication } from '@/contexts/ApplicationContext'

import { HoverBorderGradient } from './ui/hover-border-gradient'

import { cn } from '@/lib/utils'

export function HowWork() {
  // hooks
  const t = useTranslations('pages.home')

  // contexts
  const { theme } = useApplication()

  // variables
  const features = [
    {
      title: t('how-work.steps.1.title'),
      description: t('how-work.steps.1.description'),
      icon: <IconListNumbers />,
    },
    {
      title: t('how-work.steps.2.title'),
      description: t('how-work.steps.2.description'),
      icon: <IconCoin />,
    },
    {
      title: t('how-work.steps.3.title'),
      description: t('how-work.steps.3.description'),
      icon: <IconQrcode />,
    },
    {
      title: t('how-work.steps.4.title'),
      description: t('how-work.steps.4.description'),
      icon: <IconHearts />,
    },
  ]

  return (
    <div className='pt-40 lg:pt-8 pb-12 flex container flex-col items-center justify-center'>
      <HoverBorderGradient
        containerClassName='rounded-full'
        className='bg-white text-neutral-900 text-xs flex items-center space-x-2'
      >
        <span> {t('how-work.subtitle')}</span>
      </HoverBorderGradient>

      <h2 className='bg-clip-text text-center text-transparent bg-gradient-to-b from-neutral-800 to-black text-3xl lg:text-5xl font-sans py-2 relative z-20 mt-4 font-bold tracking-tight'>
        {t('how-work.title')}
      </h2>
      <p className='max-w-xl text-center text-base md:text-lg text-neutral-500 mb-16'>{t('how-work.description')}</p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto'>
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>

      <div className='flex flex-col lg:flex-row items-center justify-center gap-16 mt-12 lg:mt-14'>
        <div>
          <p className='text-neutral-900 font-bold text-3xl lg:text-4xl lg:max-w-md'>
            {t('how-work.example.title.1')} <span className='text-theme-600'>{t('how-work.example.title.2')}</span>{' '}
            {t('how-work.example.title.3')}
          </p>
        </div>

        {theme && <Image src={`/images/examples/${theme}.webp`} alt={'example image'} width={450} height={450} />}
      </div>
    </div>
  )
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string
  description: string
  icon: React.ReactNode
  index: number
}) => {
  return (
    <div
      className={cn(
        'flex flex-col border-b border-l lg:border-l-0 lg:border-b-0 lg:border-r py-10 relative group/feature border-neutral-200/600',
        (index === 0 || index === 4) && 'lg:border-l border-neutral-200/600',
        index < 4 && 'lg:border-b border-neutral-200/600',
      )}
    >
      {index < 4 && (
        <div className='opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 to-transparent pointer-events-none' />
      )}
      {index >= 4 && (
        <div className='opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 to-transparent pointer-events-none' />
      )}
      <div className='mb-4 relative z-10 px-10 text-theme-500'>{icon}</div>
      <div className='text-lg font-bold mb-2 relative z-10 px-10'>
        <div className='absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full border-neutral-200/600 group-hover/feature:bg-theme-500 transition-all duration-200 origin-center' />
        <span className='group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-900'>
          {title}
        </span>
      </div>
      <p className='text-sm text-neutral-500 max-w-xs relative z-10 px-10'>{description}</p>
    </div>
  )
}
