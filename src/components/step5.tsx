'use client'

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconChevronLeft, IconChevronRight, IconLoader } from '@tabler/icons-react'

import type { CreatePrePayloadProps } from '@/typings/create'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { PhoneInput } from './ui/phone-input'

import { formatToE164, removeMask } from '@/lib/helpers/formatters'

interface Step5Props {
  child: CreatePrePayloadProps
  setChild: Dispatch<SetStateAction<CreatePrePayloadProps>>
  onNext: () => Promise<void>
  onBack?: () => void
}

export const Step5 = ({ child, setChild, onNext, onBack }: Step5Props) => {
  // hooks
  const t = useTranslations()

  const formSchema = z.object({
    email: z.string({ message: t('steps.step5.inputs.email.required') }),
    phone: z.string({ message: t('steps.step5.inputs.email.required') }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      email: child.email || '',
      phone: child.phoneNumber ? formatToE164(child.phoneNumber) : '',
    },
  })

  // states
  const [loading, setLoading] = useState<boolean>(false)

  // variables
  const DISABLED = loading || !form.formState.isDirty || !!form.formState.errors.email || !!form.formState.errors.phone

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)

    try {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

      const email = values.email.trim()
      const ddd = removeMask(values.phone.trim()).slice(0, 2)
      const phoneNumber = removeMask(values.phone.trim()).slice(2)

      if (!regex.test(email)) {
        form.setError('email', { message: t('steps.step5.inputs.email.invalid') })
        return
      }

      if (phoneNumber.length < 9 || ddd.length < 1) {
        form.setError('phone', { message: t('steps.step5.inputs.phone.invalid') })
        return
      }

      setChild({
        ...child,
        email,
        ddd,
        phoneNumber,
      })

      await onNext()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Form {...form}>
        <form className='relative flex flex-col z-50 w-full mt-8' onSubmit={form.handleSubmit(handleSubmit)}>
          <div className='flex flex-col gap-2 rounded-lg'>
            <div className='w-full'>
              <FormField
                control={form.control}
                name='email'
                render={({ field: { onChange, ...props } }) => (
                  <FormItem>
                    <FormLabel>{t('steps.step5.inputs.email.label')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('steps.step5.inputs.email.placeholder')}
                        type='email'
                        className='w-full'
                        onChange={e => {
                          onChange(e)
                          const email = e.target.value.trim()

                          setChild(prevChild => ({
                            ...prevChild,
                            email: email,
                          }))
                        }}
                        {...props}
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
                    <FormLabel>{t('steps.step5.inputs.phone.label')}</FormLabel>
                    <FormControl>
                      <PhoneInput
                        value={field.value}
                        defaultCountry={t('config.defaults.country').split('-')[1] as any}
                        placeholder={t('steps.step5.inputs.phone.placeholder')}
                        className='w-full'
                        onChange={e => {
                          field.onChange(e)

                          const ddd = removeMask(e.trim()).slice(0, 2)
                          const phoneNumber = removeMask(e.trim()).slice(2)

                          setChild(prev => ({
                            ...prev,
                            ddd,
                            phoneNumber,
                          }))
                        }}
                        onBlur={field.onBlur}
                      />
                    </FormControl>

                    <FormMessage className='text-red-500 text-sm mt-1 text-right'>
                      {form.formState.errors.phone?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className='flex items-center justify-between gap-4 mt-8'>
            {onBack && (
              <button
                type='button'
                onClick={onBack}
                disabled={loading}
                className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-200/60 focus:outline-none focus:ring-0 ${
                  loading ? 'opacity-50' : ''
                }`}
              >
                <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-theme-100 px-3 py-1 text-sm font-semibold text-theme-600 backdrop-blur-3xl'>
                  <>
                    <IconChevronLeft size={20} className='mr-4' />
                    {t('steps.step1.back')}
                  </>
                </span>
              </button>
            )}
            <button
              type='submit'
              disabled={DISABLED}
              className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-200/60 focus:outline-none focus:ring-0 ${
                DISABLED ? 'opacity-50' : ''
              }`}
            >
              <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-theme-100 px-3 py-1 text-sm font-semibold text-theme-600 backdrop-blur-3xl'>
                {loading ? (
                  <IconLoader size={20} className='animate-spin' />
                ) : (
                  <>
                    {t('steps.step1.button')}
                    <IconChevronRight size={20} className='ml-4' />
                  </>
                )}
              </span>
            </button>
          </div>
        </form>
      </Form>
    </div>
  )
}
