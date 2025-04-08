'use client'

import React, { memo } from 'react'

import Image from 'next/image'
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import type { MediaProps } from '@/typings/pet'

import 'swiper/css'
import 'swiper/css/effect-cards'
import 'swiper/css/effect-coverflow'
import 'swiper/css/effect-cube'
import 'swiper/css/effect-flip'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

interface CarouselProps {
  images: MediaProps[]
}

const Carousel = ({ images }: CarouselProps) => {
  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        style={
          {
            '--swiper-pagination-color': 'var(--theme-600)',
            '--swiper-pagination-bullet-inactive-color': 'var(--theme-200)',
            '--swiper-pagination-bullet-inactive-opacity': '1',
          } as React.CSSProperties
        }
        modules={[Autoplay, EffectCoverflow, Pagination]}
        className='mySwiper w-full h-[300px] lg:h-[350px]'
      >
        {images.map((image, index) => (
          <SwiperSlide className='object-contain object-top w-full h-[300px] lg:h-[350px]' key={index}>
            <Image
              alt={image.id}
              src={image.url}
              width={350}
              height={350}
              className='object-contain object-top w-full h-[300px] lg:h-[350px]'
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export const CarouselPhotos = memo(Carousel)
