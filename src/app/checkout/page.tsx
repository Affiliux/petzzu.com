'use client'

import React, { useEffect, useState } from 'react'

import { Check, CreditCard, Loader2, Lock, QrCode, ShoppingCart, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { IconBrandPaypal, IconBrandStripe } from '@tabler/icons-react'

import type { OrderBumpProps, PaymentFormProps } from '@/typings/application'
import type { CreateFromPrePayloadProps, CreatePrePayloadProps, UpdatePaymentPayloadProps } from '@/typings/create'
import { useApplication } from '@/contexts/ApplicationContext'
import { useCreate } from '@/contexts/CreateContext'

import { toast } from '@/hooks/use-toast'

import { CardForm } from '@/components/card-form'
import { PayPalForm } from '@/components/paypal-form'
import { PixForm } from '@/components/pix-form'
import { StripeForm } from '@/components/stripe-form'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'

import { PaymentMethodsEnum } from '@/enums'

export const runtime = 'edge'

export default function Page() {
  // hooks
  const t = useTranslations()
  const router = useRouter()

  // contexts
  const { discount, plans, currency, order_bumps } = useApplication()
  const {
    pre,
    payment,
    onCreateFromPre,
    onCheckPayment,
    onUpdatePayment,
    plan,
    set_payment,
    set_plan,
    set_pre_medias,
    set_pre,
    set_child,
  } = useCreate()

  // states
  const [loading, set_loading] = useState<boolean>(false)
  const [is_card_stone, set_is_card_stone] = useState<boolean>(false)
  const [paymentMethod, setPaymentMethod] = useState('pix')
  const [selected_bumps, set_selected_bumps] = useState<OrderBumpProps[]>([])

  // variables
  const FORMAT_INTL_LOCALE = t('config.defaults.country')
  const BUMPS_PRICE = selected_bumps.reduce((acc, bump) => acc + Number(bump.price), 0)
  const SHOW_PIX = currency === 'brl'
  const SHOW_STONE_CARD = currency === 'brl'
  const SHOW_PAYPAL = currency !== 'brl'
  const SHOW_STRIPE = currency !== 'brl'

  async function handleAccordionValueChange(value: string) {
    setPaymentMethod(value)
  }

  async function handleClear() {
    set_pre_medias([])
    set_pre(null)
    set_payment(null)

    set_child({} as CreatePrePayloadProps)
    set_plan(undefined)

    const find = plans.find(plan => plan.sku.includes(`plan_pro_${currency}`))
    set_plan(find)
  }

  async function handleCreate(payment_info: PaymentFormProps) {
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
      const bumps = selected_bumps.map(bump => bump.id)

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
        orderBumps: bumps,
      }

      await onCreateFromPre(body)

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

  async function handleUpdate(payment_info: PaymentFormProps) {
    set_loading(true)

    try {
      if (!payment.id) throw new Error('ID not found')

      const body: UpdatePaymentPayloadProps = {
        gateway: payment_info.method,
        email: payment_info.email,
        name: payment_info.name,
        ddd: payment_info.phone.slice(0, 2),
        phoneNumber: payment_info.phone.slice(2),
        cpf: payment_info.document,
        cardToken: payment_info.cardToken,
      }

      await onUpdatePayment(body, payment.id)
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

  async function handleCheckPayment() {
    try {
      if (!payment) throw new Error('Payment not found')

      if (!payment.qrCode64) await new Promise(resolve => setTimeout(resolve, 5000))

      const response = await onCheckPayment(payment.id)

      if (response && response.isActive) {
        router.push(`/${response.slug}?afterPayment=true`)
        setTimeout(() => handleClear(), 3000)
      }
    } catch (error: any) {
      console.error(error)
    }
  }

  async function handleCheckPaymentCard() {
    try {
      if (!payment) throw new Error('Payment not found')

      await new Promise(resolve => setTimeout(resolve, 5000))

      const response = await onCheckPayment(payment.id)

      if (response && response.isActive) {
        router.push(`/${response.slug}?afterPayment=true`)

        set_is_card_stone(false)
        handleClear()
      } else {
        handleCheckPaymentCard()
      }
    } catch (error: any) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (payment && payment.urlPayment && !payment.qrCode64) {
      if (payment.urlPayment.includes('https')) window.location.href = payment.urlPayment
      else if (is_card_stone) handleCheckPaymentCard()
    }
  }, [payment])

  // useEffect(() => {
  //   if (!pre || !plan || !currency) router.push('/')
  // }, [pre, plan, currency])

  return (
    <>
      {pre && plan && currency && (
        <>
          {/* Product Information */}
          <div className='space-y-6'>
            <Card className='border-neutral-200/60'>
              <CardHeader>
                <CardTitle>{t('checkout.order.title')}</CardTitle>
                <CardDescription>{t('checkout.order.description')}</CardDescription>
              </CardHeader>

              <CardContent className='space-y-4'>
                {!!plan?.id && (
                  <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between lg:space-x-2'>
                    <div className='flex items-start lg:items-center space-x-4'>
                      <div className='w-14'>
                        <div className='h-14 w-14 rounded-md bg-theme-100 flex items-center justify-center'>
                          <ShoppingCart className='h-6 w-6 text-theme-800' />
                        </div>
                      </div>
                      <div className='w-auto'>
                        <p className='font-medium text-neutral-900 text-base'>
                          {t(`checkout.order.plans.${plan?.sku.split('_')[1]}.title`)}
                        </p>
                        <p className='text-sm text-muted-foreground'>
                          {t(`checkout.order.plans.${plan?.sku.split('_')[1]}.description`)}
                        </p>

                        <div className='lg:hidden block font-medium text-neutral-900 mt-4'>
                          {Intl.NumberFormat(FORMAT_INTL_LOCALE, {
                            style: 'currency',
                            currency: plan?.currency,
                          }).format(
                            discount
                              ? plan?.price -
                                  (plan?.sku.includes('basic') ? discount?.discount_basic : discount?.discount_pro)
                              : plan?.price,
                          )}
                        </div>
                      </div>
                    </div>

                    <div className='hidden lg:block font-medium text-neutral-900'>
                      {Intl.NumberFormat(FORMAT_INTL_LOCALE, {
                        style: 'currency',
                        currency: plan?.currency,
                      }).format(
                        discount
                          ? plan?.price -
                              (plan?.sku.includes('basic') ? discount?.discount_basic : discount?.discount_pro)
                          : plan?.price,
                      )}
                    </div>
                  </div>
                )}

                {selected_bumps.map(selected => (
                  <div
                    key={selected.id}
                    className='flex flex-col lg:flex-row lg:items-center lg:justify-between lg:space-x-2 pt-4 border-t border-neutral-200/60'
                  >
                    <div className='flex items-start lg:items-center space-x-4'>
                      <div className='w-14'>
                        <div className='h-14 w-14 rounded-md bg-theme-100 flex items-center justify-center'>
                          <Check className='h-6 w-6 text-theme-800' />
                        </div>
                      </div>
                      <div className='w-auto'>
                        <p className='font-medium text-neutral-900 text-base'>{selected?.title}</p>
                        <p className='text-sm text-muted-foreground max-w-sm'>{selected?.description}</p>

                        <div className='lg:hidden block font-medium text-neutral-900 mt-4'>
                          {Intl.NumberFormat(FORMAT_INTL_LOCALE, {
                            style: 'currency',
                            currency: plan.currency,
                          }).format(Number(selected.price))}
                        </div>
                      </div>
                    </div>

                    <div className='hidden lg:block font-medium text-neutral-900'>
                      {Intl.NumberFormat(FORMAT_INTL_LOCALE, {
                        style: 'currency',
                        currency: plan.currency,
                      }).format(Number(selected.price))}
                    </div>
                  </div>
                ))}
              </CardContent>

              <CardFooter className='flex justify-between border-t border-neutral-200/60 pt-6'>
                <div className='font-semibold text-lg text-neutral-900'>{t(`checkout.order.total`)}</div>
                {!!plan?.id && (
                  <div className='font-bold text-lg text-neutral-900'>
                    {Intl.NumberFormat(FORMAT_INTL_LOCALE, {
                      style: 'currency',
                      currency: plan.currency,
                    }).format(
                      discount
                        ? plan.price +
                            BUMPS_PRICE -
                            (plan.sku.includes('basic') ? discount.discount_basic : discount.discount_pro)
                        : plan.price + BUMPS_PRICE,
                    )}
                  </div>
                )}
              </CardFooter>
            </Card>

            {/* Enhanced Order Bump */}
            {SHOW_PIX && (
              <div className='space-y-4'>
                {order_bumps.map(bump => {
                  const selected = selected_bumps.find(selected => selected.id === bump.id)

                  const onChange = () => {
                    if (selected) {
                      const newSelected = selected_bumps.filter(selected => selected.id !== bump.id)
                      set_selected_bumps(newSelected)
                    } else {
                      set_selected_bumps([...selected_bumps, bump])
                    }
                  }

                  return (
                    <Card key={bump.id} className='border-neutral-200/60 overflow-hidden bg-card'>
                      <div className='flex space-y-2 lg:space-y-0 lg:flex-row items-center justify-between bg-primary/10 p-3 border-b border-neutral-200/60'>
                        <div className='flex items-center gap-2'>
                          <div className='h-6 w-6 rounded-full bg-theme-700 flex items-center justify-center'>
                            <Sparkles className='h-3 w-3 text-theme-200' />
                          </div>
                          <span className='font-medium lg:text-base text-white'>
                            {t('checkout.order.order-bumps.title')}
                          </span>
                        </div>

                        <div className='hidden lg:flex items-center gap-2'>
                          <span className='text-sm line-through text-muted-foreground'>
                            {Intl.NumberFormat(FORMAT_INTL_LOCALE, {
                              style: 'currency',
                              currency: plan.currency,
                            }).format(Number(bump.price * 2))}
                          </span>
                          <span className='font-bold text-primary'>
                            {Intl.NumberFormat(FORMAT_INTL_LOCALE, {
                              style: 'currency',
                              currency: plan.currency,
                            }).format(Number(bump.price))}
                          </span>
                          <span className='text-xs px-2 py-0.5 bg-green-500/10 text-green-200 rounded-full'>
                            {t('checkout.order.order-bumps.save')}
                          </span>
                        </div>
                      </div>
                      <CardContent className='pt-6'>
                        <div className='flex items-center lg:gap-8'>
                          <div className='flex items-start lg:items-center gap-4'>
                            <div className='w-20'>
                              <div className='h-20 w-20 rounded-md bg-muted overflow-hidden'>
                                <img src={bump?.imageUrl} alt={bump?.imageKey} className='object-cover h-20 w-20' />
                              </div>
                            </div>
                            <div className='space-y-1 w-auto'>
                              <p className='font-medium text-md lg:text-lg cursor-pointer text-neutral-900'>
                                {bump?.title}
                              </p>
                              <p className='text-xs lg:text-sm text-muted-foreground'>{bump?.description}</p>
                            </div>
                          </div>

                          <div className='hidden lg:flex flex-shrink-0'>
                            <Checkbox
                              id='order-bump'
                              checked={!!selected}
                              onCheckedChange={onChange}
                              className='h-6 w-6'
                            />
                          </div>
                        </div>
                      </CardContent>

                      <div className='lg:hidden flex space-y-2 lg:space-y-0 lg:flex-row items-center justify-between bg-primary/5 p-3 border-t border-neutral-200/60'>
                        <div className='lg:hidden flex items-center gap-2 mt-1'>
                          <span className='text-sm line-through text-muted-foreground'>
                            {Intl.NumberFormat(FORMAT_INTL_LOCALE, {
                              style: 'currency',
                              currency: plan.currency,
                            }).format(Number(bump.price * 2))}
                          </span>
                          <span className='font-bold text-primary'>
                            {Intl.NumberFormat(FORMAT_INTL_LOCALE, {
                              style: 'currency',
                              currency: plan.currency,
                            }).format(Number(bump.price))}
                          </span>
                          <span className='text-xs px-2 py-0.5 bg-green-500/10 text-green-200 rounded-full'>
                            {t('checkout.order.order-bumps.save')}
                          </span>
                        </div>

                        <div className='lg:hidden'>
                          <Checkbox
                            id='order-bump'
                            checked={!!selected}
                            onCheckedChange={onChange}
                            className='h-6 w-6 -mt-2'
                          />
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>

          {/* Payment Section */}
          <div>
            <Card className='border-neutral-200/60'>
              <CardHeader>
                <CardTitle className='text-neutral-900'>{t('checkout.payment.title')}</CardTitle>
                <CardDescription className='text-muted-foreground'>{t('checkout.payment.description')}</CardDescription>
              </CardHeader>

              <CardContent className='space-y-6'>
                <Accordion
                  type='single'
                  collapsible
                  value={paymentMethod}
                  onValueChange={handleAccordionValueChange}
                  className='w-full'
                >
                  {SHOW_PIX && (
                    <AccordionItem value='pix' className='border rounded-md px-0 mb-3 border-neutral-200/60'>
                      <AccordionTrigger className='px-4 py-3 hover:no-underline'>
                        <div className='flex items-center gap-3'>
                          <QrCode className='h-5 w-5' />
                          <div className='font-medium'>{t('checkout.payment.methods.pix.title')}</div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className='px-4 pb-4'>
                        <div className='flex flex-col items-center justify-center space-y-4 py-4'>
                          <PixForm
                            onCreate={payment?.id ? handleUpdate : handleCreate}
                            payment={payment}
                            onCheckPayment={handleCheckPayment}
                          />

                          {!payment?.id && (
                            <div className='flex items-center justify-center text-sm text-muted-foreground'>
                              <Lock className='h-4 w-4 mr-2' />
                              {t('checkout.payment.secure')}
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  {SHOW_STONE_CARD && (
                    <AccordionItem value='credit-card' className='border rounded-md px-0 mb-3 border-neutral-200/60'>
                      <AccordionTrigger className='px-4 py-3 hover:no-underline'>
                        <div className='flex items-center gap-3'>
                          <CreditCard className='h-5 w-5' />
                          <div className='font-medium'>{t('checkout.payment.methods.card.title')}</div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className='px-4 pb-4 pt-2'>
                        <div className='space-y-4'>
                          <CardForm onCreate={payment?.id ? handleUpdate : handleCreate} />

                          <div className='flex items-center justify-center text-sm text-muted-foreground'>
                            <Lock className='h-4 w-4 mr-2' />
                            {t('checkout.payment.secure')}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  {SHOW_PAYPAL && (
                    <AccordionItem value='paypal' className='border rounded-md px-0 mb-3 border-neutral-200/60'>
                      <AccordionTrigger className='px-4 py-3 hover:no-underline'>
                        <div className='flex items-center gap-3'>
                          <IconBrandPaypal className='h-5 w-5' />
                          <div className='font-medium'>{t('checkout.payment.methods.paypal.title')}</div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className='px-4 pb-4'>
                        <div className='flex flex-col items-center justify-center space-y-4 py-4'>
                          <PayPalForm onCreate={payment?.id ? handleUpdate : handleCreate} />
                          <p className='text-center text-sm text-muted-foreground'>
                            {t('checkout.payment.methods.paypal.description')}
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  {SHOW_STRIPE && (
                    <AccordionItem value='stripe' className='border rounded-md px-0 border-neutral-200/60'>
                      <AccordionTrigger className='px-4 py-3 hover:no-underline'>
                        <div className='flex items-center gap-3'>
                          <IconBrandStripe className='h-5 w-5' />
                          <div className='font-medium'>{t('checkout.payment.methods.stripe.title')}</div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className='px-4 pb-4'>
                        <div className='flex flex-col items-center justify-center space-y-4 py-4'>
                          <StripeForm onCreate={payment?.id ? handleUpdate : handleCreate} />
                          <p className='text-center text-sm text-muted-foreground'>
                            {t('checkout.payment.methods.stripe.description')}
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </Accordion>
              </CardContent>

              <div className='flex flex-col items-center justify-center px-4'>
                <p className='text-center text-sm text-muted-foreground pb-8 max-w-sm'>
                  {t('checkout.footer.accept')}{' '}
                  <Link href='terms' className='underline'>
                    {t('checkout.footer.terms-of-use')}
                  </Link>{' '}
                  {t('checkout.footer.and')}{' '}
                  <Link href='privacy' className='underline'>
                    {t('checkout.footer.privacy-policy')}
                  </Link>
                </p>
              </div>
            </Card>
          </div>
        </>
      )}

      {loading && (
        <div className='h-screen w-full fixed top-0 left-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center z-[9999]'>
          <Loader2 size={56} className='animate-spin' />
        </div>
      )}
    </>
  )
}
