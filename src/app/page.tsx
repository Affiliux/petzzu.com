'use client'

import React from 'react'

import { Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { useApplication } from '@/contexts/ApplicationContext'

import { ButtonToTop } from '@/components/button-to-top'
import { Cookies } from '@/components/cookies'
import { Faq } from '@/components/faq'
import { Features } from '@/components/features'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { HowWork } from '@/components/how-work'
import { Plans } from '@/components/plans'
import { Testimonials } from '@/components/testimonials'
import { Themes } from '@/components/themes'
import { Spotlight } from '@/components/ui/spotlight-new'
import { UtmifyRedirect } from '@/components/utmify'

export default function Home() {
  // hooks
  const t = useTranslations()

  // contexts
  const { loading_application } = useApplication()

  return (
    <>
      {loading_application ? (
        <div className='h-screen w-full absolute top-0 left-0 bg-white/80 backdrop-blur-md flex items-center justify-center z-[9999]'>
          <Loader2 size={56} className='animate-spin' />
        </div>
      ) : (
        <>
          <div className='py-1.5 px-4 text-left md:text-center font-medium font-sans tracking-tight text-xs md:text-sm bg-gradient-to-r text-white from-blue-300 via-blue-500 to-blue-200'>
            <p className='text-center text-white'>
              <b>{t('config.offer.title')}</b> - {t('config.offer.description1')}{' '}
              <b className='text-sm md:text-base'>50%</b> {t('config.offer.description2')}
            </p>
          </div>

          <div className='w-screen h-full overflow-x-hidden' id='start'>
            <div className='h-[50rem] bg-transparent bg-grid-neutral-200/60 relative flex items-center justify-center'>
              {/* Radial gradient for the container to give a faded look */}
              <div className='absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black)]'></div>

              <Spotlight
                gradientFirst='radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(170, 100%, 85%, .08) 0, hsla(170, 100%, 55%, .02) 50%, hsla(170, 100%, 45%, 0) 80%)'
                gradientSecond='"radial-gradient(50% 50% at 50% 50%, hsla(170, 100%, 85%, .06) 0, hsla(170, 100%, 55%, .02) 80%, transparent 100%)"'
                gradientThird='radial-gradient(50% 50% at 50% 50%, hsla(170, 100%, 85%, .04) 0, hsla(170, 100%, 45%, .02) 80%, transparent 100%)'
              />

              <div className='container'>
                <Header />
                <Hero />
              </div>
            </div>

            <HowWork />
            {/* <Features /> */}

            <Testimonials />
            {/* <Plans /> */}
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
