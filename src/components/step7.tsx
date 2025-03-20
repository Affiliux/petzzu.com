'use client'

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { useTranslations } from 'next-intl'
import { IconCheck, IconChevronLeft, IconChevronRight, IconLoader, IconStarFilled, IconX } from '@tabler/icons-react'

import type { DiscountProps, PlanProps } from '@/typings/application'
import { useApplication } from '@/contexts/ApplicationContext'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface Step7Props {
  plans: PlanProps[]
  discount: DiscountProps | null
  selected: PlanProps | undefined
  setPlan: Dispatch<SetStateAction<PlanProps | undefined>>
  onNext: () => Promise<void>
  onBack: () => void
}

export const Step7 = ({ plans, discount, selected, setPlan, onNext, onBack }: Step7Props) => {
  // hooks
  const t = useTranslations()

  // contexts
  const { currency } = useApplication()

  // states
  const [loading, setLoading] = useState(false)

  const format_intl_locale = t('config.defaults.country')
  const format_intl_currency = currency ?? 'BRL'

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

  function getDescription(planSku: string) {
    const descriptions = t(`pages.home.plans.${planSku.split('_')[1]}.description`).split('|')

    const itemsWithX = {
      unique: ['Possui vídeo', 'Edição de página já criada'],
      month: ['Possui vídeo'],
      annual: [],
    }

    return (
      <ul className='space-y-1'>
        {descriptions.map((item, index) => {
          const isNegative = itemsWithX[planSku.split('_')[1]].includes(item.trim())

          return (
            <li key={index} className='flex items-center'>
              {isNegative ? (
                <IconX className='h-3 w-3 mr-1 text-red-500' />
              ) : (
                <IconCheck className='h-3 w-3 mr-1 text-primary' />
              )}
              <span className='text-sm'>{item}</span>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className='container mx-auto py-8 px-3'>
      <div className='text-center mb-8'>
        <h2 className='text-3xl font-bold tracking-tight'>{t('pages.home.plans.title')}</h2>
        <p className='text-base text-muted-foreground mt-3'>{t('pages.home.plans.description')}</p>
      </div>

      <div className='flex flex-col gap-4'>
        {plans.map(plan =>
          plan.currency.includes(format_intl_currency) ? (
            <Card
              key={plan.sku}
              className={`flex flex-col min-w-[220px] p-4 shadow-md rounded-lg border ${plan.sku === selected?.sku ? 'border-2 border-primary' : 'border-gray-200'}`}
            >
              <CardHeader>
                <CardTitle className='text-lg font-semibold'>
                  {t(`pages.home.plans.${plan.sku.split('_')[1]}.title`)}
                </CardTitle>
                <CardDescription className='text-sm mt-1'>
                  {t(`pages.home.plans.${plan.sku.split('_')[1]}.counter`)}
                </CardDescription>
                <div className='mt-4 text-xl font-bold text-primary'>
                  {new Intl.NumberFormat(format_intl_locale, {
                    style: 'currency',
                    currency: format_intl_currency,
                  }).format(
                    discount
                      ? plan.price - (plan.sku.includes('basic') ? discount.discount_basic : discount.discount_pro)
                      : plan.price,
                  )}
                  <span className='text-sm text-muted-foreground ml-1 font-medium'>
                    {t(`pages.home.plans.${plan.sku.split('_')[1]}.price_recurrence`)}
                  </span>
                </div>
              </CardHeader>
              <CardContent className='text-sm mt-4 flex-grow'>{getDescription(plan.sku)}</CardContent>
              <CardFooter>
                <Button onClick={() => setPlan(plan)} className='w-full text-sm py-2 font-medium'>
                  {plan.sku === selected?.sku ? t('steps.step7.button') : t('pages.home.plans.button')}
                </Button>
              </CardFooter>
            </Card>
          ) : null,
        )}
      </div>

      <div className='flex items-center justify-between gap-4 mt-10'>
        <Button onClick={onBack} disabled={loading} className='text-sm py-2 px-4'>
          <IconChevronLeft size={20} className='mr-1' /> {t('steps.step7.back')}
        </Button>
        <Button onClick={onSubmit} disabled={!selected || loading} className='text-sm py-2 px-4'>
          {loading ? <IconLoader size={20} className='animate-spin' /> : t('steps.step6.button')}
          <IconChevronRight size={20} className='ml-1' />
        </Button>
      </div>
    </div>
  )
}
