'use client'

import React, { Dispatch, SetStateAction } from 'react'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import {
  BackgroundAnimationProps,
  DiscountProps,
  PlanProps,
  StepsProps,
  YouTubeVideoProps,
} from '@/typings/application'
import { PaymentProps } from '@/typings/couple'
import { CreatePrePayloadProps, MediaPreProps } from '@/typings/create'

import { HeaderStep } from './header-step'
import { PreviewDefault } from './preview-default'
import { PreviewNetflix } from './preview-netflix'
import { Step1 } from './step1'
import { Step2 } from './step2'
import { Step3 } from './step3'
import { Step4 } from './step4'
import { Step5 } from './step5'
import { Step6 } from './step6'
import { Step7 } from './step7'

import { DateShowTypeEnum, PhotosSliderEnum, ThemeShowTypeEnum } from '@/enums'

interface StepsComponentProps {
  theme: ThemeShowTypeEnum
  //
  pre: string | null
  step: number
  steps: StepsProps[]
  plans: PlanProps[]
  animations: BackgroundAnimationProps[]
  //
  couple: CreatePrePayloadProps
  payment: PaymentProps | null
  medias: MediaPreProps[]
  song?: YouTubeVideoProps
  animation: BackgroundAnimationProps
  mediaShowType: PhotosSliderEnum
  dateShowType: DateShowTypeEnum
  themeShowType: ThemeShowTypeEnum
  plan?: PlanProps
  discount: DiscountProps | null
  //
  setCouple: Dispatch<SetStateAction<CreatePrePayloadProps>>
  setSong: Dispatch<SetStateAction<YouTubeVideoProps | undefined>>
  setAnimation: Dispatch<SetStateAction<BackgroundAnimationProps>>
  setMediaShowType: Dispatch<SetStateAction<PhotosSliderEnum>>
  setDateShowType: Dispatch<SetStateAction<DateShowTypeEnum>>
  setThemeShowType: Dispatch<SetStateAction<ThemeShowTypeEnum>>
  setPlan: Dispatch<SetStateAction<PlanProps | undefined>>
  setStep: Dispatch<SetStateAction<number>>
  //
  onClose: () => void
  onNewMedia: (media: FormData) => Promise<void>
  onRemoveMedia: (id: string) => Promise<void>
  onUpdate: () => Promise<void>
  onCreatePre: (coupleName: string) => Promise<void>
}

export const Steps = ({
  theme,
  //
  pre,
  step,
  steps,
  plans,
  animations,
  //
  couple,
  medias,
  mediaShowType,
  dateShowType,
  song,
  animation,
  plan,
  discount,
  //
  setCouple,
  setSong,
  setAnimation,
  setMediaShowType,
  setDateShowType,
  setPlan,
  setStep,
  //
  onClose,
  onNewMedia,
  onRemoveMedia,
  onUpdate,
  onCreatePre,
}: StepsComponentProps) => {
  const t = useTranslations()
  const router = useRouter()


  return (
    <div className='relative w-full h-full z-50' id='startSteps'>
      <div className='py-1.5 px-4 text-left md:text-center font-medium font-sans tracking-tight text-xs md:text-sm bg-gradient-to-r text-white from-red-500 via-rose-800 to-pink-500'>
        <p className='text-center text-white'>
          <b>{t('config.offer.title')}</b> - {t('config.offer.description1')}{' '}
          <b className='text-sm md:text-base'>50%</b> {t('config.offer.description2')}
        </p>
      </div>

      <div className='container py-4 lg:pt-8 flex flex-col lg:flex-row justify-between lg:gap-24 gap-12 w-full'>
        <div className='w-full lg:w-1/2'>
          <HeaderStep theme={theme} steps={steps} activeStep={step} setStep={setStep} />

          {step === 1 && (
            <Step1
              theme={theme}
              couple={couple}
              setCouple={setCouple}
              onBack={onClose}
              onNew={
                !pre
                  ? async (coupleName: string) => {
                      await onCreatePre(coupleName)
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
              theme={theme}
              couple={couple}
              setCouple={setCouple}
              setMediaShowType={setMediaShowType}
              mediaShowType={mediaShowType}
              medias={medias}
              onSaveMedia={onNewMedia}
              onRemoveMedia={onRemoveMedia}
              onBack={() => setStep(1)}
              onNext={async () => {
                await onUpdate()
                setStep(3)
              }}
            />
          )}

          {step === 3 && (
            <Step3
              theme={theme}
              couple={couple}
              dateShowType={dateShowType}
              setCouple={setCouple}
              setDateShowType={setDateShowType}
              onBack={() => setStep(2)}
              onNext={async () => {
                await onUpdate()
                setStep(4)
              }}
            />
          )}

          {step === 4 && (
            <Step4
              theme={theme}
              setMediaShowType={setMediaShowType}
              mediaShowType={mediaShowType}
              medias={medias}
              onSaveMedia={onNewMedia}
              onRemoveMedia={onRemoveMedia}
              onBack={() => setStep(3)}
              onNext={async () => {
                await onUpdate()
                setStep(5)
              }}
            />
          )}

          {step === 5 && (
            <Step5
              theme={theme}
              couple={couple}
              setCouple={setCouple}
              selected={song}
              setSong={setSong}
              onBack={() => setStep(4)}
              onNext={async () => {
              await onUpdate()
               setStep(6)
              }}
            />
          )}

          {step === 6 && (
            <Step6
              animations={animations}
              selected={animation}
              setAnimation={setAnimation}
              onBack={() => setStep(5)}
              onNext={async () => {
                await onUpdate()
                setStep(7)
              }}
            />
          )}

          {step === 7 && (
            <Step7
              plans={plans}
              discount={discount}
              selected={plan}
              setPlan={setPlan}
              onBack={() => {
                 setStep(6)
              }}
              onNext={async () => {
                await onUpdate()
                router.push('/checkout')
              }}
            />
          )}
        </div>

        <div className='w-full lg:w-1/2 h-full'>
            <PreviewDefault
              couple={couple}
              medias={medias}
              song={song}
              dateShowType={dateShowType}
              mediaShowType={mediaShowType}
              animation={animation}
              plan={plan}
            />

        </div>
      </div>
    </div>
  )
}
