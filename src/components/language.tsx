'use client'

import { ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { IconLanguage } from '@tabler/icons-react'

import { useApplication } from '@/contexts/ApplicationContext'

import { locales } from '@/i18n'

export function Language() {
  const t = useTranslations()

  const { locale, handleChangeLocale } = useApplication()

  const SELECTED = locales.find(language => language === locale) ?? 'pt'

  return locales.includes(locale as any) ? (
    <div className='flex flex-row items-center gap-1 md:gap-4'>
      <div className='relative group'>
        <button
          type='button'
          className='relative h-11 overflow-hidden flex items-center justify-center rounded-full p-[1px] focus:outline-none focus:ring-0'
        >
          <span className='flex h-full cursor-pointer items-center justify-center gap-2 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl'>
            <IconLanguage />
            <ChevronDown size={12} />
          </span>
        </button>

        <div className='origin-top-left lg:origin-top-right min-w-48 mt-0.5 z-[99999] border border-neutral-800 absolute right-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300 rounded-lg shadow-lg bg-black ring-1 ring-black ring-opacity-5'>
          <div className='py-1 grid grid-cols-1 gap-2' role='none'>
            {locales.map((locale, index) => {
              return (
                <button
                  key={locale}
                  onClick={() => handleChangeLocale(locale)}
                  className={`${
                    SELECTED === locale ? 'hidden' : 'text-gray-300'
                  } px-6 py-2 text-start items-center inline-flex hover:bg-neutral-800 ${
                    index % 2 === 0 ? 'rounded-r' : 'rounded-l'
                  }`}
                >
                  <span className='mr-2'>
                    <IconLanguage />
                  </span>

                  <span className='truncate text-xs font-bold'>{t(`config.header.languages.${locale}`)}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}
