/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'

import { MenuIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { useApplication } from '@/contexts/ApplicationContext'

import { Language } from './language'
import { ThemeSwitcher } from './theme-switcher'

export function Header() {
  const t = useTranslations()

  const { theme } = useApplication()

  return (
    <div className='absolute top-0 left-0 w-full bg-white border-b border-neutral-200/60 z-50'>
      <div className='py-1.5 px-4 text-left md:text-center font-medium font-sans tracking-tight text-xs md:text-sm bg-gradient-to-r text-white from-theme-600 via-theme-700 to-theme-300'>
        <p className='text-center text-white'>
          <b>{t('config.offer.title')}</b> - {t('config.offer.description1')}{' '}
          <b className='text-sm md:text-base'>50%</b> {t('config.offer.description2')}
        </p>
      </div>
      <div className='container max-w-screen-xl mx-auto flex flex-row items-center justify-between py-[10px] px-4 sm:px-6'>
        <div className='flex flex-row items-center gap-4 sm:gap-12'>
          <Link href='/' className='cursor-pointer'>
            <Image
              src={`/logos/${theme}/logo+name.png`}
              className='h-8 sm:h-12 w-auto max-w-[140px] sm:max-w-[200px]'
              alt='Babyzzu logo'
              width={200}
              height={56}
            />
          </Link>

          <div className='hidden lg:flex flex-row items-center gap-4 sm:gap-6'>
            <Link
              href='/#plans'
              className='text-neutral-800 text-xs sm:text-sm hover:text-neutral-700 hover:underline cursor-pointer'
              scroll
            >
              {t('config.header.nav.plans')}
            </Link>

            <div className='flex flex-row items-center gap-2 opacity-55'>
              <Link href='https://affiliux.com' className='text-neutral-800 text-xs sm:text-sm cursor-pointer'>
                {t('config.header.nav.affiliate')}
              </Link>
              <div className='bg-yellow-500 flex items-center rounded-sm px-2 py-[2px]'>
                <p className='text-xs text-black font-bold'>{t('config.header.nav.badge')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='relative flex items-center gap-2'>
          <Language />
          <ThemeSwitcher />

          {/* <div className='flex lg:hidden'>
            <button
              type='button'
              className='relative h-10 flex items-center justify-center rounded-full p-[1px] focus:outline-none focus:ring-0'
            >
              <span className='flex h-full cursor-pointer items-center justify-center gap-2 px-3 py-1 text-xs sm:text-sm font-medium text-black backdrop-blur-3xl'>
                <MenuIcon />
              </span>
            </button>

            <div className='absolute right-0 top-12 z-[99999] border border-neutral-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300 rounded-lg shadow-lg bg-white ring-1 ring-white ring-opacity-5 min-w-[240px]'>
              <div className='py-1 grid grid-cols-1 gap-2' role='none'>
                <Link
                  href='#plans'
                  className='text-neutral-800 px-6 py-2 text-start items-center inline-flex hover:bg-neutral-200 rounded-l'
                >
                  <span className='truncate text-xs font-bold'>{t('config.header.nav.plans')}</span>
                </Link>
                <Link
                  href='https://affiliux.com'
                  className='text-neutral-800 px-6 py-2 pb-4 text-start items-center opacity-55 inline-flex hover:bg-neutral-200 rounded-l'
                >
                  <span className='truncate text-xs font-bold mr-2'>{t('config.header.nav.affiliate')}</span>
                  <div className='bg-yellow-500 flex items-center rounded-sm px-2 py-[2px]'>
                    <p className='text-xs text-black font-bold'>{t('config.header.nav.badge')}</p>
                  </div>
                </Link>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* <div className='container flex flex-row items-center justify-between py-[10px]'>
        <div className='flex flex-row items-center gap-12'>
          <Link href='/' className='cursor-pointer'>
            <Image src={`/logos/${theme}/logo+name.png`} className='h-12' alt='Babyzzu logo' width={200} height={56} />
          </Link>

          <div className='lg:flex flex-row items-center gap-6 hidden'>
            <Link
              href='/#plans'
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
          <ThemeSwitcher />

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
      </div> */}
    </div>
  )
}
