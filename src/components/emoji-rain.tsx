'use client'

import React from 'react'

import { motion } from 'framer-motion'

const getRandomPosition = () => Math.random() * 100 + 'vw'
const getRandomDuration = () => Math.random() * 2 + 5

export const EmojiRain = ({ emojis, quantity = 30 }: { emojis: string[]; quantity?: number }) => {
  const emojisArray = Array.from({ length: quantity }) // Menor número de emojis

  return (
    <div className='absolute w-full h-full inset-0 overflow-hidden pointer-events-none'>
      {emojisArray.map((_, index) => (
        <motion.div
          key={index}
          initial={{ y: -100, opacity: 0 }}
          animate={{
            y: window.innerHeight + 100,
            opacity: 1,
            transition: {
              duration: getRandomDuration(),
              ease: 'linear',
              repeat: Infinity,
              repeatType: 'loop',
              delay: Math.random() * 5,
            },
          }}
          exit={{ opacity: 0 }}
          className='absolute text-4xl will-change-transform'
          style={{
            left: getRandomPosition(),
            fontSize: Math.random() * 20 + 30 + 'px',
          }}
        >
          {emojis[Math.floor(Math.random() * emojis.length)]}
        </motion.div>
      ))}
    </div>
  )
}
