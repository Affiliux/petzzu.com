import React from 'react'

import { Metadata, Viewport } from 'next'

import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { GoogleTagManager } from '@next/third-parties/google'

import { Providers } from '@/contexts'

import { CloudflareAnalytics } from '@/components/cloud-flare'
import { Toaster } from '@/components/ui/toaster'

import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: 'light',
  themeColor: 'white',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://babyzzu.com'),
  title: 'Babyzzu  ©',
  description: 'A Babyzzu é uma plataforma que permite criar páginas personalizadas para pessoas especiais.',
  openGraph: {
    type: 'website',
    url: 'https://www.babyzzu.com',
    title: 'Babyzzu - Sua nova forma de eternizar lembranças',
    description:
      'A Babyzzu é uma plataforma que permite criar páginas personalizadas para pessoas especiais. Você pode adicionar fotos, uma mensagem e criar uma linha do tempo com todas as suas lembranças.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Babyzzu - Sua nova forma de eternizar lembranças',
    description:
      'A Babyzzu é uma plataforma que permite criar páginas personalizadas para pessoas especiais. Você pode adicionar fotos, uma mensagem e criar uma linha do tempo com todas as suas lembranças.',
  },
  authors: { name: 'Affiliux' },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  const GTM_ID = process.env.NEXT_PUBLIC_TAG_MANAGER_ID
  const CLOUD_FLARE_ANALYTICS_ID = process.env.NEXT_PUBLIC_CLOUD_FLARE_ANALYTICS_ID

  return (
    <html lang={locale} className='light scroll-smooth'>
      {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
      {CLOUD_FLARE_ANALYTICS_ID && <CloudflareAnalytics token={CLOUD_FLARE_ANALYTICS_ID} />}

      <NextIntlClientProvider messages={messages}>
        <Providers>
          <body className={`antialiased overflow-x-hidden bg-white min-h-screen h-full`} suppressHydrationWarning>
            {children}

            <Toaster />
          </body>
        </Providers>
      </NextIntlClientProvider>
    </html>
  )
}
