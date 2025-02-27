'use client'

import React from 'react'

import { Clock, Cloud, CloudLightningIcon as Lightning, Code2, Headphones, Shield, Star, Zap } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export function Plans() {
  const t = useTranslations()

  const benefits = [
    {
      icon: Lightning,
      title: 'Alta Performance',
      description: 'Velocidade incomparável',
    },
    {
      icon: Star,
      title: 'Recursos Premium',
      description: 'Funções exclusivas',
    },
    {
      icon: Clock,
      title: 'Uptime 99.9%',
      description: 'Sempre no ar',
    },
    {
      icon: Zap,
      title: 'Atualizações',
      description: 'Sempre atualizado',
    },
  ]

  return (
    <div id='plans' className='relative w-full rounded-md overflow-hidden'>
      <div className='flex items-center flex-col justify-center gap-16 px-2 md:px-10 py-8 w-full h-full'>
        <div className='mx-auto max-w-xl'>
          <h2 className='bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-800 to-black text-3xl lg:text-5xl font-sans py-2 relative z-20 font-bold tracking-tight'>
            {t('pages.home.plans.title')}
          </h2>
          <p className='max-w-xl text-center text-base md:text-lg text-neutral-500'>
            {t('pages.home.plans.description')}
          </p>
        </div>
      </div>

      <div className='p-4 md:p-8 bg-gradient-to-b from-background to-muted/20'>
        <Card className='w-full max-w-5xl mx-auto border-2'>
          <CardHeader className='text-center space-y-6 pb-8 pt-8 px-6 border-b bg-muted/10'>
            <div>
              <CardTitle className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent'>
                Assinatura Anual
              </CardTitle>
              <p className='text-muted-foreground mt-2'>O melhor album digital para o seu bebe</p>
            </div>
            <div className='flex items-baseline justify-center gap-x-2'>
              <span className='text-5xl font-bold'>R$ 15,99</span>
              <span className='text-muted-foreground'>/mês</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 px-2'>
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className='flex flex-col items-center text-center p-4 rounded-lg transition-colors hover:bg-muted/50'
                >
                  <div className='h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 transition-transform hover:scale-110'>
                    <benefit.icon className='h-6 w-6 text-primary' />
                  </div>
                  <h3 className='font-semibold mb-2'>{benefit.title}</h3>
                  <p className='text-sm text-muted-foreground'>{benefit.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className='flex flex-col gap-4 items-center py-8'>
            <Link
              href='#start'
              className='w-full bg-blue-600 rounded-md text-white text-center md:w-auto px-8 py-2 text-lg font-semibold'
            >
              Começar agora
            </Link>
            <p className='text-sm text-muted-foreground'>Cancele a qualquer momento</p>
          </CardFooter>
        </Card>
      </div>
      <div className='p-4 md:p-8 bg-gradient-to-b from-background to-muted/20'>
        <Card className='w-full max-w-5xl mx-auto border-2'>
          <CardHeader className='text-center space-y-6 pb-8 pt-8 px-6 border-b bg-muted/10'>
            <div>
              <CardTitle className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent'>
                Assinatura Anual
              </CardTitle>
              <p className='text-muted-foreground mt-2'>O melhor album digital para o seu bebe</p>
            </div>
            <div className='flex items-baseline justify-center gap-x-2'>
              <span className='text-5xl font-bold'>R$ 15,99</span>
              <span className='text-muted-foreground'>/mês</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 px-2'>
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className='flex flex-col items-center text-center p-4 rounded-lg transition-colors hover:bg-muted/50'
                >
                  <div className='h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 transition-transform hover:scale-110'>
                    <benefit.icon className='h-6 w-6 text-primary' />
                  </div>
                  <h3 className='font-semibold mb-2'>{benefit.title}</h3>
                  <p className='text-sm text-muted-foreground'>{benefit.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className='flex flex-col gap-4 items-center py-8'>
            <Link
              href='#start'
              className='w-full bg-blue-600 rounded-md text-white text-center md:w-auto px-8 py-2 text-lg font-semibold'
            >
              Começar agora
            </Link>
            <p className='text-sm text-muted-foreground'>Cancele a qualquer momento</p>
          </CardFooter>
        </Card>
      </div>
      <div className='p-4 md:p-8 bg-gradient-to-b from-background to-muted/20'>
        <Card className='w-full max-w-5xl mx-auto border-2'>
          <CardHeader className='text-center space-y-6 pb-8 pt-8 px-6 border-b bg-muted/10'>
            <div>
              <CardTitle className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent'>
                Assinatura Anual
              </CardTitle>
              <p className='text-muted-foreground mt-2'>Solução completa para sua empresa</p>
            </div>
            <div className='flex items-baseline justify-center gap-x-2'>
              <span className='text-5xl font-bold'>R$ 17,99</span>
              <span className='text-muted-foreground'>/mês</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 px-2'>
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className='flex flex-col items-center text-center p-4 rounded-lg transition-colors hover:bg-muted/50'
                >
                  <div className='h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 transition-transform hover:scale-110'>
                    <benefit.icon className='h-6 w-6 text-primary' />
                  </div>
                  <h3 className='font-semibold mb-2'>{benefit.title}</h3>
                  <p className='text-sm text-muted-foreground'>{benefit.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className='flex flex-col gap-4 items-center py-8'>
            <Link
              href='#start'
              className='w-full bg-blue-600 rounded-md text-white text-center md:w-auto px-8 py-2 text-lg font-semibold'
            >
              Começar agora
            </Link>
            <p className='text-sm text-muted-foreground'>Cancele a qualquer momento</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
