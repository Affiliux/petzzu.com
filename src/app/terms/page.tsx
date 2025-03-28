'use client'

import React from 'react'

import { useTranslations } from 'next-intl'

export const runtime = 'edge'

export default function Page() {
  const t = useTranslations('pages.terms')

  return (
    <div className='container bg-white py-8'>
      <main className='flex flex-col gap-2 lg:gap-8 items-center justify-center'>
        <h1 className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-black mt-24 text-3xl lg:text-5xl font-sans relative z-20 font-bold tracking-tight'>
          {t('title')}
        </h1>

        <div className='text-muted-foreground text-sm mt-10 py-4 px-8 border-l-4 max-w-4xl border-theme-700'>
          <b className='theme-neutral-900'>{t('content.acceptance_of_terms')}</b>
          <p>{t('content.acceptance_description')}</p>
          <br />
          <b className='theme-neutral-900'>{t('content.service_description_title')}</b>
          <p>{t('content.service_description')}</p>
          <br />
          <b className='theme-neutral-900'>{t('content.registration_and_security_title')}</b>
          <p>{t('content.registration_and_security')}</p>
          <br />
          <b className='theme-neutral-900'>{t('content.privacy_policy_title')}</b>
          <p>{t('content.privacy_policy')}</p>
          <br />
          <b className='theme-neutral-900'>{t('content.user_content_title')}</b>
          <p>{t('content.user_content')}</p>
          <br />
          <b className='theme-neutral-900'>{t('content.payments_refund_policy_title')}</b>
          <p>{t('content.payments_refund_policy')}</p>
          <br />
          <b className='theme-neutral-900'>{t('content.service_changes_title')}</b>
          <p>{t('content.service_changes')}</p>
          <br />
          <b className='theme-neutral-900'>{t('content.limitation_of_liability_title')}</b>
          <p>{t('content.limitation_of_liability')}</p>
          <br />
          <b className='theme-neutral-900'>{t('content.terms_update_title')}</b>
          <p>{t('content.terms_update')}</p>
          <br />
          <b className='theme-neutral-900'>{t('content.contact_title')}</b>
          <p>{t('content.contact')}</p>
          <br />
        </div>
      </main>
    </div>
  )
}
