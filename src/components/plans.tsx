'use client'

import { Check } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export function Plans() {
  return (
    <div className='container mx-auto py-10'>
      <div className='text-center mb-10'>
        <h2 className='text-3xl font-bold tracking-tight'>Simple, Transparent Pricing</h2>
        <p className='text-muted-foreground mt-2'>Choose the plan that works best for you</p>
      </div>

      <div className='grid gap-6 md:grid-cols-3'>
        {/* One-time Acquisition Plan */}
        <Card className='flex flex-col'>
          <CardHeader>
            <CardTitle>Basic</CardTitle>
            <CardDescription>One-time purchase</CardDescription>
            <div className='mt-4'>
              <span className='text-3xl font-bold'>$99</span>
              <span className='text-muted-foreground ml-1'>one-time</span>
            </div>
          </CardHeader>
          <CardContent className='flex-grow'>
            <ul className='space-y-2'>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>Full access to basic features</span>
              </li>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>Lifetime updates</span>
              </li>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>Email support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className='w-full'>Buy Now</Button>
          </CardFooter>
        </Card>

        {/* Monthly Subscription Plan */}
        <Card className='flex flex-col border-primary'>
          <CardHeader>
            <CardTitle>Pro</CardTitle>
            <CardDescription>Monthly subscription</CardDescription>
            <div className='mt-4'>
              <span className='text-3xl font-bold'>$12</span>
              <span className='text-muted-foreground ml-1'>/month</span>
            </div>
          </CardHeader>
          <CardContent className='flex-grow'>
            <ul className='space-y-2'>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>All Basic features</span>
              </li>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>Advanced analytics</span>
              </li>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>Priority support</span>
              </li>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>Monthly exclusive content</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className='w-full' variant='default'>
              Subscribe Monthly
            </Button>
          </CardFooter>
        </Card>

        {/* Annual Subscription Plan */}
        <Card className='flex flex-col'>
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
            <CardDescription>Annual subscription</CardDescription>
            <div className='mt-4'>
              <span className='text-3xl font-bold'>$99</span>
              <span className='text-muted-foreground ml-1'>/year</span>
            </div>
            <span className='inline-block mt-1 text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full'>
              Save 30%
            </span>
          </CardHeader>
          <CardContent className='flex-grow'>
            <ul className='space-y-2'>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>All Pro features</span>
              </li>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>Unlimited access</span>
              </li>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>Dedicated account manager</span>
              </li>
              <li className='flex items-center'>
                <Check className='h-4 w-4 mr-2 text-primary' />
                <span>Custom integrations</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className='w-full' variant='outline'>
              Subscribe Yearly
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
