'use client'

import React from 'react'

import type { StepsProps } from '@/typings/application'

interface HeaderEditProps {
  activeStep: number
  steps: StepsProps[]
}

export function HeaderEdit({ activeStep, steps }: HeaderEditProps) {
  return (
    <div>
      <div className='mb-4'>
        <h2 className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-white text-xl lg:text-2xl font-sans relative z-20 font-bold tracking-tight'>
          {steps[activeStep - 1].title}
        </h2>
        <p className='max-w-lg text-left text-sm relative text-neutral-300'>{steps[activeStep - 1].description}</p>
      </div>
    </div>
  )
}
