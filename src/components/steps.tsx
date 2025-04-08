'use client'

import React, { Dispatch, SetStateAction } from 'react'

import { useRouter } from 'next/navigation'

import type { DiscountProps, PlanProps, StepsProps } from '@/typings/application'
import type { PaymentProps } from '@/typings/pet'
import type { CreatePrePayloadProps, MediaPreProps } from '@/typings/create'

import { HeaderStep } from './header-step'
import { PreviewDefault } from './preview-default'
import { Step1 } from './step1'
import { Step2 } from './step2'
import { Step3 } from './step3'
import { Step4 } from './step4'
import { Step5 } from './step5'
import { Step6 } from './step6'
import { UploadFileResponseProps } from '../typings/timeline'

import { DateShowTypeEnum, ThemeShowTypeEnum } from '@/enums'

interface StepsComponentProps {
  pre: string | null
  step: number
  steps: StepsProps[]
  plans: PlanProps[]
  //
  pet: CreatePrePayloadProps
  payment: PaymentProps | null
  medias: MediaPreProps[]
  themeShowType: ThemeShowTypeEnum
  dateShowType: DateShowTypeEnum
  plan?: PlanProps
  discount: DiscountProps | null
  //
  setPet: Dispatch<SetStateAction<CreatePrePayloadProps>>
  setThemeShowType: Dispatch<SetStateAction<ThemeShowTypeEnum>>
  setDateShowType: Dispatch<SetStateAction<DateShowTypeEnum>>
  setPlan: Dispatch<SetStateAction<PlanProps | undefined>>
  setStep: Dispatch<SetStateAction<number>>
  //
  onClose: () => void
  onNewMedia: (media: FormData) => Promise<void>
  onRemoveMedia: (id: string) => Promise<void>
  onNewMediaTimeline: (idPreTimeline: string, media: FormData) => Promise<UploadFileResponseProps>
  onRemoveMediaTimeline: (idPreTimeline: string, id: string) => Promise<void>
  onUpdate: () => Promise<void>
  onCreatePre: (pet_name: string) => Promise<void>
}

export const Steps = ({
  themeShowType,
  //
  pre,
  step,
  steps,
  plans,
  //
  pet,
  dateShowType,
  medias,
  plan,
  discount,
  //
  setPet,
  setDateShowType,
  setPlan,
  setStep,
  setThemeShowType,
  //
  onClose,
  onNewMedia,
  onRemoveMedia,
  onNewMediaTimeline,
  onRemoveMediaTimeline,
  onUpdate,
  onCreatePre,
}: StepsComponentProps) => {
  // hooks
  const router = useRouter()

  return (
    <div className='relative w-full h-full z-50' id='startSteps'>
      <div className='py-4 lg:pt-8 flex flex-col lg:flex-row justify-between lg:gap-24 gap-12 w-full'>
        <div className='w-full lg:w-1/2'>
          <HeaderStep steps={steps} activeStep={step} setStep={setStep} />

          {step === 1 && (
            <Step1
              themeShowType={themeShowType}
              setThemeShowType={setThemeShowType}
              pet={pet}
              setPet={setPet}
              onBack={onClose}
              onNew={
                !pre
                  ? async (pet_name: string) => {
                      await onCreatePre(pet_name)
                      setStep(2)
                    }
                  : null
              }
              onNext={async () => {
                await onUpdate()
                setStep(2)
              }}
            />
          )}

          {step === 2 && (
            <Step2
              pet={pet}
              setPet={setPet}
              dateShowType={dateShowType}
              setDateShowType={setDateShowType}
              onBack={() => setStep(1)}
              onNext={async () => {
                await onUpdate()
                setStep(3)
              }}
            />
          )}

          {step === 3 && (
            <Step3
              medias={medias}
              onSaveMedia={onNewMedia}
              onRemoveMedia={onRemoveMedia}
              onBack={() => setStep(2)}
              onNext={async () => {
                await onUpdate()
                setStep(4)
              }}
            />
          )}

          {step === 4 && (
            <Step4
              pet={pet}
              setPet={setPet}
              onSaveMedia={onNewMediaTimeline}
              onRemoveMedia={onRemoveMediaTimeline}
              onBack={() => setStep(3)}
              onNext={async () => {
                await onUpdate()
                setStep(5)
              }}
            />
          )}

          {step === 5 && (
            <Step5
              pet={pet}
              setPet={setPet}
              onBack={() => setStep(4)}
              onNext={async () => {
                await onUpdate()
                setStep(6)
              }}
            />
          )}

          {step === 6 && (
            <Step6
              plans={plans}
              discount={discount}
              selected={plan}
              setPlan={setPlan}
              onBack={() => setStep(5)}
              onNext={async () => {
                await onUpdate()
                router.push('/checkout')
              }}
            />
          )}
        </div>

        <div className='w-full lg:w-1/2 h-full'>
          <PreviewDefault pet={pet} dateShowType={dateShowType} medias={medias} selected={plan} />
        </div>
      </div>
    </div>
  )
}
