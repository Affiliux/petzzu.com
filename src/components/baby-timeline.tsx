import React from 'react'

import Image from 'next/image'

import { Timeline } from '@/components/ui/timeline'

import { formatDate } from '../lib/helpers/formatters/date_formatter'

export function BabyTimeline({ timeline }) {
  if (!timeline || timeline.length === 0) {
    return <p className='text-center text-neutral-500'>Nenhuma lembrança disponível.</p>
  }

  const data = timeline.map(entry => {
    const [day, month, year] = formatDate(entry.date).split('/')
    return {
      title: { day, month, year },
      content: (
        <div>
          <h3 className='text-lg font-bold text-neutral-900'>{entry.title}</h3>
          <p
            dangerouslySetInnerHTML={entry?.description ? { __html: entry.description } : undefined}
            className='text-neutral-700 text-sm md:text-base mt-2'
          />
          <div className='mt-4'>
            <Image
              src='https://assets.aceternity.com/templates/startup-1.webp'
              alt='startup template'
              width={500}
              height={500}
              className='rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]'
            />
          </div>
        </div>
      ),
    }
  })

  return (
    <div className='w-full'>
      <Timeline data={data} />
    </div>
  )
}
