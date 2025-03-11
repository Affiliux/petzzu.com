'use client'
import { CalendarHeart, Images, Link, Pipette, QrCode, Timer } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function Features() {
  const t = useTranslations('pages.home.features')
  const features = [
    {
      icon: <CalendarHeart className='h-6 w-6 text-primary' />,
      title: t('1.title'),
      description: t('1.description'),
    },
    {
      icon: <Timer className='h-6 w-6 text-primary' />,
      title: t('2.title'),
      description: t('2.description'),
    },
    {
      icon: <QrCode className='h-6 w-6 text-primary' />,
      title: t('3.title'),
      description: t('3.description'),
    },
    {
      icon: <Images className='h-6 w-6 text-primary' />,
      title: t('4.title'),
      description: t('4.description'),
    },
    {
      icon: <Link className='h-6 w-6 text-primary' />,
      title: t('5.title'),
      description: t('5.description'),
    },
    {
      icon: <Pipette className='h-6 w-6 text-primary' />,
      title: t('6.title'),
      description: t('6.description'),
    },
  ]
  return (
    <section className='w-full py-24 md:py-32'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='space-y-2'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>{t('title')}</h2>
            <p className='mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed'> {t('description')}</p>
          </div>
        </div>
        <div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3 pt-12 md:pt-16'>
          {features.map(feature => (
            <div
              key={feature.title}
              className='flex flex-col items-center gap-2 rounded-lg border p-6 transition-all hover:shadow-md'
            >
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary/10'>
                {feature.icon}
              </div>
              <h3 className='text-xl font-bold'>{feature.title}</h3>
              <p className='text-center text-muted-foreground'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
