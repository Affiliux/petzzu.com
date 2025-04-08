'use client'

import React, { useEffect, useState } from 'react'

import { useTranslations } from 'next-intl'
import { IconCopy } from '@tabler/icons-react'

import type { PaymentProps } from '@/typings/pet'

import { Button } from './ui/button'

interface PixPaymentProps {
  payment: PaymentProps
  onCheckPayment: () => Promise<void>
}

export const PixPayment = ({ payment, onCheckPayment }: PixPaymentProps) => {
  // hooks
  const t = useTranslations()

  // states
  const [copied, set_copied] = useState(false)
  const [check_times, set_check_times] = useState<number>(1)

  useEffect(() => {
    setTimeout(() => {
      onCheckPayment()
      set_check_times(prev => prev + 1)
    }, 10000)

    return () => {}
  }, [check_times])

  return (
    <div className='flex flex-col items-center justify-center space-y-4 py-4'>
      <div className='h-48 w-48 bg-muted rounded-lg flex items-center justify-center'>
        <img
          src={payment.qrCode64.includes('https') ? payment.qrCode64 : `data:image/jpeg;base64,${payment.qrCode64}`}
          className='rounded-xl h-[200px]'
          width={200}
          height={200}
          alt='QR Code'
        />
      </div>
      <div className='flex flex-col items-center justify-center space-y-4 lg:px-12'>
        <p className='text-center text-sm text-muted-foreground py-4'>{t('checkout.pix.description')}</p>
        <Button
          variant='outline'
          className='w-full'
          onClick={() => {
            if (typeof navigator !== 'undefined') navigator.clipboard.writeText(payment.qrCodeCode)
            set_copied(true)

            setTimeout(() => {
              set_copied(false)
            }, 5000)
          }}
        >
          <IconCopy className='text-white text-2xl' />
          {copied ? t('checkout.pix.tooltip.copied') : t('checkout.pix.tooltip.copy')}
        </Button>
      </div>
    </div>
  )
}
