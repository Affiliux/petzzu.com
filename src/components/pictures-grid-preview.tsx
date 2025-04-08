'use client'

import React from 'react'

import Image from 'next/image'

import { PlanProps } from '@/typings/application'
import type { MediaProps } from '@/typings/pet'

import { CarouselPhotos } from './carousel'

interface PicturesGridProps {
  images?: MediaProps[]
  selectedPlan: PlanProps | undefined
}

export default function PicturesGridPreview({ images = [], selectedPlan }: PicturesGridProps) {
  //variables
  const FILTERED_IMAGES = selectedPlan?.sku === 'plan_unique_brl' ? images.slice(0, 3) : images

  return (
    <div className='relative w-full max-w-2xl mx-auto px-6'>
      {FILTERED_IMAGES.length === 1 && (
        <div>
          <CarouselPhotos images={FILTERED_IMAGES} />
        </div>
      )}
      {FILTERED_IMAGES.length === 2 && (
        <div className='flex flex-col justify-center items-center'>
          <div className='relative right-20 transform rotate-[2deg] left-10'>
            <div className='bg-white p-4 shadow-[0px_0px_50px_10px_rgba(0,_0,_0,_0.1)] rounded-sm'>
              <div className='relative border-1 bg-white shadow-inner'>
                <div className='relative w-[200px] h-[200px] overflow-hidden'>
                  <Image
                    alt={FILTERED_IMAGES[0]?.id}
                    src={FILTERED_IMAGES[0]?.url}
                    width={200}
                    height={200}
                    className='object-cover object-center w-full h-full'
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='relative right-10 transform rotate-[-2deg] bottom-10'>
            <div className='bg-white p-4 shadow-[0px_0px_50px_10px_rgba(0,_0,_0,_0.1)] rounded-sm'>
              <div className='relative border-1 bg-white shadow-inner'>
                <div className='relative w-[200px] h-[200px] overflow-hidden'>
                  <Image
                    alt={FILTERED_IMAGES[1]?.id}
                    src={FILTERED_IMAGES[1]?.url}
                    width={200}
                    height={200}
                    className='object-cover object-center w-full h-full'
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {FILTERED_IMAGES.length === 3 && (
        <div className='flex flex-col justify-center items-center'>
          <div className='relative transform rotate-[2deg] left-10'>
            <div className='bg-white p-4 shadow-[0px_0px_50px_10px_rgba(0,_0,_0,_0.1)] rounded-sm'>
              <div className='relative border-1 bg-white shadow-inner'>
                <div className='relative w-[200px] h-[200px] overflow-hidden'>
                  <Image
                    alt={FILTERED_IMAGES[0]?.id}
                    src={FILTERED_IMAGES[0]?.url}
                    width={200}
                    height={200}
                    className='object-cover object-center w-full h-full'
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='relative right-10 transform rotate-[-2deg] bottom-10'>
            <div className='bg-white p-4 shadow-[0px_0px_50px_10px_rgba(0,_0,_0,_0.1)] rounded-sm'>
              <div className='relative border-1 bg-white shadow-inner'>
                <div className='relative w-[200px] h-[200px] overflow-hidden'>
                  <Image
                    alt={FILTERED_IMAGES[1]?.id}
                    src={FILTERED_IMAGES[1]?.url}
                    width={200}
                    height={200}
                    className='object-cover object-center w-full h-full'
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='relative transform rotate-[2deg] left-10 bottom-20'>
            <div className='bg-white p-4 shadow-[0px_0px_50px_10px_rgba(0,_0,_0,_0.1)] rounded-sm'>
              <div className='relative border-1 bg-white shadow-inner'>
                <div className='relative w-[200px] h-[200px] overflow-hidden'>
                  <Image
                    alt={FILTERED_IMAGES[2]?.id}
                    src={FILTERED_IMAGES[2]?.url}
                    width={200}
                    height={200}
                    className='object-cover object-center w-full h-full'
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {FILTERED_IMAGES.length === 4 && (
        <div>
          <CarouselPhotos images={FILTERED_IMAGES} />
        </div>
      )}
      {FILTERED_IMAGES.length === 5 && (
        <div className='grid grid-cols-12 gap-2'>
          <div className='col-span-7 row-span-2'>
            <div className='relative w-full h-full min-h-[250px]'>
              <Image
                src={FILTERED_IMAGES[0]?.url}
                alt={FILTERED_IMAGES[0]?.id}
                fill
                className='object-cover transition-transform duration-300 ease-in-out hover:scale-110 hover:z-10 bg-gray-100'
              />
            </div>
          </div>

          <div className='col-span-5'>
            <div className='relative w-full h-full min-h-[120px]'>
              <Image
                src={FILTERED_IMAGES[1]?.url}
                alt={FILTERED_IMAGES[1]?.id}
                fill
                className='object-cover transition-transform duration-300 ease-in-out hover:scale-105 hover:z-10 bg-gray-100'
              />
            </div>
          </div>

          <div className='col-span-5'>
            <div className='relative w-full h-full min-h-[120px]'>
              <Image
                src={FILTERED_IMAGES[2]?.url}
                alt={FILTERED_IMAGES[2]?.id}
                fill
                className='object-cover transition-transform duration-300 ease-in-out hover:scale-105 hover:z-10 bg-gray-100'
              />
            </div>
          </div>

          <div className='col-span-5'>
            <div className='relative w-full h-full min-h-[120px]'>
              <Image
                src={FILTERED_IMAGES[3]?.url}
                alt={FILTERED_IMAGES[3]?.id}
                fill
                className='object-cover transition-transform duration-300 ease-in-out hover:scale-105 hover:z-10 bg-gray-100'
              />
            </div>
          </div>
          <div className='col-span-7 row-span-2'>
            <div className='relative w-full h-full min-h-[250px]'>
              <Image
                src={FILTERED_IMAGES[4]?.url}
                alt={FILTERED_IMAGES[4]?.id}
                fill
                className='object-cover transition-transform duration-300 ease-in-out hover:scale-110 hover:z-10 bg-gray-100'
              />
            </div>
          </div>
        </div>
      )}
      {FILTERED_IMAGES.length === 6 && (
        <div className='grid grid-cols-12 gap-2'>
          <div className='col-span-7 row-span-2'>
            <div className='relative w-full h-full min-h-[250px]'>
              <Image
                src={FILTERED_IMAGES[0]?.url}
                alt={FILTERED_IMAGES[0]?.id}
                fill
                className='object-cover transition-transform duration-300 ease-in-out hover:scale-110 hover:z-10 bg-gray-100'
              />
            </div>
          </div>

          <div className='col-span-5'>
            <div className='relative w-full h-full min-h-[120px]'>
              <Image
                src={FILTERED_IMAGES[1]?.url}
                alt={FILTERED_IMAGES[1]?.id}
                fill
                className='object-cover transition-transform duration-300 ease-in-out hover:scale-105 hover:z-10 bg-gray-100'
              />
            </div>
          </div>

          <div className='col-span-5'>
            <div className='relative w-full h-full min-h-[120px]'>
              <Image
                src={FILTERED_IMAGES[2]?.url}
                alt={FILTERED_IMAGES[2]?.id}
                fill
                className='object-cover transition-transform duration-300 ease-in-out hover:scale-105 hover:z-10 bg-gray-100'
              />
            </div>
          </div>

          <div className='col-span-5'>
            <div className='relative w-full h-full min-h-[120px]'>
              <Image
                src={FILTERED_IMAGES[3]?.url}
                alt={FILTERED_IMAGES[3]?.id}
                fill
                className='object-cover transition-transform duration-300 ease-in-out hover:scale-105 hover:z-10 bg-gray-100'
              />
            </div>
          </div>
          <div className='col-span-7 row-span-2'>
            <div className='relative w-full h-full min-h-[250px]'>
              <Image
                src={FILTERED_IMAGES[4]?.url}
                alt={FILTERED_IMAGES[4]?.id}
                fill
                className='object-cover transition-transform duration-300 ease-in-out hover:scale-110 hover:z-10 bg-gray-100'
              />
            </div>
          </div>
          <div className='col-span-5'>
            <div className='relative w-full h-full min-h-[120px]'>
              <Image
                src={FILTERED_IMAGES[5]?.url}
                alt={FILTERED_IMAGES[5]?.id}
                fill
                className='object-cover transition-transform duration-300 ease-in-out hover:scale-105 hover:z-10 bg-gray-100'
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
