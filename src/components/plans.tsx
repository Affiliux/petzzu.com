'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { IconCheck, IconStarFilled, IconX } from '@tabler/icons-react'

import { useApplication } from '@/contexts/ApplicationContext'

import { HoverBorderGradient } from './ui/hover-border-gradient'

export function Plans() {
  // hooks
  const t = useTranslations()

  // contexts
  const { discount, currency, plans } = useApplication()

  // constants
  const FORMAT_INTL_CURRENCY = currency ?? 'BRL'
  const FORMAT_INTL_LOCALE = t('config.defaults.country')

  return (
    <div className='bg-transparent bg-dot-neutral-500/20 relative'>
      <div className='container mx-auto py-10'>
        <div className='flex flex-col items-center justify-center text-center mb-10'>
          <h2 className='text-3xl font-bold tracking-tight'>{t('pages.home.plans.title')}</h2>
          <p className='text-muted-foreground mt-2 max-w-xl'>{t('pages.home.plans.description')}</p>
        </div>

        <div id='plans' className='relative grid gap-6 md:grid-cols-3 z-40'>
          {plans?.map(plan =>
            plan?.sku?.includes(FORMAT_INTL_CURRENCY) && FORMAT_INTL_LOCALE.includes('-') && FORMAT_INTL_CURRENCY ? (
              <div key={plan.sku} className='w-full'>
                <HoverBorderGradient
                  containerClassName={`rounded-xl w-full transform duration-200 bg-white`}
                  className={`relative p-5 w-full flex gap-8 text-left bg-white transform duration-200`}
                >
                  <div className='w-full flex flex-col justify-between'>
                    <div className='w-full'>
                      <p className='text-2xl font-bold relative z-20 text-left text-neutral-900 mt-4'>
                        {t(`pages.home.plans.${plan.sku.split('_')[1]}.title`)}
                      </p>
                      <p className='text-lg font-light relative z-20 text-left text-muted-foreground'>
                        {t(`pages.home.plans.${plan.sku.split('_')[1]}.counter`)}
                      </p>
                    </div>

                    <div className='flex text-neutral-200 relative z-20'>
                      <ul className='list-none mt-4'>
                        <StepCheck title={t(`pages.home.plans.${plan.sku.split('_')[1]}.benefits.1`)} />
                        <StepCheck title={t(`pages.home.plans.${plan.sku.split('_')[1]}.benefits.2`)} />
                        <StepCheck title={t(`pages.home.plans.${plan.sku.split('_')[1]}.benefits.3`)} />
                        <StepCheck title={t(`pages.home.plans.${plan.sku.split('_')[1]}.benefits.4`)} />
                        <StepCheck title={t(`pages.home.plans.${plan.sku.split('_')[1]}.benefits.5`)} />
                        <StepCheck title={t(`pages.home.plans.${plan.sku.split('_')[1]}.benefits.6`)} />
                        <StepCheck title={t(`pages.home.plans.${plan.sku.split('_')[1]}.benefits.7`)} />
                        <StepCheck title={t(`pages.home.plans.${plan.sku.split('_')[1]}.benefits.8`)} />


                        {plan.sku.includes('annual') ? (
                          <>
                            <StepPerCheck
                              title={t(`pages.home.plans.${plan.sku.split('_')[1]}.benefits.9`).split('|')[0]}
                              sub={t(`pages.home.plans.${plan.sku.split('_')[1]}.benefits.9`).split('|')[1]}
                            />
                            <StepCheck title={t(`pages.home.plans.${plan.sku.split('_')[1]}.benefits.10`)} />
                          </>
                        ) : plan.sku.includes('month') ? (
                          <>
                            <StepPerCheck
                              title={t(`pages.home.plans.${plan.sku.split('_')[1]}.benefits.9`).split('|')[0]}
                              sub={t(`pages.home.plans.${plan.sku.split('_')[1]}.benefits.9`).split('|')[1]}
                            />
                            <StepPerCheck
                              title={t(`pages.home.plans.${plan.sku.split('_')[1]}.benefits.10`).split('|')[0]}
                              sub={t(`pages.home.plans.${plan.sku.split('_')[1]}.benefits.10`).split('|')[1]}
                            />
                          </>
                        ) : (
                          <>
                            <StepPerUnCheck
                              title={t(`pages.home.plans.${plan.sku.split('_')[1]}.benefits.9`).split('|')[0]}
                              sub={t(`pages.home.plans.${plan.sku.split('_')[1]}.benefits.9`).split('|')[1]}
                            />
                            <StepPerUnCheck
                              title={t(`pages.home.plans.${plan.sku.split('_')[1]}.benefits.10`).split('|')[0]}
                              sub={t(`pages.home.plans.${plan.sku.split('_')[1]}.benefits.10`).split('|')[1]}
                            />
                          </>
                        )}
                      </ul>
                    </div>

                    <div className='mt-8'>
                      <p className='text-lg font-black text-theme-600 line-through'>
                        {Intl.NumberFormat(FORMAT_INTL_LOCALE, {
                          style: 'currency',
                          currency: plan.currency,
                        }).format(plan.price + plan.price)}
                      </p>

                      <p className='text-2xl font-black text-neutral-900 -mt-1'>
                        {Intl.NumberFormat(FORMAT_INTL_LOCALE, {
                          style: 'currency',
                          currency: plan.currency,
                        }).format(
                          discount
                            ? plan.price -
                                (plan.sku.includes('basic') ? discount.discount_basic : discount.discount_pro)
                            : plan.price,
                        )}{' '}
                        <span className='font-light text-xs text-neutral-500'>
                          {t(`pages.home.plans.${plan.sku.split('_')[1]}.price_recurrence`)}
                        </span>
                      </p>
                    </div>

                    <Link
                      href='#start'
                      className='w-full px-4 py-3 mt-8 bg-theme-100 border border-theme-200 hover:bg-theme-200 transition duration-200 flex items-center justify-center gap-4 cursor-pointer rounded-lg text-theme-800'
                    >
                      {t('pages.home.plans.button')}
                      <ChevronRight size={20} />
                    </Link>
                  </div>

                  {plan.sku.includes('annual') && (
                    <div className='bg-theme-100 border border-theme-300 text-theme-900 text-sm gap-1 font-semibold flex items-center rounded-full px-2 py-[2px] z-50 absolute -top-3 right-4'>
                      <IconStarFilled size={12} />
                      <p>{t('pages.home.plans.recommended')}</p>
                    </div>
                  )}
                </HoverBorderGradient>
              </div>
            ) : null,
          )}
        </div>
      </div>
    </div>
  )
}

