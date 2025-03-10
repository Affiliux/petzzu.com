'use client'

import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { useApplication } from '../contexts/ApplicationContext'

export function Plans() {
  const t = useTranslations()

  const { plans, discount, currency } = useApplication()
  const format_intl_currency = currency ?? 'brl'
  const format_intl_locale = t('config.defaults.country')

  return (
    <div className='container mx-auto py-10'>
      <div className='text-center mb-10'>
        <h2 className='text-3xl font-bold tracking-tight'>{t('pages.home.plans.title')}</h2>
        <p className='text-muted-foreground mt-2'>{t('pages.home.plans.description')}</p>
      </div>

      <div className='grid gap-6 md:grid-cols-3'>
        {/* One-time Acquisition Plan */}
        <Card className='flex flex-col'>
          <CardHeader>
            <CardTitle>{t('pages.home.plans.purchase.title')}</CardTitle>
            <CardDescription>{t('pages.home.plans.purchase.counter')}</CardDescription>
            <div className='mt-4'>
              <span className='text-3xl font-bold'>12</span>
              <span className='text-muted-foreground ml-1'>{t('pages.home.plans.purchase.price_recurrency')}</span>
            </div>
          </CardHeader>
          <CardContent className='flex-grow'>
            <ul className='space-y-2'>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>{t('pages.home.plans.purchase.text')}</span>
              </li>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>{t('pages.home.plans.purchase.text')}</span>
              </li>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>{t('pages.home.plans.purchase.text')}</span>
              </li>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>{t('pages.home.plans.purchase.text')}</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className='w-full'>{t('pages.home.plans.purchase.buy')}</Button>
          </CardFooter>
        </Card>

        {/* Monthly Subscription Plan */}
        <Card className='flex flex-col border-primary'>
          <CardHeader>
            <CardTitle>{t('pages.home.plans.monthly.title')}</CardTitle>
            <CardDescription>{t('pages.home.plans.monthly.counter')}</CardDescription>
            <div className='mt-4'>
              <span className='text-3xl font-bold'>13</span>
              <span className='text-muted-foreground ml-1'>{t('pages.home.plans.monthly.price_recurrency')}</span>
            </div>
          </CardHeader>
          <CardContent className='flex-grow'>
            <ul className='space-y-2'>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>{t('pages.home.plans.monthly.text')}</span>
              </li>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>{t('pages.home.plans.monthly.text')}</span>
              </li>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>{t('pages.home.plans.monthly.text')}</span>
              </li>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>{t('pages.home.plans.monthly.text')}</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className='w-full' variant='default'>
              {t('pages.home.plans.monthly.buy')}
            </Button>
          </CardFooter>
        </Card>

        {/* Annual Subscription Plan */}
        <Card className='flex flex-col'>
          <CardHeader>
            <CardTitle>{t('pages.home.plans.annual.title')}</CardTitle>
            <CardDescription>{t('pages.home.plans.annual.counter')}</CardDescription>
            <div className='mt-4'>
              <span className='text-3xl font-bold'>99</span>
              <span className='text-muted-foreground ml-1'>{t('pages.home.plans.annual.price_recurrency')}</span>
            </div>
            <span className='inline-block mt-1 text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full'>
              {t('pages.home.plans.annual.discount')}
            </span>
          </CardHeader>
          <CardContent className='flex-grow'>
            <ul className='space-y-2'>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>{t('pages.home.plans.annual.text')}</span>
              </li>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>{t('pages.home.plans.annual.text')}</span>
              </li>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>{t('pages.home.plans.annual.text')}</span>
              </li>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>{t('pages.home.plans.annual.text')}</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className='w-full' variant='outline'>
              {t('pages.home.plans.annual.buy')}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
