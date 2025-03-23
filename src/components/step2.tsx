'use client'

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { enUS, es, ptBR } from 'date-fns/locale'
import { useTranslations } from 'next-intl'
import { IconChevronLeft, IconChevronRight, IconLoader } from '@tabler/icons-react'

import type { CreatePrePayloadProps } from '@/typings/create'
import { useApplication } from '@/contexts/ApplicationContext'

import { Calendar } from './ui/calendar'

import { DateShowTypeEnum } from '@/enums'

interface Step2Props {
  isEdit?: boolean
  child: CreatePrePayloadProps
  setChild: Dispatch<SetStateAction<CreatePrePayloadProps>>
  dateShowType: DateShowTypeEnum
  setDateShowType: Dispatch<SetStateAction<DateShowTypeEnum>>
  onNext: () => Promise<void>
  onBack: () => void
}

export const Step2 = ({ isEdit, child, dateShowType, setChild, setDateShowType, onNext, onBack }: Step2Props) => {
  // hooks
  const t = useTranslations()

  // contexts
  const { locale } = useApplication()

  // states
  const [loading, setLoading] = useState<boolean>(false)
  const [date, setDate] = useState<Date | undefined>(child?.birth_date ? new Date(child?.birth_date) : undefined)

  // variables
  const types = [
    { id: 1, name: t('steps.step2.show-types.default'), data: DateShowTypeEnum.DEFAULT },
    { id: 2, name: t('steps.step2.show-types.classic'), data: DateShowTypeEnum.CLASSIC },
    { id: 3, name: t('steps.step2.show-types.simple'), data: DateShowTypeEnum.SIMPLE },
  ]

  async function handleSubmit() {
    setLoading(true)

    try {
      await onNext()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (date) setChild({ ...child, birth_date: date.toISOString() })
  }, [date])

  return (
    <div className='relative flex flex-col gap-4 z-50 w-full mt-8'>
      <div className='flex flex-col lg:flex-row lg:gap-4 gap-8'>
        <div className='w-full lg:w-2/3'>
          <Calendar
            mode='single'
            locale={locale === 'pt-BR' ? ptBR : locale === 'es' ? es : enUS}
            captionLayout='dropdown'
            className={'rounded-md border border-neutral-200/60 flex items-center justify-center relative z-50'}
            selected={date}
            onSelect={setDate}
            fromYear={1950}
            toYear={new Date().getFullYear()}
          />
        </div>

        <div className='w-full lg:w-1/3'>
          <h2 className='font-semibold text-neutral-900'>{t('steps.step2.show-types.title')}</h2>
          <div className='flex flex-col gap-2 mt-4'>
            {types.map(type => (
              <div
                key={type.id}
                className={`flex items-center space-x-3 space-y-0 rounded-lg border p-4 cursor-pointer hover:bg-neutral-100/20 border-neutral-200/60 w-full`}
                onClick={() => setDateShowType(type.data)}
              >
                {type.data === dateShowType ? (
                  <div className='border border-theme-300 rounded-full h-4 w-4 flex items-center justify-center'>
                    <div className='bg-theme-800 rounded-full h-2.5 w-2.5' />
                  </div>
                ) : (
                  <div className='border border-neutral-200/60 rounded-full h-4 w-4' />
                )}
                <h2 className='text-sm font-medium leading-none text-neutral-800'>{type.name}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='flex items-center justify-between gap-4 mt-4'>
        <button
          type='button'
          onClick={onBack}
          className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-200/60 focus:outline-none focus:ring-0 ${
            loading ? 'opacity-50' : ''
          }`}
        >
          <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-theme-100 px-3 py-1 text-sm font-semibold text-theme-600 backdrop-blur-3xl'>
            <>
              <IconChevronLeft size={20} className='mr-4' />
              {isEdit ? t('pages.account.pages.edit.actions.back') : t('steps.step2.back')}
            </>
          </span>
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading || !date}
          className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-200/60 focus:outline-none focus:ring-0 ${
            loading || !date ? 'opacity-50' : ''
          }`}
        >
          <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-theme-100 px-3 py-1 text-sm font-semibold text-theme-600 backdrop-blur-3xl'>
            {loading ? (
              <IconLoader size={20} className='animate-spin' />
            ) : (
              <>
                {isEdit ? t('pages.account.pages.edit.actions.next') : t('steps.step2.button')}
                <IconChevronRight size={20} className='ml-4' />
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  )
}
