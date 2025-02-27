'use client'

import React from 'react'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { IconCircleCheck, IconCircleDashed, IconProgressCheck } from '@tabler/icons-react'

import { StepsProps } from '@/typings/application'

import { ThemeShowTypeEnum } from '@/enums'

interface HeaderStepProps {
  theme: ThemeShowTypeEnum
  activeStep: number
  setStep: (step: number) => void
  steps: StepsProps[]
}

export function HeaderStep({ theme, activeStep, steps, setStep }: HeaderStepProps) {
  const t = useTranslations('config')

  return (
    <div className='py-4'>
      <div className='flex'>
        {steps.map((step, index) =>
          theme !== ThemeShowTypeEnum.DEFAULT && step.id === 6 ? null : step.id >= 1 && step.id < 7 ? (
            <motion.div
              key={index}
              className='relative flex flex-col cursor-pointer'
              onClick={() => (activeStep > index + 1 || (step.checked && !step.skip) ? setStep(index + 1) : null)}
            >
              <div className='absolute rounded-lg ml-[9.5px]'>
                {(step.checked && !step.skip) || activeStep >= index + 1 ? (
                  <></>
                ) : (
                  <span className='text-xs font-semibold text-neutral-500'>{index + 1}</span>
                )}
              </div>

              <div className='flex items-center justify-center'>
                {index + 1 < activeStep || (step.checked && !step.skip) ? (
                  <IconCircleCheck size={26} className='text-green-500' />
                ) : activeStep === index + 1 ? (
                  <IconProgressCheck size={26} className='text-yellow-500' />
                ) : (
                  <IconCircleDashed size={26} className='text-neutral-500' />
                )}

                {index + 1 >= 1 && index + 1 < 6 && (
                  <div className='w-2 lg:w-14 lg:px-1 rounded-full block'>
                    {theme !== ThemeShowTypeEnum.DEFAULT && index + 1 === 5 ? null : index + 1 < activeStep ||
                      (step.checked && !step.skip) ? (
                      <div className='w-full h-0.5 bg-green-500 rounded-full' />
                    ) : activeStep === index + 1 ? (
                      <div className='w-full h-0.5 bg-yellow-500 rounded-full' />
                    ) : (
                      <div className='w-full h-0.5 bg-neutral-500 rounded-full' />
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ) : step.id === 8 ? (
            <motion.div key={index} className='relative flex flex-col cursor-pointer'>
              <div className='flex items-center justify-center'>
                <div className='w-2 lg:w-14 lg:px-1 rounded-full block'>
                  {step.id === activeStep ? (
                    <div className='w-full h-0.5 bg-yellow-500 rounded-full' />
                  ) : (
                    <div className='w-full h-0.5 bg-neutral-500 rounded-full' />
                  )}
                </div>

                {step.id === activeStep ? (
                  <div className='flex items-center gap-2'>
                    <IconProgressCheck size={26} className='text-yellow-500' />
                    <p className='text-yellow-500'>Checkout</p>
                  </div>
                ) : (
                  <div className='flex items-center gap-2'>
                    <IconCircleDashed size={26} className='text-neutral-500' />
                    <p className='text-neutral-500'>Checkout</p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : null,
        )}
      </div>

      <div className='mt-8'>
        <h2 className='bg-clip-text text-black bg-gradient-to-b from-neutral-200 to-white text-3xl lg:text-4xl font-sans py-2 relative z-20 font-bold tracking-tight'>
          {steps[activeStep - 1].title}
        </h2>
        <p className='max-w-xl text-left text-base relative md:text-md text-neutral-300'>
          {steps[activeStep - 1].description}
        </p>
      </div>
    </div>
  )
}
