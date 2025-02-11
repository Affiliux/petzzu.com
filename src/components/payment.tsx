'use client'

import React, { useState } from 'react'

import { useTranslations } from 'next-intl'

import { PaymentFormProps } from '@/typings/application'
import { useApplication } from '@/contexts/ApplicationContext'

import { CardForm } from './card-form'
import { PayPalForm } from './paypal-form'
import { PixForm } from './pix-form'
import { StripeForm } from './stripe-form'

import { PaymentMethodsEnum } from '@/enums'

interface PaymentsProps {
  onCreate: (payment_info: PaymentFormProps) => Promise<void>
}

export const Payment = ({ onCreate }: PaymentsProps) => {
  const t = useTranslations()

  const { currency } = useApplication()

  const SHOW_PIX = currency === 'brl'
  const SHOW_STONE_CARD = currency === 'brl'
  const SHOW_PAYPAL = currency !== 'brl'
  const SHOW_STRIPE = currency !== 'brl'

  const [method, setMethod] = useState<string>(SHOW_PIX ? PaymentMethodsEnum.PIX : PaymentMethodsEnum.PAYPAL)

  const IS_PIX = method === PaymentMethodsEnum.PIX
  const IS_STONE_CARD = method === PaymentMethodsEnum.STONE_CARD
  const IS_PAYPAL = method === PaymentMethodsEnum.PAYPAL
  const IS_STRIPE = method === PaymentMethodsEnum.STRIPE

  return (
    <div className='flex items-center justify-center w-full relative z-50'>
      <div className='relative lg:w-1/2 w-full h-full px-6 lg:px-12 py-8'>
        <div>
          <h2 className='text-lg font-semibold text-neutral-100'>{t('checkout.payment.select-method')}</h2>

          <div className='flex flex-col lg:flex-row items-center justify-between gap-4 mt-4 mb-8'>
            {SHOW_PIX && (
              <div
                className={`border border-neutral-800 rounded-lg p-4 w-full h-16 lg:h-20 flex items-center justify-center transform duration-100 ${
                  !SHOW_PIX
                    ? 'opacity-40 cursor-not-allowed'
                    : IS_PIX
                      ? 'opacity-100 border-1 border-neutral-500 brightness-125'
                      : 'opacity-50'
                }`}
                onClick={() => SHOW_PIX && setMethod(PaymentMethodsEnum.PIX)}
              >
                <img
                  src='/images/pix.png'
                  alt='Payment methods'
                  className='w-2/4 lg:w-2/3 h-12 lg:h-16 object-contain'
                  width={200}
                  height={200}
                />
              </div>
            )}

            {SHOW_STONE_CARD && (
              <div
                className={`border border-neutral-800 rounded-lg p-4 w-full h-16 lg:h-20 flex items-center justify-center transform duration-100 ${
                  !SHOW_STONE_CARD
                    ? 'opacity-40 cursor-not-allowed'
                    : IS_STONE_CARD
                      ? 'opacity-100 border-1 border-neutral-500 brightness-125'
                      : 'opacity-50'
                }`}
                onClick={() => SHOW_STONE_CARD && setMethod(PaymentMethodsEnum.STONE_CARD)}
              >
                <img
                  src='/images/stone-card.png'
                  alt='Payment methods'
                  className='w-3/4 lg:w-4/5 h-12 lg:h-16 object-contain'
                  width={200}
                  height={200}
                />
              </div>
            )}

            {SHOW_PAYPAL && (
              <div
                className={`border border-neutral-800 rounded-lg p-4 w-full h-16 lg:h-20 flex items-center justify-center transform duration-100 ${
                  !SHOW_PAYPAL
                    ? 'opacity-40 cursor-not-allowed'
                    : IS_PAYPAL
                      ? 'opacity-100 border-1 border-neutral-500 brightness-125'
                      : 'opacity-50'
                }`}
                onClick={() => SHOW_PAYPAL && setMethod(PaymentMethodsEnum.PAYPAL)}
              >
                <img
                  src='/images/paypal-icon.png'
                  alt='Payment methods'
                  className='w-2/4 lg:w-3/4 h-12 lg:h-16 object-contain'
                  width={200}
                  height={200}
                />
              </div>
            )}

            {SHOW_STRIPE && (
              <div
                className={`border border-neutral-800 rounded-lg p-4 w-full h-16 lg:h-20 flex items-center justify-center transform duration-100 ${
                  !SHOW_STRIPE
                    ? 'opacity-40 cursor-not-allowed'
                    : IS_STRIPE
                      ? 'opacity-100 border-1 border-neutral-500 brightness-125'
                      : 'opacity-50'
                }`}
                onClick={() => SHOW_STRIPE && setMethod(PaymentMethodsEnum.STRIPE)}
              >
                <img
                  src='/images/stripe-icon.png'
                  alt='Payment methods'
                  className='w-3/4 lg:w-4/5 h-12 lg:h-16 object-contain'
                  width={200}
                  height={200}
                />
              </div>
            )}
          </div>
        </div>

        <div className='w-full flex flex-col items-center justify-center'>
          {IS_PIX && <PixForm onCreate={onCreate} />}
          {IS_STONE_CARD && <CardForm onCreate={onCreate} />}
          {IS_PAYPAL && <PayPalForm onCreate={onCreate} />}
          {IS_STRIPE && <StripeForm onCreate={onCreate} />}

          <img src='./pagarme-extend.png' alt='pagarme logo' className='h-8 lg:h-6 mt-8' />

          <p className='text-xs text-neutral-700 mt-4'>
            Made by <b>Affiliux Digital Ltda</b>
          </p>
          <p className='text-xs text-neutral-700 pb-8'>CNPJ: 58.055.152/0001-71</p>
        </div>
      </div>
    </div>
  )
}
