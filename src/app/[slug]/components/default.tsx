'use client'

import { format } from 'date-fns'
import { enUS, es, ptBR } from 'date-fns/locale'
import { useTranslations } from 'next-intl'

import type { DefaultThemeProps } from '@/typings/child'
import { useApplication } from '@/contexts/ApplicationContext'

import { BabyTimeline } from '@/components/baby-timeline'
import { CloudsBackground } from '@/components/clouds-background'
import { DateCount } from '@/components/date-count'
import { ThemeSwitcher } from '@/components/theme-switcher'

import PicturesGrid from './pictures-grid'

export const DefaultTheme = ({ child }: DefaultThemeProps) => {
  // hooks
  const t = useTranslations()

  // contexts
  const { locale } = useApplication()

  // variables
  const FORMAT_FNS = locale.includes('pt') ? ptBR : locale.includes('es') ? es : enUS

  return (
    <>
      <CloudsBackground />

      <div className='h-full min-h-screen w-full bg-transparent overflow-hidden'>
        <div className='relative flex flex-col-reverse items-center gap-8 z-50 bg-theme-100/40 lg:bg-theme-100/40 w-full rounded-lg container pb-8'>
          <div className={!!child?.media?.length ? 'w-full lg:w-1/2 mt-4' : 'w-full'}>
            <div className='rounded-lg h-full flex flex-col items-center justify-center'>
              {!!child?.media?.length && (
                <div className='w-full lg:w-3/4 mb-8'>
                  <div className='flex justify-end'>
                    <ThemeSwitcher />
                  </div>
                  <PicturesGrid child={child} />
                </div>
              )}
              <div className='text-center p-6'>
                <h2 className='text-2xl font-bold text-neutral-900'>{t('slug.facts.title')}</h2>
              </div>

              {child?.birth_date && (
                <p className='text-sm font-semibold text-center text-theme-700'>
                  {t('themes.default.since')} {format(new Date(child?.birth_date), 'dd')} {t('themes.default.of')}{' '}
                  {format(new Date(child?.birth_date), 'MMMM', { locale: FORMAT_FNS })} {t('themes.default.of')}{' '}
                  {format(new Date(child?.birth_date), 'yyy', { locale: ptBR })}
                </p>
              )}

              <div className='mt-16 md:mt-8 text-center p-6'>
                <h2 className='text-2xl font-bold text-black'>{t('slug.facts.title')}</h2>
              </div>

              <div className=''>{!!child?.timeLine && <BabyTimeline timeline={child.timeLine} />}</div>

              {!!child?.birth_date && <DateCount date={child.birth_date} />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
