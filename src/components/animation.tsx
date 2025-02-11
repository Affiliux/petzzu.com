'use client'

import React from 'react'

import dynamic from 'next/dynamic'

const DotLottieReact = dynamic(() => import('@lottiefiles/dotlottie-react').then(mod => mod.DotLottieReact), {
  ssr: false,
})

interface LottiePlayerProps {
  src: string
  className?: string
  style?: React.CSSProperties
  autoplay?: boolean
  loop?: boolean
  width?: number
  height?: number
}

export const Animation: React.FC<LottiePlayerProps> = ({ src, style, className, width, height, ...rest }) => {
  return (
    <DotLottieReact
      autoplay
      loop
      className={className}
      src={src}
      style={style}
      width={width}
      height={height}
      {...rest}
    />
  )
}
