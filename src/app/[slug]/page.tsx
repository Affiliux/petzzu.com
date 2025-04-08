'use client'

import React, { use, useEffect, useState } from 'react'

import { Loader2, LoaderIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { useApplication } from '@/contexts/ApplicationContext'
import { usePet } from '@/contexts/PetContext'

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
  const { pet, onGetPetBySlug } = usePet()

  // states
  const [payment, set_payment] = useState<boolean>(false)
  const [success, set_success] = useState<boolean>(false)
  const [loading, set_loading] = useState<boolean>(false)

  async function handleGetBySlug() {
    set_loading(true)

    try {
      await onGetPetBySlug(slug)
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
      await onGetPetBySlug(slug)
    } catch (error: any) {
      console.error(error)

      if (error.message === 'Website not found') {
        router.replace('/')
      }
    }
  }

  useEffect(() => {
    if (!!pet && pet?.themeShowType) onChangeTheme(pet?.themeShowType ?? ThemeShowTypeEnum.GRAY)

    if (!!pet && pet?.inactiveReason === 'Awaiting payment') {
      if (pet?.urlPayment && pet?.urlPayment.includes('https')) {
        router.replace(pet.urlPayment)
      } else if (pet.urlPayment && !pet.urlPayment.includes('https')) {
        set_payment(true)
      }
    }
  }, [pet])

  useEffect(() => {
    handleGetBySlug()
  }, [slug])

  useEffect(() => {
    if (queryParams && queryParams?.afterPayment === 'true' && !success) set_success(true)
  }, [queryParams])

  return (
    <>
      <div className='relative bg-theme-100 h-full min-h-screen'>
        {!!pet && !loading && <DefaultTheme pet={pet} />}

        <AnimatedModal isOpen={!!pet && !loading && (success || payment)} onClose={() => {}}>
          <div className='flex flex-col items-center justify-center gap-8'>
            {payment && pet?.qrCode64 && !pet?.qrCodeUrl ? (
              <PixPayment payment={pet} onCheckPayment={handleCheckPayment} />
            ) : success ? (
              <SuccessModal pet={pet} onClose={() => set_success(false)} />
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
