'use client'

import React, { ChangeEvent, useState } from 'react'

import { useTranslations } from 'next-intl'
import { IconChevronLeft, IconChevronRight, IconLoader, IconX } from '@tabler/icons-react'

import type { MediaPreProps } from '@/typings/create'

import { toast } from '@/hooks/use-toast'

import { RenderImage } from './render-image'

import { MAX_FILE_SIZE } from '@/constants'

interface Step3Props {
  isEdit?: boolean
  medias: MediaPreProps[]
  onSaveMedia: (media: FormData) => Promise<void>
  onRemoveMedia: (id: string) => Promise<void>
  onNext: () => Promise<void>
  onBack: () => void
}

export const Step3 = ({ isEdit, onNext, onBack, onSaveMedia, onRemoveMedia, medias }: Step3Props) => {
  // hooks
  const t = useTranslations()

  // states
  const [loading, setLoading] = useState<boolean>(false)

  async function onSelectFiles(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()
    setLoading(true)

    try {
      if (!event.target.files) return
      const new_files = Array.from(event.target.files)

      if (medias?.length + new_files.length > 6) {
        toast({
          variant: 'destructive',
          title: 'Image Error!!',
          description: t('steps.step3.input.errors.maxFiles'),
        })

        return
      }

      await Promise.all(
        new_files.map(async file => {
          if (file.size === 0) {
            toast({
              variant: 'destructive',
              title: 'Image Error!!',
              description: t('steps.step3.input.errors.empty'),
            })
          } else if (file.size > MAX_FILE_SIZE) {
            toast({
              variant: 'destructive',
              title: 'Image Error!!',
              description: t('steps.step3.input.errors.big-size'),
            })
          } else if (!file.type.startsWith('image/')) {
            toast({
              variant: 'destructive',
              title: 'Image Error!!',
              description: t('steps.step3.input.errors.not-image'),
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
        title: t('steps.step3.toast.error-save.title'),
        description: t('steps.step3.toast.error-save.description'),
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

  return (
    <div className='relative flex flex-col gap-4 z-50 w-full mt-8'>
      <div className='relative border-2 border-neutral-200/60 border-dashed rounded-lg px-8 py-8' id='dropzone'>
        <input
          multiple
          type='file'
          accept='image/*'
          size={100 * 1024 * 1024}
          className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20'
          onChange={onSelectFiles}
        />

        <div className='text-center'>
          <p className='mt-3 text-xs text-gray-500'>{t('steps.step3.input.title')}</p>
          <p className='mt-1 text-xs text-gray-500'>{t('steps.step3.input.placeholder')} </p>
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
                className='absolute -top-2 left-[40px] lg:left-[55px] p-1 text-sm rounded-full font-bold bg-neutral-500 hover:bg-theme-500 text-white flex items-center cursor-pointer justify-center'
              >
                <IconX size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className='flex items-center justify-between gap-4 mt-4'>
        <button
          type='button'
          onClick={onBack}
          disabled={loading}
          className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-200/60 focus:outline-none focus:ring-0 ${
            loading ? 'opacity-50' : ''
          }`}
        >
          <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-theme-100 px-3 py-1 text-sm font-semibold text-theme-600 backdrop-blur-3xl'>
            <>
              <IconChevronLeft size={20} className='mr-4' />
              {t('steps.step3.back')}
            </>
          </span>
        </button>
        <button
          onClick={onSubmit}
          disabled={loading || medias?.length === 0}
          className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-200/60 focus:outline-none focus:ring-0 ${
            loading || medias?.length === 0 ? 'opacity-50' : ''
          }`}
        >
          <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-theme-100 px-3 py-1 text-sm font-semibold text-theme-600 backdrop-blur-3xl'>
            {loading ? (
              <IconLoader size={20} className='animate-spin' />
            ) : (
              <>
                {isEdit ? t('pages.account.pages.edit.actions.next') : t('steps.step3.button')}
                <IconChevronRight size={20} className='ml-4' />
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  )
}
