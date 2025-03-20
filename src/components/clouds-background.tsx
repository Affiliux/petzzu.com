'use client'

import React from 'react'

import { motion } from 'framer-motion'

export function CloudsBackground() {
  const clouds = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    left: `${Math.random() * 80}%`,
    delay: Math.random() * 10,
    duration: Math.random() * 20 + 30,
  }))

  return (
    <div className='fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0'>
      {clouds.map(cloud => (
        <motion.div
          key={cloud.id}
          className='absolute'
          style={{
            left: cloud.left,
            width: cloud.size,
            height: cloud.size * 0.6,
          }}
          initial={{
            y: '100vh',
            opacity: 0.5,
          }}
          animate={{
            y: '-100vh',
            opacity: 1,
          }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            repeatType: 'loop',
            delay: cloud.delay,
            ease: 'linear',
          }}
        >
          <div className='relative'>
            <div className='bg-white w-64 h-32 rounded-full shadow-lg relative z-10'></div>

            <div className='bg-white w-24 h-24 rounded-full absolute top-[-20px] left-[15px] z-20'></div>
            <div className='bg-white w-28 h-28 rounded-full absolute top-[-30px] left-[80px] z-20'></div>
            <div className='bg-white w-20 h-20 rounded-full absolute top-[-15px] left-[150px] z-20'></div>
            <div className='bg-white w-16 h-16 rounded-full absolute top-[10px] left-[190px] z-20'></div>
            <div className='bg-white w-20 h-20 rounded-full absolute top-[15px] left-[-15px] z-20'></div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
