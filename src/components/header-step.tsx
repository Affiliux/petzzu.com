'use client'

import React from 'react'

import type { StepsProps } from '@/typings/application'

import { Progress } from './ui/progress'

interface HeaderStepProps {
  activeStep: number
  setStep: (step: number) => void
  steps: StepsProps[]
}

export function HeaderStep({ activeStep, steps }: HeaderStepProps) {
  // variables
  const progress = (activeStep / steps.length) * 100

  return (
    <div className='py-4'>
      <div className='flex items-center gap-4'>
        <Progress value={progress} className='h-2 w-full' />
        <p className='max-w-xl text-left text-base relative md:text-md text-neutral-900'>
          {activeStep}/{steps.length}
        </p>
      </div>

      <div className='mt-6'>
        <h2 className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-700 to-neutral-900 text-3xl lg:text-4xl font-sans py-2 relative z-20 font-bold tracking-tight'>
          {steps[activeStep - 1].title}
        </h2>
        <p className='max-w-xl text-left text-base relative md:text-md text-muted-foreground'>
          {steps[activeStep - 1].description}
        </p>
      </div>
    </div>
  )
}
