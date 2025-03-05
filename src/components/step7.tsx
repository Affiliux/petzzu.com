'use client'

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { IconCheck, IconChevronLeft, IconChevronRight, IconLoader, IconStarFilled, IconX } from '@tabler/icons-react'

import { DiscountProps, PlanProps } from '@/typings/application'
import { useApplication } from '@/contexts/ApplicationContext'

import { HoverBorderGradient } from './ui/hover-border-gradient'

import { locales } from '@/i18n'

interface Step7Props {
  plans: PlanProps[]
  discount: DiscountProps | null
  selected: PlanProps | undefined
  setPlan: Dispatch<SetStateAction<PlanProps | undefined>>
  onNext: () => Promise<void>
  onBack: () => void
}

export const Step7 = ({ plans, discount, selected, setPlan, onNext, onBack }: Step7Props) => {
  const t = useTranslations()

  const { currency } = useApplication()

  const [loading, setLoading] = useState(false)

  const format_intl_locale = t('config.defaults.country')
  const format_intl_currency = currency ?? 'brl'

  async function onSubmit() {
    setLoading(true)

    try {
      await onNext()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const find = plans.find(plan => plan.sku.includes(`plan_pro_${t('config.defaults.currency')}`))

    if (!selected) setPlan(find)
    if (selected && !selected.sku.includes(`plan_pro_${t('config.defaults.currency')}`)) setPlan(find)
  }, [])

  return (
    <div className='relative flex flex-col gap-8 z-50 w-full mt-8'>
      <div className='flex flex-col lg:flex-row justify-between gap-4'>
        {plans.map(plan =>
          plan.sku.includes(format_intl_currency) && format_intl_locale.includes('-') && format_intl_currency ? (
            <div
              key={plan.sku}
              onClick={() => {
                if (plan.sku !== selected?.sku) setPlan(plan)
                else onSubmit()
              }}
              className='w-full'
            >
              <HoverBorderGradient
                containerClassName={`rounded-xl w-full transform duration-200 bg-neutral-800 ${
                  plan.sku === selected?.sku ? 'scale-105' : 'opacity-50'
                }`}
                as='button'
                className={`relative p-5 w-full text-left cursor-pointer bg-neutral-800 transform duration-200`}
              >
                <div className='w-full'>
                  <p className='text-2xl font-bold relative z-20 text-left text-white mt-4'>
                    {t(`steps.step7.plans.${plan.sku.split('_')[1]}.title`)}
                  </p>

                  <div className='text-neutral-200 relative z-20'>
                    <ul className='list-none mt-4'>
                      <StepCheck title={t(`steps.step7.plans.${plan.sku.split('_')[1]}.text`)} />
                      <StepCheck bold title={t(`steps.step7.plans.${plan.sku.split('_')[1]}.counter`)} />
                      <StepCheck title={t(`steps.step7.plans.${plan.sku.split('_')[1]}.date`)} />
                      <StepCheck bold title={t(`steps.step7.plans.${plan.sku.split('_')[1]}.qr-code`)} />
                      <StepCheck title={t(`steps.step7.plans.${plan.sku.split('_')[1]}.images`)} />

                      {plan.sku.includes('pro') ? (
                        <>
                          <StepCheck title={t(`steps.step7.plans.${plan.sku.split('_')[1]}.url`)} />
                          <StepCheck bold title={t(`steps.step7.plans.${plan.sku.split('_')[1]}.support`)} />
                        </>
                      ) : (
                        <>
                          <StepCheck title={t(`steps.step7.plans.${plan.sku.split('_')[1]}.url`)} />
                          <StepCheck bold title={t(`steps.step7.plans.${plan.sku.split('_')[1]}.support`)} />
                        </>
                      )}
                    </ul>
                  </div>
                </div>

                {plan.sku.includes('pro') && (
                  <div className='bg-black text-yellow-500 text-sm gap-1 font-semibold flex items-center rounded-full px-2 py-[2px] z-50 absolute -top-3'>
                    <IconStarFilled size={12} />
                    <p>{t('steps.step7.recommended')}</p>
                  </div>
                )}

                <div className='mt-8'>
                  <p className='text-lg font-black text-red-600 line-through'>
                    {Intl.NumberFormat(format_intl_locale, {
                      style: 'currency',
                      currency: plan.currency,
                    }).format(plan.price + plan.price)}
                  </p>

                  <p className='text-2xl font-black text-white'>
                    {Intl.NumberFormat(format_intl_locale, {
                      style: 'currency',
                      currency: plan.currency,
                    }).format(
                      discount
                        ? plan.price - (plan.sku.includes('basic') ? discount.discount_basic : discount.discount_pro)
                        : plan.price,
                    )}{' '}
                    <span className='font-light text-xs text-neutral-300'>
                      {t(`steps.step7.plans.${plan.sku.split('_')[1]}.price_recurrency`)}
                    </span>
                  </p>
                </div>
              </HoverBorderGradient>
            </div>
          ) : null,
        )}
      </div>

      <div className='flex items-center justify-between gap-4 mt-4'>
        <button
          type='button'
          onClick={onBack}
          disabled={loading}
          className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-800 focus:outline-none focus:ring-0 ${
            loading ? 'opacity-50' : ''
          }`}
        >
          <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black px-3 py-1 text-sm font-semibold text-white backdrop-blur-3xl'>
            <>
              <IconChevronLeft size={20} className='mr-4' />
              {t('steps.step7.back')}
            </>
          </span>
        </button>
        <button
          onClick={onSubmit}
          disabled={!selected || loading}
          className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-800 focus:outline-none focus:ring-0 ${
            loading || !selected ? 'opacity-50' : ''
          }`}
        >
          <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black px-3 py-1 text-sm font-semibold text-white backdrop-blur-3xl'>
            {loading ? (
              <IconLoader size={20} className='animate-spin' />
            ) : (
              <>
                {t('steps.step6.button')}
                <IconChevronRight size={20} className='ml-4' />
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  )
}

const StepCheck = ({ title, bold }: { title: string; bold?: boolean }) => {
  return (
    <li className='flex gap-2 items-center'>
      <div className='flex items-center justify-center text-green-600 rounded-full p-0.5'>
        <IconCheck size={12} />
      </div>
      <p className={`text-neutral-300 text-sm ${bold && 'font-bold'}`}>{title}</p>
    </li>
  )
}

const StepUnCheck = ({ title, bold }: { title: string; bold?: boolean }) => {
  return (
    <li className='flex gap-2 items-center'>
      <div className='flex items-center justify-center text-red-600 rounded-full p-0.5'>
        <IconX size={12} />
      </div>
      <p className={`text-neutral-300 text-sm ${bold && 'font-bold'}`}>{title}</p>
    </li>
  )
}
