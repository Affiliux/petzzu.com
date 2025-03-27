'use client'

import React, { useState } from 'react'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar, Edit2, ExternalLink, Info, PauseCircle, PlayCircle, Receipt, XIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import type { PageProps } from '@/typings/account'
import { useAccount } from '@/contexts/AccountContext'
import { useCreate } from '@/contexts/CreateContext'

import { PixPayment } from '@/components/pix'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function PageCard({ page }: { page: PageProps }) {
  // hooks
  const t = useTranslations('pages.account.pages.page-card')
  const router = useRouter()

  // contexts
  const { onCheckPayment } = useCreate()
  const { onUpdateStatus, set_selected } = useAccount()

  // states
  const [open, setOpen] = useState<boolean>(false)
  const [image, setImage] = useState<boolean>(false)

  async function handleCheckPayment() {
    try {
      await new Promise(resolve => setTimeout(resolve, 5000))

      const response = await onCheckPayment(page.id)

      if (response && response.isActive) router.push(`/${response.slug}?afterPayment=true`)
    } catch (error: any) {
      console.error(error)
    }
  }

  async function handleUpdateStatus() {
    try {
      await onUpdateStatus(page.id, !page.isActive)
    } catch (error: any) {
      console.error(error)
    }
  }

  return (
    <>
      <Card className='relative overflow-hidden w-full transition-all duration-300 hover:shadow-md shadow-neutral-200/50 border-neutral-200/60 bg-card'>
        <div className='relative h-48 overflow-hidden'>
          {!!page.media[0]?.url && (
            <Image
              src={page.media[0].url}
              alt={page.child_name}
              fill
              onError={() => setImage(true)}
              className='object-cover transition-transform duration-300 hover:scale-105'
            />
          )}

          {(image || !page.media[0]?.url) && (
            <Image
              src={'/images/placeholder.svg'}
              alt={page.child_name}
              fill
              className='object-cover transition-transform duration-300 hover:scale-105'
            />
          )}

          <div className='absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300' />
        </div>

        <CardContent className='pt-6'>
          <h2 className='text-xl font-semibold mb-1 text-foreground'>{page.child_name}</h2>
          <div className='flex items-center text-sm text-muted-foreground mb-6'>
            <Calendar className='w-4 h-4 mr-2' />
            <span>
              {t('created-at')} {format(new Date(page.createdAt), 'dd/MM/yyy', { locale: ptBR })}
            </span>
          </div>

          {(page.qrCode64 || page.urlPayment) && (
            <div className='mt-10 pb-14'>
              <Button
                variant='outline'
                size='lg'
                className='w-full flex items-center justify-center gap-2 group relative overflow-hidden'
                onClick={() => setOpen(true)}
              >
                <Receipt className='w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1' />
                <span>{t('actions.pay')}</span>
              </Button>

              <div className='flex items-center justify-center gap-2 bg-yellow-500 text-white w-full py-5 font-semibold text-sm text-center absolute bottom-0 left-0'>
                <Info className='w-4 h-4' />
                <span>{t('status.pending')}</span>
              </div>
            </div>
          )}

          {!!page.qrCodeUrl && (
            <div className='grid grid-cols-2 items-end gap-4'>
              <div className='border-2 border-neutral-800 rounded-lg flex items-center justify-center w-[130px] h-[130px]'>
                <Link href={page?.qrCodeUrl} target='_blank'>
                  <img
                    src={page.isActive ? page?.qrCodeUrl : '/images/qr-code.webp'}
                    className={
                      !page.isActive ? 'rounded-md w-[120px] h-[120px] blur-sm' : 'rounded-md w-[120px] h-[120px]'
                    }
                    width={120}
                    height={120}
                    alt='QR Code'
                  />
                </Link>
              </div>

              <div className='w-full space-y-2.5'>
                <Button asChild variant='outline' size='sm' className='w-full group relative overflow-hidden'>
                  <Link
                    href={`/account/pages/${page.id}`}
                    onClick={() => {
                      set_selected(page)
                    }}
                    className='flex items-center justify-end gap-2'
                  >
                    <Edit2 className='w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1' />
                    <span>{t('actions.edit')}</span>
                  </Link>
                </Button>

                <Button asChild variant='outline' size='sm' className='w-full group relative overflow-hidden'>
                  <Link href={`/${page.slug}`} target='_blank' className='flex items-center justify-end gap-2'>
                    <ExternalLink className='w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1' />
                    <span>{t('actions.view')}</span>
                  </Link>
                </Button>

                <Button
                  onClick={handleUpdateStatus}
                  variant='outline'
                  size='sm'
                  className='w-full group relative overflow-hidden'
                >
                  {page.isActive ? (
                    <>
                      <PauseCircle className='w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1' />
                      <span>{t('actions.disable')}</span>
                    </>
                  ) : (
                    <>
                      <PlayCircle className='w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1' />
                      <span>{t('actions.enable')}</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {open && (
        <div className='fixed top-0 h-full left-0 right-0 bottom-0 w-full overflow-hidden z-50'>
          <div className='fixed top-0 inset-0 z-[997] grid h-full lg:h-screen w-full min-h-screen lg:place-items-center bg-black bg-opacity-95 backdrop-blur-lg transition-opacity duration-300'>
            <div className='sticky top-10 m-4 py-8 px-4 lg:px-8 w-3/4 z-[999] lg:w-2/5 min-w-[90%] max-w-[90%] h-auto lg:max-h-[90vh] lg:min-w-[35%] lg:max-w-[35%] flex flex-col items-center justify-center rounded-lg shadow-sm'>
              {page.qrCode64 && <PixPayment payment={page} onCheckPayment={handleCheckPayment} />}
            </div>

            <button
              className='absolute top-4 right-4 rounded-full p-2 bg-background/60 hover:bg-background/80 transition-colors duration-300'
              onClick={() => setOpen(false)}
            >
              <XIcon className='w-6 h-6 text-white' />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
