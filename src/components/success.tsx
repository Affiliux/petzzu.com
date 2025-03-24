'use client'

import React, { useEffect } from 'react'

import { useTranslations } from 'next-intl'
import { IconDownload } from '@tabler/icons-react'

import type { ChildProps } from '@/typings/child'

interface SuccessModalProps {
  child: ChildProps
  onClose: () => void
}

export const SuccessModal = ({ child, onClose }: SuccessModalProps) => {
  // hooks
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
      <p className='text-neutral-900 text-xl font-bold text-center -mt-14 lg:-mt-0'>{t('title')}</p>
      <p className='text-muted-foreground text-sm w-3/4 text-center'>{t('description')}</p>

      <div className='flex flex-col mb-4 items-center justify-center w-full mt-8 border-dashed border border-theme-800 p-8 rounded-lg'>
        {child?.qrCodeUrl && (
          <div className='border-2 border-theme-800 rounded-xl'>
            <img src={child?.qrCodeUrl} className='rounded-xl h-[200px]' width={200} height={200} alt='QR Code' />
          </div>
        )}

        <a
          href={child?.qrCodeUrl}
          target='_blank'
          className='text-white flex items-center justify-center text-center gap-2 text-xs lg:text-sm font-bold mt-4 cursor-pointer py-2 px-10 rounded-md bg-theme-900'
        >
          <IconDownload size={16} /> {t('buttons.download')}
        </a>
      </div>

      <button
        onClick={onClose}
        className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-200/60 focus:outline-none focus:ring-0`}
      >
        <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-theme-100 px-3 py-1 text-sm font-semibold text-theme-600 backdrop-blur-3xl'>
          {t('buttons.go')}
        </span>
      </button>
    </div>
  )
}
