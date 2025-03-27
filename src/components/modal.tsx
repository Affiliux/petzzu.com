'use client'
import React from 'react'

import { useTranslations } from 'next-intl'

import { Modal, ModalBody, ModalContent } from '@/components/ui/animated-modal'

interface AnimatedModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function AnimatedModal({ isOpen, onClose, children }: AnimatedModalProps) {
  const t = useTranslations()

  return (
    <div className='py-40 flex items-center justify-center'>
      <Modal open={isOpen} onClose={onClose}>
        <ModalBody>{children}</ModalBody>
      </Modal>
    </div>
  )
}
