'use client'

import React, { useEffect, useState } from 'react'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { CreatePrePayloadProps, MediaPreProps } from '@/typings/create'
import { useAccount } from '@/contexts/AccountContext'
import { useApplication } from '@/contexts/ApplicationContext'
import { useTimeline } from '@/contexts/TimelineContext'

import { toast } from '@/hooks/use-toast'

import { Step1 } from '@/components/step1'
import { Step2 } from '@/components/step2'
import { Step3 } from '@/components/step3'
import { Step4 } from '@/components/step4'

import { HeaderEdit } from './components/header-edit'
import { PreviewDefault } from '../../../../components/preview-default'

export const runtime = 'edge'

export default function Page() {
  // hooks
  const t = useTranslations()
  const router = useRouter()

  // contexts
  const { plans } = useApplication()
  const {
    selected,
    pet,
    medias,
    theme_show_type,
    date_show_type,
    plan,
    set_pet,
    set_medias,
    set_theme_show_type,
    set_date_show_type,
    set_plan,
    onNewMedia,
    onRemoveMedia,
    onUpdatePage,
  } = useAccount()
  const { onUploadTimelineFile, onDeleteTimelineFile } = useTimeline()

  // steps
  const [step, set_step] = useState(1)

  // states
  const steps = [
    {
      id: 1,
      title: t('steps.step1.title'),
      description: t('steps.step1.description'),
      checked: !!pet.pet_name && !!pet.sex,
      skip: false,
    },
    {
      id: 2,
      title: t('steps.step2.title'),
      description: t('steps.step2.description'),
      checked: !!pet.birth_date,
      skip: false,
    },
    {
      id: 3,
      title: t('steps.step3.title'),
      description: t('steps.step3.description'),
      checked: !!medias.length,
      skip: false,
    },
    {
      id: 4,
      title: t('steps.step4.title'),
      description: t('steps.step4.description'),
      checked:
        Array.isArray(pet.timeLine) &&
        pet.timeLine.length > 0 &&
        pet.timeLine.every(
          entry => !!entry.title.trim() && !!entry.date && Array.isArray(entry.media) && entry.media.length > 0,
        ),
      skip: false,
    },
  ]

  async function handleSave() {
    try {
      await onUpdatePage(selected.id, {
        pet_name: pet.pet_name,
        birth_date: pet.birth_date,
        sex: pet.sex,
        dateShowType: date_show_type,
        themeShowType: theme_show_type,
        timeLine: pet.timeLine,
      })

      toast({
        title: t('pages.account.pages.edit.toast.success.title'),
        description: t('pages.account.pages.edit.toast.success.description'),
        variant: 'default',
      })
      router.push('/account/pages')
    } catch (error: any) {
      console.error(error)

      toast({
        title: t('pages.account.pages.edit.toast.error.title'),
        description: t('pages.account.pages.edit.toast.error.description'),
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    if (!selected) router.push('/account/pages')

    if (selected) {
      const previewPetProps: CreatePrePayloadProps = {
        pet_name: selected.pet_name,
        birth_date: selected.birth_date,
        sex: selected.sex,
        dateShowType: selected.dateShowType,
        themeShowType: selected.themeShowType,
        timeLine: [],
      }

      const mediaPetProps: MediaPreProps[] = selected.media.map(media => ({
        id: media.id,
        url: media.url,
      }))

      set_pet(previewPetProps)
      set_medias(mediaPetProps)
      set_theme_show_type(selected.themeShowType)
      set_date_show_type(selected.dateShowType)

      if (!!selected.planSku) {
        set_plan(plans.find(plan => plan.sku.includes(selected.planSku)))
      }
    }
  }, [selected])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [step])

  return (
    <div className='w-full'>
      <div className='border-b border-neutral-200/60 pb-12'>
        <div className='flex items-center gap-2 -ml-2'>
          <ChevronLeft className='w-10 h-10 cursor-pointer' onClick={() => router.push('/account/pages')} />
          <h1 className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-black text-3xl lg:text-4xl font-sans py-2 relative z-20 font-bold tracking-tight'>
            {t('pages.account.pages.edit.title')}
          </h1>
        </div>
        <p className='max-w-2xl text-base md:text-lg text-muted-foreground'>
          {t('pages.account.pages.edit.description')}
        </p>
      </div>

      {selected && (
        <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mt-12'>
          <div className='w-full h-full'>
            <HeaderEdit steps={steps} activeStep={step} />

            {step === 1 && (
              <Step1
                isEdit
                themeShowType={theme_show_type}
                setThemeShowType={set_theme_show_type}
                pet={pet}
                setPet={set_pet}
                onNext={async () => set_step(2)}
              />
            )}

            {step === 2 && (
              <Step2
                isEdit
                pet={pet}
                setPet={set_pet}
                dateShowType={date_show_type}
                setDateShowType={set_date_show_type}
                onBack={() => set_step(1)}
                onNext={async () => set_step(3)}
              />
            )}

            {step === 3 && (
              <Step3
                isEdit
                medias={medias}
                onSaveMedia={async media => await onNewMedia({ id: selected.id, file: media })}
                onRemoveMedia={async id => await onRemoveMedia({ idWebsite: selected.id, idFile: id })}
                onBack={() => set_step(2)}
                onNext={async () => set_step(4)}
              />
            )}

            {step === 4 && (
              <Step4
                isEdit
                idWebsite={selected.id}
                pet={pet}
                setPet={set_pet}
                onSaveMedia={onUploadTimelineFile}
                onRemoveMedia={onDeleteTimelineFile}
                onBack={() => set_step(3)}
                onNext={handleSave}
              />
            )}

            {step !== 6 && (
              <div className='py-4 mt-6 px-4 bg-green-700/10 text-green-700 text-center text-sm border rounded-md border-green-700 border-dashed'>
                {t('pages.account.pages.edit.save-info')}
              </div>
            )}
          </div>

          <div className='w-full h-full'>
            <PreviewDefault pet={pet} dateShowType={date_show_type} medias={medias} selected={plan} />
          </div>
        </div>
      )}
    </div>
  )
}
