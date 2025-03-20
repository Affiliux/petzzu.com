'use client'

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import EmojiPicker, { Theme } from 'emoji-picker-react'
import { PlusIcon, SparklesIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { IconChevronLeft, IconChevronRight, IconLoader, IconX } from '@tabler/icons-react'

import { BackgroundAnimationProps } from '@/typings/application'

import { Dialog, DialogContent, DialogDescription, DialogTitle } from './ui/dialog'
import { LazyLoadVideo } from './lazy-video'

import { BackgroundAnimationEnum } from '@/enums'

interface Step6Props {
  animations: BackgroundAnimationProps[]
  selected: BackgroundAnimationProps
  setAnimation: Dispatch<SetStateAction<BackgroundAnimationProps>>
  onNext: () => Promise<void>
  onBack: () => void
}

export const Step6 = ({ animations, selected, setAnimation, onNext, onBack }: Step6Props) => {
  const t = useTranslations()

  const [loading, setLoading] = useState(false)
  const [picker, setPicker] = useState<number | null>(null)
  const [emoji1, setEmoji1] = useState<string | null>(null)
  const [emoji2, setEmoji2] = useState<string | null>(null)
  const [emoji3, setEmoji3] = useState<string | null>(null)

  const animationEmoji = animations.find(animation => animation.id === BackgroundAnimationEnum.EMOJIS)

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
    if ((emoji1 || emoji2 || emoji3) && selected.id === BackgroundAnimationEnum.EMOJIS && animationEmoji) {
      setAnimation({ ...animationEmoji, component: `${emoji1 || ''}-${emoji2 || ''}-${emoji3 || ''}` })
    } else {
      setAnimation(animations[0])
    }
  }, [emoji1, emoji2, emoji3])

  return (
    <>
      <div className='relative flex flex-col gap-4 z-50 w-full mt-8'>
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden'>
          {animations.map(animation =>
            animation.id !== BackgroundAnimationEnum.EMOJIS ? (
              <div
                key={animation.id}
                className={`transform relative bg-neutral-800 rounded-xl h-20 overflow-hidden duration-300 hover:opacity-100 cursor-pointer ${
                  animation.id === selected.id ? 'opacity-100 border border-neutral-500' : 'opacity-80'
                }`}
                onClick={() => {
                  setAnimation(animation)
                  setEmoji1(null)
                  setEmoji2(null)
                  setEmoji3(null)
                }}
              >
                <LazyLoadVideo
                  src={animation.component}
                  type='video/webm'
                  classNames='absolute inset-0 rounded-lg flex-shrink-0 h-full brightness-125 w-full object-cover'
                />

                <div className='z-50 absolute top-4 left-4 max-w-xs'>
                  <h2 className='font-semibold text-white'>{animation.name}</h2>
                </div>

                {animation.pro && (
                  <div className='bg-black text-yellow-500 text-xs font-semibold flex items-center rounded-full px-2 py-[2px] z-50 absolute bottom-2 right-2'>
                    <SparklesIcon size={10} />
                  </div>
                )}
              </div>
            ) : null,
          )}
        </div>

        {!!animationEmoji && (
          <div className='my-6'>
            <div className='flex items-center justify-between'>
              <div className='w-3/4 h-[1px] bg-neutral-800' />
              <p className='text-white text-center text-sm w-full'>{t('steps.step6.animations.emojis')}</p>
              <div className='w-3/4 h-[1px] bg-neutral-800' />
            </div>

            <div className='grid grid-cols-3 gap-4 mt-6'>
              <div
                className='relative flex items-center justify-center h-20 bg-transparent border border-neutral-800 text-neutral-500 rounded-lg cursor-pointer'
                onClick={() => setPicker(1)}
              >
                {emoji1 ? <p className='text-4xl'>{emoji1}</p> : <PlusIcon size={24} />}

                {emoji1 && (
                  <button
                    onClick={e => {
                      e.preventDefault()
                      e.stopPropagation()

                      setEmoji1(null)
                    }}
                    className='absolute -top-2 -right-2 p-1 text-sm rounded-full font-bold bg-gray-100 hover:bg-red-500 hover:text-white text-neutral-900 flex items-center cursor-pointer justify-center'
                  >
                    <IconX size={14} />
                  </button>
                )}
              </div>
              <div
                className='relative flex items-center justify-center h-20 bg-transparent border border-neutral-800 text-neutral-500 rounded-lg cursor-pointer'
                onClick={() => setPicker(2)}
              >
                {emoji2 ? <p className='text-4xl'>{emoji2}</p> : <PlusIcon size={24} />}

                {emoji2 && (
                  <button
                    onClick={e => {
                      e.preventDefault()
                      e.stopPropagation()

                      setEmoji2(null)
                    }}
                    className='absolute -top-2 -right-2 p-1 text-sm rounded-full font-bold bg-gray-100 hover:bg-red-500 hover:text-white text-neutral-900 flex items-center cursor-pointer justify-center'
                  >
                    <IconX size={14} />
                  </button>
                )}
              </div>
              <div
                className='relative flex items-center justify-center h-20 bg-transparent border border-neutral-800 text-neutral-500 rounded-lg cursor-pointer'
                onClick={() => setPicker(3)}
              >
                {emoji3 ? <p className='text-4xl'>{emoji3}</p> : <PlusIcon size={24} />}

                {emoji3 && (
                  <button
                    onClick={e => {
                      e.preventDefault()
                      e.stopPropagation()

                      setEmoji3(null)
                    }}
                    className='absolute -top-2 -right-2 p-1 text-sm rounded-full font-bold bg-gray-100 hover:bg-red-500 hover:text-white text-neutral-900 flex items-center cursor-pointer justify-center'
                  >
                    <IconX size={14} />
                  </button>
                )}
              </div>
            </div>
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
                {t('steps.step6.back')}
              </>
            </span>
          </button>
          <button
            onClick={onSubmit}
            disabled={loading}
            className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-800 focus:outline-none focus:ring-0 ${
              loading ? 'opacity-50' : ''
            }`}
          >
            <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black px-3 py-1 text-sm font-semibold text-white backdrop-blur-3xl'>
              {loading ? (
                <IconLoader size={20} className='animate-spin' />
              ) : (
                <>
                  {t('steps.step6.button')}
                  <IconChevronRight size={20} className='ml-4' />
                </>
              )}
            </span>
          </button>
        </div>
      </div>

      <Dialog
        open={!!picker}
        onOpenChange={enable => {
          if (!enable) setPicker(null)
        }}
      >
        <DialogContent className='sm:max-w-[425px] flex flex-col items-center overflow-hidden justify-center max-w-[95vw] px-4 md:px-0 rounded-lg'>
          <DialogTitle title={''} />
          <DialogDescription title={''} />

          <EmojiPicker
            theme={Theme.DARK}
            onEmojiClick={e => {
              if (picker === 1) setEmoji1(e.emoji)
              if (picker === 2) setEmoji2(e.emoji)
              if (picker === 3) setEmoji3(e.emoji)

              if (animationEmoji) setAnimation(animationEmoji)
              setPicker(null)
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
