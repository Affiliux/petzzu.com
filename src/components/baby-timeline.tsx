import React from 'react'

import { Timeline } from '@/components/ui/timeline'

import { CarouselPhotos } from './carousel'
import { formatDate } from '../lib/helpers/formatters/date_formatter'

import { PhotosSliderEnum } from '@/enums'

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
            {entry.media.length > 0 ? <CarouselPhotos type={PhotosSliderEnum.COVERFLOW} images={entry.media} /> : null}
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
