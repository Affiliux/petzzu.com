/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-children-prop */
'use client'

import { format } from 'date-fns'
import { enUS, es, ptBR } from 'date-fns/locale'
import { Dancing_Script, Lora } from 'next/font/google'
import { useTranslations } from 'next-intl'

import type { DefaultThemeProps } from '@/typings/child'
import { useApplication } from '@/contexts/ApplicationContext'

import { DateCount } from '@/components/date-count'
import { Music } from '@/components/music'

import PicturesGrid from './pictures-grid'
import { BabyTimeline } from '../../../components/baby-timeline'
import { CloudsBackground } from '../../../components/clouds-background'
import { ThemeSwitcher } from '../../../components/theme-switcher'

import { DateShowTypeEnum } from '@/enums'

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
      <CloudsBackground />

      <div className='h-full min-h-screen w-full bg-transparent overflow-hidden'>
        <div className='relative flex flex-col-reverse items-center gap-8 z-50 bg-theme-100/40 lg:bg-theme-100/40 w-full rounded-lg container pb-8'>
          <div className={!!child?.media.length ? 'w-full lg:w-1/2 mt-4' : 'w-full'}>
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

              <div className='mt-16 md:mt-8'>{!!child?.timeLine && <BabyTimeline timeline={child.timeLine} />}</div>

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
