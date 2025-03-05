'use client'

import React from 'react'

import { Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'

import { useApplication } from '@/contexts/ApplicationContext'

import { UtmifyRedirect } from '@/components/utmify'

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
  const {
    loading_application,
  } = useApplication()

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
