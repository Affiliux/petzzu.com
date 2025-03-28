'use client'

import React, { useState } from 'react'

import { useTranslations } from 'next-intl'
import { IconBrandStripeFilled, IconLoader } from '@tabler/icons-react'

import type { PaymentFormProps } from '@/typings/application'

import { PaymentMethodsEnum } from '@/enums'

interface StripeFormProps {
  onCreate: (payment_info: PaymentFormProps) => Promise<void>
}

export const StripeForm = ({ onCreate }: StripeFormProps) => {
  // hooks
  const t = useTranslations()

  // states
  const [loading, set_loading] = useState<boolean>(false)

  // variables
  const DISABLED = loading

  async function handleSubmit() {
    set_loading(true)

    try {
      await onCreate({
        method: PaymentMethodsEnum.STRIPE,
      })
    } catch (error: any) {
      console.error(error)
    } finally {
      set_loading(false)
    }
  }

  return (
    <div className='relative flex flex-col gap-4 z-50 w-full'>
      <div className='flex items-center justify-between gap-4 mt-4'>
        <button
          type='button'
          onClick={handleSubmit}
          disabled={DISABLED}
          className={`text-white bg-[#554CFF] hover:bg-[#554CFF]/90 focus:ring-4 focus:ring-[#554CFF]/50 font-semibold rounded-lg text-md px-5 py-3 text-center dark:focus:ring-[#554CFF]/50 w-full flex items-center justify-center mr-2 mb-2  ${
            DISABLED ? 'opacity-50' : ''
          }`}
        >
          {loading ? (
            <IconLoader className='animate-spin mr-2 -ml-1 w-4 h-4' />
          ) : (
            <IconBrandStripeFilled className='mr-2 -ml-1 w-4 h-4' />
          )}
          Check out with Stripe
        </button>
      </div>
    </div>
  )
}
