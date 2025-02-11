'use client'

import React, { useEffect, useRef, useState } from 'react'

interface LazyLoadVideoProps {
  src: string
  type: string
  classNames: string
}

export const LazyLoadVideo: React.FC<LazyLoadVideoProps> = ({ src, type, classNames }) => {
  const videoRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // Para de observar depois que o vídeo é carregado
        }
      },
      { threshold: 0.1 }, // O vídeo entra na viewport quando 10% dele está visível
    )

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current)
      }
    }
  }, [])

  return (
    <div ref={videoRef}>
      {isVisible && <video preload='metadata' autoPlay loop muted playsInline src={src} className={classNames} />}
    </div>
  )
}
