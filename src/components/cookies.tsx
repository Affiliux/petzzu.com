/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useEffect, useState } from 'react'

import { useTranslations } from 'next-intl'

import { get_cookie, set_cookie } from '@/infrastructure/cache/cookies'

export const Cookies = () => {
  const t = useTranslations('config.cookies')

  const [show, setShow] = useState(false)

  const handleAccept = async () => {
    await set_cookie('cookies', 'accepted')
    setShow(false)
  }

  const handleDecline = async () => {
    await set_cookie('cookies', 'declined')
    setShow(false)
  }

  const handleGet = async () => {
    const cookie = await get_cookie('cookies')

    if (cookie !== 'accepted') setShow(true)
  }

  useEffect(() => {
    handleGet()
  }, [])

  return show ? (
    <div className='fixed bottom-0 right-0 mb-4 mr-4 w-[92vw] md:w-80 z-[999999]'>
      <div className='relative bg-background border border-neutral-800 rounded-lg shadow-2xl shadow-black p-6'>
        <div className='flex items-center justify-between mb-2'>
          <div className='flex items-center'>
            <img src='https://www.svgrepo.com/show/401340/cookie.svg' alt='Cookie' className='h-6 w-6 mr-2' />
            <span className='text-white font-bold text-sm'>{t('title')}</span>
          </div>
          <button onClick={handleDecline} className='text-gray-500 hover:text-gray-700 focus:outline-none'>
            <svg className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
            </svg>
          </button>
        </div>

        <p className='text-gray-500 text-sm'>{t('description')}</p>

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
