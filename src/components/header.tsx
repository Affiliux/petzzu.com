/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'

import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Language } from './language'

export function Header() {
  const t = useTranslations()

  return (
    <div className='absolute top-0 left-0 w-full py-[8px] bg-white border-b border-neutral-200/60 z-50'>
      <div className='container flex flex-row items-center justify-between'>
        <div className='flex flex-row items-center gap-12'>
          <img src='/logo+name.png' className='h-12' alt='Babyzzu logo' width={200} height={56} />

          <div className='lg:flex flex-row items-center gap-6 hidden'>
            <Link
              href='#plans'
              className='text-neutral-800 text-sm hover:text-neutral-700 hover:underline cursor-pointer'
              scroll
            >
              {t('config.header.nav.plans')}
            </Link>

            <div className='flex flex-row items-center gap-2 opacity-55'>
              <Link href='https://affiliux.com' className='text-neutral-800 text-sm cursor-pointer'>
                {t('config.header.nav.affiliate')}
              </Link>

              <div className='bg-yellow-500 gap-1 flex items-center rounded-sm px-2 py-[2px]'>
                <p className='text-xs text-black font-bold'> {t('config.header.nav.badge')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='relative flex items-center gap-2'>
          <Language />

          <div className='flex flex-row items-center gap-1 md:gap-4 lg:hidden'>
            <div className='relative group'>
              <button
                type='button'
                className='relative h-11 overflow-hidden flex items-center justify-center rounded-full p-[1px] focus:outline-none focus:ring-0'
              >
                <span className='flex h-full cursor-pointer items-center justify-center gap-2 px-3 py-1 text-sm font-medium text-black backdrop-blur-3xl'>
                  <MenuIcon />
                </span>
              </button>

              <div className='origin-top-left lg:origin-top-right min-w-72 mt-0.5 z-[99999] border border-neutral-200 absolute right-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300 rounded-lg shadow-lg bg-white ring-1 ring-white ring-opacity-5'>
                <div className='py-1 grid grid-cols-1 gap-2' role='none'>
                  <Link
                    href='#plans'
                    className={
                      'text-neutral-800 px-6 py-2 text-start items-center inline-flex hover:bg-neutral-200 rounded-l'
                    }
                  >
                    <span className='truncate text-xs font-bold'>{t('config.header.nav.plans')}</span>
                  </Link>
                  <Link
                    href='https://affiliux.com'
                    className={
                      'text-neutral-800 px-6 py-2 pb-4 text-start items-center opacity-55 inline-flex hover:bg-neutral-200 rounded-l'
                    }
                  >
                    <span className='truncate text-xs font-bold mr-2'> {t('config.header.nav.affiliate')}</span>
                    <div className='bg-yellow-500 gap-1 flex items-center rounded-sm px-2 py-[2px]'>
                      <p className='text-xs text-black font-bold'> {t('config.header.nav.badge')}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
