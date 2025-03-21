'use client'

import React from 'react'

import { format } from 'date-fns'
import { enUS, es, ptBR } from 'date-fns/locale'
import { Dancing_Script, Lora } from 'next/font/google'
import { useTranslations } from 'next-intl'

import type { CreatePrePayloadProps, MediaPreProps } from '@/typings/create'
import { useApplication } from '@/contexts/ApplicationContext'

import { BabyTimeline } from './baby-timeline'
import { DateCount } from './date-count'
import PicturesGridPreview from './pictures-grid-preview'
import { ThemeSwitcher } from './theme-switcher'

import { formatAge } from '@/lib/helpers/formatters'

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
  medias: MediaPreProps[]
}

export const PreviewDefault = ({ child, medias }: PreviewDefaultProps) => {
  // hooks
  const t = useTranslations()

  // contexts
  const { locale } = useApplication()

  // variables
  const { value, unit } = formatAge(t, child?.birth_date)

  // variables
  const FORMAT_FNS = locale.includes('pt') ? ptBR : locale.includes('es') ? es : enUS
  const CHILD_NAME_PARTS = child?.child_name?.split(' ')
  const DISPLAY_NAME = CHILD_NAME_PARTS?.length > 2 ? `${CHILD_NAME_PARTS[0]} ${CHILD_NAME_PARTS[1]}` : child.child_name

  function removeEmojis(str: string) {
    return str
      .replace(/[\u{1F600}-\u{1F64F}]/gu, '') // Removes face emojis
      .replace(/[\u{1F300}-\u{1F5FF}]/gu, '') // Removes symbols and icon emojis
      .replace(/[\u{1F680}-\u{1F6FF}]/gu, '') // Removes transport and map emojis
      .replace(/[\u{2600}-\u{26FF}]/gu, '') // Removes miscellaneous emojis
      .replace(/[\u{2700}-\u{27BF}]/gu, '') // Removes various symbol emojis
  }

  function baseSlug() {
    return removeEmojis(child?.child_name ?? '')
      .normalize('NFD') // Normalize to separate accent from letters
      .replace(/[\u0300-\u036f]/g, '') // Remove accent marks
      .replace(/[^a-zA-Z0-9 ]/g, '') // Removes special characters
      .replace(/\s+/g, '-') // Replaces spaces with hyphens
      .replace(/^-+|-+$/g, '') // Removes extra hyphens at the start or end
      .toLowerCase()
      .replace(/&/g, 'e') // Replaces '&' with 'e'
  }

  return (
    <div className='relative no-scrollbar overflow-x-hidden w-full min-h-screen lg:min-h-[85vh] lg:h-[85vh] lg:max-h-[85vh] rounded-lg bg-theme-100 shadow-lg shadow-neutral-500'>
      <div className='bg-transparent'></div>

      <div className='absolute z-50 w-full items-center justify-center lg:text-center text-right bg-gray-300 rounded-t-lg p-3'>
        <p className='text-xs text-neutral-900 mt-[1.5px]'>https://babyzzu.com/{baseSlug()}</p>

        <div className='absolute top-4 left-4 w-3 h-3 rounded-full bg-red-500' />
        <div className='absolute top-4 left-8 w-3 h-3 rounded-full bg-yellow-500' />
        <div className='absolute top-4 left-12 w-3 h-3 rounded-full bg-green-500' />
      </div>

      <div className='relative container h-full mt-14 bg-theme-100 lg:bg-theme-100 z-40'>
        <div className='flex justify-end'>
          <ThemeSwitcher />
        </div>
        <div className='rounded-lg h-full'>
          <div className='flex justify-center items-center mb-8'>
            {child?.child_name &&
              (child?.child_name?.length > 8 ? (
                <div className='flex flex-col items-center text-center'>
                  <div className='flex flex-row items-baseline gap-2'>
                    {child?.birth_date && (
                      <>
                        <span className='text-7xl font-bold text-theme-600'>{value}</span>
                        <div className={`${dancing.className} text-3xl italic text-theme-600 leading-none`}>{unit}</div>
                      </>
                    )}
                  </div>
                  <div>
                    <div className='flex flex-col ml-3'>
                      <div className='text-4xl font-medium text-theme-600 leading-tight mt-1 font-happy-school'>
                        {DISPLAY_NAME}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='flex items-center'>
                  {child.birth_date && <span className='text-8xl font-bold text-theme-600'>{value}</span>}
                  <div className='flex flex-col ml-3 mt-3'>
                    <div className={`${dancing.className} text-3xl italic text-theme-600 leading-none`}>{unit}</div>
                    <div className='text-4xl font-medium text-theme-600 leading-tight mt-1 font-happy-school'>
                      {DISPLAY_NAME}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className='flex items-center justify-center w-full mb-8'>
            <PicturesGridPreview child={child} images={medias} />
          </div>

          {child?.birth_date && (
            <p className='text-sm font-semibold text-center text-theme-700'>
              {t('themes.default.since')} {format(new Date(child?.birth_date), 'dd')} {t('themes.default.of')}{' '}
              {format(new Date(child?.birth_date), 'MMMM', { locale: FORMAT_FNS })} {t('themes.default.of')}{' '}
              {format(new Date(child?.birth_date), 'yyy', { locale: ptBR })}
            </p>
          )}

          <p
            className={`${lora.className} text-neutral-900 text-md text-center mt-2 mb-16`}
            dangerouslySetInnerHTML={child?.message ? { __html: child.message } : undefined}
          />

          {!!child?.birth_date && !!(child?.timeLine?.length > 0) && (
            <div className='mt-16 md:mt-8 text-center p-6'>
              <h2 className='text-2xl font-bold text-black'>{t('slug.facts.title')}</h2>
            </div>
          )}

          {!!child?.timeLine && <BabyTimeline timeline={child?.timeLine} />}
          {!!child?.birth_date && !!(child?.timeLine?.length > 0) && <DateCount date={child.birth_date} />}
        </div>
      </div>

      <div className='h-72' />
    </div>
  )
}
