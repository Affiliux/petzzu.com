'use client'

import React, { useEffect, useState } from 'react'

import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import type { CreatePrePayloadProps } from '@/typings/create'
import { useApplication } from '@/contexts/ApplicationContext'
import { useCreate } from '@/contexts/CreateContext'
import { useTimeline } from '@/contexts/TimelineContext'

import { ButtonToTop } from '@/components/button-to-top'
import { Steps } from '@/components/steps'

import { DateShowTypeEnum, ThemeShowTypeEnum } from '@/enums'

export default function Page() {
  // hooks
  const t = useTranslations()
  const router = useRouter()

  // contexts
  const { theme, locale, plans, discount, currency, onGetPlans } = useApplication()
  const {
    pre,
    child,
    pre_medias,
    date_show_type,
    plan,
    payment,
    theme_show_type,
    set_pre,
    set_child,
    set_pre_medias,
    set_date_show_type,
    set_plan,
    set_payment,
    set_theme_show_type,
    onCreatePre,
    onUpdatePre,
    onGetPre,
    onNewMedia,
    onRemoveMedia,
  } = useCreate()
  const { onUploadTimelineFile, onDeleteTimelineFile, set_timeline_medias, timeline_medias } = useTimeline()

  // states
  const [loading, set_loading] = useState<boolean>(false)
  const [step, set_step] = useState(2)
  const [has_save, set_has_save] = useState<string | null>(null)

  // states
  const steps = [
    {
      id: 1,
      title: t('steps.step1.title'),
      description: t('steps.step1.description'),
      checked: !!child.child_name && !!child.sex,
      skip: false,
    },
    {
      id: 2,
      title: t('steps.step2.title'),
      description: t('steps.step2.description'),
      checked: !!child.birth_date,
      skip: false,
    },
    {
      id: 3,
      title: t('steps.step3.title'),
      description: t('steps.step3.description'),
      checked: !!pre_medias.length,
      skip: false,
    },
    {
      id: 4,
      title: t('steps.step4.title'),
      description: t('steps.step4.description'),
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
    {
      id: 5,
      title: t('steps.step5.title'),
      description: t('steps.step5.description'),
      checked: !!plan,
      skip: false,
    },
  ]

  async function handleGetPre(pre: string) {
    set_loading(true)

    try {
      await onGetPre(pre)
    } catch (error: any) {
      console.error(error)

      set_step(1)
      set_pre_medias([])
      set_timeline_medias([])
      set_pre(null)
      set_payment(null)

      set_child({} as CreatePrePayloadProps)
      set_date_show_type(DateShowTypeEnum.DEFAULT)

      set_plan(undefined)

      const find = plans.find(plan => plan.sku.includes(`plan_month_${currency}`))
      set_plan(find)
    } finally {
      set_loading(false)
    }
  }

  async function handleCancel() {
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
      set_date_show_type(DateShowTypeEnum.DEFAULT)

      set_plan(undefined)

      const find = plans.find(plan => plan.sku.includes(`plan_month_${currency}`))
      set_plan(find)
    } catch (error: any) {
      console.error(error)

      router.replace('/')
      localStorage.removeItem('hasSavePre')
    } finally {
      set_loading(false)
    }
  }

  async function handleContinue() {
    set_loading(true)

    try {
      if (has_save) {
        await handleGetPre(has_save)

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

  async function handleCreatePre(child_name: string) {
    set_loading(true)

    try {
      set_pre_medias([])
      set_timeline_medias([])
      set_pre(null)
      set_payment(null)

      set_child({ ...child, child_name })
      set_date_show_type(DateShowTypeEnum.DEFAULT)

      set_plan(undefined)

      const find = plans.find(plan => plan.sku.includes(`plan_month_${currency}`))
      set_plan(find)

      await onCreatePre({ ...child, child_name: child_name })
    } catch (error: any) {
      console.error(error)
      router.replace('/')
    } finally {
      set_loading(false)
    }
  }

  async function handleUpdatePre() {
    try {
      if (!pre) throw new Error('Pre ID not found')
      if (!plan) throw new Error('Please select a plan')

      await onUpdatePre({
        id: pre,
        child_name: child.child_name,
        message: child.message,
        birth_date: child.birth_date,
        parent_name: child.parent_name,
        sex: child.sex,
        lang: t('config.defaults.country'),
        themeShowType: theme_show_type ?? ThemeShowTypeEnum.BLUE,
        dateShowType: date_show_type,
      })
    } catch (error: any) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!!plans.length) {
      if (plan && plan.sku.includes('unique')) {
        const find = plans.find(plan => plan.sku.includes(`plan_unique_${currency}`))
        set_plan(find)
      }
      if (plan && plan.sku.includes('annual')) {
        const find = plans.find(plan => plan.sku.includes(`plan_annual_${currency}`))
        set_plan(find)
      } else {
        const find = plans.find(plan => plan.sku.includes(`plan_month_${currency}`))
        set_plan(find)
      }
    }
  }, [locale, plans])

  useEffect(() => {
    onGetPlans()
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
      set_date_show_type(DateShowTypeEnum.DEFAULT)

      set_plan(undefined)

      const find = plans.find(plan => plan.sku.includes(`plan_annual_${currency}`))
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
        themeShowType={theme_show_type}
        dateShowType={date_show_type}
        plan={plan}
        discount={discount}
        //
        setStep={set_step}
        setPlan={set_plan}
        setChild={set_child}
        setThemeShowType={set_theme_show_type}
        setDateShowType={set_date_show_type}
        //
        onUpdate={async () => await handleUpdatePre()}
        onNewMedia={async media => await onNewMedia({ id: pre!, file: media })}
        onRemoveMedia={async id => await onRemoveMedia({ idPreWebsite: pre!, idFile: id })}
        onNewMediaTimeline={async (idPreTimeline, media) => await onUploadTimelineFile(idPreTimeline, media)}
        onRemoveMediaTimeline={async (idPreTimeline, id) => await onDeleteTimelineFile(idPreTimeline, id)}
        onClose={() => {
          set_pre(null)
          set_payment(null)
          set_pre_medias([])
          set_timeline_medias([])

          set_child({} as CreatePrePayloadProps)

          router.replace('/')
        }}
        onCreatePre={handleCreatePre}
      />

      {loading && (
        <div className='h-screen w-full fixed top-0 left-0 bg-neutral-200/30 backdrop-blur-xl flex items-center justify-center z-[9999]'>
          <Loader2 size={56} className='animate-spin text-theme-900' />
        </div>
      )}

      {!!has_save && !loading && (
        <div className='h-screen w-full fixed top-0 left-0 bg-neutral-200/30 backdrop-blur-xl flex items-center justify-center z-[9999]'>
          <div className='container max-w-lg flex flex-col items-center justify-center gap-8'>
            <div>
              <h1 className='text-neutral-900 text-2xl font-bold text-center'>{t('steps.continue.title')}</h1>
              <p className='text-muted-foreground text-sm text-center'>{t('steps.continue.description')}</p>
            </div>

            <div className='flex flex-col lg:flex-row items-center gap-4 w-full'>
              <button
                type='button'
                onClick={e => {
                  e.preventDefault()
                  handleCancel()
                }}
                disabled={loading}
                className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-200/60 focus:outline-none focus:ring-0 ${
                  loading ? 'opacity-50' : ''
                }`}
              >
                <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-theme-100 px-3 py-1 text-sm font-semibold text-theme-600 backdrop-blur-3xl'>
                  {t('steps.continue.cancel')}
                </span>
              </button>
              <button
                type='button'
                onClick={e => {
                  e.preventDefault()
                  handleContinue()
                }}
                disabled={loading}
                className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-200/60 focus:outline-none focus:ring-0 ${
                  loading ? 'opacity-50' : ''
                }`}
              >
                <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-theme-100 px-3 py-1 text-sm font-semibold text-theme-600 backdrop-blur-3xl'>
                  {t('steps.continue.continue')}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      <ButtonToTop />
    </>
  )
}
