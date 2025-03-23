'use client'

import React, { useState } from 'react'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'

import { ConfirmForm } from './components/confirm'
import { RequestForm } from './components/request'

export const runtime = 'edge'

export default function Page() {
  // hooks
  const t = useTranslations('pages.auth')
  const router = useRouter()

  // states
  const [email, set_email] = useState<string | null>(null)

  return (
    <div className='space-y-6 px-8 py-12'>
      {email ? (
        <div className='space-y-2'>
          <h1 className='text-2xl lg:text-3xl font-bold text-neutral-900'>{t('confirm.title')}</h1>
          <p className='text-md lg:text-md text-muted-foreground'>
            {t('confirm.description')}{' '}
            <a className='underline text-neutral-400 cursor-pointer' onClick={() => set_email(null)}>
              {t('confirm.form.request')}
            </a>
          </p>
        </div>
      ) : (
        <div className='space-y-2'>
          <div className='flex items-center gap-2 -ml-2'>
            <Button asChild variant='ghost' className='p-0 cursor-pointer' onClick={() => router.back()}>
              <ChevronLeft size={28} color='#292929' />
            </Button>
            <h1 className='text-2xl lg:text-3xl font-bold text-neutral-900'>{t('request.title')}</h1>
          </div>
          <p className='text-md lg:text-md text-muted-foreground'>{t('request.description')}</p>
        </div>
      )}

      <div className='py-4'>{email ? <ConfirmForm email={email} /> : <RequestForm set_email={set_email} />}</div>
    </div>
  )
}
