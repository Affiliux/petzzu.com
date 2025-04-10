'use client'

import React, { useEffect, useState } from 'react'

import { useTranslations } from 'next-intl'

import { useQueryParams } from '@/hooks/use-query-params'

import { get_cookie, set_cookie } from '@/infrastructure/cache/cookies'

export const Cookies = () => {
  // hooks
  const queryParams = useQueryParams()
  const t = useTranslations('config.cookies')

  // states
  const [show, setShow] = useState(false)

  async function handleAccept() {
    try {
      await set_cookie('cookies', 'accepted')
      setShow(false)
    } catch (error) {
      console.error(error)
    }
  }

  async function handleDecline() {
    try {
      await set_cookie('cookies', 'declined')
      setShow(false)
    } catch (error) {
      console.error(error)
    }
  }

  async function handleGet() {
    try {
      if (queryParams?.dc && queryParams?.dc.includes('tik')) {
        const cookie = await get_cookie('cookies')
        if (cookie !== 'accepted') setShow(true)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    handleGet()
  }, [])

  return show ? (
    <div className='fixed bottom-0 right-0 mb-4 mr-4 w-[92vw] md:w-80 z-[999999]'>
      <div className='relative bg-background border border-neutral-200 rounded-lg shadow-2xl shadow-neutral-400 p-6'>
        <div className='flex items-center justify-between mb-2'>
          <div className='flex items-center'>
            <img src='https://www.svgrepo.com/show/401340/cookie.svg' alt='Cookie' className='h-6 w-6 mr-2' />
            <span className='text-neutral-900 font-bold text-sm'>{t('title')}</span>
          </div>
          <button onClick={handleDecline} className='text-neutral-500 hover:text-neutral-400 focus:outline-none'>
            <svg className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
            </svg>
          </button>
        </div>

        <p className='text-muted-foreground text-sm'>{t('description')}</p>

        <button
          onClick={handleAccept}
          className='mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
        >
          {t('button')}
        </button>
      </div>
    </div>
  ) : (
    <></>
  )
}
