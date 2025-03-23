'use client'

import React, { useEffect, useState } from 'react'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { useAccount } from '@/contexts/AccountContext'

import { toast } from '@/hooks/use-toast'

import { HeaderEdit } from './components/header-edit'

export const runtime = 'edge'

export default function Page() {
  // hooks
  const t = useTranslations()
  const router = useRouter()

  // contexts
  const { selected } = useAccount()

  // steps
  const [step, set_step] = useState(1)

  // variables
  const steps = []

  async function handleSave() {
    try {
      toast({
        title: t('pages.account.pages.edit.toast.success.title'),
        description: t('pages.account.pages.edit.toast.success.description'),
        variant: 'default',
      })
      router.push('/account/pages')
    } catch (error: any) {
      console.error(error)

      toast({
        title: t('pages.account.pages.edit.toast.error.title'),
        description: t('pages.account.pages.edit.toast.error.description'),
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    if (!selected) router.push('/account/pages')

    if (selected) {
      //
    }
  }, [selected])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [step])

  return (
    <div className='w-full'>
      <div className='border-b border-neutral-800 pb-12'>
        <div className='flex items-center gap-2 -ml-2'>
          <ChevronLeft className='w-10 h-10 cursor-pointer' onClick={() => router.push('/account/pages')} />
          <h1 className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-white text-3xl lg:text-4xl font-sans py-2 relative z-20 font-bold tracking-tight'>
            {t('pages.account.pages.edit.title')}
          </h1>
        </div>
        <p className='max-w-2xl text-base md:text-lg text-neutral-400'>{t('pages.account.pages.edit.description')}</p>
      </div>

      {selected && (
        <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mt-12'>
          <div className='w-full h-full'>
            <HeaderEdit steps={steps} activeStep={step} />

            {step !== 6 && (
              <div className='py-4 mt-6 px-4 bg-green-700/10 text-white text-center text-sm border rounded-md border-green-900 border-dashed'>
                {t('pages.account.pages.edit.save-info')}
              </div>
            )}
          </div>

          <div className='w-full h-full'></div>
        </div>
      )}
    </div>
  )
}
