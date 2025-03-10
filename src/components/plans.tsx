'use client'

import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export function Plans() {
  const t = useTranslations('pages.home.plans')
  return (
    <div className='container mx-auto py-10'>
      <div className='text-center mb-10'>
        <h2 className='text-3xl font-bold tracking-tight'>{t('title')}</h2>
        <p className='text-muted-foreground mt-2'>{t('description')}</p>
      </div>

      <div className='grid gap-6 md:grid-cols-3'>
        {/* One-time Acquisition Plan */}
        <Card className='flex flex-col'>
          <CardHeader>
            <CardTitle>{t('purchase.title')}</CardTitle>
            <CardDescription>{t('purchase.counter')}</CardDescription>
            <div className='mt-4'>
              <span className='text-3xl font-bold'>12</span>
              <span className='text-muted-foreground ml-1'>{t('purchase.price_recurrency')}</span>
            </div>
          </CardHeader>
          <CardContent className='flex-grow'>
            <ul className='space-y-2'>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>{t('purchase.text')}</span>
              </li>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>{t('purchase.text')}</span>
              </li>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>{t('purchase.text')}</span>
              </li>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>{t('purchase.text')}</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className='w-full'>{t('purchase.buy')}</Button>
          </CardFooter>
        </Card>

        {/* Monthly Subscription Plan */}
        <Card className='flex flex-col border-primary'>
          <CardHeader>
            <CardTitle>{t('monthly.title')}</CardTitle>
            <CardDescription>{t('monthly.counter')}</CardDescription>
            <div className='mt-4'>
              <span className='text-3xl font-bold'>13</span>
              <span className='text-muted-foreground ml-1'>{t('monthly.price_recurrency')}</span>
            </div>
          </CardHeader>
          <CardContent className='flex-grow'>
            <ul className='space-y-2'>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>{t('monthly.text')}</span>
              </li>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>{t('monthly.text')}</span>
              </li>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>{t('monthly.text')}</span>
              </li>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>{t('monthly.text')}</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className='w-full' variant='default'>
              {t('monthly.buy')}
            </Button>
          </CardFooter>
        </Card>

        {/* Annual Subscription Plan */}
        <Card className='flex flex-col'>
          <CardHeader>
            <CardTitle>{t('annual.title')}</CardTitle>
            <CardDescription>{t('annual.counter')}</CardDescription>
            <div className='mt-4'>
              <span className='text-3xl font-bold'>99</span>
              <span className='text-muted-foreground ml-1'>{t('annual.price_recurrency')}</span>
            </div>
            <span className='inline-block mt-1 text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full'>
              {t('annual.discount')}
            </span>
          </CardHeader>
          <CardContent className='flex-grow'>
            <ul className='space-y-2'>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>{t('annual.text')}</span>
              </li>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>{t('annual.text')}</span>
              </li>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>{t('annual.text')}</span>
              </li>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>{t('annual.text')}</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className='w-full' variant='outline'>
              {t('annual.buy')}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
