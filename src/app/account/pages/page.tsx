'use client'

import React, { useEffect } from 'react'

import { useTranslations } from 'next-intl'

import { useAccount } from '@/contexts/AccountContext'

import { PageCard } from './components/page-card'
import { PageCardLoader } from './components/page-card-loader'

export const runtime = 'edge'

export default function Page() {
  // hooks
  const t = useTranslations('pages.account.pages')

  // contexts
  const { pages, onGetPages } = useAccount()

  useEffect(() => {
    onGetPages()
  }, [])

  return (
    <div className='w-full'>
      <h1 className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-black text-3xl lg:text-4xl font-sans py-2 relative z-20 font-bold tracking-tight'>
        {t('title')}
      </h1>
      <p className='max-w-2xl text-base md:text-lg text-muted-foreground mb-8'>{t('description')}</p>

      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12'>
        {pages?.length > 0 ? (
          <>{pages?.map(page => <PageCard key={page.id} page={page} />)}</>
        ) : (
          <>
            <PageCardLoader />
            <PageCardLoader />
            <PageCardLoader />
            <PageCardLoader />
          </>
        )}
      </div>
    </div>
  )
}
