'use client'

import { Check, X } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { useApplication } from '@/contexts/ApplicationContext'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export function Plans() {
  const t = useTranslations('')

  const { discount, currency, plans } = useApplication()

  const FORMAT_INTL_CURRENCY = currency ?? 'BRL'
  const FORMAT_INTL_LOCALE = t('config.defaults.country')

  function getDescription(planSku: string) {
    const descriptions = t(`pages.home.plans.${planSku.split('_')[1]}.description`).split('|')

    const itemsWithX = {
      unique: ['Possui vídeo', 'Edição de página já criada'],
      month: ['Possui vídeo'],
      annual: [],
    }

    return (
      <ul className='space-y-2'>
        {descriptions.map((item, index) => {
          const isNegative = itemsWithX[planSku.split('_')[1]].includes(item.trim())

          return (
            <li key={index} className='flex items-center'>
              {isNegative ? (
                <X className='h-4 w-4 mr-2 text-red-500' />
              ) : (
                <Check className='h-4 w-4 mr-2 text-primary' />
              )}
              <span>{item}</span>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className='container mx-auto py-10'>
      <div className='text-center mb-10'>
        <h2 className='text-3xl font-bold tracking-tight'>{t('pages.home.plans.title')}</h2>
        <p className='text-muted-foreground mt-2'>{t('pages.home.plans.description')}</p>
      </div>

      <div id='plans' className='grid gap-6 md:grid-cols-3'>
        {plans &&
          plans.map(plan =>
            plan.currency.includes(FORMAT_INTL_CURRENCY) ? (
              <Card key={plan.sku} className='flex flex-col'>
                <CardHeader>
                  <CardTitle>{t(`pages.home.plans.${plan.sku.split('_')[1]}.title`)}</CardTitle>
                  <CardDescription>{t(`pages.home.plans.${plan.sku.split('_')[1]}.counter`)}</CardDescription>
                  <div className='mt-4'>
                    <span className='text-3xl font-bold'>
                      {new Intl.NumberFormat(FORMAT_INTL_LOCALE, {
                        style: 'currency',
                        currency: FORMAT_INTL_CURRENCY,
                      }).format(
                        discount
                          ? plan.price - (plan.sku.includes('basic') ? discount.discount_basic : discount.discount_pro)
                          : plan.price,
                      )}
                    </span>
                    <span className='text-muted-foreground ml-1'>
                      {t(`pages.home.plans.${plan.sku.split('_')[1]}.price_recurrence`)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className='flex-grow'>{getDescription(plan.sku)}</CardContent>
                <CardFooter>
                  <Button className='w-full'>{t('pages.home.plans.button')}</Button>
                </CardFooter>
              </Card>
            ) : null,
          )}
      </div>
    </div>
  )
}
