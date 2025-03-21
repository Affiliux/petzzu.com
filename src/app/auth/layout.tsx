'use client'

import { Link } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { useApplication } from '@/contexts/ApplicationContext'

import { Card, CardContent } from '@/components/ui/card'

export default function Layout({ children }: { children: React.ReactNode }) {
  // hooks
  const t = useTranslations()

  // contexts
  const { theme } = useApplication()

  return (
    <div className='flex min-h-svh flex-col items-center justify-center bg-white p-6 md:p-10'>
      <div className='w-full max-w-sm md:max-w-3xl'>
        <div className='flex flex-col gap-6'>
          <Link href='/' className='md:hidden w-2/3'>
            <img src='/logo+name.png' alt='Image' />
          </Link>

          <Card className='overflow-hidden bg-white border-theme-300'>
            <CardContent className='grid p-0 md:grid-cols-2'>
              {children}

              <div className='relative hidden md:flex items-center justify-center bg-white/10 bg-grid-small-neutral-300/[0.5]'>
                <img
                  src={`/logos/${theme}/logo+name.png`}
                  alt='Image'
                  className='absolute object-contain inset-0 w-full h-full p-12'
                />
              </div>
            </CardContent>
          </Card>

          <div className='text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary'>
            {t('config.footer.copyright')}
          </div>
        </div>
      </div>
    </div>
  )
}
