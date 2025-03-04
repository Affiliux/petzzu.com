/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect } from 'react'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { IconDownload } from '@tabler/icons-react'

import { ChildProps } from '@/typings/child'

import { Animation } from './animation'

interface SuccessModalProps {
  child: ChildProps
  onClose: () => void
}

export const SuccessModal = ({ child, onClose }: SuccessModalProps) => {
  const t = useTranslations('checkout.success')

  useEffect(() => {
    if (window) {
      const url = new URL(window.location.href)
      url.searchParams.delete('afterPayment')

      window.history.replaceState({}, '', url)
    }
  }, [])

  return (
    <div className='flex flex-col h-full items-center'>
      <div className='flex flex-col h-32 lg:h-16 items-center'>
        <Animation src={'lotties/thanks.lottie'} className='w-[125px]' />
      </div>

      <p className='text-white text-xl font-bold text-center -mt-14 lg:-mt-0'>{t('title')}</p>
      <p className='text-neutral-300 text-sm w-3/4 text-center'>{t('description')}</p>

      <div className='flex flex-col mb-4 items-center justify-center w-full mt-8 border-dashed border border-neutral-800 p-8 rounded-lg'>
        {child?.qrCodeUrl && (
          <div className='border-2 border-neutral-800 rounded-xl'>
            <img src={child?.qrCodeUrl} className='rounded-xl h-[200px]' width={200} height={200} alt='QR Code' />
          </div>
        )}

        <a
          href={child?.qrCodeUrl}
          target='_blank'
          className='text-white flex items-center justify-center text-center gap-2 text-xs lg:text-sm font-bold mt-4 cursor-pointer py-2 px-10 rounded-md bg-red-600'
        >
          <IconDownload size={16} /> {t('buttons.download')}
        </a>
      </div>

      <button
        onClick={onClose}
        className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-800 focus:outline-none focus:ring-0`}
      >
        <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black px-3 py-1 text-sm font-semibold text-white backdrop-blur-3xl'>
          {t('buttons.go')}
        </span>
      </button>
    </div>
  )
}
