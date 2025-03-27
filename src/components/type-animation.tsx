'use client'

import { useCallback, useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

export default function TypingAnimation({ phrases, classNames }: { phrases: string[]; classNames?: string }) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  const typeText = useCallback(() => {
    const currentPhrase = phrases[currentIndex]

    if (isTyping && !isPaused) {
      if (displayText.length < currentPhrase.length) {
        setDisplayText(currentPhrase.substring(0, displayText.length + 1))
      } else {
        // Finished typing, pause before erasing
        setIsPaused(true)
        setTimeout(() => setIsPaused(false), 1500)
        setIsTyping(false)
      }
    } else if (!isTyping && !isPaused) {
      if (displayText.length > 0) {
        setDisplayText(displayText.substring(0, displayText.length - 1))
      } else {
        // Finished erasing, move to next phrase
        setIsTyping(true)
        setCurrentIndex((currentIndex + 1) % phrases.length)
      }
    }
  }, [currentIndex, displayText, isTyping, isPaused, phrases])

  useEffect(() => {
    const timer = setTimeout(typeText, isTyping ? 100 : 50)
    return () => clearTimeout(timer)
  }, [displayText, isTyping, isPaused, typeText])

  return (
    <div className={cn('font-medium', classNames)}>
      <span>{displayText}</span>
      <span className='animate-pulse'>|</span>
    </div>
  )
}
