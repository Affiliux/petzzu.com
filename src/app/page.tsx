'use client'

import React, { useMemo } from 'react'

import { Loader2 } from 'lucide-react'

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
import { Spotlight } from '@/components/ui/spotlight-new'

import { THEMES } from '@/constants'
import { ThemeShowTypeEnum } from '@/enums'
import { formatHexToHsl } from '@/lib/helpers/formatters'

export const runtime = 'edge'

export default function Page() {
  // contexts
  const { loading_application, theme } = useApplication()

  const SPOTLIGHT_COLOR = theme
    ? formatHexToHsl(THEMES[theme]['--theme-900'])
    : formatHexToHsl(THEMES[ThemeShowTypeEnum.BLUE]['--theme-900'])

  return (
    <>
      <div className='w-screen h-full overflow-x-hidden' id='start'>
        <div className='h-[50rem] bg-transparent bg-grid-neutral-200/40 relative flex items-center justify-center'>
          {/* Radial gradient for the container to give a faded look */}
          <div className='absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black)]'></div>

          <Spotlight
            gradientFirst={`radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(${SPOTLIGHT_COLOR.h}, ${SPOTLIGHT_COLOR.s}%, ${SPOTLIGHT_COLOR.l}%, .08) 0, hsla(${SPOTLIGHT_COLOR.h}, ${SPOTLIGHT_COLOR.s}%, ${SPOTLIGHT_COLOR.l}%, .02) 50%, hsla(${SPOTLIGHT_COLOR.h}, ${SPOTLIGHT_COLOR.s}%, ${SPOTLIGHT_COLOR.l}%, 0) 80%)`}
            gradientSecond={`radial-gradient(50% 50% at 50% 50%, hsla(${SPOTLIGHT_COLOR.h}, ${SPOTLIGHT_COLOR.s}%, ${SPOTLIGHT_COLOR.l}%, .06) 0, hsla(${SPOTLIGHT_COLOR.h}, ${SPOTLIGHT_COLOR.s}%, ${SPOTLIGHT_COLOR.l}%, .02) 80%, transparent 100%)`}
            gradientThird={`radial-gradient(50% 50% at 50% 50%, hsla(${SPOTLIGHT_COLOR.h}, ${SPOTLIGHT_COLOR.s}%, ${SPOTLIGHT_COLOR.l}%, .04) 0, hsla(${SPOTLIGHT_COLOR.h}, ${SPOTLIGHT_COLOR.s}%, ${SPOTLIGHT_COLOR.l}%, .02) 80%, transparent 100%)`}
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
  )
}
