'use client'

import React, { Dispatch, SetStateAction, useState } from 'react'

import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconChevronLeft, IconChevronRight, IconLoader } from '@tabler/icons-react'

import type { CreatePrePayloadProps } from '@/typings/create'
import { useApplication } from '@/contexts/ApplicationContext'

import { Input } from './ui/input'

import { ThemeShowTypeEnum } from '@/enums'

interface Step1Props {
  isEdit?: boolean
  pet: CreatePrePayloadProps
  setPet: Dispatch<SetStateAction<CreatePrePayloadProps>>
  onNew?: ((pet_name: string) => Promise<void>) | null
  onNext: () => Promise<void>
  onBack?: () => void
  themeShowType: ThemeShowTypeEnum
  setThemeShowType: Dispatch<SetStateAction<ThemeShowTypeEnum>>
}

export const Step1 = ({ isEdit, pet, setPet, onNext, onNew, onBack, themeShowType, setThemeShowType }: Step1Props) => {
  const t = useTranslations()
  const { onChangeTheme } = useApplication()

  const formSchema = z.object({
    pet_name: z.string().min(2).max(100),
    breed: z.string().min(2).max(50),
    species: z.string().min(2).max(50),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      pet_name: pet.pet_name ?? '',
      breed: '',
      species: '',
    },
  })

  const [loading, setLoading] = useState<boolean>(false)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      setPet({ ...pet, pet_name: values.pet_name })
      if (onNew) await onNew(values.pet_name)
      else await onNext()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const themes = [
    { id: 1, name: 'Azul', data: ThemeShowTypeEnum.BLUE, color: '#7DA2FF' },
    { id: 2, name: 'Dourado', data: ThemeShowTypeEnum.GOLD, color: '#FFF2B3' },
    { id: 3, name: 'Rosa', data: ThemeShowTypeEnum.PINK, color: '#F997CD' },
    { id: 4, name: 'Verde', data: ThemeShowTypeEnum.GREEN, color: '#95BA7C' },
    { id: 5, name: 'Lilás', data: ThemeShowTypeEnum.LILAC, color: '#E9D8FF' },
    { id: 6, name: 'Vermelho', data: ThemeShowTypeEnum.RED, color: '#FFB2B2' },
    { id: 7, name: 'Cinza', data: ThemeShowTypeEnum.GRAY, color: '#e5e5e5' },
  ]

  return (
    <form className='relative flex flex-col z-50 w-full mt-8' onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2 className='font-semibold text-neutral-900'>{t('steps.step1.input.title')}</h2>
        <Input
          {...register('pet_name')}
          id='pet_name'
          placeholder={t('steps.step1.input.placeholder')}
          className='w-full'
        />
        <p className='text-red-500 text-sm mt-1'>{errors.pet_name?.message}</p>
      </div>
      <div className='mt-4'>
        <h2 className='font-semibold text-neutral-900'>{t('steps.step1.species.title')}</h2>
        <Input
          {...register('species')}
          id='species'
          placeholder={t('steps.step1.species.placeholder')}
          className='w-full'
        />
        <p className='text-red-500 text-sm mt-1'>{errors.species?.message}</p>
      </div>
      <div className='mt-4'>
        <h2 className='font-semibold text-neutral-900'>{t('steps.step1.breed.title')}</h2>
        <Input {...register('breed')} id='breed' placeholder={t('steps.step1.breed.placeholder')} className='w-full' />
        <p className='text-red-500 text-sm mt-1'>{errors.breed?.message}</p>
      </div>
      <div className='w-full mt-4'>
        <h2 className='font-semibold text-neutral-900'>{t('steps.step1.theme-show-types.title')}</h2>
        <div className='grid grid-cols-2 gap-2 mt-4'>
          {themes.map(theme => (
            <div
              key={theme.id}
              className='flex items-center rounded-lg border p-4 cursor-pointer hover:bg-neutral-100/20 border-neutral-200/60 w-full'
              onClick={() => {
                setThemeShowType(theme.data)
                if (isEdit) {
                  setPet(prev => ({ ...prev, themeShowType: theme.data }))
                }
                onChangeTheme(theme.data)
                localStorage.setItem('NEXT_THEME', theme.data)
              }}
            >
              <div className='w-4 h-4 rounded-md mr-2' style={{ backgroundColor: theme.color }} />
              <h2 className='text-sm font-medium leading-none text-neutral-800 truncate'>{theme.name}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='flex items-center justify-between gap-4 mt-8'>
        {onBack && (
          <button
            type='button'
            onClick={onBack}
            disabled={loading}
            className='relative w-full inline-flex h-[3.2rem] rounded-lg p-[2px] border'
          >
            <span className='inline-flex h-full w-full items-center justify-center rounded-lg bg-theme-100 px-3 py-1 text-sm font-semibold text-theme-600'>
              <IconChevronLeft size={20} className='mr-4' /> Voltar
            </span>
          </button>
        )}
        <button
          type='submit'
          disabled={loading}
          className='relative w-full inline-flex h-[3.2rem] rounded-lg p-[2px] border'
        >
          <span className='inline-flex h-full w-full items-center justify-center rounded-lg bg-theme-100 px-3 py-1 text-sm font-semibold text-theme-600'>
            {loading ? (
              <IconLoader size={20} className='animate-spin' />
            ) : (
              <>
                Continuar <IconChevronRight size={20} className='ml-4' />
              </>
            )}
          </span>
        </button>
      </div>
    </form>
  )
}
