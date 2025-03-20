'use client'

import { useEffect, useState } from 'react'

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

const lora = Lora({
  weight: ['400', '700'],
  style: 'italic',
  subsets: ['latin'],
})

export const DateCount = ({ date }: { date: string }) => {
  const t = useTranslations()
  const timezone = useTimeZone()

  const { locale } = useApplication()

  const [years, setYears] = useState<number>(0)
  const [months, setMonths] = useState<number>(0)
  const [days, setDays] = useState<number>(0)
  const [hours, setHours] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(0)
  const [seconds, setSeconds] = useState<number>(0)
  const [mili, setMili] = useState<number>(0)
  const [dateNegative, setDateNegative] = useState<boolean>(false)

  const formatFNS = locale.includes('pt') ? ptBR : locale.includes('es') ? es : enUS

  function countUpFromTime() {
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
    setTimeout(countUpFromTime, 1000)
  }, [date, mili])

  return (
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
          <p className={`text-lg text-center font-medium text-neutral-200 px-10 lg:px-24`}>
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
