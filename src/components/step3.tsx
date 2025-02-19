'use client'

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { enUS, es, ptBR } from 'date-fns/locale'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconChevronLeft, IconChevronRight, IconLoader } from '@tabler/icons-react'

import { CreatePrePayloadProps } from '@/typings/create'
import { useApplication } from '@/contexts/ApplicationContext'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { Calendar } from './ui/calendar'
import { Input } from './ui/input'
import RichTextEditor from './ui/text-editor'

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

  const formSchema = z.object({
    coupleName: z
      .string()
      .min(2, {
        message: t('steps.step1.input.errors.min'),
      })
      .max(100, {
        message: t('steps.step1.input.errors.max'),
      }),
    description: z
      .string()
      .min(2, {
        message: t('steps.step1.input.errors.min'),
      })
      .max(100, {
        message: t('steps.step1.input.errors.max'),
      }),
    message: z.string().optional(),
  })

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      coupleName: couple.coupleName ?? '',
      message: couple.message ?? '',
    },
  })

  const VALUE = couple.message
    ?.replaceAll('<p>', '')
    .replaceAll('</p>', '')
    .replaceAll('<em>', '')
    .replaceAll('</em>', '')
    .replaceAll('<strong>', '')
    .replaceAll('</strong>', '')
    .replaceAll('<s>', '')
    .replaceAll('</s>', '')

  useEffect(() => {
    if (date) setCouple({ ...couple, startDate: date.toISOString() })
  }, [date])

  return (
    <div className='relative flex flex-col gap-4 z-50 w-full mt-8'>
      <div className='flex flex-col lg:flex-row lg:gap-4 gap-8'>
        <Accordion type='single' collapsible>
          <AccordionItem value={'a'}>
            <AccordionTrigger>Lembrança 1</AccordionTrigger>
            <AccordionContent>
              <Input
                {...register('coupleName')}
                id='coupleName'
                placeholder={t('steps.step1.input.placeholder')}
                type='text'
                autoFocus={true}
                autoComplete='off'
                className='w-full'
                onChange={e =>
                  setCouple({
                    ...couple,
                    coupleName: e.target.value.replace(
                      /[^a-zA-ZÀ-ÿ0-9\s\p{Emoji}\s&!@()*\+\-_=,.?;:<>\/\\|^%$#\[\]{}~`'"]/gu,
                      '',
                    ),
                  })
                }
              />
              <div className='relative'>
                <RichTextEditor
                  placeholder={t('steps.step2.input.placeholder')}
                  value={couple.message ?? ''}
                  onChange={e => {
                    const formated = e
                      ?.replaceAll('<p>', '')
                      .replaceAll('</p>', '')
                      .replaceAll('<em>', '')
                      .replaceAll('</em>', '')
                      .replaceAll('<strong>', '')
                      .replaceAll('</strong>', '')
                      .replaceAll('<s>', '')
                      .replaceAll('</s>', '')

                    if (theme === ThemeShowTypeEnum.DEFAULT) {
                      if (formated.length > 750)
                        setError('message', { message: t('steps.step2.input.errors.max', { limit: 750 }) })
                      if (formated.length <= 750) clearErrors()
                    } else {
                      if (formated.length > 400)
                        setError('message', { message: t('steps.step2.input.errors.max', { limit: 400 }) })
                      if (formated.length <= 400) clearErrors()
                    }

                    setValue('message', e)
                    setCouple({ ...couple, message: e })
                  }}
                />

                <p className='absolute bottom-2 right-3 text-xs text-neutral-400'>
                  {VALUE?.length ?? 0}/{theme === ThemeShowTypeEnum.DEFAULT ? 750 : 400}
                </p>
              </div>
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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
          onClick={handleSubmit(onSubmit)}
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
