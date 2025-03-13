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

  return (
    <div className='relative w-full max-w-2xl mx-auto p-6'>
      {/* Title Section */}
      <div className='flex justify-center items-center mb-8'>
        <span className='text-8xl font-bold text-blue-800'>{value}</span>
        <div className='flex flex-col ml-3 mt-3'>
          <div className={`${dancing.className} text-3xl italic text-blue-700 leading-none`}>{unit}</div>
          <div className='text-4xl font-medium text-blue-800 leading-tight mt-1'>{child?.child_name.split(' ')[0]}</div>
        </div>
      </div>

      {/* Photo Grid */}
      <div className='grid grid-cols-12 gap-2'>
        {/* Main large photo */}
        <div className='col-span-7 row-span-2'>
          <div className='relative w-full h-full min-h-[250px]'>
            <Image src='/placeholder.svg?height=400&width=400' alt='Baby main photo' fill className='object-cover' />
          </div>
        </div>

        {/* Top right photos */}
        <div className='col-span-5'>
          <div className='relative w-full h-full min-h-[120px]'>
            <Image src='/placeholder.svg?height=200&width=200' alt='Baby photo 2' fill className='object-cover' />
          </div>
        </div>
        <div className='col-span-5'>
          <div className='relative w-full h-full min-h-[120px]'>
            <Image src='/placeholder.svg?height=200&width=200' alt='Baby photo 3' fill className='object-cover' />
          </div>
        </div>

        {/* Bottom left photos */}
        <div className='col-span-4'>
          <div className='relative w-full h-full min-h-[120px]'>
            <Image src='/placeholder.svg?height=200&width=200' alt='Baby photo 4' fill className='object-cover' />
          </div>
        </div>
        <div className='col-span-4'>
          <div className='relative w-full h-full min-h-[120px]'>
            <Image src='/placeholder.svg?height=200&width=200' alt='Baby photo 5' fill className='object-cover' />
          </div>
        </div>

        {/* Bottom right large photo */}
        <div className='col-span-4 row-span-2'>
          <div className='relative w-full h-full min-h-[250px]'>
            <Image src='/placeholder.svg?height=400&width=300' alt='Baby photo 6' fill className='object-cover' />
          </div>
        </div>
      </div>
    </div>
  )
}
