'use client'

import React from 'react'

import type { PlanProps } from '@/typings/application'
import type { TimelineEntryProps } from '@/typings/timeline'

import { Timeline } from '@/components/ui/timeline'

import { CarouselPhotos } from './carousel'

import { formatDate } from '@/lib/helpers/formatters'

interface BabyTimelineProps {
  timeline: TimelineEntryProps[] | undefined
  selectedPlan?: PlanProps | undefined
}

export function BabyTimeline({ timeline, selectedPlan }: BabyTimelineProps) {
  // variables
  const SORTED_TIMELINE = timeline?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  // items timeline
  const data = SORTED_TIMELINE?.map(entry => {
    const { day, month, year } = formatDate(entry.date)
    const FILTERED_IMAGES = selectedPlan?.sku === 'plan_unique_brl' ? entry.media.slice(0, 2) : entry.media

    return {
      title: { day, month, year },
      content: (
        <div className='mt-4'>
          <h3 className='text-lg text-neutral-900 font-happy-school'>{entry.title}</h3>
          <p
            dangerouslySetInnerHTML={entry?.description ? { __html: entry.description } : undefined}
            className='text-neutral-900 text-sm mt-1 md:text-base rounded-md bg-theme-100'
          />
          <div className='mt-8'>{FILTERED_IMAGES.length > 0 ? <CarouselPhotos images={FILTERED_IMAGES} /> : null}</div>
        </div>
      ),
    }
  })

  if (!timeline || timeline.length === 0) {
    return null
  }

  return (
    <div className='w-full'>
      <Timeline data={data} />
    </div>
  )
}
