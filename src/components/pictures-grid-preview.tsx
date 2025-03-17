import Image from 'next/image'

import { CarouselPhotos } from './carousel'
import { PhotosSliderEnum } from '../enums'
import { MediaProps } from '../typings/child'
import { CreatePrePayloadProps } from '../typings/create'

interface PicturesGridProps {
  child: CreatePrePayloadProps
  images?: MediaProps[]
}

export default function PicturesGridPreview({ images }: PicturesGridProps) {
  return (
    <div className='relative w-full max-w-2xl mx-auto p-6'>
      {images.length == 1 && (
        <div>
          <CarouselPhotos images={images} type={PhotosSliderEnum.CARDS} />
        </div>
      )}
      {images.length == 2 && (
        <div className='flex flex-col justify-center items-center'>
          <div className='relative right-20 mb-12 transform rotate-[-2deg] left-10'>
            <div className='bg-white p-4 shadow-[0px_0px_50px_10px_rgba(0,_0,_0,_0.1)] rounded-sm'>
              <div className='relative border-1 bg-white shadow-inner'>
                <div className='relative w-[200px] h-[200px] overflow-hidden'>
                  <Image
                    alt={images[0]?.id}
                    src={images[0]?.url}
                    width={200}
                    height={200}
                    className='object-cover object-center w-full h-full'
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='relative right-10 mb-12 transform rotate-[-2deg]'>
            <div className='bg-white p-4 shadow-[0px_0px_50px_10px_rgba(0,_0,_0,_0.1)] rounded-sm'>
              <div className='relative border-1 bg-white shadow-inner'>
                <div className='relative w-[200px] h-[200px] overflow-hidden'>
                  <Image
                    alt={images[1]?.id}
                    src={images[1]?.url}
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
      {images.length == 3 && (
        <div className='flex flex-col justify-center items-center'>
          <div className='relative  mb-12 transform rotate-[-2deg] left-10'>
            <div className='bg-white p-4 shadow-[0px_0px_50px_10px_rgba(0,_0,_0,_0.1)] rounded-sm'>
              <div className='relative border-1 bg-white shadow-inner'>
                <div className='relative w-[200px] h-[200px] overflow-hidden'>
                  <Image
                    alt={images[0]?.id}
                    src={images[0]?.url}
                    width={200}
                    height={200}
                    className='object-cover object-center w-full h-full'
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='relative mb-12 transform rotate-[2deg] right-10'>
            <div className='bg-white p-4 shadow-[0px_0px_50px_10px_rgba(0,_0,_0,_0.1)] rounded-sm'>
              <div className='relative border-1 bg-white shadow-inner'>
                <div className='relative w-[200px] h-[200px] overflow-hidden'>
                  <Image
                    alt={images[1]?.id}
                    src={images[1]?.url}
                    width={200}
                    height={200}
                    className='object-cover object-center w-full h-full'
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='relative mb-12 transform rotate-[-2deg] left-10'>
            <div className='bg-white p-4 shadow-[0px_0px_50px_10px_rgba(0,_0,_0,_0.1)] rounded-sm'>
              <div className='relative border-1 bg-white shadow-inner'>
                <div className='relative w-[200px] h-[200px] overflow-hidden'>
                  <Image
                    alt={images[2]?.id}
                    src={images[2]?.url}
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
      {images.length == 4 && (
        <div>
          <CarouselPhotos images={images} type={PhotosSliderEnum.COVERFLOW} />
        </div>
      )}
      {images.length == 5 && (
        <div className='grid grid-cols-12 gap-2'>
          <div className='col-span-7 row-span-2'>
            <div className='relative w-full h-full min-h-[250px]'>
              <Image
                src={images[0]?.url}
                alt={images[0]?.id}
                fill
                className='object-cover transition-transform duration-300 ease-in-out hover:scale-110 hover:z-10 bg-gray-100'
              />
            </div>
          </div>

          <div className='col-span-5'>
            <div className='relative w-full h-full min-h-[120px]'>
              <Image
                src={images[1]?.url}
                alt={images[1]?.id}
                fill
                className='object-cover transition-transform duration-300 ease-in-out hover:scale-105 hover:z-10 bg-gray-100'
              />
            </div>
          </div>

          <div className='col-span-5'>
            <div className='relative w-full h-full min-h-[120px]'>
              <Image
                src={images[2]?.url}
                alt={images[2]?.id}
                fill
                className='object-cover transition-transform duration-300 ease-in-out hover:scale-105 hover:z-10 bg-gray-100'
              />
            </div>
          </div>

          <div className='col-span-5'>
            <div className='relative w-full h-full min-h-[120px]'>
              <Image
                src={images[3]?.url}
                alt={images[3]?.id}
                fill
                className='object-cover transition-transform duration-300 ease-in-out hover:scale-105 hover:z-10 bg-gray-100'
              />
            </div>
          </div>
          <div className='col-span-7 row-span-2'>
            <div className='relative w-full h-full min-h-[250px]'>
              <Image
                src={images[4]?.url}
                alt={images[4]?.id}
                fill
                className='object-cover transition-transform duration-300 ease-in-out hover:scale-110 hover:z-10 bg-gray-100'
              />
            </div>
          </div>
        </div>
      )}
      {images.length == 6 && (
        <div className='grid grid-cols-12 gap-2'>
          <div className='col-span-7 row-span-2'>
            <div className='relative w-full h-full min-h-[250px]'>
              <Image
                src={images[0]?.url}
                alt={images[0]?.id}
                fill
                className='object-cover transition-transform duration-300 ease-in-out hover:scale-110 hover:z-10 bg-gray-100'
              />
            </div>
          </div>

          <div className='col-span-5'>
            <div className='relative w-full h-full min-h-[120px]'>
              <Image
                src={images[1]?.url}
                alt={images[1]?.id}
                fill
                className='object-cover transition-transform duration-300 ease-in-out hover:scale-105 hover:z-10 bg-gray-100'
              />
            </div>
          </div>

          <div className='col-span-5'>
            <div className='relative w-full h-full min-h-[120px]'>
              <Image
                src={images[2]?.url}
                alt={images[2]?.id}
                fill
                className='object-cover transition-transform duration-300 ease-in-out hover:scale-105 hover:z-10 bg-gray-100'
              />
            </div>
          </div>

          <div className='col-span-5'>
            <div className='relative w-full h-full min-h-[120px]'>
              <Image
                src={images[3]?.url}
                alt={images[3]?.id}
                fill
                className='object-cover transition-transform duration-300 ease-in-out hover:scale-105 hover:z-10 bg-gray-100'
              />
            </div>
          </div>
          <div className='col-span-7 row-span-2'>
            <div className='relative w-full h-full min-h-[250px]'>
              <Image
                src={images[4]?.url}
                alt={images[4]?.id}
                fill
                className='object-cover transition-transform duration-300 ease-in-out hover:scale-110 hover:z-10 bg-gray-100'
              />
            </div>
          </div>
          <div className='col-span-5'>
            <div className='relative w-full h-full min-h-[120px]'>
              <Image
                src={images[5]?.url}
                alt={images[5]?.id}
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
