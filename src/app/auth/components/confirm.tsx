'use client'

import React, { useEffect, useState } from 'react'

import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAccount } from '@/contexts/AccountContext'

import { toast } from '@/hooks/use-toast'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'

export function ConfirmForm({ email }: { email: string | null }) {
  // hooks
  const t = useTranslations('pages.auth.confirm')
  const router = useRouter()

  const verification_code_validation = z.object({
    code: z.string().length(5, { message: t('form.code.validation.invalid') }),
  })

  const form = useForm<z.infer<typeof verification_code_validation>>({
    resolver: zodResolver(verification_code_validation),
    mode: 'onChange',
    defaultValues: {
      code: '',
    },
  })

  // contexts
  const { onRequestEmail, onConfirmEmail } = useAccount()

  // states
  const [loading, setLoading] = useState<boolean>(false)
  const [timer, setTimer] = useState<number>(60)

  async function handleResendCode() {
    setLoading(true)

    try {
      if (!email) return

      await onRequestEmail({ email: email })
      setTimer(60)
    } catch (error: any) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(values: z.infer<typeof verification_code_validation>) {
    setLoading(true)

    try {
      if (!email) return

      await onConfirmEmail({ email: email, code: values.code })

      router.push(`/account/pages`)
    } catch (error: any) {
      toast({
        title: t('toast.error.title'),
        description: t('toast.error.default'),
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (timer > 0) setTimer(timer - 1)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [timer])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='code'
            render={({ field }) => (
              <FormItem>
                <div className='w-full flex items-center justify-between'>
                  <FormLabel>{t('form.code.label')}</FormLabel>

                  <Button type='button' size='sm' disabled={timer > 0} variant='link' onClick={handleResendCode}>
                    {timer > 0 ? `${timer}s` : t('form.resend')}
                  </Button>
                </div>
                <FormControl>
                  <InputOTP containerClassName='items-center justify-center w-full' maxLength={6} {...field}>
                    <InputOTPGroup className='w-full'>
                      <InputOTPSlot className='w-1/5 h-12 lg:h-16 text-xl' index={0} />
                      <InputOTPSlot className='w-1/5 h-12 lg:h-16 text-xl' index={1} />
                      <InputOTPSlot className='w-1/5 h-12 lg:h-16 text-xl' index={2} />
                      <InputOTPSlot className='w-1/5 h-12 lg:h-16 text-xl' index={3} />
                      <InputOTPSlot className='w-1/5 h-12 lg:h-16 text-xl' index={4} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>

                <FormMessage>{form.getFieldState('code').error?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>

        <Button
          className='w-full bg-theme-900 hover:bg-theme-700'
          type='submit'
          disabled={loading || !form.formState.isValid}
        >
          {loading && <Loader2 className='h-4 w-4 animate-spin text-theme-900' />}
          {t('form.submit')}
        </Button>
      </form>
    </Form>
  )
}
