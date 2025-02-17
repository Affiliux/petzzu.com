/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { useApplication } from '@/contexts/ApplicationContext'

export function Footer() {
  const t = useTranslations('config')

  const { theme } = useApplication()

  return (
    <div className='py-10 md:pt-20 mt-20 border-t border-t-neutral-200'>
      <div className='container flex flex-col md:flex-row justify-between'>
        <div className='w-full md:w-1/3'>
          <Link href='/'>
            <img src={`/logos/${theme}/logo+name.png`} className='h-12' alt='Babyzzu logo' width={200} height={56} />
          </Link>
          <p className='text-sm text-neutral-500 mt-4'>{t('description')}</p>

          <p className='text-xs text-neutral-400 mt-4'>
            Made by <b>Affiliux Digital Ltda</b>
          </p>
          <p className='text-xs text-neutral-400'>CNPJ: 58.055.152/0001-71</p>
        </div>

        <div className='w-full md:w-1/3 md:flex md:justify-end mt-4 md:mt-0'>
          <ul className='text-sm text-neutral-800 mt-4'>
            <li className='py-1'>
              <Link href='/terms'>{t('footer.terms')}</Link>
            </li>
            <li className='py-1'>
              <Link href='/privacy'>{t('footer.privacy')}</Link>
            </li>
          </ul>
        </div>

        <div className='w-full md:w-1/3 md:flex md:justify-end mt-4 md:mt-0 pr-10'>
          <ul className='text-sm text-neutral-800 mt-4'>
            <li className='py-1'>
              <Link href='https://instagram.com/babyzzu_'>{t('footer.instagram')}</Link>
            </li>
            <li className='py-1'>
              <Link href='https://tiktok.com/babyzzu.com'>{t('footer.tiktok')}</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className='container flex flex-col-reverse md:flex-row items-center justify-between mt-12 md:mt-8 gap-4'>
        <p className='text-sm text-neutral-500'>{t('footer.copyright')}</p>

        <img src='./pagarme-extend.png' className='h-8 lg:h-6' />
      </div>
    </div>
  )
}
