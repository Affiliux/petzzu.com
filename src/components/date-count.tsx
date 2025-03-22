'use client'

import React, { useEffect, useState } from 'react'

import {
  addMonths,
  differenceInDays,
  differenceInHours,
  differenceInMilliseconds,
  differenceInMinutes,
  differenceInMonths,
  differenceInSeconds,
  format,
} from 'date-fns'
import { enUS, es, ptBR } from 'date-fns/locale'
import { toZonedTime } from 'date-fns-tz'
import { Lora } from 'next/font/google'
import { useTimeZone, useTranslations } from 'next-intl'

import { useApplication } from '@/contexts/ApplicationContext'

import { DateShowTypeEnum } from '@/enums'

const lora = Lora({
  weight: ['400', '700'],
  style: 'italic',
  subsets: ['latin'],
})

export const DateCount = ({ date, type }: { date: string; type: DateShowTypeEnum }) => {
  // hooks
  const t = useTranslations()
  const timezone = useTimeZone()

  // contexts
  const { locale } = useApplication()

  // states
  const [years, setYears] = useState<number>(0)
  const [months, setMonths] = useState<number>(0)
  const [days, setDays] = useState<number>(0)
  const [hours, setHours] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(0)
  const [seconds, setSeconds] = useState<number>(0)
  const [mili, setMili] = useState<number>(0)
  const [dateNegative, setDateNegative] = useState<boolean>(false)

  // variables
  const FORMAT_FNS = locale.includes('pt') ? ptBR : locale.includes('es') ? es : enUS

  function handleCountUpFromTime() {
    const inputDate = toZonedTime(new Date(date ?? ''), timezone ?? 'America/Sao_Paulo')
    const now = toZonedTime(new Date(), timezone ?? 'America/Sao_Paulo')

    if (inputDate.getTime() > now.getTime()) setDateNegative(true)
    else setDateNegative(false)

    const diffInMonths = differenceInMonths(now, inputDate)
    const adjustedInputDate = addMonths(inputDate, diffInMonths)
    const diffInDays = differenceInDays(now, adjustedInputDate)
    const diffInHours = differenceInHours(now, adjustedInputDate) % 24
    const diffInMinutes = differenceInMinutes(now, adjustedInputDate) % 60
    const diffInSeconds = differenceInSeconds(now, adjustedInputDate) % 60
    const diffInMili = differenceInMilliseconds(now, adjustedInputDate) % 1000

    setYears(Math.floor(diffInMonths / 12))
    setMonths(diffInMonths % 12)
    setDays(diffInDays)
    setHours(diffInHours)
    setMinutes(diffInMinutes)
    setSeconds(diffInSeconds)
    setMili(diffInMili)
  }

  useEffect(() => {
    if (date && type !== DateShowTypeEnum.SIMPLE) setTimeout(handleCountUpFromTime, 1000)
    if (date && type === DateShowTypeEnum.SIMPLE) setTimeout(handleCountUpFromTime, 100)
  }, [date, mili])

  return type === DateShowTypeEnum.DEFAULT ? (
    <>
      {dateNegative ? (
        <div className='relative'>
          <div className='group/card w-full lg:min-w-[7rem] h-[7rem] flex flex-col items-center bg-theme-200 justify-center rounded-xl p-4'>
            <h1 className={`${lora.className} text-xl text-center font-bold text-white`}>
              {t('themes.default.awaiting')}
            </h1>
          </div>
        </div>
      ) : (
        <div>
          <p className={`${lora.className} text-theme-600 text-xl text-center font-bold`}>
            {t('themes.default.together')}
          </p>

          <div className='grid grid-cols-2 lg:grid-cols-3 gap-2 mt-8'>
            <div className='group/card w-full lg:min-w-[7rem] h-[5rem] hover:shadow-2xl hover:shadow-neutral-500/[0.1] flex flex-col bg-theme-200 backdrop-blur-xl items-center justify-center rounded-xl p-4'>
              <h1 className={`${lora.className} text-xl text-center font-bold text-white`}>
                {years < 10 ? 0 : ''}
                {years}
              </h1>
              <p className={`${lora.className} text-sm text-center text-theme-500`}>{t('themes.default.years')}</p>
            </div>
            <div className='group/card w-full lg:min-w-[7rem] h-[5rem] hover:shadow-2xl hover:shadow-neutral-500/[0.1] flex flex-col bg-theme-200 backdrop-blur-xl items-center justify-center rounded-xl p-4'>
              <h1 className={`${lora.className} text-xl text-center font-bold text-white`}>
                {months < 10 ? 0 : ''}
                {months}
              </h1>
              <p className={`${lora.className} text-sm text-center text-theme-500`}>{t('themes.default.months')}</p>
            </div>
            <div className='group/card w-full lg:min-w-[7rem] h-[5rem] hover:shadow-2xl hover:shadow-neutral-500/[0.1] flex flex-col bg-theme-200 backdrop-blur-xl items-center justify-center rounded-xl p-4'>
              <h1 className={`${lora.className} text-xl text-center font-bold text-white`}>
                {days < 10 ? 0 : ''}
                {days}
              </h1>
              <p className={`${lora.className} text-sm text-center text-theme-500`}>{t('themes.default.days')}</p>
            </div>
            <div className='group/card w-full lg:min-w-[7rem] h-[5rem] hover:shadow-2xl hover:shadow-neutral-500/[0.1] flex flex-col bg-theme-200 backdrop-blur-xl items-center justify-center rounded-xl p-4'>
              <h1 className={`${lora.className} text-xl text-center font-bold text-white`}>
                {hours < 10 ? 0 : ''}
                {hours}
              </h1>
              <p className={`${lora.className} text-sm text-center text-theme-500`}>{t('themes.default.hours')}</p>
            </div>
            <div className='group/card w-full lg:min-w-[7rem] h-[5rem] hover:shadow-2xl hover:shadow-neutral-500/[0.1] flex flex-col bg-theme-200 backdrop-blur-xl items-center justify-center rounded-xl p-4'>
              <h1 className={`${lora.className} text-xl text-center font-bold text-white`}>
                {minutes < 10 ? 0 : ''}
                {minutes}
              </h1>
              <p className={`${lora.className} text-sm text-center text-theme-500`}>{t('themes.default.minutes')}</p>
            </div>
            <div className='group/card w-full lg:min-w-[7rem] h-[5rem] hover:shadow-2xl hover:shadow-neutral-500/[0.1] flex flex-col bg-theme-200 backdrop-blur-xl items-center justify-center rounded-xl p-4'>
              <h1 className={`${lora.className} text-xl text-center font-bold text-white`}>
                {seconds < 10 ? 0 : ''}
                {seconds}
              </h1>
              <p className={`${lora.className} text-sm text-center text-theme-500`}>{t('themes.default.seconds')}</p>
            </div>
          </div>

          {date && (
            <p className='text-sm font-semibold text-center text-white my-8'>
              {t('themes.default.since')} {format(new Date(date), 'dd')} {t('themes.default.of')}{' '}
              {format(new Date(date), 'MMMM', { locale: FORMAT_FNS })} {t('themes.default.of')}{' '}
              {format(new Date(date), 'yyy', { locale: ptBR })}
            </p>
          )}
        </div>
      )}
    </>
  ) : type === DateShowTypeEnum.CLASSIC ? (
    <>
      {dateNegative ? (
        <div className='relative'>
          <div className='group/card w-full lg:min-w-[7rem] h-[7rem] flex flex-col items-center justify-center rounded-xl p-4'>
            <h1 className={`text-xl text-center font-semibold text-white`}>{t('themes.default.awaiting')} ❤️‍🔥</h1>
          </div>
        </div>
      ) : (
        <div>
          <p className={`text-md text-center font-semibold text-theme-600 px-10`}>
            {t('themes.default.together')} {years < 10 ? 0 : ''}
            {years} {t('themes.default.years')} {months < 10 ? 0 : ''}
            {months} {t('themes.default.months')} {days < 10 ? 0 : ''}
            {days} {t('themes.default.days')} {hours < 10 ? 0 : ''}
            {hours} {t('themes.default.hours')} {minutes < 10 ? 0 : ''}
            {minutes} {t('themes.default.minutes')} {seconds < 10 ? 0 : ''}
            {seconds} {t('themes.default.seconds')} ❤️‍🔥
          </p>

          {date && (
            <p className='text-sm font-semibold text-center text-white my-8'>
              {t('themes.default.since')} {format(new Date(date), 'dd')} {t('themes.default.of')}{' '}
              {format(new Date(date), 'MMMM', { locale: FORMAT_FNS })} {t('themes.default.of')}{' '}
              {format(new Date(date), 'yyy', { locale: ptBR })}
            </p>
          )}
        </div>
      )}
    </>
  ) : (
    <>
      {dateNegative ? (
        <div className='relative'>
          <div className='group/card w-full lg:min-w-[7rem] h-[7rem] flex flex-col items-center justify-center rounded-xl p-4'>
            <h1 className={`text-xl text-center font-medium text-white`}>
              ⌛ <br /> {t('themes.default.awaiting')}
            </h1>
          </div>
        </div>
      ) : (
        <div>
          <p className={`text-lg text-center font-medium text-theme-600 px-10 lg:px-24`}>
            ⌛ <br /> {years < 10 ? 0 : ''}
            {years} {t('themes.default.years')} {months < 10 ? 0 : ''}
            {months} {t('themes.default.months')} {days < 10 ? 0 : ''}
            {days} {t('themes.default.days')} {hours < 10 ? 0 : ''}
            {hours} {t('themes.default.hours')} {minutes < 10 ? 0 : ''}
            {minutes} {t('themes.default.minutes')} {seconds < 10 ? 0 : ''}
            {seconds} {t('themes.default.seconds')} {mili} {t('themes.default.mili')}
          </p>
        </div>
      )}
    </>
  )
}
