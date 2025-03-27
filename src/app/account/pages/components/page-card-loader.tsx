'use client'

import React from 'react'

import ContentLoader, { type IContentLoaderProps } from 'react-content-loader'

export function PageCardLoader(props: IContentLoaderProps) {
  function isMobile() {
    return window.matchMedia('(max-width: 500px)').matches
  }

  function isTablet() {
    return window.matchMedia('(max-width: 900px)').matches
  }

  return (
    <ContentLoader
      speed={2}
      width={isMobile() || isTablet() ? window.innerWidth - 64 : 300}
      height={400}
      viewBox={`0 0 ${isMobile() || isTablet() ? window.innerWidth - 64 : 300} 400`}
      backgroundColor='#f5f5f5'
      foregroundColor='#efefef'
      {...props}
    >
      <rect
        x='0'
        y='0'
        rx='16'
        ry='16'
        width={`${isMobile() || isTablet() ? window.innerWidth - 64 : 300}`}
        height='400'
      />
    </ContentLoader>
  )
}
