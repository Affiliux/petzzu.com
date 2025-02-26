'use client'

import React, { useEffect, useState } from 'react'

import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { PaymentFormProps } from '@/typings/application'
import { CreateFromPrePayloadProps, CreatePrePayloadProps } from '@/typings/create'
import { useApplication } from '@/contexts/ApplicationContext'
import { useCreate } from '@/contexts/CreateContext'

import { toast } from '@/hooks/use-toast'

import { Payment } from '@/components/payment'
import { PixPayment } from '@/components/pix'

import { PaymentMethodsEnum } from '@/enums'

export default function Page() {
  const t = useTranslations()
  const router = useRouter()

  const { discount, plans, currency } = useApplication()
  const {
    pre,
    payment,
    handleCreateFromPre,
    handleCheckPayment,
    plan,
    set_payment,
    set_child,
    set_plan,
    set_pre_medias,
    set_pre,
    set_song,
  } = useCreate()

  const [loading, set_loading] = useState<boolean>(false)
  const [is_card_stone, set_is_card_stone] = useState<boolean>(false)

  async function onClear() {
    set_pre_medias([])
    set_pre(null)
    set_payment(null)

    set_child({} as CreatePrePayloadProps)

    set_plan(undefined)
    set_song(undefined)

    const find = plans.find(plan => plan.sku.includes(`plan_pro_${currency}`))
    set_plan(find)
  }

  async function onCreate(payment_info: PaymentFormProps) {
    set_loading(true)

    try {
      if (!pre) throw new Error('Pre ID not found')
      if (!plan) throw new Error('Please select a plan')

      const fbclid = localStorage.getItem('fbclid')
      const ttclid = localStorage.getItem('ttclid')
      const utm_source = localStorage.getItem('utm_source')
      const utm_campaign = localStorage.getItem('utm_campaign')
      const utm_medium = localStorage.getItem('utm_medium')
      const utm_content = localStorage.getItem('utm_content')
      const utm_term = localStorage.getItem('utm_term')
      const xcod = localStorage.getItem('xcod')
      const gclid = localStorage.getItem('gclid')

      const body: CreateFromPrePayloadProps = {
        idPreWebsite: pre,
        lang: t('config.defaults.country'),
        affiliateCode: '',
        affiliateCampaignCode: '',
        plan: plan.sku,
        gateway: payment_info.method,
        email: payment_info.email,
        name: payment_info.name,
        ddd: payment_info.phone.slice(0, 2),
        phoneNumber: payment_info.phone.slice(2),
        cpf: payment_info.document,
        cardToken: payment_info.cardToken,
        idDiscountCupom: discount && discount.id,
        fbclid: fbclid ?? null,
        ttclid: ttclid ?? null,
        utm_source: utm_source ?? null,
        utm_campaign: utm_campaign ?? null,
        utm_medium: utm_medium ?? null,
        utm_content: utm_content ?? null,
        utm_term: utm_term ?? null,
        xcod: xcod ?? null,
        gclid: gclid ?? null,
      }

      await handleCreateFromPre(body)

      if (body.gateway === PaymentMethodsEnum.STONE_CARD) set_is_card_stone(true)

      localStorage.removeItem('hasSavePre')
    } catch (error: any) {
      console.error(error)

      toast({
        title: t('checkout.payment.toast.error-create.title'),
        description: t('checkout.payment.toast.error-create.description'),
        variant: 'destructive',
      })
    } finally {
      set_loading(false)
    }
  }

  async function onCheckPayment() {
    try {
      if (!payment) throw new Error('Payment not found')

      if (!payment.qrCode64) await new Promise(resolve => setTimeout(resolve, 5000))

      const response = await handleCheckPayment(payment.id)

      if (response && response.isActive) {
        router.push(`/${response.slug}?afterPayment=true`)
        setTimeout(() => onClear(), 3000)
      }
    } catch (error: any) {
      console.error(error)
    }
  }

  async function onCheckPaymentCard() {
    try {
      if (!payment) throw new Error('Payment not found')

      await new Promise(resolve => setTimeout(resolve, 5000))

      const response = await handleCheckPayment(payment.id)

      if (response && response.isActive) {
        router.push(`/${response.slug}?afterPayment=true`)

        set_is_card_stone(false)
        onClear()
      } else {
        onCheckPaymentCard()
      }
    } catch (error: any) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (payment && payment.urlPayment && !payment.qrCode64) {
      if (payment.urlPayment.includes('https')) window.location.href = payment.urlPayment
      else if (is_card_stone) onCheckPaymentCard()
    }
  }, [payment])

  useEffect(() => {
    const hasSavePre = localStorage.getItem('hasSavePre')

    if (!pre && !!hasSavePre) router.push('/create')
    else if (!pre) router.push('/')
  }, [])

  return (
    <div className='w-screen h-[96vh]'>
      {!!payment ? (
        <div className='w-full flex justify-center items-center py-8 lg:py-16 container'>
          <div className='max-w-xl'>
            {payment.qrCode64 && payment.qrCodeCode && <PixPayment payment={payment} onCheckPayment={onCheckPayment} />}

            {payment.urlPayment && payment.urlPayment.includes('https') && !payment.qrCode64 && (
              <Loader2 size={48} className='text-white animate-spin' />
            )}

            {is_card_stone && (
              <div className='flex flex-col items-center justify-center'>
                <Loader2 size={48} className='text-white animate-spin' />
                <p className='text-white text-center mt-4'>{t('checkout.stone-card.loading')}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className='flex flex-col lg:flex-row justify-between gap-4 h-full'>
          <Payment onCreate={onCreate} />
        </div>
      )}

      {loading && (
        <div className='h-screen w-full absolute top-0 left-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999]'>
          <Loader2 size={56} className='animate-spin' />
        </div>
      )}
    </div>
  )
}
