'use client'

import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'

import { enUS, es, ptBR } from 'date-fns/locale'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconChevronLeft, IconChevronRight, IconLoader, IconPlus, IconTrash,IconX } from '@tabler/icons-react'

import { CreatePrePayloadProps, MediaPreProps } from '@/typings/create'
import { useApplication } from '@/contexts/ApplicationContext'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { Calendar } from './ui/calendar'
import { Input } from './ui/input'
import RichTextEditor from './ui/text-editor'
import { RenderImage } from './render-image'
import { MAX_FILE_SIZE } from '../constants'
import { toast } from '../hooks/use-toast'

import { DateShowTypeEnum, ThemeShowTypeEnum } from '@/enums'

interface Step3Props {
  theme: ThemeShowTypeEnum
  couple: CreatePrePayloadProps
  dateShowType: DateShowTypeEnum
  setCouple: Dispatch<SetStateAction<CreatePrePayloadProps>>
  setDateShowType: Dispatch<SetStateAction<DateShowTypeEnum>>
  onNext: () => Promise<void>
  onBack: () => void
  onSaveMedia: (media: FormData) => Promise<void>
  onRemoveMedia: (id: string) => Promise<void>
  medias: MediaPreProps[]
}

export const Step3 = ({
  theme,
  couple,
  dateShowType,
  setCouple,
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
  const [date, setDate] = useState<Date | undefined>(couple?.startDate ? new Date(couple?.startDate) : undefined)
  const [accordions, setAccordions] = useState([{ id: 1 }])

  const addAccordion = () => {
    setAccordions([...accordions, { id: accordions.length + 1 }])
  }

  const removeAccordion = (id: number) => {
    setAccordions(accordions.filter(accordion => accordion.id !== id))
  }

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

  async function onRemove(id: string) {
    setLoading(true)

    try {
      await onRemoveMedia(id)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function onSelectFiles(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()
    setLoading(true)

    try {
      if (!event.target.files) return
      const new_files = Array.from(event.target.files)

      if (medias?.length + new_files.length > 1) {
        toast({
          variant: 'destructive',
          title: 'Image Error!!',
          description: t('steps.step2.input.errors.maxFiles'),
        })

        return
      }

      await Promise.all(
        new_files.map(async file => {
          if (file.size === 0) {
            toast({
              variant: 'destructive',
              title: 'Image Error!!',
              description: t('steps.step4.input.errors.empty'),
            })
          } else if (file.size > MAX_FILE_SIZE) {
            toast({
              variant: 'destructive',
              title: 'Image Error!!',
              description: t('steps.step4.input.errors.big-size'),
            })
          } else if (!file.type.startsWith('image/')) {
            toast({
              variant: 'destructive',
              title: 'Image Error!!',
              description: t('steps.step4.input.errors.not-image'),
            })
          } else {
            const formData = new FormData()
            formData.append('file', file)
            await onSaveMedia(formData)
          }
        }),
      )
    } catch (error: any) {
      console.error(error)

      toast({
        title: t('steps.step4.toast.error-save.title'),
        description: t('steps.step4.toast.error-save.description'),
        variant: 'destructive',
      })
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
      
      <button
        type='button'
        onClick={addAccordion}
        className='mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-offset-2'
      >
        <IconPlus className='mr-2' />
        Nova lembrança
      </button>

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
