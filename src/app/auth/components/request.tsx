'use client'

import React, { useState } from 'react'

import { Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAccount } from '@/contexts/AccountContext'

import { toast } from '@/hooks/use-toast'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export function RequestForm({ set_email }: { set_email: (email: string | null) => void }) {
  // hooks
  const t = useTranslations('pages.auth.request')

  const sign_in_validation = z.object({
    email: z.string().min(1, { message: 'form.email.validation.required' }).email('form.email.validation.invalid'),
  })

  const form = useForm<z.infer<typeof sign_in_validation>>({
    resolver: zodResolver(sign_in_validation),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  })

  // contexts
  const { onRequestEmail } = useAccount()

  // states
  const [loading, setLoading] = useState<boolean>(false)

  function handleError(message?: string): string {
    if (message) return t(`${message}`)
    else return ''
  }

  async function handleSubmit(values: z.infer<typeof sign_in_validation>) {
    setLoading(true)

    try {
      await onRequestEmail({ email: values.email })
      set_email(values.email)
    } catch (error: any) {
      toast({
        title: t('form.toast.title.error'),
        description: t(error.message),
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.email.label')}</FormLabel>
                <FormControl>
                  <Input type='email' placeholder={t('form.email.placeholder')} {...field} />
                </FormControl>

                <FormMessage>{handleError(form.getFieldState('email').error?.message)}</FormMessage>
              </FormItem>
            )}
          />
        </div>

        <Button
          className='w-full bg-theme-900 hover:bg-theme-700'
          type='submit'
          disabled={loading || !form.formState.isValid}
        >
          {loading && <Loader2 className='h-4 w-4 animate-spin' />}
          {t('form.submit')}
        </Button>
      </form>
    </Form>
  )
}
