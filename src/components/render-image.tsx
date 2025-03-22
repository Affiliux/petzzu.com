'use client'

import React, { useState } from 'react'

import { Loader2 } from 'lucide-react'

export const RenderImage = ({ ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
  // states
  const [loading, set_loading] = useState(false)

  return (
    <div className='relative flex items-center justify-center sw-[50px] h-[50px] lg:w-[65px] lg:h-[65px] rounded-lg'>
      <img alt='render image' onLoad={() => set_loading(true)} {...props} />

      {!loading && (
        <div className='absolute top-0 left-0 flex items-center justify-center w-[50px] bg-neutral-800 h-[50px] lg:w-[65px] lg:h-[65px] rounded-lg'>
          <Loader2 className='animate-spin' size={24} />
        </div>
      )}
    </div>
  )
}
