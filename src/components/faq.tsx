'use client'

import React from 'react'

import { useTranslations } from 'next-intl'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { HoverBorderGradient } from './ui/hover-border-gradient'

export function Faq() {
  const t = useTranslations('pages.home')

  return (
    <div className='py-12 lg:pt-32 container md:flex justify-between w-full gap-12'>
      <div className='w-full md:w-1/2 mb-12 md:mb-0'>
        <HoverBorderGradient
          containerClassName='rounded-full'
          className='bg-black text-white text-xs flex items-center space-x-2'
        >
          <span>F.A.Q</span>
        </HoverBorderGradient>

        <h2 className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-white text-3xl lg:text-5xl font-sans py-2 relative z-20 font-bold tracking-tight'>
          {t('faq.title')}
        </h2>
        <p className='max-w-xl text-left text-base md:text-lg text-neutral-300 mt-2 mb-8'>{t('faq.description')}</p>
        <a className='text-left text-sm md:text-lg text-neutral-500 mt-8 underline' href='mailto:contact@babyzzu.com'>
          contact@babyzzu.com
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
        <AccordionContent>{props.description}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
