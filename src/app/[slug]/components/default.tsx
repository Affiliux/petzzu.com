/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-children-prop */
'use client'

import React from 'react'

import { format } from 'date-fns'
import { enUS, es, ptBR } from 'date-fns/locale'
import { Dancing_Script, Lora } from 'next/font/google'
import { useTranslations } from 'next-intl'

import { CoupleResponseProps, DefaultThemeProps } from '@/typings/couple'
import { useApplication } from '@/contexts/ApplicationContext'

import { CarouselPhotos } from '@/components/carousel'
import { DateCount } from '@/components/date-count'
import { EmojiRain } from '@/components/emoji-rain'
import { Music } from '@/components/music'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { Meteors } from '@/components/ui/meteors'
import { ShootingStars } from '@/components/ui/shooting-stars'
import { StarsBackground } from '@/components/ui/stars-background'
import { Vortex } from '@/components/ui/vortex'

import { BabyTimeline } from '../../../components/baby-timeline'

import { BackgroundAnimationEnum, DateShowTypeEnum } from '@/enums'

const lora = Lora({
  weight: ['400', '700'],
  style: 'italic',
  subsets: ['latin'],
})

const dancing = Dancing_Script({
  weight: '700',
  subsets: ['latin'],
})

export const DefaultTheme = ({ couple }: DefaultThemeProps) => {
  const t = useTranslations()

  const { locale } = useApplication()

  const formatFNS = locale.includes('pt') ? ptBR : locale.includes('es') ? es : enUS

  return (
    <>
      <div className='h-full min-h-screen w-full bg-transparent overflow-hidden'>
        <div className='relative flex flex-col-reverse items-center gap-8 z-50 bg-blue-300 lg:bg-blue-300 w-full rounded-lg container py-8'>
          <div className={!!couple?.media.length ? 'w-full lg:w-1/2 mt-8' : 'w-full'}>
            <div className='rounded-lg h-full flex flex-col items-center justify-center'>
              {!!couple?.media.length && (
                <div className='w-full lg:w-3/4 mb-10'>
                  <CarouselPhotos type={couple.imageShowType ?? 'coverflow'} images={couple.media} />
                </div>
              )}

              <h1 className={`${dancing.className} text-4xl md:text-5xl text-[#FF0000] font-bold text-center`}>
                {couple?.coupleName}
              </h1>
              <p
                className={`${lora.className} text-gray-300 text-md text-center mt-2 mb-16`}
                dangerouslySetInnerHTML={couple?.message ? { __html: couple.message } : undefined}
              />

              {!!couple?.startDate && <DateCount type={DateShowTypeEnum.DEFAULT} date={couple.startDate} />}
              {!!couple?.startDate && <BabyTimeline />}
            </div>
          </div>
        </div>
      </div>

      {couple && !!couple?.yt_song && (
        <div className='sticky bottom-0 left-0 z-50'>
          <Music url={couple?.yt_song} />
        </div>
      )}
    </>
  )
}
