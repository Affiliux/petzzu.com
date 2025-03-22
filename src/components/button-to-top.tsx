'use client'

import React, { useEffect, useState } from 'react'

import { ArrowUp } from 'lucide-react'

export const ButtonToTop = () => {
  // states
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)

    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={
        scrollY > 300
          ? 'fixed bottom-4 right-4 z-[49] bg-theme-800 rounded-full p-2 cursor-pointer text-theme-100'
          : 'hidden'
      }
    >
      <ArrowUp />
    </div>
  )
}
