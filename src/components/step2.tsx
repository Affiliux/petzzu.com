'use client'

import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'

import { enUS, es, ptBR } from 'date-fns/locale'
import { useTranslations } from 'next-intl'
import { IconChevronLeft, IconChevronRight, IconLoader, IconX } from '@tabler/icons-react'

import { CreatePrePayloadProps, MediaPreProps } from '@/typings/create'

import { toast } from '@/hooks/use-toast'

import { Calendar } from './ui/calendar'
import { RenderImage } from './render-image'
import { useApplication } from '../contexts/ApplicationContext'

import { MAX_FILE_SIZE, MAX_FILES } from '@/constants'
import { Genders } from '@/enums'

interface Step2Props {
  couple: CreatePrePayloadProps
  setCouple: Dispatch<SetStateAction<CreatePrePayloadProps>>
  onNext: () => Promise<void>
  onBack: () => void
  onSaveMedia: (media: FormData) => Promise<void>
  onRemoveMedia: (id: string) => Promise<void>
  medias: MediaPreProps[]
}

export const Step2 = ({ couple, setCouple, onNext, onBack, onSaveMedia, onRemoveMedia, medias }: Step2Props) => {
  const t = useTranslations()

  const [loading, setLoading] = useState<boolean>(false)

  const { locale } = useApplication()
  const [date, setDate] = useState<Date | undefined>(couple?.startDate ? new Date(couple?.startDate) : undefined)

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

  const genders = [
    { id: 1, name: t('steps.step2.gender.male'), data: Genders.MALE },
    { id: 2, name: t('steps.step2.gender.female'), data: Genders.FEMALE },
  ]

  useEffect(() => {
    if (date) setCouple({ ...couple, startDate: date.toISOString() })
  }, [date])

  return (
    <div className='relative flex flex-col gap-4 z-50 w-full mt-8'>
      <Calendar
        mode='single'
        locale={locale === 'pt-BR' ? ptBR : locale === 'es' ? es : enUS}
        captionLayout='dropdown'
        className={'rounded-md border border-neutral-300 flex items-center justify-center relative z-50'}
        selected={date}
        onSelect={setDate}
        fromYear={2010}
        toYear={new Date().getFullYear()}
      />

      <h2 className='font-semibold text-black'>{t('steps.step2.input.picture.label')}</h2>
      <div className='relative border-2 border-neutral-800 border-dashed rounded-lg px-8 py-8' id='dropzone'>
        <input
          type='file'
          accept='image/*'
          size={100 * 1024 * 1024}
          className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20'
          onChange={onSelectFiles}
        />

        <div className='text-center'>
          <h3 className='mt-2 text-sm font-medium text-white'>
            <label htmlFor='file-upload' className='relative cursor-pointer'>
              <span>{t('steps.step2.input.picture.title')}</span>
            </label>
          </h3>
          <p className='mt-1 text-xs text-gray-500'>{t('steps.step2.input.picture.title')}</p>
        </div>

        <div className='grid grid-cols-4 gap-4 mt-8'>
          {medias?.map(file => (
            <div
              key={file.id}
              className='image-item rounded-md relative z-30 w-[50px] h-[50px] lg:w-[65px] lg:h-[65px]'
            >
              <RenderImage
                src={file.url}
                alt={file.id}
                className='rounded-lg w-[50px] h-[50px] lg:w-[65px] lg:h-[65px] object-cover'
                height={65}
                width={65}
              />

              <button
                onClick={() => onRemove(file.id)}
                disabled={loading}
                className='absolute -top-2 left-[40px] lg:left-[55px] p-1 text-sm rounded-full font-bold bg-gray-100 hover:bg-red-500 hover:text-white text-black flex items-center cursor-pointer justify-center'
              >
                <IconX size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <h2 className='font-semibold text-black'>{t('steps.step2.gender.title')}</h2>
      <div className='w-full space-y-6'>
        <div className='flex flex-col md:flex-row gap-4'>
          {genders.map(gender => (
            <label
              key={gender.id}
              className='flex items-center space-x-3 space-y-0 rounded-lg border p-4 cursor-pointer hover:bg-accent [&:has([data-state=checked])]:border-primary w-full'
            >
              <input
                type='radio'
                name='gender'
                value={gender.data}
                checked={couple.gender === gender.data}
                onChange={() => setCouple({ ...couple, gender: gender.data })}
                className='form-radio data-[state=checked]:border-primary data-[state=checked]:bg-primary'
              />
              <div className='space-y-1'>
                <p className='text-sm font-medium leading-none'>{gender.name}</p>
              </div>
            </label>
          ))}
        </div>
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
          disabled={loading || medias?.length === 0}
          className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-800 focus:outline-none focus:ring-0 ${
            loading || medias?.length === 0 ? 'opacity-50' : ''
          }`}
        >
          <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black px-3 py-1 text-sm font-semibold text-white backdrop-blur-3xl'>
            {loading ? (
              <IconLoader size={20} className='animate-spin' />
            ) : (
              <>
                {medias?.length ? t('steps.step4.button') : t('config.skip')}
                <IconChevronRight size={20} className='ml-4' />
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  )
}
