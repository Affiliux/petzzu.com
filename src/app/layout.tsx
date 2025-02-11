import React from 'react'

import { Metadata, Viewport } from 'next'

import Script from 'next/script'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { GoogleTagManager } from '@next/third-parties/google'

import { Providers } from '@/contexts'

import { Toaster } from '@/components/ui/toaster'

import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: 'dark',
  themeColor: 'black',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://babyzzu.com'),
  title: 'Babyzzu  ©',
  description: 'A Babyzzu é uma plataforma que permite criar páginas personalizadas para pessoas especiais.',
  openGraph: {
    type: 'website',
    url: 'https://www.babyzzu.com',
    title: 'Babyzzu - Sua nova forma de amar',
    description:
      'Babyzzu é uma plataforma que permite criar páginas personalizadas de relacionamento para casais. Você pode adicionar fotos, uma mensagem e o tempo da união.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Babyzzu - Sua nova forma de amar',
    description:
      'Babyzzu é uma plataforma que permite criar páginas personalizadas de relacionamento para casais. Você pode adicionar fotos, uma mensagem e o tempo da união.',
  },
  authors: { name: 'DustInc' },
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

  return (
    <html lang={locale} className='dark scroll-smooth' data-color-scheme='dark' prefers-color-scheme='dark'>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_TAG_MANAGER_ID ?? ''} />

      <NextIntlClientProvider messages={messages}>
        <Providers>
          <body className={`antialiased overflow-x-hidden bg-black w-screen min-h-screen h-full`}>
            {children}

            <Toaster />
            <Script src='https://cdn.utmify.com.br/scripts/utms/latest.js' data-utmify-prevent-subids async defer />
          </body>
        </Providers>
      </NextIntlClientProvider>
    </html>
  )
}
