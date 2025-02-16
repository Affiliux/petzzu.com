'use client'

import React, { useEffect } from 'react'

import { Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'

import { useApplication } from '@/contexts/ApplicationContext'

import { useQueryParams } from '@/hooks/use-query-params'

import { UtmifyRedirect } from '@/components/utmify'

import { NEXT_CURRENCY, NEXT_LOCALE } from '@/constants'
import { ThemeShowTypeEnum } from '@/enums'
import { locales } from '@/i18n'

const ButtonToTop = dynamic(() => import('@/components/button-to-top').then(mod => mod.ButtonToTop), { ssr: false })
const Cookies = dynamic(() => import('@/components/cookies').then(mod => mod.Cookies), { ssr: false })
const Faq = dynamic(() => import('@/components/faq').then(mod => mod.Faq), { ssr: false })
const Features = dynamic(() => import('@/components/features').then(mod => mod.Features), { ssr: false })
const Header = dynamic(() => import('@/components/header').then(mod => mod.Header), { ssr: false })
const Footer = dynamic(() => import('@/components/footer').then(mod => mod.Footer), { ssr: false })
const Hero = dynamic(() => import('@/components/hero').then(mod => mod.Hero), { ssr: false })
const HowWork = dynamic(() => import('@/components/how-work').then(mod => mod.HowWork), { ssr: false })
const Plans = dynamic(() => import('@/components/plans').then(mod => mod.Plans), { ssr: false })
const Testimonials = dynamic(() => import('@/components/testimonials').then(mod => mod.Testimonials), { ssr: false })
const Spotlight = dynamic(() => import('@/components/ui/spotlight-new').then(mod => mod.Spotlight), { ssr: false })

export default function Home() {
  // hooks
  const queryParams = useQueryParams()

  const {
    locale,
    theme,
    loading_application,
    set_loading_application,
    set_client,
    set_theme,
    discount,
    handleChangeLocale,
    handleChangeCurrency,
    handleGetDiscount,
    plans,
    handleGetPlans,
  } = useApplication()

  async function initLocale() {
    set_loading_application(true)
    set_client(true)

    try {
      if (queryParams?.dc && !discount) await handleGetDiscount(queryParams?.dc)

      const saved_locale = localStorage.getItem(NEXT_LOCALE)

      if (locale === queryParams?.lang) return

      if (queryParams?.lang && locales.includes(queryParams?.lang as any)) {
        await handleChangeLocale(queryParams?.lang)
      } else if (saved_locale && saved_locale.includes('-') && locales.includes(saved_locale.split('-')[0] as any)) {
        await handleChangeLocale(saved_locale.split('-')[0])
      } else if (saved_locale && locales.includes(saved_locale as any)) {
        await handleChangeLocale(saved_locale)
      } else if (
        typeof navigator !== 'undefined' &&
        navigator.language &&
        locales.includes(navigator.language.split('-')[0] as any)
      ) {
        await handleChangeLocale(navigator.language.split('-')[0])
      } else {
        await handleChangeLocale('pt')
      }
    } catch (error: any) {
      console.error(error)
    } finally {
      set_loading_application(false)
    }
  }

  useEffect(() => {
    if (plans.length === 0) handleGetPlans()
  }, [])

  useEffect(() => {
    if (queryParams?.theme && Object.values(ThemeShowTypeEnum).includes(queryParams?.theme as ThemeShowTypeEnum)) {
      set_theme(queryParams?.theme as ThemeShowTypeEnum)
    }
  }, [queryParams?.theme])

  useEffect(() => {
    initLocale()
  }, [queryParams?.lang])

  useEffect(() => {
    const saved_currency = localStorage.getItem(NEXT_CURRENCY)

    if (queryParams?.currency) handleChangeCurrency(queryParams?.currency, true)
    else if (locale.includes('pt')) handleChangeCurrency('brl')
    else if (saved_currency) handleChangeCurrency(saved_currency)
    else handleChangeCurrency('usd')
  }, [locale, queryParams?.currency])

  return (
    <>
      {loading_application ? (
        <div className='h-screen w-full absolute top-0 left-0 bg-white/80 backdrop-blur-md flex items-center justify-center z-[9999]'>
          <Loader2 size={56} className='animate-spin' />
        </div>
      ) : (
        <>
          <div className='w-screen h-full overflow-x-hidden' id='start'>
            <div className='h-[50rem] bg-transparent bg-grid-neutral-200/60 relative flex items-center justify-center'>
              {/* Radial gradient for the container to give a faded look */}
              <div className='absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black)]'></div>

              <Spotlight
                gradientFirst='radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(var(--theme-800), .08) 0, hsla(var(--theme-800), .02) 50%, hsla(var(--theme-800), 0) 80%)'
                gradientSecond='"radial-gradient(50% 50% at 50% 50%, hsla(var(--theme-800), .06) 0, hsla(var(--theme-800), .02) 80%, transparent 100%)"'
                gradientThird='radial-gradient(50% 50% at 50% 50%, hsla(var(--theme-800), .04) 0, hsla(var(--theme-800), .02) 80%, transparent 100%)'
              />

              <div className='container'>
                <Header />
                <Hero />
              </div>
            </div>

            <HowWork />
            <Features />

            <Testimonials />
            <Plans />
            <Faq />

            <Footer />
          </div>

          <Cookies />
          <ButtonToTop />
        </>
      )}

      <UtmifyRedirect redirectUrl='https://babyzzu.com' />
    </>
  )
}
