/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-children-prop */
'use client'

import React from 'react'

import { format } from 'date-fns'
import { enUS, es, ptBR } from 'date-fns/locale'
import { Dancing_Script, Lora } from 'next/font/google'
import { useTranslations } from 'next-intl'

import { ChildResponseProps, DefaultThemeProps } from '@/typings/child'
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

import PicturesGrid from './pictures-grid'
import { BabyTimeline } from '../../../components/baby-timeline'
import { ThemeSwitcher } from '../../../components/theme-switcher'

import { BackgroundAnimationEnum, DateShowTypeEnum, PhotosSliderEnum } from '@/enums'

const lora = Lora({
  weight: ['400', '700'],
  style: 'italic',
  subsets: ['latin'],
})

const dancing = Dancing_Script({
  weight: '700',
  subsets: ['latin'],
})

export const DefaultTheme = ({ child }: DefaultThemeProps) => {
  const t = useTranslations()

  const { locale } = useApplication()

  const formatFNS = locale.includes('pt') ? ptBR : locale.includes('es') ? es : enUS

  return (
    <>
      <div className='h-full min-h-screen w-full bg-transparent overflow-hidden'>
        <div className='relative flex flex-col-reverse items-center gap-8 z-50 bg-theme-100 lg:bg-theme-100 w-full rounded-lg container pb-8'>
          <div className={!!child?.media.length ? 'w-full lg:w-1/2 mt-8' : 'w-full'}>
            <div className='rounded-lg h-full flex flex-col items-center justify-center'>
              {!!child?.media.length && (
                <div className='w-full lg:w-3/4 mb-8'>
                  <div className='flex justify-end'>
                    <ThemeSwitcher />
                  </div>
                  <PicturesGrid child={child} />
                </div>
              )}

              {child?.birth_date && (
                <p className='text-sm font-semibold text-center text-theme-700'>
                  {t('themes.default.since')} {format(new Date(child?.birth_date), 'dd')} {t('themes.default.of')}{' '}
                  {format(new Date(child?.birth_date), 'MMMM', { locale: formatFNS })} {t('themes.default.of')}{' '}
                  {format(new Date(child?.birth_date), 'yyy', { locale: ptBR })}
                </p>
              )}

              {!!child?.timeLine && <BabyTimeline timeline={child.timeLine} />}

              {!!child?.birth_date && <DateCount type={DateShowTypeEnum.DEFAULT} date={child.birth_date} />}
            </div>
          </div>
        </div>
      </div>

      {child && !!child?.yt_song && (
        <div className='sticky bottom-0 left-0 z-50'>
          <Music url={child?.yt_song} />
        </div>
      )}
    </>
  )
}
