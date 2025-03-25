'use client'

import type { DefaultThemeProps } from '@/typings/child'

import { BabyTimeline } from '@/components/baby-timeline'
import { CloudBackground } from '@/components/clouds-background'
import { DateCount } from '@/components/date-count'

import PicturesGrid from './pictures-grid'

import { DateShowTypeEnum } from '@/enums'

export const DefaultTheme = ({ child }: DefaultThemeProps) => {
  return (
    <>
      <div className='relative overflow-x-hidden h-full min-h-screen w-full bg-transparent overflow-hidden'>
        <CloudBackground quantity={50} />

        <div className='relative flex flex-col-reverse items-center gap-8 z-50 bg-theme-100/40 lg:bg-theme-100/40 w-full rounded-lg container pb-8'>
          <div className={!!child?.media?.length ? 'w-full lg:w-1/2 mt-4' : 'w-full'}>
            <div className='rounded-lg h-full flex flex-col items-center justify-center'>
              {!!child?.media?.length && (
                <div className='w-full lg:w-3/4'>
                  <PicturesGrid child={child} />
                </div>
              )}

              <div className='-mt-4'>{!!child?.timeLine && <BabyTimeline timeline={child.timeLine} />}</div>

              {!!child?.birth_date && (
                <DateCount date={child.birth_date} type={child.dateShowType ?? DateShowTypeEnum.DEFAULT} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
