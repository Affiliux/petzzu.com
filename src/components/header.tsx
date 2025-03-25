'use client'

import React, { useState } from 'react'

import { formatDate } from 'date-fns'
import { ChevronDown, Globe, Layers, LogOut, Menu, User, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { useAccount } from '@/contexts/AccountContext'
import { useApplication } from '@/contexts/ApplicationContext'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

import { ThemeSwitcher } from './theme-switcher'

import { locales } from '@/i18n'

export function Header() {
  // hooks
  const t = useTranslations()
  const router = useRouter()

  // contexts
  const { locale, theme, onChangeLocale } = useApplication()
  const { account, onSignOut } = useAccount()

  // states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileAccountOpen, setMobileAccountOpen] = useState(false)

  // variables
  const SELECTED = locales.find(language => language === locale) ?? 'pt'

  return (
    <nav className='absolute top-0 left-0 w-full bg-white border-b border-neutral-200/60 z-50'>
      <div className='py-1.5 px-4 text-left md:text-center font-medium font-sans tracking-tight text-xs md:text-sm bg-gradient-to-r text-white from-theme-600 via-theme-700 to-theme-300'>
        <p className='text-center text-white'>
          <b>
            {t('config.offer.title')} {formatDate(new Date(), 'dd/MM/yyyy')}
          </b>{' '}
          - {t('config.offer.description1')} <b className='text-sm md:text-base'>50%</b>{' '}
          {t('config.offer.description2')}
        </p>
      </div>

      <div className='container flex items-center justify-between py-3'>
        {/* Logo */}
        <img
          src={`/logos/${theme}/logo+name.png`}
          className='h-8 sm:h-12 w-auto max-w-[140px] sm:max-w-[200px]'
          alt='Babyzzu logo'
          width={200}
          height={56}
        />

        {/* Desktop Navigation */}
        <div style={{ display: 'none' }} className='md:!flex md:items-center md:space-x-8'>
          <Link href='/' className='font-medium hover:text-neutral-700 transition-colors'>
            {t('config.header.nav.home')}
          </Link>
          <Link href='/#plans' className='font-medium hover:text-neutral-700 transition-colors'>
            {t('config.header.nav.plans')}
          </Link>
          <Link href='/#faq' className='font-medium hover:text-neutral-700 transition-colors'>
            {t('config.header.nav.faq')}
          </Link>
          <Link
            href='https://affiliux.com'
            target='_blank'
            className='font-medium hover:text-neutral-700 transition-colors'
          >
            {t('config.header.nav.affiliate')}
          </Link>
        </div>

        {/* Desktop Right Icons */}
        <div style={{ display: 'none' }} className='md:!flex md:items-center md:space-x-4'>
          {/* Theme Switcher */}
          <ThemeSwitcher />

          {/* Language Switcher (commented until we found a international gateway) */}

          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon'>
                <Globe className='h-5 w-5' />
                <span className='sr-only'>{t('config.header.languages.title')}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              {locales.map(lang => (
                <DropdownMenuItem
                  key={lang}
                  onClick={() => onChangeLocale(lang)}
                  className={SELECTED === lang ? 'bg-accent' : ''}
                >
                  {t(`config.header.languages.${lang}`)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu> */}

          {/* User Profile */}
          {account?.email ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='flex items-center gap-2'>
                  <User className='h-5 w-5' />
                  <span className='hidden lg:inline'>{t('config.header.account.title')}</span>
                  <ChevronDown className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={() => router.push('/account/pages')}>
                  <Layers className='mr-2 h-4 w-4' />
                  <span>{t('config.header.account.my-pages')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onSignOut}>
                  <LogOut className='mr-2 h-4 w-4' />
                  <span>{t('config.header.account.logout')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant='ghost' className='flex items-center gap-2' onClick={() => router.push('/auth')}>
              <User className='h-5 w-5' />
              <span className='hidden lg:inline'>{t('config.header.account.title')}</span>
            </Button>
          )}
        </div>

        {/* Mobile Navigation */}
        <div style={{ display: 'flex' }} className='md:!hidden items-center space-x-2'>
          {/* Theme Switcher */}
          <ThemeSwitcher />

          {/* User Profile Mobile */}
          {account ? (
            <Sheet open={mobileAccountOpen} onOpenChange={setMobileAccountOpen}>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <User className='h-5 w-5' />
                  <span className='sr-only'>{t('config.header.account.title')}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side='left' className='flex flex-col'>
                <div className='flex items-center justify-between border-b pb-4'>
                  <SheetTitle>{t('config.header.nav.title')}</SheetTitle>
                </div>

                <nav className='flex flex-col gap-4 py-6 flex-1'>
                  <Link
                    href='/account/pages'
                    className='flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Layers className='mr-2 h-4 w-4' />
                    <span>{t('config.header.account.my-pages')}</span>
                  </Link>
                  <Link
                    href='/'
                    className='flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors'
                    onClick={() => {
                      onSignOut()
                      setMobileMenuOpen(false)
                    }}
                  >
                    <LogOut className='mr-2 h-4 w-4' />
                    <span>{t('config.header.account.logout')}</span>
                  </Link>
                </nav>

                <div className='border-t pt-4'>
                  <div className='text-sm text-muted-foreground mb-2'>{t('config.header.languages.title')}</div>
                  <Select value={SELECTED} onValueChange={onChangeLocale}>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder={t('config.header.languages.title')} />
                    </SelectTrigger>
                    <SelectContent>
                      {locales.map(lang => (
                        <SelectItem key={lang} value={lang}>
                          {t(`config.header.languages.${lang}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <Button variant='ghost' size='icon' onClick={() => router.push('/auth')}>
              <User className='h-5 w-5' />
              <span className='sr-only'>{t('config.header.account.title')}</span>
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant='ghost' size='icon'>
                <Menu className='h-5 w-5' />
                <span className='sr-only'>{t('config.header.nav.title')}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='flex flex-col'>
              <div className='flex items-center justify-between border-b pb-4'>
                <SheetTitle>{t('config.header.nav.title')}</SheetTitle>
              </div>

              <nav className='flex flex-col gap-4 py-6 flex-1'>
                <Link
                  href='/'
                  className='text-lg font-medium hover:text-primary transition-colors'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('config.header.nav.home')}
                </Link>
                <Link
                  href='/#plans'
                  className='text-lg font-medium hover:text-primary transition-colors'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('config.header.nav.plans')}
                </Link>
                <Link
                  href='/#faq'
                  className='text-lg font-medium hover:text-primary transition-colors'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('config.header.nav.faq')}
                </Link>
                <Link
                  href='https://affiliux.com'
                  target='_blank'
                  className='text-lg font-medium hover:text-primary transition-colors'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('config.header.nav.affiliate')}
                </Link>
              </nav>

              <div className='border-t pt-4'>
                <div className='text-sm text-muted-foreground mb-2'>{t('config.header.languages.title')}</div>
                <Select value={SELECTED} onValueChange={onChangeLocale}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder={t('config.header.languages.title')} />
                  </SelectTrigger>
                  <SelectContent>
                    {locales.map(lang => (
                      <SelectItem key={lang} value={lang}>
                        {t(`config.header.languages.${lang}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
