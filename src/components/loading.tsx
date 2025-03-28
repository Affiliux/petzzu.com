'use client'

import React, { useEffect } from 'react'

import { Loader2 } from 'lucide-react'

export default function Loading({ loading }: { loading: boolean }) {
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [loading])

  return loading ? (
    <div className='fixed inset-0 h-full w-full flex items-center justify-center z-50'>
      <div className={`fixed inset-0 h-full w-full bg-white bg-opacity-80 z-50 backdrop-blur-lg`} />

      <Loader2 size={56} className='animate-spin relative z-50' />
    </div>
  ) : (
    <></>
  )
}
