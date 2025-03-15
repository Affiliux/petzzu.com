import { Dancing_Script } from 'next/font/google'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

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

  // Pegando as imagens da mídia do child
  const images = child.media || []

  return (
    <div className='relative w-full max-w-2xl mx-auto p-6'>
      <div className='flex justify-center items-center mb-8'>
      {child?.child_name.length > 8 ? (
        <>
          <span className='text-8xl font-bold text-blue-800'>{value}</span>
          <div className='flex flex-col ml-3 mt-3'>
            <div className={`${dancing.className} text-3xl italic text-blue-700 leading-none`}>{unit}</div>
            <div className='text-4xl font-medium text-blue-800 leading-tight mt-1'>{child?.child_name.split(' ')[0]}</div>
          </div>
        </>
      ) : (
        <>
        <span className='text-8xl font-bold text-blue-800'>{value}</span>
          <div className='flex flex-col ml-3 mt-3'>
            <div className={`${dancing.className} text-3xl italic text-blue-700 leading-none`}>{unit}</div>
            <div className='text-4xl font-medium text-blue-800 leading-tight mt-1'>{child?.child_name.split(' ')[0]}</div>
          </div>
        </>
      )}
      </div>

      {/* Photo Grid */}
      <div className='grid grid-cols-12 gap-2'>
        {/* Foto principal (maior) */}
        <div className='col-span-7 row-span-2'>
          <div className='relative w-full h-full min-h-[250px]'>
            <Image
              src={images[0]?.url}
              alt={images[0]?.id}
              fill
              className='object-cover transition-transform duration-300 ease-in-out hover:scale-110 hover:z-10'
            />
          </div>
        </div>

        {/* Demais fotos distribuídas na grade */}
        <div className='col-span-5'>
          <div className='relative w-full h-full min-h-[120px]'>
            <Image
              src={images[1]?.url}
              alt={images[1]?.id}
              fill
              className='object-cover transition-transform duration-300 ease-in-out hover:scale-105 hover:z-10'
            />
          </div>
        </div>

        <div className='col-span-5'>
          <div className='relative w-full h-full min-h-[120px]'>
            <Image
              src={images[2]?.url}
              alt={images[2]?.id}
              fill
              className='object-cover transition-transform duration-300 ease-in-out hover:scale-105 hover:z-10'
            />
          </div>
        </div>

        {/* Demais fotos distribuídas na grade */}
        <div className='col-span-5'>
          <div className='relative w-full h-full min-h-[120px]'>
            <Image
              src={images[3]?.url}
              alt={images[3]?.id}
              fill
              className='object-cover transition-transform duration-300 ease-in-out hover:scale-105 hover:z-10'
            />
          </div>
        </div>
        <div className='col-span-7 row-span-2'>
          <div className='relative w-full h-full min-h-[250px]'>
            <Image
              src={images[4]?.url}
              alt={images[4]?.id}
              fill
              className='object-cover transition-transform duration-300 ease-in-out hover:scale-110 hover:z-10'
            />
          </div>
        </div>
        <div className='col-span-5'>
          <div className='relative w-full h-full min-h-[120px]'>
            <Image
              src={images[5]?.url}
              alt={images[5]?.id}
              fill
              className='object-cover transition-transform duration-300 ease-in-out hover:scale-105 hover:z-10'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

