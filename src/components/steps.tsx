'use client'

import React, { Dispatch, SetStateAction } from 'react'

import { useRouter } from 'next/navigation'

import type { DiscountProps, PlanProps, StepsProps } from '@/typings/application'
import type { PaymentProps } from '@/typings/child'
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
  theme: ThemeShowTypeEnum
  //
  pre: string | null
  step: number
  steps: StepsProps[]
  plans: PlanProps[]
  //
  child: CreatePrePayloadProps
  payment: PaymentProps | null
  medias: MediaPreProps[]
  themeShowType: ThemeShowTypeEnum
  dateShowType: DateShowTypeEnum
  plan?: PlanProps
  discount: DiscountProps | null
  //
  setChild: Dispatch<SetStateAction<CreatePrePayloadProps>>
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
  onCreatePre: (child_name: string) => Promise<void>
}

export const Steps = ({
  theme,
  //
  pre,
  step,
  steps,
  plans,
  //
  child,
  dateShowType,
  medias,
  plan,
  discount,
  //
  setChild,
  setDateShowType,
  setPlan,
  setStep,
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
              theme={theme}
              child={child}
              setChild={setChild}
              onBack={onClose}
              onNew={
                !pre
                  ? async (child_name: string) => {
                      await onCreatePre(child_name)
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
              child={child}
              setChild={setChild}
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
              child={child}
              setChild={setChild}
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
              child={child}
              setChild={setChild}
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
          <PreviewDefault child={child} dateShowType={dateShowType} medias={medias} selected={plan} />
        </div>
      </div>
    </div>
  )
}
