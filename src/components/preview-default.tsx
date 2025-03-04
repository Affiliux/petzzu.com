/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-children-prop */
'use client'

import { useEffect, useState } from 'react'

import { format } from 'date-fns'
import { enUS, es, ptBR } from 'date-fns/locale'
import { Dancing_Script, Lora } from 'next/font/google'
import { useTranslations } from 'next-intl'

import { BackgroundAnimationProps, PlanProps, YouTubeVideoProps } from '@/typings/application'
import { CreatePrePayloadProps, MediaPreProps } from '@/typings/create'
import { useApplication } from '@/contexts/ApplicationContext'

import { AuroraBackground } from './ui/aurora-background'
import { Meteors } from './ui/meteors'
import { ShootingStars } from './ui/shooting-stars'
import { StarsBackground } from './ui/stars-background'
import { Timeline } from './ui/timeline'
import { Vortex } from './ui/vortex'
import { BabyTimeline } from './baby-timeline'
import { CarouselPhotos } from './carousel'
import { DateCount } from './date-count'
import { EmojiRain } from './emoji-rain'
import { Music } from './music'

import { BackgroundAnimationEnum, DateShowTypeEnum, PhotosSliderEnum } from '@/enums'

const dancing = Dancing_Script({
  weight: '700',
  subsets: ['latin'],
})

const lora = Lora({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

interface PreviewDefaultProps {
  child: CreatePrePayloadProps
  mediaShowType: PhotosSliderEnum
  dateShowType: DateShowTypeEnum
  medias: MediaPreProps[]
  song: YouTubeVideoProps | undefined
  plan: PlanProps | undefined
}

export const PreviewDefault = ({ child, song, medias, mediaShowType, dateShowType, plan }: PreviewDefaultProps) => {
  const t = useTranslations()

  const { locale } = useApplication()

  const [showPro, setShowPro] = useState<boolean>(true)

  const removeEmojis = (str: string) => {
    return str
      .replace(/[\u{1F600}-\u{1F64F}]/gu, '') // Removes face emojis
      .replace(/[\u{1F300}-\u{1F5FF}]/gu, '') // Removes symbols and icon emojis
      .replace(/[\u{1F680}-\u{1F6FF}]/gu, '') // Removes transport and map emojis
      .replace(/[\u{2600}-\u{26FF}]/gu, '') // Removes miscellaneous emojis
      .replace(/[\u{2700}-\u{27BF}]/gu, '') // Removes various symbol emojis
  }

  const baseSlug = removeEmojis(child?.child_name ?? '')
    .normalize('NFD') // Normalize to separate accent from letters
    .replace(/[\u0300-\u036f]/g, '') // Remove accent marks
    .replace(/[^a-zA-Z0-9 ]/g, '') // Removes special characters
    .replace(/\s+/g, '-') // Replaces spaces with hyphens
    .replace(/^-+|-+$/g, '') // Removes extra hyphens at the start or end
    .toLowerCase()
    .replace(/&/g, 'e') // Replaces '&' with 'e'

  const formatFNS = locale.includes('pt') ? ptBR : locale.includes('es') ? es : enUS

  useEffect(() => {
    if (plan?.sku.includes('pro')) setShowPro(true)
    else setShowPro(false)
  }, [plan, song])

  return (
    <div className='relative no-scrollbar overflow-x-hidden w-full min-h-screen lg:min-h-[85vh] lg:h-[85vh] lg:max-h-[85vh] rounded-lg bg-white shadow-lg shadow-neutral-500'>
      <div className='bg-transparent'></div>

      <div className='absolute z-50 w-full items-center justify-center lg:text-center text-right bg-gray-300 rounded-t-lg p-3'>
        <p className='text-xs text-neutral-900 mt-[1.5px]'>https://babyzzu.com/{baseSlug}</p>

        <div className='absolute top-4 left-4 w-3 h-3 rounded-full bg-red-500' />
        <div className='absolute top-4 left-8 w-3 h-3 rounded-full bg-yellow-500' />
        <div className='absolute top-4 left-12 w-3 h-3 rounded-full bg-green-500' />
      </div>

      <div className='relative container h-full mt-14 bg-white lg:bg-white z-40'>
          <div className='rounded-lg h-full'>
            {!!medias.length && (
              <div className='flex items-center justify-center w-full'>
                <CarouselPhotos type={mediaShowType} images={medias} />
              </div>
            )}

            <h1
              className={`${lora.className} text-3xl text-[#FF0000] font-bold text-center ${
                !!medias.length && 'mt-12'
              }`}
            >
              {child?.child_name}
            </h1>
            <p
              className={`${lora.className} text-neutral-900 text-md text-center mt-2 mb-16`}
              dangerouslySetInnerHTML={child?.message ? { __html: child.message } : undefined}
            />

            {!!child?.birth_date && <DateCount type={dateShowType} date={child.birth_date} />}

            {!!child?.timeLine && <BabyTimeline timeline={child.timeLine} />}
          </div>
      </div>

      <div className='h-72' />

      {!!song && song.url && showPro && (
        <div className='sticky bottom-0 left-0 z-50'>
          <Music url={song.url} />
        </div>
      )}
    </div>
  )
}
