'use client'
import React, { useEffect, useRef, useState } from 'react'

import { motion, useScroll, useTransform } from 'framer-motion'

interface TimelineEntryProps {
  title: {
    day: string
    month: string
    year: string
  }
  content: React.ReactNode
}

export const Timeline = ({ data }: { data: TimelineEntryProps[] }) => {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setHeight(rect.height)
    }
  }, [data, ref])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 50%'],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div className='w-full font-sans px-0' ref={containerRef}>
      <div ref={ref} className='relative max-w-7xl mx-auto pb-20'>
        {data.map((item, index) => (
          <div key={index} className={`flex flex-col justify-start ${index !== 0 ? 'pt-20' : 'pt-12 lg:pt-20'}`}>
            <div className='sticky z-40 top-40 self-start w-[95%] lg:max-w-sm md:w-full'>
              <div className='h-8 absolute left-4 md:left-4 w-8 rounded-full bg-theme-300 flex items-center justify-center'>
                <div className='h-2 w-2 rounded-full bg-theme-600 border border-theme-300 p-2' />
              </div>

              <h3 className='tracking-tight leading-none pl-20 md:pl-20 mt-2 lg:mt-1 text-lg md:text-xl font-bold text-theme-700'>
                {item.title.day}/{item.title.month}/{item.title.year}
              </h3>
            </div>

            <div className='relative pl-20 pr-4 w-full'>{item.content}</div>
          </div>
        ))}
        <div
          style={{
            height: height + 'px',
          }}
          className='absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] '
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className='absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-theme-900 via-theme-600 to-transparent rounded-full'
          />
        </div>
      </div>
    </div>
  )
}
