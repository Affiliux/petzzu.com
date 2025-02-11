/* eslint-disable @next/next/no-img-element */
'use client'

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { IconChevronLeft, IconChevronRight, IconLoader, IconPlayerPlayFilled, IconX } from '@tabler/icons-react'

import { YouTubeVideoProps } from '@/typings/application'
import { CreatePrePayloadProps } from '@/typings/create'
import { useApplication } from '@/contexts/ApplicationContext'

import useDebounce from '@/hooks/use-debounce'

import { Input } from './ui/input'

import { ThemeShowTypeEnum } from '@/enums'

interface Step5Props {
  theme: ThemeShowTypeEnum
  couple: CreatePrePayloadProps
  selected: YouTubeVideoProps | undefined
  setCouple: Dispatch<SetStateAction<CreatePrePayloadProps>>
  setSong: Dispatch<SetStateAction<YouTubeVideoProps | undefined>>
  onNext: () => Promise<void>
  onBack: () => void
}

export const Step5 = ({ theme, couple, selected, setSong, onNext, onBack }: Step5Props) => {
  const t = useTranslations()

  const { yt_search_list, set_yt_search_list, handleGetYtVideos } = useApplication()

  const [value, setValue] = useState<string | undefined>(couple.yt_song)
  const [loading, setLoading] = useState<boolean>(false)

  const debouncedInput = useDebounce(value, 500)

  async function onSearch(name: string) {
    setLoading(true)

    try {
      await handleGetYtVideos(name)
    } catch (error: any) {
      console.error(error)
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

  useEffect(() => {
    if (debouncedInput && debouncedInput?.length > 3) onSearch(debouncedInput)
    else set_yt_search_list([])
  }, [debouncedInput])

  return (
    <div className='relative flex flex-col gap-4 z-50 w-full mt-8'>
      {selected ? (
        <motion.div
          layoutId={`card`}
          key={`card`}
          className='p-4 flex justify-between items-center bg-neutral-800 rounded-xl w-full'
        >
          <div className='flex gap-4 items-center justify-center'>
            <motion.div layoutId={`image`}>
              <img
                src={selected.thumbnail ?? ''}
                alt={selected.title ?? ''}
                className='h-20 w-20 md:h-14 md:w-14 rounded-lg object-cover object-top'
                width={80}
                height={80}
              />
            </motion.div>
            <div className='w-2/3 lg:w-3/4'>
              <motion.h3
                layoutId={`title-${selected.id}`}
                className='font-medium text-neutral-200 text-left max-w-36 lg:max-w-full line-clamp-2 lg:line-clamp-none'
              >
                {selected.title}
              </motion.h3>
              <motion.p layoutId={`description`} className='text-neutral-400 text-left text-xs'>
                {selected.durationFormatted}
              </motion.p>
            </div>
          </div>
          <motion.button
            layoutId={`button`}
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()

              setSong(undefined)
              setValue('')
            }}
            className='p-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-red-500 hover:text-white text-black'
          >
            <IconX size={16} />
          </motion.button>
        </motion.div>
      ) : (
        <Input
          id='song'
          placeholder={t('steps.step5.input.placeholder')}
          type='text'
          autoFocus={true}
          autoComplete='off'
          className='w-full'
          onChange={e => setValue(e.target.value)}
        />
      )}

      {yt_search_list.length > 0 && !selected && (
        <div className='flex flex-col items-center gap-4 w-full max-h-72 overflow-y-scroll'>
          {yt_search_list.map(video => (
            <motion.div
              layoutId={`card-${video.id}`}
              key={`card-${video.id}`}
              onClick={() => {
                setValue('')
                set_yt_search_list([])
                setSong(video)
              }}
              className='relative p-4 flex justify-between items-center hover:bg-neutral-800 rounded-xl cursor-pointer w-full'
            >
              <div className='flex gap-4 items-center justify-center'>
                <motion.div layoutId={`image-${video.id}`}>
                  <img
                    width={80}
                    height={80}
                    src={video.thumbnail ?? ''}
                    alt={video.title ?? ''}
                    className='h-20 w-20 md:h-14 md:w-14 rounded-lg object-cover object-top'
                  />
                </motion.div>
                <div className='w-2/3 lg:w-3/4'>
                  <motion.h3
                    layoutId={`title-${video.id}`}
                    className='font-medium text-neutral-200 text-left max-w-36 lg:max-w-full line-clamp-2 lg:line-clamp-none'
                  >
                    {video.title}
                  </motion.h3>
                  <motion.p layoutId={`description-${video.id}`} className='text-neutral-400 text-left text-xs'>
                    {video.durationFormatted}
                  </motion.p>
                </div>
              </div>

              <motion.button
                layoutId={`button-${video.id}`}
                onClick={e => {
                  setValue('')
                  set_yt_search_list([])
                  setSong(video)
                }}
                className='p-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-red-500 hover:text-white text-black'
              >
                <IconPlayerPlayFilled size={16} />
              </motion.button>

              <p className='text-xs text-gray-600 absolute bottom-1 right-2 z-30'>{t('steps.step5.click-select')}</p>
            </motion.div>
          ))}
        </div>
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
              {t('steps.step5.back')}
            </>
          </span>
        </button>
        <button
          onClick={onSubmit}
          disabled={loading || (theme !== ThemeShowTypeEnum.DEFAULT && !selected)}
          className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-800 focus:outline-none focus:ring-0 ${
            loading || (theme !== ThemeShowTypeEnum.DEFAULT && !selected) ? 'opacity-50' : ''
          }`}
        >
          <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black px-3 py-1 text-sm font-semibold text-white backdrop-blur-3xl'>
            {loading ? (
              <IconLoader size={20} className='animate-spin' />
            ) : theme === ThemeShowTypeEnum.DEFAULT ? (
              <>
                {selected ? t('steps.step5.button') : t('config.skip')}
                <IconChevronRight size={20} className='ml-4' />
              </>
            ) : (
              <>
                {t('steps.step5.go-payment')}
                <IconChevronRight size={20} className='ml-4' />
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  )
}
