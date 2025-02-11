'use client'

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { enUS, es, ptBR } from 'date-fns/locale'
import { useTranslations } from 'next-intl'
import { IconChevronLeft, IconChevronRight, IconLoader } from '@tabler/icons-react'

import { CreatePrePayloadProps } from '@/typings/create'
import { useApplication } from '@/contexts/ApplicationContext'

import { Calendar } from './ui/calendar'

import { DateShowTypeEnum, ThemeShowTypeEnum } from '@/enums'

interface Step3Props {
  theme: ThemeShowTypeEnum
  couple: CreatePrePayloadProps
  dateShowType: DateShowTypeEnum
  setCouple: Dispatch<SetStateAction<CreatePrePayloadProps>>
  setDateShowType: Dispatch<SetStateAction<DateShowTypeEnum>>
  onNext: () => Promise<void>
  onBack: () => void
}

export const Step3 = ({ theme, couple, dateShowType, setCouple, setDateShowType, onNext, onBack }: Step3Props) => {
  const t = useTranslations()

  const { locale } = useApplication()

  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState<Date | undefined>(couple?.startDate ? new Date(couple?.startDate) : undefined)

  async function onSubmit() {
    setLoading(true)

    try {
      await onNext()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const types = [
    { id: 1, name: t('steps.step3.show-types.default'), data: DateShowTypeEnum.DEFAULT },
    { id: 2, name: t('steps.step3.show-types.classic'), data: DateShowTypeEnum.CLASSIC },
    { id: 3, name: t('steps.step3.show-types.simple'), data: DateShowTypeEnum.SIMPLE },
  ]

  useEffect(() => {
    if (date) setCouple({ ...couple, startDate: date.toISOString() })
  }, [date])

  return (
    <div className='relative flex flex-col gap-4 z-50 w-full mt-8'>
      <div className='flex flex-col lg:flex-row lg:gap-4 gap-8'>
        <Calendar
          mode='single'
          locale={locale === 'pt-BR' ? ptBR : locale === 'es' ? es : enUS}
          captionLayout='dropdown'
          className={`rounded-md border border-neutral-800 flex items-center justify-center relative z-50 ${theme === ThemeShowTypeEnum.DEFAULT ? 'lg:w-2/3' : 'lg:w-full'}`}
          selected={date}
          onSelect={setDate}
          fromYear={1950}
          toYear={new Date().getFullYear()}
        />

        {theme === ThemeShowTypeEnum.DEFAULT && (
          <div className='w-full lg:w-1/3'>
            <h2 className='font-semibold text-white'>{t('steps.step4.show-types.title')}</h2>
            <div className='flex flex-col gap-4 mt-4'>
              {types.map(type => (
                <div
                  key={type.id}
                  className={`transform relative bg-neutral-800 rounded-xl h-14 overflow-hidden duration-300 hover:opacity-100 cursor-pointer ${
                    dateShowType === type.data ? 'opacity-100 border border-neutral-500' : 'opacity-80'
                  }`}
                  onClick={() => setDateShowType(type.data)}
                >
                  <div className='z-50 absolute top-4 left-4 max-w-xs'>
                    <h2 className='font-semibold text-white'>{type.name}</h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className='flex items-center justify-between gap-4 mt-4'>
        <button
          type='button'
          onClick={onBack}
          disabled={loading}
          className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-800 focus:outline-none focus:ring-0 ${
            loading ? 'opacity-50' : ''
          }`}
        >
          <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black px-3 py-1 text-sm font-semibold text-white backdrop-blur-3xl'>
            <>
              <IconChevronLeft size={20} className='mr-4' />
              {t('steps.step2.back')}
            </>
          </span>
        </button>
        <button
          onClick={onSubmit}
          disabled={loading || (theme !== ThemeShowTypeEnum.DEFAULT && !couple.startDate)}
          className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-800 focus:outline-none focus:ring-0 ${
            loading || (theme !== ThemeShowTypeEnum.DEFAULT && !couple.startDate) ? 'opacity-50' : ''
          }`}
        >
          <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black px-3 py-1 text-sm font-semibold text-white backdrop-blur-3xl'>
            {loading ? (
              <IconLoader size={20} className='animate-spin' />
            ) : theme === ThemeShowTypeEnum.DEFAULT ? (
              <>
                {date ? t('steps.step3.button') : t('config.skip')}
                <IconChevronRight size={20} className='ml-4' />
              </>
            ) : (
              <>
                {t('steps.step3.button')}
                <IconChevronRight size={20} className='ml-4' />
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  )
}
