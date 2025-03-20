'use client'

import React, { useState } from 'react'

import { useTranslations } from 'next-intl'

import { ConfirmForm } from './components/confirm'
import { RequestForm } from './components/request'

export const runtime = 'edge'

export default function Page() {
  // hooks
  const t = useTranslations('pages.auth')

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
          <h1 className='text-2xl lg:text-3xl font-bold text-neutral-900'>{t('request.title')}</h1>
          <p className='text-md lg:text-md text-muted-foreground'>{t('request.description')}</p>
        </div>
      )}

      <div className='py-4'>{email ? <ConfirmForm email={email} /> : <RequestForm set_email={set_email} />}</div>
    </div>
  )
}
