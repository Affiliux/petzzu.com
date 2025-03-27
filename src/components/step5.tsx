'use client'

import React, { Dispatch, SetStateAction, useState } from 'react'

import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconChevronLeft, IconChevronRight, IconLoader } from '@tabler/icons-react'

import { CreatePrePayloadProps } from '@/typings/create'
import { useCreate } from '@/contexts/CreateContext'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { PhoneInput } from './ui/phone-input'

import formatToE164 from '@/lib/helpers/formatters/formatToE164'

interface Step5Props {
  isEdit?: boolean
  onNext: () => Promise<void>
  onBack?: () => void
  child: CreatePrePayloadProps
  setChild: Dispatch<SetStateAction<CreatePrePayloadProps>>
}

export const Step5 = ({ isEdit, onNext, onBack, child, setChild }: Step5Props) => {
  // hooks
  const t = useTranslations()

  // states
  const [loading, setLoading] = useState<boolean>(false)

  const formSchema = z.object({
    email: z.string().nonempty(t('checkout.payment.inputs.email.required')),
    phoneNumber: z.string().nonempty(t('checkout.payment.inputs.phone.required')),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    reValidateMode: 'onChange',
    mode: 'onBlur',
    defaultValues: {
      email: child.email || '',
      phoneNumber: child.phoneNumber ? formatToE164(child.phoneNumber) : '',
    },
  })

  const DISABLED = loading || !!form.formState.errors.email || !!form.formState.errors.phoneNumber

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

      if (regex.test(values.email.trim())) {
        const email = values.email.trim()
        const phoneNumber = values.phoneNumber

        setChild(prevChild => ({
          ...prevChild,
          email: email,
          phoneNumber: phoneNumber,
          ddd: phoneNumber.slice(1, 3),
        }))

        await onNext()
      } else {
        form.setError('email', { message: t('checkout.payment.inputs.email.invalid') })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form className='relative flex flex-col z-50 w-full mt-8' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-4'>
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
                    onChange={value => {
                      field.onChange(value)
                      setChild(prevChild => ({
                        ...prevChild,
                        email: value.target.value,
                      }))
                    }}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage className='text-red-500 text-sm mt-1 text-right'>
                  {form.formState.errors.email?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='phoneNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('checkout.payment.inputs.phone.label')}</FormLabel>
                <FormControl>
                  <PhoneInput
                    placeholder={t('checkout.payment.inputs.phone.placeholder')}
                    className='w-full'
                    defaultCountry='BR'
                    value={field.value}
                    onChange={value => {
                      field.onChange(value)
                      setChild(prevChild => ({
                        ...prevChild,
                        phoneNumber: value,
                      }))
                    }}
                    onBlur={field.onBlur}
                  />
                </FormControl>
                <FormMessage className='text-red-500 text-sm mt-1 text-right'>
                  {form.formState.errors.phoneNumber?.message}
                </FormMessage>
                <p className='text-neutral-500 text-xs mt-2'>{t('checkout.payment.inputs.phone.important')}</p>
              </FormItem>
            )}
          />
        </div>

        <div className='flex items-center justify-between gap-4 mt-4'>
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
                  {isEdit ? t('pages.account.pages.edit.actions.next') : t('steps.step1.button')}
                  <IconChevronRight size={20} className='ml-4' />
                </>
              )}
            </span>
          </button>
        </div>
      </form>
    </Form>
  )
}
