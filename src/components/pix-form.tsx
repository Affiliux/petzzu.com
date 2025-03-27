'use client'

import React, { useState } from 'react'

import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconLoader } from '@tabler/icons-react'

import type { PaymentFormProps } from '@/typings/application'
import type { PaymentProps } from '@/typings/child'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { PhoneInput } from './ui/phone-input'
import { PixPayment } from './pix'

import { PaymentMethodsEnum } from '@/enums'
import { removeMask } from '@/lib/helpers/formatters'
import { maskCPF } from '@/lib/helpers/masks'
import { validateCPF, validateName } from '@/lib/helpers/validators'

interface PixFormProps {
  onCreate: (payment_info: PaymentFormProps) => Promise<void>
  onCheckPayment: () => Promise<void>
  payment: PaymentProps
}

export const PixForm = ({ onCreate, onCheckPayment, payment }: PixFormProps) => {
  // hooks
  const t = useTranslations()

  const formSchema = z.object({
    name: z
      .string()
      .nonempty(t('checkout.payment.inputs.name.required'))
      .refine(value => !validateName(value), {
        message: t('checkout.payment.inputs.name.invalid'),
      }),
    document: z
      .string()
      .nonempty(t('checkout.payment.inputs.document.required'))
      .refine(value => validateCPF(value), {
        message: t('checkout.payment.inputs.document.invalid'),
      }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    reValidateMode: 'onChange',
    mode: 'onBlur',
    defaultValues: {
      name: '',
      document: '',
    },
  })

  // states
  const [loading, set_loading] = useState<boolean>(false)

  // variables
  const DISABLED =
    loading || !form.formState.isDirty || !!form.formState.errors.document || !!form.formState.errors.name

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    set_loading(true)

    try {
      await onCreate({
        method: PaymentMethodsEnum.PIX,
        name: values.name.trim(),
        document: removeMask(values.document.trim()),
      })
    } catch (error: any) {
      console.error(error)
    } finally {
      set_loading(false)
    }
  }

  return (
    <div className='relative flex flex-col gap-4 z-50 w-full'>
      {payment ? (
        <PixPayment payment={payment} onCheckPayment={onCheckPayment} />
      ) : (
        <Form {...form}>
          <form
            className='relative flex flex-col justify-between gap-2 z-50 mt-4 w-full lg:h-full'
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className='flex flex-col gap-2 rounded-lg'>
              <div className='w-full'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('checkout.payment.inputs.name.label')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('checkout.payment.inputs.name.placeholder')}
                          autoCapitalize='words'
                          className='w-full'
                          {...field}
                          onChange={e => field.onChange(e.target.value.replace(/[^a-zA-ZÀ-ÿ\s`'"]/gu, ''))}
                        />
                      </FormControl>

                      <FormMessage className='text-red-500 text-sm mt-1 text-right'>
                        {form.formState.errors.name?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              <div className='w-full'>
                <FormField
                  control={form.control}
                  name='document'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('checkout.payment.inputs.document.label')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('checkout.payment.inputs.document.placeholder')}
                          className='w-full'
                          {...field}
                          onChange={e => field.onChange(maskCPF(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage className='text-red-500 text-sm mt-1 text-right'>
                        {form.formState.errors.document?.message}
                      </FormMessage>
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
                  {loading ? (
                    <IconLoader size={20} className='animate-spin' />
                  ) : (
                    t('checkout.payment.buttons.create-pix')
                  )}
                </span>
              </button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
