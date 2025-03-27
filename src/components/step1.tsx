'use client'

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconChevronLeft, IconChevronRight, IconLoader } from '@tabler/icons-react'

import type { CreatePrePayloadProps } from '@/typings/create'
import { useApplication } from '@/contexts/ApplicationContext'

import { Input } from './ui/input'

import { SexEnum, ThemeShowTypeEnum } from '@/enums'

interface Step1Props {
  isEdit?: boolean
  child: CreatePrePayloadProps
  setChild: Dispatch<SetStateAction<CreatePrePayloadProps>>
  onNew?: ((child_name: string) => Promise<void>) | null
  onNext: () => Promise<void>
  onBack?: () => void
  themeShowType: ThemeShowTypeEnum
  setThemeShowType: Dispatch<SetStateAction<ThemeShowTypeEnum>>
}

export const Step1 = ({ isEdit, child, setChild, onNext, onNew, onBack, themeShowType, setThemeShowType }: Step1Props) => {
  // hooks
  const t = useTranslations()
  const { onChangeTheme } = useApplication()

  const formSchema = z.object({
    child_name: z
      .string()
      .min(2, {
        message: t('steps.step1.input.errors.min'),
      })
      .max(100, {
        message: t('steps.step1.input.errors.max'),
      }),
    gender: z.string({
      message: t('steps.step1.gender.errors.required'),
    }),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      child_name: child.child_name ?? '',
      gender: '',
    },
  })

  // states
  const [loading, setLoading] = useState<boolean>(false)

  // variables
  const DISABLED =
    loading ||
    !child.child_name?.length ||
    !!errors.child_name?.message ||
    !child.sex?.length ||
    !!errors.gender?.message
  const SEX_OPTIONS = [
    { id: 1, name: t('steps.step1.gender.options.male'), data: SexEnum.MALE },
    { id: 2, name: t('steps.step1.gender.options.female'), data: SexEnum.FEMALE },
  ]

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)

    try {
      setChild({ ...child, child_name: values.child_name, sex: values.gender })

      if (onNew) await onNew(values.child_name)
      else await onNext()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

 const themes = [
   { id: 1, name: t('steps.step1.theme-show-types.blue'), data: ThemeShowTypeEnum.BLUE, color: '#7DA2FF' },
   { id: 2, name: t('steps.step1.theme-show-types.gold'), data: ThemeShowTypeEnum.GOLD, color: '#FFF2B3' },
   { id: 3, name: t('steps.step1.theme-show-types.pink'), data: ThemeShowTypeEnum.PINK, color: '#F997CD' },
   { id: 4, name: t('steps.step1.theme-show-types.green'), data: ThemeShowTypeEnum.GREEN, color: '#95BA7C' },
   { id: 5, name: t('steps.step1.theme-show-types.lilac'), data: ThemeShowTypeEnum.LILAC, color: '#E9D8FF' },
   { id: 6, name: t('steps.step1.theme-show-types.red'), data: ThemeShowTypeEnum.RED, color: '#FFB2B2' },
   { id: 7, name: t('steps.step1.theme-show-types.gray'), data: ThemeShowTypeEnum.GRAY, color: '#D9D9D9' },
 ]

  useEffect(() => {
    setValue('child_name', child.child_name)
    setValue('gender', child.sex)
  }, [child])

  return (
    <form className='relative flex flex-col z-50 w-full mt-8' onSubmit={handleSubmit(onSubmit)}>
      <div className='relative'>
        <Input
          {...register('child_name')}
          id='child_name'
          placeholder={t('steps.step1.input.placeholder')}
          type='text'
          autoFocus={true}
          autoComplete='off'
          className='w-full'
          onChange={e =>
            setChild({
              ...child,
              child_name: e.target.value.replace(
                /[^a-zA-ZÀ-ÿ0-9\s\p{Emoji}\s&!@()*\+\-_=,.?;:<>\/\\|^%$#\[\]{}~`'"]/gu,
                '',
              ),
            })
          }
        />

        <p className='text-red-500 text-sm mt-1 text-right'>{errors.child_name?.message}</p>
      </div>

      <div className='w-full mt-4'>
        <h2 className='font-semibold text-neutral-900'>{t('steps.step1.gender.title')}</h2>
        <div className='flex flex-col md:flex-row gap-2 mt-4'>
          {SEX_OPTIONS.map(sex => (
            <div
              key={sex.id}
              className='flex items-center space-x-3 space-y-0 rounded-lg border p-4 cursor-pointer hover:bg-neutral-100/20 border-neutral-200/60 w-full'
              onClick={() => {
                setChild({ ...child, sex: sex.data })
                setValue('gender', sex.data)
              }}
            >
              {sex.data === child.sex ? (
                <div className='border border-theme-300 rounded-full h-4 w-4 flex items-center justify-center'>
                  <div className='bg-theme-800 rounded-full h-2.5 w-2.5' />
                </div>
              ) : (
                <div className='border border-neutral-200/60 rounded-full h-4 w-4' />
              )}
              <p className='text-sm font-medium leading-none text-neutral-800'>{sex.name}</p>
            </div>
          ))}
        </div>

        <p className='text-red-500 text-sm mt-1 text-right'>{errors.gender?.message}</p>
      </div>

      <div className='w-full mt-4'>
        <h2 className='font-semibold text-neutral-900'>{t('steps.step1.theme-show-types.title')}</h2>
        <div className='grid grid-cols-2 gap-2 mt-4'>
          {themes.map(theme => (
            <div
              key={theme.id}
              className={`flex items-center rounded-lg border p-4 cursor-pointer hover:bg-neutral-100/20 border-neutral-200/60 w-full`}
              onClick={() => {
                setThemeShowType(theme.data)
                setChild(prev => ({ ...prev, themeShowType: theme.data }))
                onChangeTheme(theme.data)
              }}
            >
              {theme.data === themeShowType ? (
                <div className='border border-theme-300 rounded-full h-4 w-4 flex items-center justify-center mr-2'>
                  <div className='bg-theme-800 rounded-full h-2.5 w-2.5' />
                </div>
              ) : (
                <div className='border border-neutral-200/60 rounded-full h-4 w-4 mr-2' />
              )}
              <div className='w-4 h-4 rounded-md mr-2' style={{ backgroundColor: theme.color }} />
              <h2 className='text-sm font-medium leading-none text-neutral-800 truncate'>{theme.name}</h2>
            </div>
          ))}
        </div>
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
  )
}
