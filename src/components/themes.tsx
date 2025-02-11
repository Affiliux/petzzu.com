'use client'

import React, { useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { useApplication } from '@/contexts/ApplicationContext'

import { CardBody, CardContainer, CardItem } from './ui/3d-card'

import { ThemeShowTypeEnum } from '@/enums'

export function Themes() {
  //* [Hooks] *//
  const t = useTranslations('pages.home')
  const router = useRouter()

  //* [Contexts] *//
  const { set_theme } = useApplication()

  //* [Local State] *//
  const [loading, setLoading] = useState<boolean>(false)

  async function onSubmit(theme: string) {
    if (loading) return

    setLoading(true)

    try {
      set_theme(theme as ThemeShowTypeEnum)

      const params = new URLSearchParams()
      const dc = localStorage.getItem('dc')
      const fbclidValue = localStorage.getItem('fbclid')
      const ttclidValue = localStorage.getItem('ttclid')
      const utm_sourceValue = localStorage.getItem('utm_source')
      const utm_campaignValue = localStorage.getItem('utm_campaign')
      const utm_mediumValue = localStorage.getItem('utm_medium')
      const utm_contentValue = localStorage.getItem('utm_content')
      const utm_termValue = localStorage.getItem('utm_term')
      const xcodValue = localStorage.getItem('xcod')
      const gclidValue = localStorage.getItem('gclid')

      if (theme) params.append('theme', theme)
      if (dc) params.append('dc', dc)
      if (fbclidValue) params.append('fbclid', fbclidValue)
      if (ttclidValue) params.append('ttclid', ttclidValue)
      if (utm_sourceValue) params.append('utm_source', utm_sourceValue)
      if (utm_campaignValue) params.append('utm_campaign', utm_campaignValue)
      if (utm_mediumValue) params.append('utm_medium', utm_mediumValue)
      if (utm_contentValue) params.append('utm_content', utm_contentValue)
      if (utm_termValue) params.append('utm_term', utm_termValue)
      if (xcodValue) params.append('xcod', xcodValue)
      if (gclidValue) params.append('gclid', gclidValue)

      router.push(`/create?${params.toString()}`)
    } catch (error: any) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='container flex flex-col items-center justify-center pb-12'>
      <h2 className='bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-200 to-white text-3xl lg:text-5xl font-sans py-2 relative z-20 font-bold tracking-tight'>
        {t('themes.title')}
      </h2>
      <p className='max-w-xl text-center text-base md:text-lg text-neutral-200 mb-4'>{t('themes.description')}</p>

      <div className='lg:grid lg:grid-cols-2 lg:gap-6'>
        <CardContainer className='inter-var'>
          <CardBody className='relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black border-white/[0.2] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border'>
            <CardItem translateZ='50' className='text-xl font-bold text-white'>
              {t('themes.1.title')}
            </CardItem>
            <CardItem as='p' translateZ='60' className='text-sm max-w-sm mt-2 text-neutral-300'>
              {t('themes.1.description')}
            </CardItem>
            <CardItem translateZ='100' className='w-full mt-4'>
              <Image
                src='/images/themes/default.gif'
                height='1000'
                width='1000'
                className='w-full rounded-xl group-hover/card:shadow-xl'
                alt='thumbnail'
              />
            </CardItem>
            <div className='flex justify-between items-center mt-14'>
              <CardItem translateZ={20} className='px-4 py-2 rounded-xl text-xs font-normal text-white'>
                {t('themes.1.try-now')}
              </CardItem>
              <CardItem
                translateZ={20}
                onClick={() => onSubmit(ThemeShowTypeEnum.DEFAULT)}
                className='px-4 py-2 rounded-xl bg-white text-black text-xs font-bold cursor-pointer'
              >
                {t('themes.1.start-now')}
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
        <CardContainer className='inter-var'>
          <CardBody className='relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black border-white/[0.2] w-auto sm:w-[30rem] h-auto -mt-32 lg:mt-0 rounded-xl p-6 border'>
            <CardItem translateZ='50' className='text-xl font-bold text-white'>
              {t('themes.2.title')}
            </CardItem>
            <CardItem as='p' translateZ='60' className='text-sm max-w-sm mt-2 text-neutral-300'>
              {t('themes.2.description')}
            </CardItem>
            <CardItem translateZ='100' className='w-full mt-4'>
              <Image
                src='/images/themes/netflix.gif'
                height='1000'
                width='1000'
                className='w-full rounded-xl group-hover/card:shadow-xl'
                alt='thumbnail'
              />
            </CardItem>
            <div className='flex justify-between items-center mt-14'>
              <CardItem translateZ={20} className='px-4 py-2 rounded-xl text-xs font-normal text-white'>
                {t('themes.2.try-now')}
              </CardItem>
              <CardItem
                translateZ={20}
                onClick={() => onSubmit(ThemeShowTypeEnum.NETFLIX)}
                className='px-4 py-2 rounded-xl bg-white text-black text-xs font-bold cursor-pointer'
              >
                {t('themes.2.start-now')}
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </div>
    </div>
  )
}
