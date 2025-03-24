'use client'

import { useEffect, useRef } from 'react'

// Highly optimized cloud animation using CSS only
export const CloudBackground = ({ quantity }: { quantity: number }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    let cloudCount = 0

    // Function to create SVG cloud element using DOM API
    const createSvgCloud = (size: 'small' | 'medium' | 'large') => {
      // SVG namespace is required for createElementNS
      const svgNS = 'http://www.w3.org/2000/svg'

      // Create SVG element
      const svg = document.createElementNS(svgNS, 'svg')
      svg.setAttribute('fill', 'none')
      svg.setAttribute('class', 'opacity-80')

      // Create path element
      const path = document.createElementNS(svgNS, 'path')
      path.setAttribute('fill', 'white')
      path.setAttribute('stroke', '#E6E6E6')

      // Set attributes based on cloud size
      if (size === 'small') {
        svg.setAttribute('width', '100')
        svg.setAttribute('height', '60')
        svg.setAttribute('viewBox', '0 0 100 60')
        path.setAttribute(
          'd',
          'M85 35C85 42.1797 79.1797 48 72 48H28C20.8203 48 15 42.1797 15 35C15 27.8203 20.8203 22 28 22C31.3717 15.6935 37.4343 11 44.5 11C53.25 11 60.3965 17.15 60.975 25H72C79.1797 25 85 30.8203 85 38V35Z',
        )
      } else if (size === 'medium') {
        svg.setAttribute('width', '150')
        svg.setAttribute('height', '80')
        svg.setAttribute('viewBox', '0 0 150 80')
        path.setAttribute(
          'd',
          'M135 50C135 61.0457 126.046 70 115 70H40C28.9543 70 20 61.0457 20 50C20 38.9543 28.9543 30 40 30C45.3947 19.9097 55.0949 12.5 66.5 12.5C80.5 12.5 92.0344 23 92.96 36.5H115C126.046 36.5 135 45.4543 135 56.5V50Z',
        )
      } else {
        svg.setAttribute('width', '220')
        svg.setAttribute('height', '120')
        svg.setAttribute('viewBox', '0 0 220 120')
        path.setAttribute(
          'd',
          'M200 70C200 86.5685 186.569 100 170 100H60C43.4315 100 30 86.5685 30 70C30 53.4315 43.4315 40 60 40C68.0921 25.8645 82.6423 16 100 16C121 16 138.152 31.76 139.54 52H170C186.569 52 200 65.4315 200 82V70Z',
        )
      }

      // Append path to SVG
      svg.appendChild(path)
      return svg
    }

    // Function to create a cloud element
    const createCloudElement = () => {
      const sizes: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large']
      const size = sizes[Math.floor(Math.random() * sizes.length)]

      // Create cloud container
      const cloudDiv = document.createElement('div')
      cloudDiv.className = 'absolute cloud'

      // Set random vertical position
      const top = Math.random() * 80 + 5
      cloudDiv.style.top = `${top}%`

      // Set animation duration based on size
      let duration
      if (size === 'small') {
        duration = 30 + Math.random() * 10 // 30-40s
      } else if (size === 'medium') {
        duration = 40 + Math.random() * 15 // 40-55s
      } else {
        duration = 50 + Math.random() * 20 // 50-70s
      }

      // Set animation duration
      cloudDiv.style.animationDuration = `${duration}s`

      // Create and append the SVG cloud
      const cloudSvg = createSvgCloud(size)
      cloudDiv.appendChild(cloudSvg)

      // Add to container
      container.appendChild(cloudDiv)

      // Remove cloud after animation completes
      setTimeout(() => {
        if (container.contains(cloudDiv)) {
          container.removeChild(cloudDiv)
          cloudCount--
        }
      }, duration * 1000)

      cloudCount++
    }

    // Initial clouds
    for (let i = 0; i < 15; i++) {
      const cloudDiv = document.createElement('div')
      cloudDiv.className = 'absolute cloud'

      const sizes: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large']
      const size = sizes[Math.floor(Math.random() * sizes.length)]

      // Random position across the screen
      const top = Math.random() * 80 + 5
      const left = Math.random() * 120 - 20
      cloudDiv.style.top = `${top}%`
      cloudDiv.style.left = `${left}%`

      // Set animation duration
      let duration
      if (size === 'small') {
        duration = 30 + Math.random() * 10
      } else if (size === 'medium') {
        duration = 40 + Math.random() * 15
      } else {
        duration = 50 + Math.random() * 20
      }

      // Create and append the SVG cloud
      const cloudSvg = createSvgCloud(size)
      cloudDiv.appendChild(cloudSvg)

      // Set animation progress
      const progress = Math.random()
      cloudDiv.style.animationDuration = `${duration}s`
      cloudDiv.style.animationDelay = `-${progress * duration}s`

      container.appendChild(cloudDiv)
      cloudCount++

      // Remove cloud after animation completes
      setTimeout(
        () => {
          if (container.contains(cloudDiv)) {
            container.removeChild(cloudDiv)
            cloudCount--
          }
        },
        (1 - progress) * duration * 1000,
      )
    }

    // Add new cloud every second
    const interval = setInterval(() => {
      // Limit maximum clouds to prevent performance issues
      if (cloudCount < quantity) {
        createCloudElement()
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div ref={containerRef} className='overflow-hidden pointer-events-none opacity-60'>
      <style jsx global>{`
        .cloud {
          animation: moveCloud linear;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          left: -20%;
        }

        @keyframes moveCloud {
          from {
            left: -20%;
          }
          to {
            left: 120%;
          }
        }
      `}</style>
    </div>
  )
}
