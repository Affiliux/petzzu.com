'use client'

import React, { Dispatch, SetStateAction, useState } from 'react'

import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { IconChevronLeft, IconChevronRight, IconLoader } from '@tabler/icons-react'

import { CreatePrePayloadProps } from '@/typings/create'

import RichTextEditor from './ui/text-editor'

import { ThemeShowTypeEnum } from '@/enums'

interface Step2Props {
  theme: ThemeShowTypeEnum
  couple: CreatePrePayloadProps
  setCouple: Dispatch<SetStateAction<CreatePrePayloadProps>>
  onNext: () => Promise<void>
  onBack: () => void
}

export const Step2 = ({ theme, couple, setCouple, onNext, onBack }: Step2Props) => {
  const t = useTranslations()

  const [loading, setLoading] = useState<boolean>(false)

  const {
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      message: couple.message ?? '',
    },
  })

  const VALUE = couple.message
    ?.replaceAll('<p>', '')
    .replaceAll('</p>', '')
    .replaceAll('<em>', '')
    .replaceAll('</em>', '')
    .replaceAll('<strong>', '')
    .replaceAll('</strong>', '')
    .replaceAll('<s>', '')
    .replaceAll('</s>', '')
  const DISABLED = loading || !couple.message?.length || !!errors.message?.message

  async function onSubmit(values: { message: string }) {
    setLoading(true)

    try {
      setCouple({ ...couple, message: values.message })
      await onNext()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className='relative flex flex-col z-50 w-full mt-8' onSubmit={handleSubmit(onSubmit)}>
      <div className='relative'>
        <RichTextEditor
          placeholder={t('steps.step2.input.placeholder')}
          value={couple.message ?? ''}
          onChange={e => {
            const formated = e
              ?.replaceAll('<p>', '')
              .replaceAll('</p>', '')
              .replaceAll('<em>', '')
              .replaceAll('</em>', '')
              .replaceAll('<strong>', '')
              .replaceAll('</strong>', '')
              .replaceAll('<s>', '')
              .replaceAll('</s>', '')

            if (theme === ThemeShowTypeEnum.DEFAULT) {
              if (formated.length > 750)
                setError('message', { message: t('steps.step2.input.errors.max', { limit: 750 }) })
              if (formated.length <= 750) clearErrors()
            } else {
              if (formated.length > 400)
                setError('message', { message: t('steps.step2.input.errors.max', { limit: 400 }) })
              if (formated.length <= 400) clearErrors()
            }

            setValue('message', e)
            setCouple({ ...couple, message: e })
          }}
        />

        <p className='absolute bottom-2 right-3 text-xs text-neutral-400'>
          {VALUE?.length ?? 0}/{theme === ThemeShowTypeEnum.DEFAULT ? 750 : 400}
        </p>
      </div>

      <p className='text-red-500 text-sm mt-2 text-right'>{errors.message?.message}</p>

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
              {t('steps.step2.back')}
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
                {t('steps.step2.button')}
                <IconChevronRight size={20} className='ml-4' />
              </>
            )}
          </span>
        </button>
      </div>
    </form>
  )
}
