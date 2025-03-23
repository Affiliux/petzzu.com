'use client'

import React from 'react'

import { PlanProps } from '@/typings/application'

import { Timeline } from '@/components/ui/timeline'

import { CarouselPhotos } from './carousel'
import { TimelineEntryProps } from '../typings/timeline'

import { formatDate } from '@/lib/helpers/formatters'

interface BabyTimelineProps {
  timeline: TimelineEntryProps[] | undefined
  selectedPlan: PlanProps | undefined
}

export function BabyTimeline({ timeline, selectedPlan }: BabyTimelineProps) {
  if (!timeline || timeline.length === 0) {
    return null
  }

  const SORTED_TIMELINE = timeline?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const data = SORTED_TIMELINE?.map(entry => {
    const { day, month, year } = formatDate(entry.date)
    const FILTERED_IMAGES = selectedPlan?.sku === 'plan_unique_brl' ? entry.media.slice(0, 2) : entry.media

    return {
      title: { day, month, year },
      content: (
        <div>
          <h3 className='text-lg text-theme-600 text-center font-happy-school'>{entry.title}</h3>
          <p
            dangerouslySetInnerHTML={entry?.description ? { __html: entry.description } : undefined}
            className='text-neutral-700 text-sm md:text-base mt-2 text-justify'
          />
          <div className='mt-4'>{FILTERED_IMAGES.length > 0 ? <CarouselPhotos images={FILTERED_IMAGES} /> : null}</div>
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
