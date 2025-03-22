'use client'

import React, { useState } from 'react'

import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconLoader } from '@tabler/icons-react'

import type { PaymentFormProps } from '@/typings/application'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { PhoneInput } from './ui/phone-input'

import { PaymentMethodsEnum } from '@/enums'
import { removeMask } from '@/lib/helpers/formatters'

interface PayPalFormProps {
  onCreate: (payment_info: PaymentFormProps) => Promise<void>
}

export const PayPalForm = ({ onCreate }: PayPalFormProps) => {
  // hooks
  const t = useTranslations()

  const formSchema = z.object({
    email: z.string().nonempty(t('checkout.payment.inputs.email.required')),
    phone: z.string().nonempty(t('checkout.payment.inputs.phone.required')),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    reValidateMode: 'onChange',
    mode: 'onBlur',
    defaultValues: {
      email: '',
      phone: '',
    },
  })

  // states
  const [loading, set_loading] = useState<boolean>(false)

  // variables
  const DISABLED = loading || !form.formState.isDirty || !!form.formState.errors.email || !!form.formState.errors.phone

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    set_loading(true)

    try {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

      if (regex.test(values.email.trim())) {
        await onCreate({
          method: PaymentMethodsEnum.PAYPAL,
          email: values.email.trim(),
          phone: removeMask(values.phone.trim()),
        })
      } else {
        form.setError('email', { message: t('checkout.inputs.email.invalid') })
      }
    } catch (error: any) {
      console.error(error)
    } finally {
      set_loading(false)
    }
  }

  return (
    <div className='relative flex flex-col gap-4 z-50 w-full'>
      <Form {...form}>
        <form
          className='relative flex flex-col justify-between gap-2 z-50 mt-4 w-full lg:h-full'
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className='flex flex-col gap-2 rounded-lg'>
            <div className='w-full'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('checkout.payment.inputs.email.label')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('checkout.payment.inputs.email.placeholder')}
                        type='email'
                        className='w-full'
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className='text-red-500 text-sm mt-1 text-right'>
                      {form.formState.errors.email?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <div className='w-full'>
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('checkout.payment.inputs.phone.label')}</FormLabel>
                    <FormControl>
                      <PhoneInput
                        placeholder={t('checkout.payment.inputs.phone.placeholder')}
                        className='w-full'
                        onChange={e => field.onChange(e)}
                      />
                    </FormControl>

                    <FormMessage className='text-red-500 text-sm mt-1 text-right'>
                      {form.formState.errors.phone?.message}
                    </FormMessage>

                    <p className='text-neutral-500 text-xs mt-2'>{t('checkout.payment.inputs.phone.important')}</p>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className='flex items-center justify-between gap-4 mt-4'>
            <button
              type='submit'
              disabled={DISABLED}
              className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-green-700 focus:outline-none focus:ring-0 ${
                DISABLED ? 'opacity-50' : ''
              }`}
            >
              <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-green-600 px-3 py-1 text-sm font-semibold text-white backdrop-blur-3xl'>
                {loading ? <IconLoader size={20} className='animate-spin' /> : t('checkout.payment.buttons.go-to')}
              </span>
            </button>
          </div>
        </form>
      </Form>
    </div>
  )
}
