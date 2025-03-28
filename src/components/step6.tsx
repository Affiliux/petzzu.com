'use client'

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { useTranslations } from 'next-intl'
import { IconCheck, IconChevronLeft, IconChevronRight, IconLoader, IconStarFilled, IconX } from '@tabler/icons-react'

import type { DiscountProps, PlanProps } from '@/typings/application'
import { useApplication } from '@/contexts/ApplicationContext'

import { HoverBorderGradient } from './ui/hover-border-gradient'

interface Step6Props {
  plans: PlanProps[]
  discount: DiscountProps | null
  selected: PlanProps | undefined
  setPlan: Dispatch<SetStateAction<PlanProps | undefined>>
  onNext: () => Promise<void>
  onBack: () => void
}

export const Step6 = ({ plans, discount, selected, setPlan, onNext, onBack }: Step6Props) => {
  // hooks
  const t = useTranslations()

  // contexts
  const { currency } = useApplication()

  // states
  const [loading, setLoading] = useState(false)

  // variables
  const FORMAT_INTL_LOCALE = t('config.defaults.country')
  const FORMAT_INTL_CURRENCY = currency ?? 'BRL'

  async function handleSubmit() {
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
    const find = plans.find(plan => plan.sku.includes(`plan_month_${t('config.defaults.currency')}`))

    if (!selected) setPlan(find)
    if (selected && !selected.sku.includes(`plan_month_${t('config.defaults.currency')}`)) setPlan(find)
  }, [])

  return (
    <div className='relative flex flex-col gap-8 z-50 w-full mt-8'>
      <div className='flex flex-col gap-4'>
        {plans.map(plan =>
          plan.sku.includes(FORMAT_INTL_CURRENCY) && FORMAT_INTL_LOCALE.includes('-') && FORMAT_INTL_CURRENCY ? (
            <div
              key={plan.sku}
              onClick={() => {
                if (plan.sku !== selected?.sku) setPlan(plan)
                else handleSubmit()
              }}
              className='w-full'
            >
              <HoverBorderGradient
                containerClassName={`rounded-xl w-full transform duration-200 bg-white ${
                  plan.sku === selected?.sku ? 'scale-105 my-2' : 'opacity-50'
                }`}
                as='button'
                className={`relative p-5 w-full flex gap-8 text-left cursor-pointer bg-white transform duration-200`}
              >
                <div className='flex flex-col justify-between'>
                  <div className='w-full'>
                    <p className='text-2xl font-bold relative z-20 text-left text-neutral-900 mt-4'>
                      {t(`steps.step6.plans.${plan.sku.split('_')[1]}.title`)}
                    </p>
                    <p className='text-lg font-light relative z-20 text-left text-muted-foreground'>
                      {t(`steps.step6.plans.${plan.sku.split('_')[1]}.counter`)}
                    </p>
                  </div>

                  <div className='md:hidden flex text-neutral-200 relative z-20'>
                    <ul className='list-none mt-4'>
                      <StepCheck title={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.1`)} />
                      <StepCheck title={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.2`)} />
                      <StepCheck title={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.3`)} />
                      <StepCheck title={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.4`)} />
                      <StepCheck title={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.5`)} />
                      <StepCheck title={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.6`)} />
                      <StepCheck title={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.7`)} />
                      <StepCheck title={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.8`)} />

                      {plan.sku.includes('annual') ? (
                        <>
                          <StepPerCheck
                            title={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.9`).split('|')[0]}
                            sub={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.9`).split('|')[1]}
                          />
                          <StepCheck title={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.10`)} />
                        </>
                      ) : plan.sku.includes('month') ? (
                        <>
                          <StepPerCheck
                            title={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.9`).split('|')[0]}
                            sub={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.9`).split('|')[1]}
                          />
                          <StepPerCheck
                            title={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.10`).split('|')[0]}
                            sub={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.10`).split('|')[1]}
                          />
                        </>
                      ) : (
                        <>
                          <StepPerUnCheck
                            title={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.9`).split('|')[0]}
                            sub={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.9`).split('|')[1]}
                          />
                          <StepPerUnCheck
                            title={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.10`).split('|')[0]}
                            sub={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.10`).split('|')[1]}
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
                          ? plan.price - (plan.sku.includes('basic') ? discount.discount_basic : discount.discount_pro)
                          : plan.price,
                      )}{' '}
                      <span className='font-light text-xs text-neutral-500'>
                        {t(`steps.step6.plans.${plan.sku.split('_')[1]}.price_recurrence`)}
                      </span>
                    </p>
                  </div>
                </div>

                {plan.sku.includes('annual') && (
                  <div className='bg-theme-100 border border-theme-300 text-theme-900 text-sm gap-1 font-semibold flex items-center rounded-full px-2 py-[2px] z-50 absolute -top-3 right-4'>
                    <IconStarFilled size={12} />
                    <p>{t('steps.step6.recommended')}</p>
                  </div>
                )}

                <div className='hidden md:flex text-neutral-200 relative z-20'>
                  <ul className='list-none mt-4'>
                    <StepCheck title={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.1`)} />
                    <StepCheck title={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.2`)} />
                    <StepCheck title={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.3`)} />
                    <StepCheck title={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.4`)} />
                    <StepCheck title={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.5`)} />
                    <StepCheck title={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.6`)} />
                    <StepCheck title={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.7`)} />
                    <StepCheck title={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.8`)} />

                    {plan.sku.includes('annual') ? (
                      <>
                        <StepPerCheck
                          title={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.9`).split('|')[0]}
                          sub={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.9`).split('|')[1]}
                        />
                        <StepCheck title={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.10`)} />
                      </>
                    ) : plan.sku.includes('month') ? (
                      <>
                        <StepPerCheck
                          title={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.9`).split('|')[0]}
                          sub={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.9`).split('|')[1]}
                        />
                        <StepPerCheck
                          title={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.10`).split('|')[0]}
                          sub={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.10`).split('|')[1]}
                        />
                      </>
                    ) : (
                      <>
                        <StepPerUnCheck
                          title={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.9`).split('|')[0]}
                          sub={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.9`).split('|')[1]}
                        />
                        <StepPerUnCheck
                          title={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.10`).split('|')[0]}
                          sub={t(`steps.step6.plans.${plan.sku.split('_')[1]}.benefits.10`).split('|')[1]}
                        />
                      </>
                    )}
                  </ul>
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
          className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-200/60 focus:outline-none focus:ring-0 ${
            loading ? 'opacity-50' : ''
          }`}
        >
          <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-theme-100 px-3 py-1 text-sm font-semibold text-theme-600 backdrop-blur-3xl'>
            <>
              <IconChevronLeft size={20} className='mr-4' />
              {t('steps.step6.back')}
            </>
          </span>
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading || !selected}
          className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-200/60 focus:outline-none focus:ring-0 ${
            loading || !selected ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          <span className='inline-flex h-full w-full  items-center justify-center rounded-lg bg-theme-100 px-3 py-1 text-sm font-semibold text-theme-600 backdrop-blur-3xl'>
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
      <div className='flex items-center justify-center text-theme-600 bg-theme-100 rounded-full h-4 w-4'>
        <IconCheck size={14} />
      </div>
      <p className={`text-muted-foreground text-sm ${bold && 'font-bold'}`}>{title}</p>
    </li>
  )
}

const StepPerCheck = ({ title, sub, bold }: { title: string; sub?: string; bold?: boolean }) => {
  return (
    <li className='flex gap-2 items-center mb-1 md:mb-0'>
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
    <li className='flex gap-2 items-center mb-1 md:mb-0'>
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
    <li className='flex gap-2 items-center'>
      <div className='flex items-center justify-center text-theme-600 bg-theme-100 rounded-full h-4 w-4'>
        <IconX size={14} />
      </div>
      <p className={`text-muted-foreground text-sm ${bold && 'font-bold'}`}>{title}</p>
    </li>
  )
}
