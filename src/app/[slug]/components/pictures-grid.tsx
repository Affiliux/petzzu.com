import { Dancing_Script } from 'next/font/google'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { CarouselPhotos } from '../../../components/carousel'
import { PhotosSliderEnum } from '../../../enums'
import { getFormattedAge } from '../../../lib/helpers/formatters/birth_date_formatter'
import { ChildProps, MediaProps } from '../../../typings/child'

interface PicturesGridProps {
  child: ChildProps
}

const dancing = Dancing_Script({
  weight: '700',
  subsets: ['latin'],
})

export default function PicturesGrid({ child }: PicturesGridProps) {
  const t = useTranslations()
  const { value, unit } = getFormattedAge(t, child?.birth_date)

  const images = child.media || []

  const childNameParts = child?.child_name?.split(' ')
  const displayName = childNameParts?.length > 2 ? `${childNameParts[0]} ${childNameParts[1]}` : child.child_name

  return (
    <div className='relative w-full max-w-2xl mx-auto px-6'>
      <div className='flex justify-center items-center mb-8'>
        {child?.child_name &&
          (child.child_name.length > 8 ? (
            <div className='flex flex-col items-center text-center'>
              <div className='flex flex-row items-baseline gap-2'>
                {child.birth_date && (
                  <>
                    <span className='text-7xl font-bold text-theme-600'>{value}</span>
                    <div className={`${dancing.className} text-3xl italic text-theme-600 leading-none `}>{unit}</div>
                  </>
                )}
              </div>
              <div>
                <div className='flex flex-col ml-3 mt-3'>
                  <div className='text-4xl text-theme-600 leading-tight mt-1 font-happy-school'>{displayName}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className='flex items-center'>
              {child.birth_date && <span className='text-8xl font-bold text-theme-600'>{value}</span>}
              <div className='flex flex-col ml-3 mt-3'>
                <div className={`${dancing.className} text-3xl italic text-theme-600 leading-none`}>{unit}</div>
                <div className='text-4xl font-medium text-theme-600 leading-tight mt-1 font-happy-school'>
                  {displayName}
                </div>
              </div>
            </div>
          ))}
      </div>
      {images.length == 1 && (
        <div>
          <CarouselPhotos images={images} type={PhotosSliderEnum.CARDS} />
        </div>
      )}
      {images.length == 2 && (
              <div className='flex flex-col justify-center items-center'>
                <div className='relative right-20 transform rotate-[2deg] left-10'>
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
      
                <div className='relative right-10 transform rotate-[-2deg] bottom-10'>
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
                <div className='relative transform rotate-[2deg] left-10'>
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
      
                <div className='relative right-10 transform rotate-[-2deg] bottom-10'>
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
      
                <div className='relative transform rotate-[2deg] left-10 bottom-20'>
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
