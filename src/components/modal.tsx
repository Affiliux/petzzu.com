'use client'

import React from 'react'

import { Modal, ModalBody, ModalContent } from '@/components/ui/animated-modal'

interface AnimatedModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function AnimatedModal({ isOpen, onClose, children }: AnimatedModalProps) {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalBody>
        <ModalContent>{children}</ModalContent>
      </ModalBody>
    </Modal>
  )
}
