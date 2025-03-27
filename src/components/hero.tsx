'use client'

import React, { useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { IconChevronRight, IconLoader, IconStarFilled } from '@tabler/icons-react'

import { useQueryParams } from '@/hooks/use-query-params'

import { HoverBorderGradient } from './ui/hover-border-gradient'
import { LazyLoadVideo } from './lazy-video'
import TypingAnimation from './type-animation'

export const Hero = () => {
  // hooks
  const t = useTranslations()
  const queryParams = useQueryParams()
  const router = useRouter()

  // states
  const [loading, setLoading] = useState<boolean>(false)

  async function onSubmit() {
    setLoading(true)

    try {
      const params = new URLSearchParams()

      if (!!queryParams?.fbclid) localStorage.setItem('fbclid', queryParams?.fbclid)
      if (!!queryParams?.ttclid) localStorage.setItem('ttclid', queryParams?.ttclid)
      if (!!queryParams?.utm_source) localStorage.setItem('utm_source', queryParams?.utm_source)
      if (!!queryParams?.utm_campaign) localStorage.setItem('utm_campaign', queryParams?.utm_campaign)
      if (!!queryParams?.utm_medium) localStorage.setItem('utm_medium', queryParams?.utm_medium)
      if (!!queryParams?.utm_content) localStorage.setItem('utm_content', queryParams?.utm_content)
      if (!!queryParams?.utm_term) localStorage.setItem('utm_term', queryParams?.utm_term)
      if (!!queryParams?.xcod) localStorage.setItem('xcod', queryParams?.xcod)
      if (!!queryParams?.gclid) localStorage.setItem('gclid', queryParams?.gclid)

      const fbclidValue = queryParams?.fbclid ?? localStorage.getItem('fbclid')
      const ttclidValue = queryParams?.ttclid ?? localStorage.getItem('ttclid')
      const utm_sourceValue = queryParams?.utm_source ?? localStorage.getItem('utm_source')
      const utm_campaignValue = queryParams?.utm_campaign ?? localStorage.getItem('utm_campaign')
      const utm_mediumValue = queryParams?.utm_medium ?? localStorage.getItem('utm_medium')
      const utm_contentValue = queryParams?.utm_content ?? localStorage.getItem('utm_content')
      const utm_termValue = queryParams?.utm_term ?? localStorage.getItem('utm_term')
      const xcodValue = queryParams?.xcod ?? localStorage.getItem('xcod')
      const gclidValue = queryParams?.gclid ?? localStorage.getItem('gclid')

      if (queryParams?.theme) params.append('theme', queryParams?.theme)
      if (queryParams?.dc) params.append('dc', queryParams?.dc)
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

  // list people rating
  const people = [
    {
      id: 1,
      image: '/images/approved/1.webp',
    },
    {
      id: 2,
      image: '/images/approved/2.webp',
    },
    {
      id: 3,
      image: '/images/approved/3.webp',
    },
    {
      id: 4,
      image: '/images/approved/4.webp',
    },
    {
      id: 5,
      image: '/images/approved/5.webp',
    },
  ]

  return (
    <div className='flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-36 relative z-40'>
      <div className='w-full pt-[100px] lg:w-1/2 lg:pt-8'>
        <HoverBorderGradient
          containerClassName='rounded-full'
          as='button'
          className='bg-white text-neutral-900 text-xs flex items-center space-x-2'
        >
          <span> {t('pages.home.hero.sub-title')}</span>
        </HoverBorderGradient>

        <h1 className='text-neutral-900 text-4xl lg:text-5xl font-sans pt-3 relative z-20 font-bold tracking-tight'>
          {t('pages.home.hero.title.1')}
        </h1>
        <h2 className='relative font-bold tracking-tight text-4xl lg:text-5xl font-sans text-theme-400 pb-8 z-20'>
          <TypingAnimation
            phrases={[
              t('pages.home.hero.title.2'),
              t('pages.home.hero.title.3'),
              t('pages.home.hero.title.4'),
              t('pages.home.hero.title.5'),
            ]}
            classNames='relative font-bold tracking-tight text-5xl lg:text-6xl font-sans text-red-500 pb-8 z-20'
          />
        </h2>

        <p className='max-w-xl text-sm md:text-lg text-neutral-500'>{t('pages.home.hero.description')}</p>

        <button
          type='button'
          onClick={onSubmit}
          disabled={loading}
          className={`relative mt-6 w-full lg:w-[50%] inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] focus:outline-none focus:ring-0 ${
            loading ? 'opacity-50' : ''
          }`}
        >
          <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--theme-200),var(--theme-500),var(--theme-300))]' />
          <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-white px-3 py-1 text-sm font-semibold text-neutral-900 backdrop-blur-3xl'>
            {loading ? (
              <IconLoader size={20} className='animate-spin' />
            ) : (
              <>
                {t('pages.home.hero.button')}
                <IconChevronRight size={20} className='ml-4' />
              </>
            )}
          </span>
        </button>

        <div className='flex items-center gap-4 mt-6'>
          <div className='flex -space-x-2'>
            {people.map((data, index) => (
              <div
                key={data.id}
                className='relative w-8 h-8 rounded-full border border-white shadow-sm overflow-hidden'
                style={{ zIndex: 6 - index }}
              >
                <Image src={data.image} alt={`Couple ${index}`} fill className='object-cover' />
              </div>
            ))}
          </div>

          <div className='flex flex-col gap-1'>
            <div className='flex'>
              {[1, 2, 3, 4, 5].map(index => (
                <IconStarFilled key={index} className='w-4 h-4 fill-amber-400 text-amber-400' />
              ))}
            </div>

            <p className='text-xs text-white'>{t('pages.home.hero.rating')}</p>
          </div>
        </div>
      </div>

      <div className='relative lg:flex items-center w-full lg:w-1/2 justify-center'>
        {['/videos/hero/1.webm', '/videos/hero/2.webm', '/videos/hero/3.webm'].map((videoSrc, index) => {
          const rotation = [0, 10, 20][index]
          const translateX = [0, 120, 240][index]
          const lgTranslateX = [-200, 0, 200][index]
          const marginTop = [0, 'lg:mt-8', 'lg:mt-32'][index]
          const zIndex = 3 - index

          return (
            <div
              key={index}
              className={`absolute w-[80%] max-w-[100px] lg:max-w-[220px] lg:rotate-[${rotation}deg] aspect-[9/16] ${marginTop} transition-all translate-x-[${translateX}px] lg:translate-x-[${lgTranslateX}px] duration-300 hover:z-50 hover:scale-110`}
              style={{
                zIndex,
              }}
            >
              <img src='/images/mockup.webp' alt='mockup' className='absolute z-50 w-full h-full' />
              <div className='relative w-[97%] h-[99%] rounded-2xl overflow-hidden cursor-not-allowed z-40'>
                <LazyLoadVideo
                  src={videoSrc}
                  type='video/webm'
                  classNames='absolute top-0.5 left-0.5 lg:left-1 lg:top-2 rounded-md lg:rounded-3xl'
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
