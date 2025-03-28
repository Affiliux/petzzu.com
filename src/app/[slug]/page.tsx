'use client'

import React, { use, useEffect, useState } from 'react'

import { Loader2, LoaderIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { useApplication } from '@/contexts/ApplicationContext'
import { useChild } from '@/contexts/ChildContext'

import { useQueryParams } from '@/hooks/use-query-params'

import Loading from '@/components/loading'
import AnimatedModal from '@/components/modal'
import { PixPayment } from '@/components/pix'
import { SuccessModal } from '@/components/success'

import { DefaultTheme } from './components/default'

import { ThemeShowTypeEnum } from '@/enums'

export const runtime = 'edge'

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  // hooks
  const { slug } = use(params)
  const queryParams = useQueryParams()
  const router = useRouter()
  const t = useTranslations()

  // contexts
  const { theme, onChangeTheme } = useApplication()
  const { child, onGetChildBySlug } = useChild()

  // states
  const [payment, set_payment] = useState<boolean>(false)
  const [success, set_success] = useState<boolean>(false)
  const [loading, set_loading] = useState<boolean>(false)

  async function handleGetBySlug() {
    set_loading(true)

    try {
      await onGetChildBySlug(slug)
    } catch (error: any) {
      console.error(error)

      if (error.message === 'Website not found') {
        router.replace('/')
      }
    } finally {
      set_loading(false)
    }
  }

  async function handleCheckPayment() {
    try {
      await onGetChildBySlug(slug)
    } catch (error: any) {
      console.error(error)

      if (error.message === 'Website not found') {
        router.replace('/')
      }
    }
  }

  useEffect(() => {
    if (!!child && child?.themeShowType) onChangeTheme(child?.themeShowType ?? ThemeShowTypeEnum.GRAY)

    if (!!child && child?.inactiveReason === 'Awaiting payment') {
      if (child?.urlPayment && child?.urlPayment.includes('https')) {
        router.replace(child.urlPayment)
      } else if (child.urlPayment && !child.urlPayment.includes('https')) {
        set_payment(true)
      }
    }
  }, [child])

  useEffect(() => {
    handleGetBySlug()
  }, [slug])

  useEffect(() => {
    if (queryParams && queryParams?.afterPayment === 'true' && !success) set_success(true)
  }, [queryParams])

  return (
    <>
      <div className='relative bg-theme-100 h-full min-h-screen'>
        {!!child && !loading && <DefaultTheme child={child} />}

        <AnimatedModal isOpen={!!child && !loading && (success || payment)} onClose={() => {}}>
          <div className='flex flex-col items-center justify-center gap-8'>
            {payment && child?.qrCode64 && !child?.qrCodeUrl ? (
              <PixPayment payment={child} onCheckPayment={handleCheckPayment} />
            ) : success ? (
              <SuccessModal child={child} onClose={() => set_success(false)} />
            ) : (
              <></>
            )}
          </div>
        </AnimatedModal>
      </div>

      <Loading loading={loading} />
    </>
  )
}
