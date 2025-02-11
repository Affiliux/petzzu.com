'use client'

import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

import imageCompression from 'browser-image-compression'
import { useTranslations } from 'next-intl'
import { IconChevronLeft, IconChevronRight, IconLoader, IconX } from '@tabler/icons-react'

import { MediaPreProps } from '@/typings/create'

import { toast } from '@/hooks/use-toast'

import { RenderImage } from './render-image'

import { MAX_FILE_SIZE, MAX_FILES } from '@/constants'
import { PhotosSliderEnum, ThemeShowTypeEnum } from '@/enums'

interface Step4Props {
  theme: ThemeShowTypeEnum
  mediaShowType: PhotosSliderEnum
  setMediaShowType: Dispatch<SetStateAction<PhotosSliderEnum>>
  medias: MediaPreProps[]
  onSaveMedia: (media: FormData) => Promise<void>
  onRemoveMedia: (id: string) => Promise<void>
  onNext: () => Promise<void>
  onBack: () => void
}

export const Step4 = ({
  theme,
  mediaShowType,
  setMediaShowType,
  medias,
  onSaveMedia,
  onRemoveMedia,
  onNext,
  onBack,
}: Step4Props) => {
  const t = useTranslations()

  const [loading, setLoading] = useState<boolean>(false)

  async function onSelectFiles(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()
    setLoading(true)

    try {
      if (!event.target.files) return
      const new_files = Array.from(event.target.files)

      if (medias.length + new_files.length > MAX_FILES) {
        toast({
          variant: 'destructive',
          title: 'Image Error!!',
          description: t('steps.step4.input.errors.maxFiles'),
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

  const types = [
    { id: 1, name: t('steps.step4.show-types.coverflow'), data: PhotosSliderEnum.COVERFLOW },
    { id: 2, name: t('steps.step4.show-types.cube'), data: PhotosSliderEnum.CUBE },
    { id: 3, name: t('steps.step4.show-types.cards'), data: PhotosSliderEnum.CARDS },
    { id: 4, name: t('steps.step4.show-types.flip'), data: PhotosSliderEnum.FLIP },
  ]

  return (
    <div className='relative flex flex-col gap-4 z-50 w-full mt-8'>
      <div className='relative border-2 border-neutral-800 border-dashed rounded-lg px-8 py-8' id='dropzone'>
        <input
          multiple
          type='file'
          accept='image/*'
          size={100 * 1024 * 1024}
          max={medias.length - 8}
          className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20'
          onChange={onSelectFiles}
        />

        <div className='text-center'>
          <h3 className='mt-2 text-sm font-medium text-white'>
            <label htmlFor='file-upload' className='relative cursor-pointer'>
              <span>{t('steps.step4.input.label')}</span>
            </label>
          </h3>
          <p className='mt-1 text-xs text-gray-500'>{t('steps.step4.input.placeholder')}</p>
        </div>

        <div className='grid grid-cols-4 gap-4 mt-8'>
          {medias.map(file => (
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

      {theme === ThemeShowTypeEnum.DEFAULT && (
        <>
          <h2 className='font-semibold text-white'>{t('steps.step4.show-types.title')}</h2>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
            {types.map(type => (
              <div
                key={type.id}
                className={`transform relative bg-neutral-800 rounded-xl h-14 overflow-hidden duration-300 hover:opacity-100 cursor-pointer ${
                  mediaShowType === type.data ? 'opacity-100 border border-neutral-500' : 'opacity-80'
                }`}
                onClick={() => setMediaShowType(type.data)}
              >
                <div className='z-50 absolute top-4 left-4 max-w-xs'>
                  <h2 className='font-semibold text-white'>{type.name}</h2>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

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
              {t('steps.step4.back')}
            </>
          </span>
        </button>
        <button
          onClick={onSubmit}
          disabled={loading || (theme !== ThemeShowTypeEnum.DEFAULT && medias.length === 0)}
          className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-800 focus:outline-none focus:ring-0 ${
            loading || (theme !== ThemeShowTypeEnum.DEFAULT && medias.length === 0) ? 'opacity-50' : ''
          }`}
        >
          <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black px-3 py-1 text-sm font-semibold text-white backdrop-blur-3xl'>
            {loading ? (
              <IconLoader size={20} className='animate-spin' />
            ) : theme === ThemeShowTypeEnum.DEFAULT ? (
              <>
                {medias.length ? t('steps.step4.button') : t('config.skip')}
                <IconChevronRight size={20} className='ml-4' />
              </>
            ) : (
              <>
                {t('steps.step4.button')}
                <IconChevronRight size={20} className='ml-4' />
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  )
}
