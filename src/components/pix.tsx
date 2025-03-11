/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { IconCheck, IconCopy, IconLoader } from '@tabler/icons-react'

import { PaymentProps } from '@/typings/child'

interface PixPaymentProps {
  payment: PaymentProps
  onCheckPayment: () => Promise<void>
}

export const PixPayment = ({ payment, onCheckPayment }: PixPaymentProps) => {
  const t = useTranslations()

  const [loading, set_loading] = useState(false)
  const [copied, set_copied] = useState(false)
  const [check_times, set_check_times] = useState<number>(1)
  const [enableCheck, setEnableCheck] = useState<boolean>(false)

  async function onCheck() {
    set_loading(true)

    try {
      await onCheckPayment()
    } catch (error: any) {
      console.error(error)
    } finally {
      set_loading(false)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      onCheckPayment()
      set_check_times(prev => prev + 1)

      if (check_times >= 3) setEnableCheck(true)
    }, 5000)

    return () => {}
  }, [check_times])

  return (
    <div className='w-full flex flex-col h-full items-center'>
      <p className='text-white text-xl font-bold text-center'>{t('checkout.pix.title')}</p>
      <p className='text-neutral-300 text-sm w-3/4 text-center'>{t('checkout.pix.description')}</p>

      <div className='flex flex-col items-center justify-center w-full mt-8 border-dashed border border-neutral-800 p-8 rounded-lg'>
        <div className='border-2 border-neutral-800 rounded-xl'>
          <img
            src={payment.qrCode64.includes('https') ? payment.qrCode64 : `data:image/jpeg;base64,${payment.qrCode64}`}
            className='rounded-xl h-[200px]'
            width={200}
            height={200}
            alt='QR Code'
          />
        </div>
      </div>

      <div
        className={`flex flex-row h-32 xl:h-24 items-center justify-between mt-4 border ${
          copied ? 'border-green-700' : 'border-neutral-800'
        } border-dashed rounded-lg w-full mb-6`}
      >
        <p className='text-white break-all w-3/4 text-xs text-left p-4'>{payment.qrCodeCode}</p>
        <div
          className={`relative has-tooltip w-[20%] h-32 xl:h-24 ${
            copied ? 'bg-green-700' : 'border-neutral-800'
          } rounded-r-lg p-4 flex items-center justify-center cursor-pointer`}
          onClick={() => {
            if (typeof navigator !== 'undefined') navigator.clipboard.writeText(payment.qrCodeCode)
            set_copied(true)

            setTimeout(() => {
              set_copied(false)
            }, 5000)
          }}
        >
          <IconCopy className='text-white text-2xl' />
          {copied ? (
            <span className='tooltip p-2 rounded bg-green-600 text-white text-xs absolute -right-14 overflow-hidden lg:-right-8'>
              {t('checkout.pix.tooltip.copied')}
            </span>
          ) : (
            <span className='tooltip p-2 rounded bg-white text-gray-600 text-xs absolute -right-11 overflow-hidden lg:-right-4'>
              {t('checkout.pix.tooltip.copy')}
            </span>
          )}
        </div>
      </div>

      {enableCheck && (
        <button
          onClick={onCheck}
          className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] bg-green-500 hover:bg-green-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-0 ${
            loading ? 'opacity-50' : ''
          }`}
        >
          <span className='inline-flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-600 hover:bg-green-700 transition-colors duration-200 ease-in-out px-3 py-1 text-sm font-semibold text-white backdrop-blur-3xl'>
            {loading ? (
              <IconLoader size={20} className='animate-spin' />
            ) : (
              <>
                <IconCheck size={20} />
                {t('checkout.pix.button')}
              </>
            )}
          </span>
        </button>
      )}
    </div>
  )
}
