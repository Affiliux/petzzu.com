'use client'

import React, { createContext, ReactNode, useContext, useEffect, useRef } from 'react'

import { AnimatePresence, motion } from 'motion/react'

import { cn } from '@/lib/utils'

interface ModalContextType {
  open: boolean
  onClose: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

interface ModalProviderProps {
  childen: ReactNode
  open: boolean
  onClose: () => void
}

export const ModalProvider = ({ childen, open, onClose }: ModalProviderProps) => {
  return <ModalContext.Provider value={{ open, onClose }}>{childen}</ModalContext.Provider>
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

interface ModalProps {
  childen: ReactNode
  open: boolean
  onClose: () => void
}

export function Modal({ childen, open, onClose }: ModalProps) {
  return (
    <ModalProvider open={open} onClose={onClose}>
      {childen}
    </ModalProvider>
  )
}

export const ModalBody = ({ childen, className }: { childen: ReactNode; className?: string }) => {
  const { open, onClose } = useModal()

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [open])

  const modalRef = useRef(null)
  useOutsideClick(modalRef, onClose)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            backdropFilter: 'blur(10px)',
          }}
          exit={{
            opacity: 0,
            backdropFilter: 'blur(0px)',
          }}
          className='fixed [perspective:800px] [transform-style:preserve-3d] inset-0 h-full w-full flex items-center justify-center z-50'
        >
          <Overlay />

          <motion.div
            ref={modalRef}
            className={cn(
              'max-h-[90%] md:max-w-[40%] bg-white dark:bg-neutral-950 border border-transparent dark:border-neutral-800 md:rounded-2xl relative z-50 flex flex-col flex-1 overflow-hidden',
              className,
            )}
            initial={{
              opacity: 0,
              scale: 0.5,
              rotateX: 40,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateX: 0,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              rotateX: 10,
            }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 15,
            }}
          >
            {childen}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const ModalContent = ({ childen, className }: { childen: ReactNode; className?: string }) => {
  return <div className={cn('flex flex-col flex-1 p-8 md:p-10', className)}>{childen}</div>
}

const Overlay = ({ className }: { className?: string }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        backdropFilter: 'blur(10px)',
      }}
      exit={{
        opacity: 0,
        backdropFilter: 'blur(0px)',
      }}
      className={`fixed inset-0 h-full w-full bg-black bg-opacity-50 z-50 ${className}`}
    ></motion.div>
  )
}

export const useOutsideClick = (ref: React.RefObject<HTMLDivElement>, callback: Function) => {
  useEffect(() => {
    const listener = (event: any) => {
      // DO NOTHING if the element being clicked is the target element or their childen
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      callback(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, callback])
}
