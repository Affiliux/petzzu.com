'use client'

import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { useApplication } from '../contexts/ApplicationContext'

export function Plans() {
  const t = useTranslations()
  const { plans, discount, currency } = useApplication()
  const format_intl_currency = currency ?? 'BRL'
  const format_intl_locale = t('config.defaults.country')

  const applyDiscount = (plan: any) => {
    if (!discount?.isActive) return plan.price
    return plan.sku === 'basic' ? plan.price - discount.discount_basic : plan.price - discount.discount_pro
  }

  return (
    <div className='container mx-auto py-10'>
      <div className='text-center mb-10'>
        <h2 className='text-3xl font-bold tracking-tight'>{t('pages.home.plans.title')}</h2>
        <p className='text-muted-foreground mt-2'>{t('pages.home.plans.description')}</p>
      </div>

      <div className='grid gap-6 md:grid-cols-3'>
        {plans.map(plan => (
          <Card key={plan.id} className='flex flex-col'>
            <CardHeader>
              <CardTitle>{plan.title}</CardTitle>
              <CardDescription>{plan.subTitle}</CardDescription>
              <div className='mt-4'>
                <span className='text-3xl font-bold'>
                  {new Intl.NumberFormat(format_intl_locale, {
                    style: 'currency',
                    currency: format_intl_currency,
                  }).format(applyDiscount(plan))}
                </span>
                <span className='text-muted-foreground ml-1'>/{plan.recurrence}</span>
              </div>
            </CardHeader>
            <CardContent className='flex-grow'>
              <ul className='space-y-2'>
                <li className='flex items-center'>
                  <Check className='h-4 w-4 mr-2 text-primary' />
                  <span dangerouslySetInnerHTML={plan.description ? { __html: plan.description } : undefined}/>
                </li>
                <li className='flex items-center'>
                  <Check className='h-4 w-4 mr-2 text-primary' />
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className='w-full'>{t('pages.home.plans.purchase.buy')}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
