'use client'

import type { DefaultThemeProps } from '@/typings/pet'

import { PetTimeline } from '@/components/pet-timeline'
import { CloudBackground } from '@/components/clouds-background'
import { DateCount } from '@/components/date-count'

import PicturesGrid from './pictures-grid'

import { DateShowTypeEnum } from '@/enums'

export const DefaultTheme = ({ pet }: DefaultThemeProps) => {
  return (
    <>
      <div className='relative overflow-x-hidden h-full min-h-screen w-full bg-transparent overflow-hidden'>
        <CloudBackground quantity={50} />

        <div className='relative flex flex-col-reverse items-center gap-8 z-50 bg-theme-100/40 lg:bg-theme-100/40 w-full rounded-lg container pb-8'>
          <div className={!!pet?.media?.length ? 'w-full lg:w-1/2 mt-4' : 'w-full'}>
            <div className='rounded-lg h-full flex flex-col items-center justify-center'>
              {!!pet?.media?.length && (
                <div className='w-full lg:w-3/4'>
                  <PicturesGrid pet={pet} />
                </div>
              )}

              <div>{!!pet?.timeLine && <PetTimeline timeline={pet.timeLine} />}</div>

              <div className='mt-16'>
                {!!pet?.birth_date && (
                  <DateCount date={pet.birth_date} type={pet.dateShowType ?? DateShowTypeEnum.DEFAULT} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
