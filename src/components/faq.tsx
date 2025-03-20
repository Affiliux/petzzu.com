'use client'

import React from 'react'

import { useTranslations } from 'next-intl'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { HoverBorderGradient } from './ui/hover-border-gradient'

export function Faq() {
  // hooks
  const t = useTranslations('pages.home')

  return (
    <div className='py-12 lg:pt-32 container md:flex justify-between w-full gap-12'>
      <div className='w-full md:w-1/2 mb-12 md:mb-0'>
        <HoverBorderGradient
          containerClassName='rounded-full'
          className='bg-white text-neutral-900 text-xs flex items-center space-x-2'
        >
          <span>F.A.Q</span>
        </HoverBorderGradient>

        <h2 className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-black text-3xl lg:text-5xl font-sans py-2 relative z-20 font-bold tracking-tight'>
          {t('faq.title')}
        </h2>
        <p className='max-w-xl text-left text-base md:text-lg text-neutral-600 mt-2 mb-8'>{t('faq.description')}</p>
        <a
          className='text-left text-sm md:text-lg text-neutral-500 mt-8 underline'
          href='https://www.instagram.com/direct/t/17843072010081129'
        >
          {t('faq.contact')}
        </a>
      </div>

      <div className='w-full md:w-1/2'>
        <FaqItem title={t('faq.1.question')} description={t('faq.1.answer')} />
        <FaqItem title={t('faq.2.question')} description={t('faq.2.answer')} />
        <FaqItem title={t('faq.3.question')} description={t('faq.3.answer')} />
        <FaqItem title={t('faq.4.question')} description={t('faq.4.answer')} />
        <FaqItem title={t('faq.5.question')} description={t('faq.5.answer')} />
        <FaqItem title={t('faq.6.question')} description={t('faq.6.answer')} />
      </div>
    </div>
  )
}

function FaqItem(props: { title: string; description: string }) {
  return (
    <Accordion type='single' collapsible>
      <AccordionItem value={props.title}>
        <AccordionTrigger>{props.title}</AccordionTrigger>
        <AccordionContent className='text-muted-foreground'>{props.description}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
