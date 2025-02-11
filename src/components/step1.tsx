'use client'

import React, { Dispatch, SetStateAction, useState } from 'react'

import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconChevronLeft, IconChevronRight, IconLoader } from '@tabler/icons-react'

import { CreatePrePayloadProps } from '@/typings/create'

import { Input } from './ui/input'

import { ThemeShowTypeEnum } from '@/enums'

interface Step1Props {
  theme: ThemeShowTypeEnum
  couple: CreatePrePayloadProps
  setCouple: Dispatch<SetStateAction<CreatePrePayloadProps>>
  onNext: () => Promise<void>
  onNew: ((coupleName: string) => Promise<void>) | null
  onBack: () => void
}

export const Step1 = ({ theme, couple, setCouple, onNext, onNew, onBack }: Step1Props) => {
  const t = useTranslations()

  const [loading, setLoading] = useState<boolean>(false)

  const formSchema = z.object({
    coupleName: z
      .string()
      .min(2, {
        message: t('steps.step1.input.errors.min'),
      })
      .max(100, {
        message: t('steps.step1.input.errors.max'),
      }),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      coupleName: couple.coupleName ?? '',
    },
  })

  const DISABLED = loading || !couple.coupleName?.length || !!errors.coupleName?.message

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)

    try {
      setCouple({ ...couple, coupleName: values.coupleName })

      if (onNew) await onNew(values.coupleName)
      else await onNext()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className='relative flex flex-col z-50 w-full mt-8' onSubmit={handleSubmit(onSubmit)}>
      <div className='relative'>
        <Input
          {...register('coupleName')}
          id='coupleName'
          placeholder={t('steps.step1.input.placeholder')}
          type='text'
          autoFocus={true}
          autoComplete='off'
          className='w-full'
          onChange={e =>
            setCouple({
              ...couple,
              coupleName: e.target.value.replace(
                /[^a-zA-ZÀ-ÿ0-9\s\p{Emoji}\s&!@()*\+\-_=,.?;:<>\/\\|^%$#\[\]{}~`'"]/gu,
                '',
              ),
            })
          }
        />
      </div>

      <p className='text-red-500 text-sm mt-1 text-right'>{errors.coupleName?.message}</p>

      <div className='flex items-center justify-between gap-4 mt-4'>
        <button
          type='button'
          onClick={onBack}
          disabled={loading}
          className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-800 focus:outline-none focus:ring-0 ${
            loading ? 'opacity-50' : ''
          }`}
        >
          <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black px-3 py-1 text-sm font-semibold text-white backdrop-blur-3xl'>
            <>
              <IconChevronLeft size={20} className='mr-4' />
              {t('steps.step1.back')}
            </>
          </span>
        </button>
        <button
          type='submit'
          disabled={DISABLED}
          className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-800 focus:outline-none focus:ring-0 ${
            DISABLED ? 'opacity-50' : ''
          }`}
        >
          <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black px-3 py-1 text-sm font-semibold text-white backdrop-blur-3xl'>
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
  )
}
