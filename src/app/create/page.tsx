'use client'

import React, { useEffect, useState } from 'react'

import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { CreatePrePayloadProps } from '@/typings/create'
import { useApplication } from '@/contexts/ApplicationContext'
import { useCreate } from '@/contexts/CreateContext'

import { useQueryParams } from '@/hooks/use-query-params'

import { ButtonToTop } from '@/components/button-to-top'
import { Cookies } from '@/components/cookies'
import { Steps } from '@/components/steps'

import { useTimeline } from '../../contexts/TimelineContext'

import { BackgroundAnimationEnum, DateShowTypeEnum, PhotosSliderEnum, ThemeShowTypeEnum } from '@/enums'

export default function Page() {
  const t = useTranslations()
  const router = useRouter()
  const queryParams = useQueryParams()

  const { theme, locale, plans, discount, currency , handleGetPlans} = useApplication()
  const {
    pre,
    child,
    song,
    pre_medias,
    plan,
    payment,
    media_show_type,
    date_show_type,
    theme_show_type,
    set_pre,
    set_child,
    set_song,
    set_pre_medias,
    set_plan,
    set_payment,
    set_media_show_type,
    set_date_show_type,
    set_theme_show_type,
    handleCreatePre,
    handleUpdatePre,
    handleGetPre,
    handleNewMedia,
    handleRemoveMedia,
  } = useCreate()

  const { uploadTimelineFile, deleteTimelineFile, set_timeline_medias, timeline_medias } = useTimeline()

  const steps = [
    {
      id: 1,
      title: t('steps.step1.title'),
      description: t('steps.step1.description'),
      checked: !!child.child_name,
      skip: false,
    },
    {
      id: 2,
      title: t('steps.step2.title'),
      description: t('steps.step2.description'),
      checked: !!child.birth_date && !!child.sex,
      skip: false,
    },
    {
      id: 3,
      title: t('steps.step3.title'),
      description: t('steps.step3.description'),
      checked:
        Array.isArray(child.timeLine) &&
        child.timeLine.length > 0 &&
        child.timeLine.every(
          entry =>
            !!entry.title.trim() &&
            !!entry.description.trim() &&
            !!entry.date &&
            Array.isArray(entry.media) &&
            entry.media.length > 0,
        ),
      skip: false,
    },
    // {
    //   id: 4,
    //   title: t('steps.step5.title'),
    //   description: t('steps.step5.description'),
    //   checked: !!song,
    //   skip: true,
    // },
    {
      id: 4,
      title: t('steps.step7.title'),
      description: t('steps.step7.description'),
      checked: !!plan && Array.isArray(child.timeLine) &&
        child.timeLine.length > 0 &&
        child.timeLine.every(
          entry =>
            !!entry.title.trim() &&
            !!entry.description.trim() &&
            !!entry.date &&
            Array.isArray(entry.media) &&
            entry.media.length > 0,
        ),
      skip: false,
    },
  ]

  const [loading, set_loading] = useState<boolean>(false)
  const [step, set_step] = useState(2)
  const [has_save, set_has_save] = useState<string | null>(null)

  async function onCancel() {
    set_loading(true)

    set_has_save(null)
    localStorage.removeItem('hasSavePre')

    try {
      set_step(1)
      set_pre_medias([])
      set_timeline_medias([])
      set_pre(null)
      set_payment(null)

      set_child({} as CreatePrePayloadProps)

      set_media_show_type(PhotosSliderEnum.COVERFLOW)
      set_date_show_type(DateShowTypeEnum.DEFAULT)

      if (queryParams?.theme) set_theme_show_type(queryParams?.theme as ThemeShowTypeEnum)
      else set_theme_show_type(ThemeShowTypeEnum.YELLOW)

      set_plan(undefined)
      set_song(undefined)

      const find = plans.find(plan => plan.sku.includes(`plan_pro_${currency}`))
      set_plan(find)
    } catch (error: any) {
      console.error(error)

      router.replace('/')
      localStorage.removeItem('hasSavePre')
    } finally {
      set_loading(false)
    }
  }

  async function onContinue() {
    set_loading(true)

    try {
      if (has_save) {
        await onGetPre(has_save)

        set_step(1)
        set_has_save(null)
      }
    } catch (error: any) {
      console.error(error)

      router.replace('/')
      localStorage.removeItem('hasSavePre')
    } finally {
      set_loading(false)
    }
  }

  async function onGetPre(pre: string) {
    set_loading(true)

    try {
      await handleGetPre(pre)
    } catch (error: any) {
      console.error(error)

      set_step(1)
      set_pre_medias([])
      set_timeline_medias([])
      set_pre(null)
      set_payment(null)

      set_child({} as CreatePrePayloadProps)

      set_media_show_type(PhotosSliderEnum.COVERFLOW)
      set_date_show_type(DateShowTypeEnum.DEFAULT)

      set_plan(undefined)
      set_song(undefined)

      const find = plans.find(plan => plan.sku.includes(`plan_pro_${currency}`))
      set_plan(find)
    } finally {
      set_loading(false)
    }
  }

  async function onCreatePre(child_name: string) {
    set_loading(true)

    try {
      set_pre_medias([])
      set_timeline_medias([])
      set_pre(null)
      set_payment(null)

      set_child({ ...child, child_name })

      set_media_show_type(PhotosSliderEnum.COVERFLOW)
      set_date_show_type(DateShowTypeEnum.DEFAULT)

      if (queryParams?.theme) set_theme_show_type(queryParams?.theme as ThemeShowTypeEnum)
      else set_theme_show_type(ThemeShowTypeEnum.YELLOW)

      set_plan(undefined)
      set_song(undefined)

      const find = plans.find(plan => plan.sku.includes(`plan_pro_${currency}`))
      set_plan(find)

      await handleCreatePre({ ...child, child_name: child_name })
    } catch (error: any) {
      console.error(error)
      router.replace('/')
    } finally {
      set_loading(false)
    }
  }

  async function onUpdatePre() {
    try {
      if (!pre) throw new Error('Pre ID not found')
      if (!plan) throw new Error('Please select a plan')

      // const yt_song = plan.sku.includes('pro') && song ? song.url : ''
      await handleUpdatePre({
        id: pre,
        child_name: child.child_name,
        message: child.message,
        birth_date: child.birth_date,
        parent_name: child.parent_name,
        sex: child.sex,
        lang: t('config.defaults.country'),
        // yt_song,
        imageShowType: media_show_type,
        dateShowType: date_show_type,
        themeShowType: theme_show_type ?? ThemeShowTypeEnum.YELLOW,
      })
    } catch (error: any) {
      console.error(error)
    }
  }

  useEffect(() => {
    console.log('plans', plans)
    console.log('currency', currency)
    if (!!plans.length) {
      if (plan && plan.sku.includes('basic')) {
        const find = plans.find(plan => plan.sku.includes(`plan_basic_${currency}`))
        set_plan(find)
      } else {
        const find = plans.find(plan => plan.sku.includes(`plan_pro_${currency}`))
        set_plan(find)
      }
    }
  }, [locale, plans])

  useEffect(() => {
    handleGetPlans()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [step])

  useEffect(() => {
    const hasSavePre = localStorage.getItem('hasSavePre')

    if (!!hasSavePre) set_has_save(hasSavePre)
    else {
      set_step(1)
      set_pre_medias([])
      set_timeline_medias([])
      set_pre(null)
      set_payment(null)

      set_child({ ...child })

      set_media_show_type(PhotosSliderEnum.COVERFLOW)
      set_date_show_type(DateShowTypeEnum.DEFAULT)

      if (queryParams?.theme) set_theme_show_type(queryParams?.theme as ThemeShowTypeEnum)
      else set_theme_show_type(ThemeShowTypeEnum.YELLOW)

      set_plan(undefined)
      set_song(undefined)

      const find = plans.find(plan => plan.sku.includes(`plan_pro_${currency}`))
      set_plan(find)
    }
  }, [])

  return (
    <>
      <Steps
        theme={theme}
        pre={pre}
        step={step}
        steps={steps}
        plans={plans}
        //
        child={child}
        payment={payment}
        medias={pre_medias}
        timelineMedias={timeline_medias}
        song={song}
        mediaShowType={media_show_type}
        dateShowType={date_show_type}
        themeShowType={theme_show_type}
        plan={plan}
        discount={discount}
        //
        setStep={set_step}
        setPlan={set_plan}
        setChild={set_child}
        setMediaShowType={set_media_show_type}
        setDateShowType={set_date_show_type}
        setThemeShowType={set_theme_show_type}
        setSong={set_song}
        //
        onUpdate={async () => await onUpdatePre()}
        onNewMedia={async media => await handleNewMedia({ id: pre!, file: media })}
        onRemoveMedia={async id => await handleRemoveMedia({ idPreWebsite: pre!, idFile: id })}
        onNewMediaTimeline={async (idPreTimeline, media) => await uploadTimelineFile(idPreTimeline, media)}
        onRemoveMediaTimeline={async (idPreTimeline, id) => await deleteTimelineFile(idPreTimeline, id)}
        onClose={() => {
          set_pre(null)
          set_payment(null)
          set_pre_medias([])
          set_timeline_medias([])

          set_child({} as CreatePrePayloadProps)
          set_song(undefined)

          router.replace('/')
        }}
        onCreatePre={onCreatePre}
      />

      {loading && (
        <div className='h-screen w-full absolute top-0 left-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999]'>
          <Loader2 size={56} className='animate-spin' />
        </div>
      )}

      {!!has_save && !loading && (
        <div className='h-screen w-full absolute top-0 left-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999]'>
          <div className='container max-w-lg flex flex-col items-center justify-center gap-8'>
            <div>
              <h1 className='text-white text-2xl font-bold text-center'>{t('steps.continue.title')}</h1>
              <p className='text-white text-sm text-center'>{t('steps.continue.description')}</p>
            </div>

            <div className='flex flex-col lg:flex-row items-center gap-4 w-full'>
              <button
                type='button'
                onClick={e => {
                  e.preventDefault()
                  onCancel()
                }}
                disabled={loading}
                className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-800 focus:outline-none focus:ring-0 ${
                  loading ? 'opacity-50' : ''
                }`}
              >
                <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black px-3 py-1 text-sm font-semibold text-white backdrop-blur-3xl'>
                  {t('steps.continue.cancel')}
                </span>
              </button>
              <button
                type='button'
                onClick={e => {
                  e.preventDefault()
                  onContinue()
                }}
                disabled={loading}
                className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-800 focus:outline-none focus:ring-0 ${
                  loading ? 'opacity-50' : ''
                }`}
              >
                <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black px-3 py-1 text-sm font-semibold text-white backdrop-blur-3xl'>
                  {t('steps.continue.continue')}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      <Cookies />
      <ButtonToTop />
    </>
  )
}