const StepCheck = ({ title, bold }: { title: string; bold?: boolean }) => {
  return (
    <li className='flex gap-2 items-center mb-1'>
      <div className='flex items-center justify-center text-theme-600 bg-theme-100 rounded-full h-4 w-4'>
        <IconCheck size={14} />
      </div>
      <p className={`text-muted-foreground text-sm ${bold && 'font-bold'}`}>{title}</p>
    </li>
  )
}

const StepPerCheck = ({ title, sub, bold }: { title: string; sub?: string; bold?: boolean }) => {
  return (
    <li className='flex gap-2 items-center mb-1'>
      <div className='flex items-center justify-center text-theme-600 bg-theme-100 rounded-full h-4 w-4'>
        <IconCheck size={14} />
      </div>
      <div className='flex flex-col md:flex-row md:items-center md:gap-2'>
        <p className={`text-muted-foreground text-sm ${bold && 'font-bold'}`}>{title}</p>
        <p className={`text-theme-600 text-xs`}>({sub})</p>
      </div>
    </li>
  )
}

const StepPerUnCheck = ({ title, sub, bold }: { title: string; sub?: string; bold?: boolean }) => {
  return (
    <li className='flex gap-2 items-center mb-1'>
      <div className='flex items-center justify-center text-theme-600 bg-theme-100 rounded-full h-4 w-4'>
        <IconX size={14} />
      </div>
      <div className='flex flex-col md:flex-row md:items-center md:gap-2'>
        <p className={`text-muted-foreground text-sm ${bold && 'font-bold'}`}>{title}</p>
        <p className={`text-theme-600 text-xs`}>({sub})</p>
      </div>
    </li>
  )
}

const StepUnCheck = ({ title, bold }: { title: string; bold?: boolean }) => {
  return (
    <li className='flex gap-2 items-center mb-1'>
      <div className='flex items-center justify-center text-theme-600 bg-theme-100 rounded-full h-4 w-4'>
        <IconX size={14} />
      </div>
      <p className={`text-muted-foreground text-sm ${bold && 'font-bold'}`}>{title}</p>
    </li>
  )
}
