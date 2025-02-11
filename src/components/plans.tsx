'use client'

import React from 'react'

import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { IconCheck, IconStarFilled, IconX } from '@tabler/icons-react'

import { useApplication } from '@/contexts/ApplicationContext'

import { HoverBorderGradient } from './ui/hover-border-gradient'
import { ShootingStars } from './ui/shooting-stars'
import { StarsBackground } from './ui/stars-background'

export const Plans = () => {
  // hooks
  const t = useTranslations()

  // contexts
  const { plans, discount, currency } = useApplication()

  const format_intl_currency = currency ?? 'brl'
  const format_intl_locale = t('config.defaults.country')

  return plans && format_intl_locale.includes('-') && format_intl_currency ? (
    <div id='plans' className='relative w-full rounded-md overflow-hidden'>
      <div className='flex items-center flex-col justify-center gap-16 px-2 md:px-10 py-8 w-full h-full'>
        <div className='mx-auto max-w-xl'>
          <h2 className='text-white text-3xl md:text-5xl font-bold text-center'>{t('pages.home.plans.title')}</h2>
          <p className='text-neutral-300 text-center mt-2'>{t('pages.home.plans.description')}</p>
        </div>

        <div className='grid lg:grid-cols-2 gap-4'>
          {plans.map(plan =>
            plan.currency.includes(format_intl_currency) ? (
              <div key={plan.sku} className='w-full bg-black'>
                <HoverBorderGradient
                  containerClassName={`rounded-xl w-full transform duration-200 bg-neutral-900`}
                  className={`relative py-6 px-8 w-full text-left cursor-pointer bg-neutral-950 transform duration-200`}
                >
                  <div className='w-full'>
                    <p className='text-3xl font-bold relative z-20 text-left text-white mt-4'>
                      {t(`pages.home.plans.${plan.sku.split('_')[1]}.title`)}
                    </p>

                    <div className='text-neutral-200 relative z-20'>
                      <ul className='list-none mt-4'>
                        <StepCheck title={t(`pages.home.plans.${plan.sku.split('_')[1]}.text`)} />
                        <StepCheck bold title={t(`pages.home.plans.${plan.sku.split('_')[1]}.counter`)} />
                        <StepCheck title={t(`pages.home.plans.${plan.sku.split('_')[1]}.date`)} />
                        <StepCheck bold title={t(`pages.home.plans.${plan.sku.split('_')[1]}.qr-code`)} />
                        <StepCheck title={t(`pages.home.plans.${plan.sku.split('_')[1]}.images`)} />

                        {plan.sku.includes('pro') ? (
                          <>
                            <StepCheck bold title={t(`pages.home.plans.${plan.sku.split('_')[1]}.music`)} />
                            <StepCheck title={t(`pages.home.plans.${plan.sku.split('_')[1]}.background`)} />
                            <StepCheck bold title={t(`pages.home.plans.${plan.sku.split('_')[1]}.animations`)} />
                            <StepCheck title={t(`pages.home.plans.${plan.sku.split('_')[1]}.url`)} />
                            <StepCheck bold title={t(`pages.home.plans.${plan.sku.split('_')[1]}.support`)} />
                          </>
                        ) : (
                          <>
                            <StepUnCheck bold title={t(`pages.home.plans.${plan.sku.split('_')[1]}.music`)} />
                            <StepUnCheck title={t(`pages.home.plans.${plan.sku.split('_')[1]}.background`)} />
                            <StepUnCheck bold title={t(`pages.home.plans.${plan.sku.split('_')[1]}.animations`)} />
                            <StepCheck title={t(`pages.home.plans.${plan.sku.split('_')[1]}.url`)} />
                            <StepCheck bold title={t(`pages.home.plans.${plan.sku.split('_')[1]}.support`)} />
                          </>
                        )}
                      </ul>
                    </div>
                  </div>

                  {plan.sku.includes('pro') && (
                    <div className='bg-black text-yellow-500 text-sm gap-1 font-semibold flex items-center rounded-full px-2 py-[2px] z-50 absolute -top-3'>
                      <IconStarFilled size={12} />
                      <p>{t('pages.home.plans.recommended')}</p>
                    </div>
                  )}

                  <div className='mt-8'>
                    <p className='text-xl font-black text-red-600 line-through'>
                      {Intl.NumberFormat(format_intl_locale, {
                        style: 'currency',
                        currency: plan.currency,
                      }).format(plan.price + plan.price)}
                    </p>

                    <p className='text-3xl font-black text-white'>
                      {Intl.NumberFormat(format_intl_locale, {
                        style: 'currency',
                        currency: plan.currency,
                      }).format(
                        discount
                          ? plan.price - (plan.sku.includes('basic') ? discount.discount_basic : discount.discount_pro)
                          : plan.price,
                      )}{' '}
                      <span className='font-light text-xs text-neutral-300'>
                        {t(`pages.home.plans.${plan.sku.split('_')[1]}.price_recurrency`)}
                      </span>
                    </p>
                  </div>

                  <div className='flex flex-col sm:flex-row items-center gap-4 mt-8 w-full'>
                    <a
                      href='#start'
                      className='px-4 py-3 bg-red-600 hover:bg-red-700 w-full transition duration-200 flex items-center justify-between rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]'
                    >
                      {t('pages.home.plans.button')}
                      <ChevronRight size={20} />
                    </a>
                  </div>
                </HoverBorderGradient>
              </div>
            ) : null,
          )}
        </div>
      </div>

      <ShootingStars />
      <StarsBackground />
    </div>
  ) : (
    <></>
  )
}

const StepCheck = ({ title, bold }: { title: string; bold?: boolean }) => {
  return (
    <li className='flex gap-2 items-center'>
      <div className='flex items-center justify-center text-green-600 rounded-full p-0.5'>
        <IconCheck size={14} />
      </div>
      <p className={`text-neutral-300 text-base ${bold && 'font-bold'}`}>{title}</p>
    </li>
  )
}

const StepUnCheck = ({ title, bold }: { title: string; bold?: boolean }) => {
  return (
    <li className='flex gap-2 items-center'>
      <div className='flex items-center justify-center text-red-600 rounded-full p-0.5'>
        <IconX size={14} />
      </div>
      <p className={`text-neutral-300 text-base ${bold && 'font-bold'}`}>{title}</p>
    </li>
  )
}
