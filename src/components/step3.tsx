'use client'

import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'

import { enUS, es, ptBR } from 'date-fns/locale'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconChevronLeft, IconChevronRight, IconLoader } from '@tabler/icons-react'

import { MediaPreProps } from '@/typings/create'
import { PreWebsite } from '@/typings/timeline'
import { useApplication } from '@/contexts/ApplicationContext'

import { Calendar } from './ui/calendar'
import AccordionList from './accordion-list'
import { MAX_FILE_SIZE } from '../constants'
import { toast } from '../hooks/use-toast'

import { DateShowTypeEnum, ThemeShowTypeEnum } from '@/enums'

interface Step3Props {
  theme: ThemeShowTypeEnum
  child: PreWebsite
  dateShowType: DateShowTypeEnum
  setChild: Dispatch<SetStateAction<PreWebsite>>
  setDateShowType: Dispatch<SetStateAction<DateShowTypeEnum>>
  onNext: () => Promise<void>
  onBack: () => void
  onSaveMedia: (timelineId: string, media: FormData) => Promise<void>
  onRemoveMedia: (timelineId: string, mediaId: string) => Promise<void>
  medias: MediaPreProps[]
}

export const Step3 = ({
  theme,
  child,
  dateShowType,
  setChild,
  setDateShowType,
  onNext,
  onBack,
  onSaveMedia,
  onRemoveMedia,
  medias,
}: Step3Props) => {
  const t = useTranslations()
  const { locale } = useApplication()

  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState<Date | undefined>(child?.birth_date ? new Date(child?.birth_date) : undefined)

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

  useEffect(() => {
    if (date) setChild({ ...child, birth_date: date.toISOString() })
  }, [date])

  return (
    <div className='relative flex flex-col gap-4 z-50 w-full mt-8'>
      <AccordionList
        theme={theme}
        child={child}
        setChild={setChild}
        onSaveMedia={onSaveMedia}
        onRemoveMedia={onRemoveMedia}
      />

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
          disabled={loading || (theme !== ThemeShowTypeEnum.DEFAULT && !child.birth_date)}
          className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-800 focus:outline-none focus:ring-0 ${
            loading || (theme !== ThemeShowTypeEnum.DEFAULT && !child.birth_date) ? 'opacity-50' : ''
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
