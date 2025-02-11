'use client'

import React from 'react'

import { format } from 'date-fns'
import { enUS, es, ptBR } from 'date-fns/locale'
import { Dancing_Script, Lora } from 'next/font/google'
import { useTranslations } from 'next-intl'

import { CoupleResponseProps } from '@/typings/couple'
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

interface DefaultThemeProps {
  couple: CoupleResponseProps
}

export const DefaultTheme = ({ couple }: DefaultThemeProps) => {
  const t = useTranslations()

  const { locale } = useApplication()

  const formatFNS = locale.includes('pt') ? ptBR : locale.includes('es') ? es : enUS

  return (
    <>
      <div className='absolute top-0 left-0 w-full h-full brightness-125 overflow-hidden z-30'>
        {couple.backgroundAnimation === BackgroundAnimationEnum.STARS && (
          <>
            <ShootingStars starHeight={3} starWidth={16} maxDelay={200} />
            <StarsBackground starDensity={0.001} twinkleProbability={10} minTwinkleSpeed={0.5} maxTwinkleSpeed={1} />
          </>
        )}

        {couple.backgroundAnimation === BackgroundAnimationEnum.METEORS && (
          <>
            <Meteors number={20} />
            <StarsBackground starDensity={0.001} twinkleProbability={10} minTwinkleSpeed={0.5} maxTwinkleSpeed={1} />
          </>
        )}

        {couple.backgroundAnimation === BackgroundAnimationEnum.HEARTS && <EmojiRain emojis={['❤️']} quantity={35} />}

        {couple.backgroundAnimation === BackgroundAnimationEnum.AURORA && <AuroraBackground children={null} />}

        {couple.backgroundAnimation === BackgroundAnimationEnum.VORTEX && (
          <Vortex
            backgroundColor='transparent'
            particleCount={400}
            baseHue={300}
            baseSpeed={0.01}
            rangeSpeed={0.2}
            rangeY={typeof window !== 'undefined' ? window?.outerHeight : 0}
          />
        )}

        {couple.backgroundAnimation === BackgroundAnimationEnum.EMOJIS && couple.backgroundEmojis && (
          <EmojiRain
            emojis={[
              couple.backgroundEmojis.split('|')[0],
              couple.backgroundEmojis.split('|')[1],
              couple.backgroundEmojis.split('|')[2],
            ]}
            quantity={30}
          />
        )}
      </div>

      <div className='h-full min-h-screen w-full bg-transparent overflow-hidden'>
        <div className='relative flex flex-col-reverse items-center gap-8 z-50 w-full rounded-lg container py-8'>
          <div className={!!couple?.media.length ? 'w-full lg:w-1/2 mt-8' : 'w-full'}>
            {(!couple.dateShowType || couple.dateShowType === DateShowTypeEnum.DEFAULT) && (
              <div className='rounded-lg h-full flex flex-col items-center justify-center bg-[#141414]/50 backdrop-blur-sm'>
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
              </div>
            )}

            {couple.dateShowType === DateShowTypeEnum.CLASSIC && (
              <div className='rounded-lg h-full flex flex-col items-center justify-center bg-[#141414]/50 backdrop-blur-sm'>
                <h1 className={`${dancing.className} text-4xl md:text-5xl text-[#FF0000] font-bold text-center`}>
                  {couple?.coupleName}
                </h1>

                {!!couple?.media.length && (
                  <div className='w-full lg:w-3/4 my-10'>
                    <CarouselPhotos type={couple.imageShowType ?? 'coverflow'} images={couple.media} />
                  </div>
                )}

                {!!couple?.startDate && <DateCount type={DateShowTypeEnum.CLASSIC} date={couple.startDate} />}

                <p
                  className={`${lora.className} text-gray-300 text-md text-center mt-2`}
                  dangerouslySetInnerHTML={couple?.message ? { __html: couple.message } : undefined}
                />
              </div>
            )}

            {couple.dateShowType === DateShowTypeEnum.SIMPLE && (
              <div className='rounded-lg h-full flex flex-col items-center justify-center bg-[#141414]/50 backdrop-blur-sm'>
                {!!couple?.startDate && (
                  <div className='mb-10'>
                    <DateCount type={DateShowTypeEnum.SIMPLE} date={couple.startDate} />
                  </div>
                )}

                {!!couple?.media.length && (
                  <div className='w-full lg:w-3/4'>
                    <CarouselPhotos type={couple.imageShowType ?? 'coverflow'} images={couple.media} />
                  </div>
                )}

                {couple.startDate && (
                  <p className='text-sm font-semibold text-center text-white mt-8 mb-14 opacity-60'>
                    {t('themes.default.since')} {format(new Date(couple.startDate), 'dd')} {t('themes.default.of')}{' '}
                    {format(new Date(couple.startDate), 'MMMM', { locale: formatFNS })} {t('themes.default.of')}{' '}
                    {format(new Date(couple.startDate), 'yyy', { locale: ptBR })}
                  </p>
                )}

                <h1 className={`${dancing.className} text-4xl md:text-5xl text-[#FF0000] font-bold text-center`}>
                  {couple?.coupleName}
                </h1>
                <p
                  className={`${lora.className} text-gray-300 text-md text-center mt-3`}
                  dangerouslySetInnerHTML={couple?.message ? { __html: couple.message } : undefined}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {couple?.yt_song && couple.yt_song.includes('https') && (
        <div className='sticky bottom-0 left-0 z-50'>
          <Music url={couple.yt_song} />
        </div>
      )}
    </>
  )
}
