'use client'

import React, { use, useEffect, useState } from 'react'

import { LoaderIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { useChild } from '@/contexts/ChildContext'

import { useQueryParams } from '@/hooks/use-query-params'

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
  const { child, onGetChildBySlug } = useChild()

  // states
  const [view, set_view] = useState<boolean>(false)
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

  useEffect(() => {
    if (child && child.inactiveReason === 'Awaiting payment') {
      if (child.urlPayment && child.urlPayment.includes('https')) {
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
    <div className='relative bg-theme-100 h-full min-h-screen'>
      {loading && (
        <div className='h-screen w-full flex flex-col items-center justify-center text-center py-8'>
          <LoaderIcon className='w-16 h-16 text-red-400 animate-spin' />
        </div>
      )}

      {child && !loading && <>{child.themeShowType === ThemeShowTypeEnum.YELLOW && <DefaultTheme child={child} />}</>}

      {child && (success || payment || (!view && child.themeShowType === ThemeShowTypeEnum.DEFAULT)) && (
        <div className='fixed top-0 h-full left-0 right-0 bottom-0 w-full overflow-hidden z-50'>
          <div className='fixed top-0 inset-0 z-[997] grid h-full lg:h-screen w-full min-h-screen lg:place-items-center bg-neutra-900/30 backdrop-blur-xl transition-opacity duration-300'>
            <div className='sticky top-10 m-4 py-8 px-4 lg:px-8 w-3/4 z-[999] lg:w-2/5 min-w-[90%] max-w-[90%] h-auto lg:max-h-[90vh] lg:min-w-[35%] lg:max-w-[35%] flex flex-col items-center justify-center rounded-lg shadow-sm'>
              {payment ? (
                <>
                  {child.qrCode64 && !child.qrCodeUrl && (
                    <PixPayment payment={child} onCheckPayment={handleGetBySlug} />
                  )}
                </>
              ) : success ? (
                <SuccessModal
                  child={child}
                  onClose={() => {
                    if (child.themeShowType === ThemeShowTypeEnum.DEFAULT) set_view(true)
                    set_success(false)
                  }}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
