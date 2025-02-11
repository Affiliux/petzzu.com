'use client'

import React from 'react'

import { useTranslations } from 'next-intl'

export default function Page() {
  const t = useTranslations('pages.privacy')

  return (
    <div className='container bg-black py-12'>
      <main className='flex flex-col gap-2 lg:gap-8 items-center justify-center'>
        <h1 className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-white mt-24 text-3xl lg:text-5xl font-sans relative z-20 font-bold tracking-tight'>
          {t('title')}
        </h1>

        <div className='text-gray-400 text-sm mt-10 py-4 px-8 border-l-4 max-w-4xl border-red-700'>
          <b className='text-white'>{t('content.introduction_title')}</b>
          <p>{t('content.introduction_description')}</p>
          <br />
          <b className='text-white'>{t('content.information_we_collect_title')}</b>
          <p>{t('content.information_we_collect')}</p>
          <br />
          <div className='pl-2'>
            <p>{t('content.registration_info')}</p>
            <p>{t('content.payment_info')}</p>
          </div>
          <br />
          <b className='text-white'>{t('content.how_we_use_information_title')}</b>
          <p>{t('content.how_we_use_information')}</p>
          <br />
          <div className='pl-2'>
            <p>{t('content.use_payment_process')}</p>
            <p>{t('content.use_personalize_page')}</p>
            <p>{t('content.use_improve_service')}</p>
          </div>
          <br />
          <b className='text-white'>{t('content.sharing_information_title')}</b>
          <p>{t('content.sharing_information')}</p>
          <br />
          <b className='text-white'>{t('content.security_title')}</b>
          <p>{t('content.security_description')}</p>
          <br />
          <b className='text-white'>{t('content.data_retention_title')}</b>
          <p>{t('content.data_retention_description')}</p>
          <br />
          <b className='text-white'>{t('content.your_rights_title')}</b>
          <p>{t('content.your_rights_description')}</p>
          <br />
          <b className='text-white'>{t('content.changes_to_policy_title')}</b>
          <p>{t('content.changes_to_policy_description')}</p>
          <br />
          <b className='text-white'>{t('content.contact_title')}</b>
          <p>{t('content.contact_description')}</p>
          <br />
        </div>
      </main>
    </div>
  )
}
