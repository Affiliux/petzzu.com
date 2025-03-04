'use client'

import React, { memo } from 'react'

import Image from 'next/image'
import { Autoplay, EffectCards, EffectCoverflow, EffectCube, EffectFlip, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { MediaProps } from '@/typings/child'

import 'swiper/css'
import 'swiper/css/effect-cards'
import 'swiper/css/effect-coverflow'
import 'swiper/css/effect-cube'
import 'swiper/css/effect-flip'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { PhotosSliderEnum } from '@/enums'

interface CarouselProps {
  type: PhotosSliderEnum
  images: MediaProps[]
}

const Carousel = ({ type, images }: CarouselProps) => {
  return (
    <>
      {type === PhotosSliderEnum.CARDS && (
        <Swiper
          effect={'cards'}
          grabCursor={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          style={
            {
              '--swiper-pagination-color': '#ff0808',
              '--swiper-pagination-bullet-inactive-color': '#999999',
              '--swiper-pagination-bullet-inactive-opacity': '1',
            } as React.CSSProperties
          }
          modules={[Autoplay, EffectCards, Pagination]}
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
      )}

      {type === PhotosSliderEnum.COVERFLOW && (
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
              '--swiper-pagination-color': '#ff0808',
              '--swiper-pagination-bullet-inactive-color': '#999999',
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
      )}

      {type === PhotosSliderEnum.CUBE && (
        <Swiper
          effect={'cube'}
          grabCursor={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          style={
            {
              '--swiper-pagination-color': '#ff0808',
              '--swiper-pagination-bullet-inactive-color': '#999999',
              '--swiper-pagination-bullet-inactive-opacity': '1',
            } as React.CSSProperties
          }
          modules={[Autoplay, EffectCube, Pagination]}
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
      )}

      {type === PhotosSliderEnum.FLIP && (
        <Swiper
          effect={'flip'}
          grabCursor={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          style={
            {
              '--swiper-pagination-color': '#ff0808',
              '--swiper-pagination-bullet-inactive-color': '#999999',
              '--swiper-pagination-bullet-inactive-opacity': '1',
            } as React.CSSProperties
          }
          modules={[Autoplay, EffectFlip, Pagination]}
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
      )}
    </>
  )
}

export const CarouselPhotos = memo(Carousel)
